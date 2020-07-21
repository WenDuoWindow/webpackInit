import './../../css/index.scss';
import {
  getQueryString
} from './../utils/common';
import Vue from './../utils/vue';
import {
  userWxInfo
} from './../api/api_index';
window.onpageshow = (e) => {
  // 不管哪个页面进入此页面，相当于重新登录，清楚所有缓存
  sessionStorage.clear();
  if (e.persisted || (window.performance && window.performance.navigation.type == 2)) {
    location.href = window.location.href.split("?")[0];
    return;
  }
  let index = new Vue({
    el: '#root',
    data() {
      return {}
    },
    mounted() {

    },
  })
}