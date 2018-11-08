/*
 * @Description: 公共函数
 * @Author: OBKoro1
 * @Date: 2018-10-31 14:18:17
 * @LastEditors: OBKoro1
 * @LastEditTime: 2018-11-01 18:03:08
 */
module.exports = {
  fontTemplate,
  throttle
};

// 模板
function fontTemplate(tpl) {
  let fn,
    match,
    code = [
      "let r=[];\nlet _html = function (str) { return str.replace(/&/g, '&amp;').replace(/\"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };"
    ],
    // 取出由&包裹的属性名 替换为值
    re = /\&\s*([a-zA-Z\.\_0-9()]+)(\s*\|\s*safe)?\s*\&/m,
    addLine = function(text) {
      code.push(
        "r.push('" +
          text
            .replace(/\'/g, "\\'")
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r') +
          "');"
      );
    };
  while ((match = re.exec(tpl))) {
    if (match.index > 0) {
      addLine(tpl.slice(0, match.index));
    }
    if (match[2]) {
      code.push('r.push(String(this.' + match[1] + '));');
    } else {
      code.push('r.push(_html(String(this.' + match[1] + ')));');
    }
    tpl = tpl.substring(match.index + match[0].length);
  }
  addLine(tpl);
  code.push("return r.join('');");
  fn = new Function(code.join('\n'));
  this.render = function(model) {
    // 采用配置数据
    return fn.apply(model);
  };
}

// 节流函数 单位时间内有事件被多次触发则，只生效一次
function throttle(fn, gapTime, _lastTime = null) {
  return function() {
    let _nowTime = +new Date();
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      // !_lastTime 第一次进入
      fn(); // 当前时间- 上次执行的时间 超过 给定时间间隔 就执行回调
      _lastTime = _nowTime; // 触发后，上次执行时间赋值为当前时间
      return _lastTime;
    }
    return _lastTime
  };
}

Date.prototype.format = function(format) {
  // 处理时间格式
  let o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds()
  };
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }
  return format;
};
