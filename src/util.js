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

module.exports = {
  fontTemplate
};
