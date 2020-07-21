// 获取地址参数
export const getQueryString = function (name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  let r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return "";
}

// 格式化时间
export const formatTime = (data) => {
  if (!data) {
    return data
  } else {
    const date = new Date(data);
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }
}
// 倒计时时间
export const countTime = (data) => {
  if (!data && data !== 0) {
    return data
  } else if (data <= 0) {
    return '00:00:00'
  } else {
    const hour = Math.floor(data / (60 * 60 * 1000));
    const minute = Math.floor((data - hour * (60 * 60 * 1000)) / (60 * 1000));
    const second = Math.floor((data - hour * 60 * 60 * 1000 - minute * 60 * 1000) / 1000);
    return [hour, minute, second].map(formatNumber).join(':');
  }
}

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n;
}