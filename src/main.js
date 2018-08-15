/*入口js*/
import Vue from "vue"
import App from "./App"
import router from "./router"

new Vue({
  el:"#app",
  components:{App},
  template:'<App/>',
  /*多了几个组件标签$router $route*/
  router
})
