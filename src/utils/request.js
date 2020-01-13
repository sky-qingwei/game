// 封装 request 模块
// 为什么封装?  1.要在拦截器里处理 token统一注入 2.响应数据的统一处理返回 3.处理最大数值

import axios from 'axios'
import JSONBig from 'json-bigint'
import store from '@/store'
import router from '@/router'
// 应该给request请求一个默认的请求头 baseURL
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/', // 设置一个常量的基础地址
  transformResponse: [function (data) { // data 就是后端响应的字符串, 默认的转化是JSON.parse
    try {
      return JSONBig.parse(data)
    } catch (error) {
      return data
    }
  }]
}) // 创建一个axios的请求工具

// 请求拦截器
instance.interceptors.request.use(function (config) {
  // config 就是请求的参数
  if (store.state.user.token) {
    // 统一注入token
    config.headers['Authorization'] = `Bearer ${store.state.user.token}`
  }
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.user(function (response) {
  // 得到的response 实际上被axios包了一层数据
  try {
    // 讲数据解构
    return response.data.data
  } catch (error) {
    return response.data
  }
}, async function (error) {
  // 如果拿到token过期的标识
  // error config(请求配置) response(响应)
  if (error.response.status === 401) {
    let toPath = {
      path: '/login',
      query: {
        redirectUrl: router.currenRoute.path // 当前页面地址 做成参数传到登录页
      }
    }
    // 判断本地有没有 refresh_token
    if (store.state.user.refresh_token) {
      // 找到了 refresh_token 可以继续
      try {
        let result = await axios({
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${store.state.user.refresh_token}`
          },
          method: 'put'
        })

        // 将数据同步到本地存储
        store.commit('updateUser', {
          user: {
            token: result.data.data.token,
            refresh_token: store.state.user.refresh_token
          }
        })
        return instance(error.config) // 讲401请求再次发送出去
      } catch (error) {
        // 续命不成功,就要删除refresh_token信息
        store.commit('clearUser')
        // 直接回登录
        router.push(toPath)
      }
    } else {
      // 否则,应该回到登录页面,当你在一个页面 让你去登录 希望登录之后回到这个页面
      router.push(toPath)
      // params(动态路由 /user/:)  query (/user?id=123)
    }
  }
  return Promise.reject(error)
})
export default instance // 导出request工具
