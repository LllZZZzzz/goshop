<template>
  <div>
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.FooterShow"></FooterGuide>
  </div>
</template>
<script>
  import FooterGuide from './components/FooterGuide/FooterGuide'
export default {
    components:{
      FooterGuide
    },
  methods:{
  }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
