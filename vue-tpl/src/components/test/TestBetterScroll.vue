<template>
  <div class="wrapper" ref="wrapper">
    <ul class="content">
      <li v-for="item in data">{{item}}</li>
    </ul>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  export default {
    data() {
      return {
        data: []
      }
    },
    created() {

      /*
      // 见文章 https://zhuanlan.zhihu.com/p/27407024
      // https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/
      // https://better-scroll.github.io/docs/zh-CN/guide/
      // 这里的 requestData 是伪代码，作用就是发起一个 http 请求从服务端获取数据，并且这个函数返回的是一个 promise（实际项目中我们可能会用 axios 或者 vue-resource）
      requestData().then((res) => {
        this.data = res.data
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.wrapper, {})
        })
      })
      */
    }
  }
</script>

<style scoped>

</style>