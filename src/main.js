/*入口js*/
import Vue from "vue"
import App from "./App"
import router from "./router"
import store from "./store/index"
import '../src/mock/mockjs'//要使用这个模块，只需要加载即可
/*import { Button } from 'mint-ui';
Vue.component(Button.name, Button);*/
import VueLazyload from 'vue-lazyload'
import loading from './common/imgs/loading.gif'
Vue.use(VueLazyload,{
  loading
})
new Vue({
  el:"#app",
  components:{App},
  template:'<App/>',
  /*多了几个组件标签$router $route*/
  /*路由组件和vuex组件作为模板引入*/
  router,
  store
})
