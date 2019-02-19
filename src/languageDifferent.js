/*
 * @Author: OBKoro1
 * @Github: https://github.com/OBKoro1
 * @Date: 2018-12-11 21:29:11
 * @LastEditors: OBKoro1
 * @LastEditTime: 2019-02-19 11:12:19
 * @Description: 通过fileEnd使用正则匹配各个语言已调好的注释符号以及用户自定义注释符号
 */

const vscode = require('vscode');
const config = vscode.workspace.getConfiguration('fileheader'); // 配置项默认值
const userAnnotationStr = config.configObj.annotationStr; // 用户自定义注释的配置
const languageObj = config.configObj.language; // 自定义语言项

// LastEditTime、LastEditors 特殊字段用户有没有设置
const specialOptions = config.configObj.specialOptions
const LastEditTimeName = specialOptions.LastEditTime ? specialOptions.LastEditTime : 'LastEditTime';
const LastEditorsName = specialOptions.LastEditors ? specialOptions.LastEditors : 'LastEditors';


/**
 * @description: 用户自定义语言注释符号和未设置下的默认注释符号
 * @param {String} obj.type 匹配成功后，输出哪个属性下的字符串
 * @param {String} else 逻辑下需要的参数
 * @param {Boolean} isDefault 默认的注释形式和自定义的语言注释形式
 */
const userLanguageSetFn = (obj, isDefault = true) => {
  let annotationSymbol = userAnnotationStr; // 注释符号
  if (!isDefault) {
    annotationSymbol = languageObj[obj.fileEnd.fileEnd]
  }
  const userObj = {
    topMiddle: `${annotationSymbol.middle}${obj.key}: &${obj.key}&\r\n`,
    topHeadEnd: `${annotationSymbol.head}\r\n${obj.str}${
      annotationSymbol.end
    }\r\n`,
    fnMiddle_param: `${obj.str}${annotationSymbol.middle}${obj.key} ${
      obj.typeVal
    } &${obj.key}&\r\n`,
    fnMiddle_key: `${obj.str}${annotationSymbol.middle}${obj.key}: &${
      obj.key
    }&\r\n`,
    topHeadEnd_nextLineNo: `${obj.frontStr}${annotationSymbol.head}\r\n${
      obj.strContent
    }${obj.str}${annotationSymbol.end}\r\n${obj.str}`,
    topHeadEnd_nextLineYes: `${obj.frontStr}${annotationSymbol.head}\r\n${
      obj.strContent
    }${obj.str}${annotationSymbol.end}`,
    annotationStarts: `${annotationSymbol.head}`,
    lastTimeStr: `${
      annotationSymbol.middle
    }${LastEditTimeName}: ${new Date().format()}`,
    LastEditorsStr: `${annotationSymbol.middle}${LastEditorsName}: ${
      obj.LastEditors
    }`,
  };
  return userObj[obj.type];
};

/**
 * @description: 通过fileEnd使用正则匹配各个语言已调好的注释符号
 * @param {String} obj.fileEnd 语言后缀
 * @param {String} obj.type 匹配成功后，输出哪个属性下的字符串
 * @param {String} else 逻辑下需要的参数
 * @return: 不同逻辑下的字符串
 */
const tplJudge = obj => {

  const languageObj = {
    javascript: {
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
      LastEditorsStr: ` * @${LastEditorsName}: ${obj.LastEditors}`,
      lastTimeStr: ` * @${LastEditTimeName}: ${new Date().format()}`
    },
    python: {
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
      LastEditorsStr: `@${LastEditorsName}: ${obj.LastEditors}`,
      lastTimeStr: `@${LastEditTimeName}: ${new Date().format()}`
    },
    vb: {
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
      LastEditorsStr: `' @${LastEditorsName}: ${obj.LastEditors}`,
      lastTimeStr: `' @${LastEditTimeName}: ${new Date().format()}`
    },
    html: {
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
      LastEditorsStr: ` * @${LastEditorsName}: ${obj.LastEditors}`,
      lastTimeStr: ` * @${LastEditTimeName}: ${new Date().format()}`
    }
  };
  // 匹配用户定义语言符号 在fileEndMatch中如果用户定义了 会返回一个对象
  if (obj.fileEnd.userLanguage) {
    return userLanguageSetFn(obj, false);
  }
  
  // 匹配插件的符号
  if (obj.fileEnd !== 'default_str') {
    return languageObj[obj.fileEnd][obj.type];
  }
  // 默认注释符号
  if (userAnnotationStr.use) {
    // 调用用户自己的设置
    return userLanguageSetFn(obj);
  } else {
    // 调用默认设置
    obj.fileEnd = 'javascript';
    return tplJudge(obj);
  }
};

module.exports = {
  tplJudge
};
