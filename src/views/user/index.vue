<template>
  <div class='container'>个人中心</div>
</template>

<script>
import { login } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  name: 'user',
  ...mapMutations(['updateUser']),
  // 调用登录方法
  // 登录方法
  async login () {
    if (this.checkMobile() && this.checkCode()) {
      // 都通过了 表示前端校验通过 还要调用接口
      // 提示消息 表示登录成功
      const data = await login(this.loginForm) // 获取结果
      // 拿到了token 更新token信息
      // this.$store.commit('updateUser', { user: data }) // 第一种写法
      this.updateUser({ user: data }) // 更新用户信息
      // 登录成功
      this.$gnotify({ type: 'success', message: '登录成功' })
      // 跳转
      // 两种情况 1 redirectUrl (登录未遂 => 登录  => 遂) 2 没有 redirectUrl 跳到首页
      let { redirectUrl } = this.$route.query // 解构当前的路由信息
      this.$router.push(redirectUrl || '/') // 短路表达式
    }
  }

}
</script>

<style lang="less" scoped>
</style>
