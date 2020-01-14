<template>
  <div class='scroll-wrapper'>
      <van-list></van-list>
  </div>
</template>

<script>
export default {
  name: 'aritcle-list',
  data () {
    return {
      upLoading: false, // 是否开启上拉加载
      finished: false // 是否完成全部加载
    }
  }
}
</script>

<style lang="less">
</style>
