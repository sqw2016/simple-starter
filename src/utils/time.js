export function getTimeStamp() {
  return (new Date()).getTime();
}

// 产生一个格式化的年月日
export function getFormatDay(year, mon, day) {
  let y = year;
  let m = mon;
  let d = day;
  let backStr = '';
  let date = new Date();
  switch (arguments.length) {
    case 0: // 默认时间
      // 如果是三点以后
      if (date.getHours() >= 15) {
        date = new Date(date.getTime() + 3600*24*1000);
      }
      y = date.getFullYear();
      m = date.getMonth() + 1;
      d = date.getDate();
      break;
    case 1: // 一个参数时，表示传入时间字符串，用于生成一个新的时间
      date = new Date(year);
      y = date.getFullYear();
      m = date.getMonth() + 1;
      d = date.getDate();
      break;
    default:
      backStr = 'arguments error';
      break;
  }
  m = `0${m}`;
  d = `0${d}`;
  backStr = y + m.slice(m.length - 2) + d.slice(d.length - 2);
  return backStr;
}
