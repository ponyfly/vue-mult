<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="async-load">
      <a @click.prevent="showAsync = true" class="weui-btn weui-btn_primary weui-btn_inline">点我加载异步组件</a>
      <icon name="window"></icon>
      <async-load v-if="showAsync"></async-load>
      <p>其他就没啥了，反正就是好用</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Vue 单页应用模板',
      showAsync: false
    }
  },
  components: {
    AsyncLoad: () => import(/* webpackChunkName: "async-load" */'./AsyncLoad.vue')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
