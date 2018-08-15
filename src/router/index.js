/*路由器对象模块*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import MSite from '../pages/MSite/MSite'
import Order from '../pages/Order/Order'
import Profile from '../pages/Profile/Profile'
import Search from '../pages/Search/Search'
import Login from '../pages/Login/Login'
/*VueRouter这个库是一个构造函数*/
Vue.use(VueRouter)
export default new VueRouter({
  /*配置所有路由*/
  routes:[
    {
      path:'/msite',
      component:MSite
    },
    {
      path:'/order',
      component:Order
    },{
      path:'/profile',
      component:Profile
    },{
      path:'/search',
      component:Search
    },
    {
      path:'/',
      redirect:'./msite'
    },
    {
      path:'/Login',
      component:Login,
      meta:{
        FooterShow:false
      }
    }
  ]
})
