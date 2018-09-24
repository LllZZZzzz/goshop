/*路由器对象模块*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import MSite from '../pages/MSite/MSite'
import Order from '../pages/Order/Order'
import Profile from '../pages/Profile/Profile'
import Search from '../pages/Search/Search'/*分割打包生成多个js文件*/
/*const MSite=()=>import('../pages/MSite/MSite')
const Order=()=>import('../pages/Order/Order')
const Profile=()=>import('../pages/Profile/Profile')
const Search=()=>import('../pages/Search/Search')*/
import Login from '../pages/Login/Login'
import UserInfo from '../pages/UserInfo/UserInfo'
import Shop from '../pages/Shop/Shop'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo'
import ShopRating from '../pages/Shop/ShopRating/ShopRating'

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
        FooterShow:true
      }
    },
    {
      path:'/userinfo',
      component:UserInfo,
      meta:{
        FooterShow:true
      }
    },
    {
      path: '/shop',
      component: Shop,
      meta: {
        FooterShow: true
      },
      children:[
        {
          path:'/shop/goods',
          component:ShopGoods,
          meta: {
            FooterShow: true
          },
        },
        {
          path:'/shop/rating',
          component:ShopRating,
          meta: {
            FooterShow: true
          },
        },
        {
          path:'/shop/info',
          component:ShopInfo,
          meta: {
            FooterShow: true
          },
        },
        {
          path:'/shop',
          redirect:'/shop/goods'
        }
      ]
    }
  ]
})
/*Vue构造函数对象   组件内的this组件对象*/
