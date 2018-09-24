<template>
  <div>
    <router-view></router-view>
    <FooterGuide v-show="!$route.meta.FooterShow"></FooterGuide>
  </div>
</template>
<script>
  import FooterGuide from './components/FooterGuide/FooterGuide'
  import {mapActions} from "vuex"

  export default {
    components:{
      FooterGuide
    },
  methods:{
      /*这个比mounted初始化的靠前*/
    ...mapActions(["getAddress","getUserInfo"])
  },
   mounted(){
      this.getAddress();
      this.getUserInfo();
  },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    position relative
    overflow auto
</style>
