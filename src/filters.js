import timeago from "timeago.js";
import plueMessageBundle from "plus-message-bundle";

/**
 * ThinkSNS Plus 消息解析器，获取顶部消息.
 *
 * @param {Object} message
 * @param {String} defaultMessage
 * @return {String}
 * @author Seven Du <shiweidu@outlook.com>
 */
export function plusMessageFirst(message, defaultMessage) {
  return plueMessageBundle(message, defaultMessage).getMessage();
}

/**
 * ThinkSNS Plus 消息解析器，获取顶部消息.
 *
 * @param {Object} message
 * @param {String} defaultMessage
 * @return {String}
 * @author Seven Du <shiweidu@outlook.com>
 */
export function plusMessageAnalyze(message, defaultMessage) {
  return plueMessageBundle(message, defaultMessage).getMessage();
}

/**
 * 格式化时间
 * @author jsonleex <jsonlseex@163.com>
 * @param  {Object} date
 * @param  {String} fmt
 * @return {String}
 */
export function formatDate(date, fmt = "yyyy/MM/dd hh:mm") {
  const o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (const k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
}

/**
 * 时间转提示
 * @author jsonleex <jsonlseex@163.com>
 * @param  {String} str
 * @return {String}
 */
export const time2txt = str => {
  if (!str) return "";
  // 兼容 IOS 保证传入数据格式 YYYY/MM/dd HH:mm:ss
  let date = new Date(str.replace(/-/g, "/"));

  // 时间差 = 当前时间 - date (单位: 毫秒)
  let time = new Date() - date;

  if (time < 0) {
    return "";
  } else if (time / 3600000 < 24) {
    return "今天";
  } else {
    const M = (date.getMonth() + 1 + "").padStart(2, "0");
    const D = (date.getDate() + "").padStart(2, "0");
    return M + "月" + D;
  }
};

// 格林威治时间和本地时间之间的时差 (单位:毫秒)
export const timeOffset = new Date().getTimezoneOffset() * 60 * 1000;

export const dateFormat = timeago(null, "zh_CN");
export const time2tips = date => {
  const time = new Date(
    typeof date === "string" ? date.replace(/-/g, "/") : date
  );
  return dateFormat.format(time - timeOffset);
};

/**
 * 格式化数字
 *     @author jsonleex <jsonlseex@163.com>
 */
export const formatNum = (a = 0) => {
  return (
    a > 0 &&
      (a > 99999999 && (a = Math.floor(a / 1e8) + "亿"),
      a > 9999 &&
        (a =
          a > 99999999
            ? Math.floor(a / 1e8) + "亿"
            : Math.floor(a / 1e4) + "万")),
    a
  );
};

/**
 * Markdown to text fiter.
 *
 * @param {string} markdown
 * @return {string}
 * @author Seven Du <shiweidu@outlook.com>
 */
export function markdownText(markdown) {
  return require("./util/markdown").syntaxTextAndImage(markdown).text;
}
