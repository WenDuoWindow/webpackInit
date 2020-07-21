import axios from 'axios'
import qs from 'qs'
import Vue from './../utils/vue';
// 统一接口前缀，测试地址直接写入
let _PATH;
if (process.env.NODE_ENV === 'development') {
  _PATH = '';
} else if (process.env.NODE_ENV === 'production') {
  _PATH = '';
}
let timer = null;
axios.defaults.withCredentials = true
axios.interceptors.request.use(config => {
  // 设置计时器，如果500ms之后还没有返回数据，才出现对话框
  if (timer) {
    clearTimeout(timer);
    timer = null;
  };
  timer = setTimeout(() => {
    Vue.prototype.loading();
  }, 500);

  config.headers["Content-Type"] = "application/x-www-form-urlencoded";
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, error => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  };
  Vue.prototype.hide();
  return Promise.reject(error)
})

//  响应拦截器
//  响应拦截器
axios.interceptors.response.use(
  res => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    };
    // Vue.prototype.hide();
    if (res.status === 200) {
      if (res.data.result) {
        if (res.data.result !== 1) {
          switch (res.data.result) {
            case -1:
              Vue.prototype.confirm({
                content: res.data.codeMessage || '请求异常，请重试',
              });
              return Promise.reject(res.data);
            default:
              return Promise.reject(res.data)
          }
        }
        return Promise.resolve(res.data)
      }
      return Promise.reject(res)
    }
    return Promise.reject(res)
  },
  error => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    };
    // Vue.prototype.hide();
    Vue.prototype.confirm({
      content: '服务器错误，请重试',
    });
    return Promise.reject(error)
  }
)

export {
  axios,
  _PATH
}