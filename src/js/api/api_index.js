import {
  axios,
  _PATH
} from './api_base';

/**
 * 预约购买
 * @param {Object} params
 *  {
 *    activity 二维码活动Id（积分平台跳转进入时有值）
      openId 用户openId
      unionId 用户unionId
      nickName 微信昵称 进行 encodeURIComponent
      headPhoto 微信头像 进行 encodeURIComponent
      sign 签名
 * }
 */
export function userWxInfo(params = {}) {
  return axios.post(`${_PATH}/api/wxInfo/userWxInfo`, params)
}

