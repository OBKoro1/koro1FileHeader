/*
 * @Author: OBKoro1
 * @Github: https://github.com/OBKoro1
 * @Date: 2018-12-11 21:29:11
 * @LastEditors: OBKoro1
 * @LastEditTime: 2018-12-13 20:46:38
 * @Description: 每个语言不同情况下的输出
 */

const vscode = require('vscode');
const config = vscode.workspace.getConfiguration('fileheader'); // 配置项默认值
const userAnnotationStr = config.configObj.annotationStr; // 用户自定义注释的配置

const userAnnotationStrFn = (obj) => {
  const userObj = {
    topMiddle: `${userAnnotationStr.middle}${obj.key}: &${obj.key}&\r\n`,
    topHeadEnd: `${userAnnotationStr.head}\r\n${obj.str}${userAnnotationStr.end}\r\n`,
    fnMiddle_param: `${obj.str}${userAnnotationStr.middle}${obj.key} ${obj.typeVal} &${obj.key}&\r\n`,
    fnMiddle_key: `${obj.str}${userAnnotationStr.middle}${obj.key}: &${obj.key}&\r\n`,
    topHeadEnd_nextLineNo: `${obj.frontStr}${userAnnotationStr.head}\r\n ${obj.strContent}${
      obj.str
    }${userAnnotationStr.end}\r\n${obj.str}`,
    topHeadEnd_nextLineYes: `${obj.frontStr}${userAnnotationStr.head}\r\n ${obj.strContent}${
      obj.str
    }${userAnnotationStr.end}`,
    annotationStarts: `${userAnnotationStr.head}`,
    LastEditorsStr: `${userAnnotationStr.middle}LastEditors: ${obj.LastEditors}`,
    lastTimeStr: `${userAnnotationStr.middle}LastEditTime: ${new Date().format('yyyy-MM-dd hh:mm:ss')}`
  };
  return userObj[obj.type];
};

const tplJudge = obj => {
  const languageObj = {
    '/^java$|^javascript$|^go$|^cpp$|^c$/': {
      topMiddle: `* @${obj.key}: &${obj.key}&\r\n `,
      topHeadEnd: `/*\r\n ${obj.str}*/\r\n`,
      // fnMiddle_param、fnMiddle_key当参数是param 多加一个type
      fnMiddle_param: `${obj.str}* @${obj.key} ${obj.typeVal} &${
        obj.key
      }&\r\n `,
      fnMiddle_key: `${obj.str}* @${obj.key}: &${obj.key}&\r\n `,
      // nextLine 下一行是否存在
      topHeadEnd_nextLineNo: `${obj.frontStr}/**\r\n ${obj.strContent}${
        obj.str
      }*/\r\n${obj.str}`,
      topHeadEnd_nextLineYes: `${obj.frontStr}/**\r\n ${obj.strContent}${
        obj.str
      }*/`,
      annotationStarts: `/*`,
      LastEditorsStr: ` * @LastEditors: ${obj.LastEditors}`,
      lastTimeStr: ` * @LastEditTime: ${new Date().format(
        'yyyy-MM-dd hh:mm:ss'
      )}`
    },
    '/^python$/': {
      topMiddle: `@${obj.key}: &${obj.key}&\r\n`,
      topHeadEnd: `'''\r\n${obj.str}'''\r\n`,
      fnMiddle_param: `${obj.str}@${obj.key} ${obj.typeVal} &${obj.key}&\r\n`,
      fnMiddle_key: `${obj.str}@${obj.key}: &${obj.key}&\r\n`,
      topHeadEnd_nextLineNo: `${obj.frontStr}'''\r\n${obj.strContent}${
        obj.str
      }'''\r\n${obj.str}`,
      topHeadEnd_nextLineYes: `${obj.frontStr}'''\r\n${obj.strContent}${
        obj.str
      }'''`,
      annotationStarts: `'''`,
      LastEditorsStr: `@LastEditors: ${obj.LastEditors}`,
      lastTimeStr: `@LastEditTime: ${new Date().format('yyyy-MM-dd hh:mm:ss')}`
    },
    '/^vb$/': {
      topMiddle: `' @${obj.key}: &${obj.key}&\r\n`,
      topHeadEnd: `'\r\n${obj.str}'\r\n`,
      fnMiddle_param: `${obj.str}' ${obj.key} ${obj.typeVal} &${obj.key}&\r\n`,
      fnMiddle_key: `${obj.str}' ${obj.key}: &${obj.key}&\r\n`,
      topHeadEnd_nextLineNo: `${obj.frontStr}'\r\n${obj.strContent}${
        obj.str
      }'\r\n${obj.str}`,
      topHeadEnd_nextLineYes: `${obj.frontStr}'\r\n${obj.strContent}${
        obj.str
      }'`,
      annotationStarts: `'`,
      LastEditorsStr: `' @LastEditors: ${obj.LastEditors}`,
      lastTimeStr: `' @LastEditTime: ${new Date().format(
        'yyyy-MM-dd hh:mm:ss'
      )}`
    },
    '/^vue$|^html$/': {
      topMiddle: `* @${obj.key}: &${obj.key}&\r\n `,
      topHeadEnd: `<!--\r\n ${obj.str}-->\r\n`,
      fnMiddle_param: `${obj.str}* @${obj.key} ${obj.typeVal} &${
        obj.key
      }&\r\n `,
      fnMiddle_key: `${obj.str}* @${obj.key}: &${obj.key}&\r\n `,
      topHeadEnd_nextLineNo: `${obj.frontStr}/**\r\n ${obj.strContent}${
        obj.str
      }*/\r\n${obj.str}`,
      topHeadEnd_nextLineYes: `${obj.frontStr}/**\r\n ${obj.strContent}${
        obj.str
      }*/`,
      annotationStarts: `<!--`,
      LastEditorsStr: ` * @LastEditors: ${obj.LastEditors}`,
      lastTimeStr: ` * @LastEditTime: ${new Date().format(
        'yyyy-MM-dd hh:mm:ss'
      )}`
    }
  };
  for (let key in languageObj) {
    // 正则匹配
    const reg = eval(key);
    const a = reg.test(obj.fileEnd);
    if (a) {
      return languageObj[key][obj.type]; // 返回字符串
    }
  }
  // 判断用户有没有设置
  if (userAnnotationStr.use) {
    // 调用用户自己的设置
    return userAnnotationStrFn(obj);
  } else {
    // 调用默认设置
    obj.fileEnd = 'javascript';
    return tplJudge(obj);
  }
};

module.exports = {
  tplJudge
};
