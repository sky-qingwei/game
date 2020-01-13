// 路由拦截 => 导航守卫
import router from '@/router'
import store from '@/store'
// 前置守卫=>当你的路由发生改变前触发
// to 到哪去 from 从哪来
// next函数=>必须next() => resolve 钩子 => 前面不执行next => 后面永远不执行
// next(flase)  终止当前跳转
// next(地址)   跳转到另外一个地址
// next()  放行
router.beforeEach(function (to, from, next) {
  if (to.path.startsWith('/user') && !store.state.user.token) {
    // 表示以/user为开头的
    // 拦截 判断有无token 有token => 有token =放行  没有token=>登录
    let toPath = {
      path: '/login',
      query: {
        redirectUrl: to.path
      }
    }
    next(toPath)
  } else {
    next() // 直接放行
  }
})
// 后置守卫
export default router
