import {RECEIVE_ADDRESS,RECEIVE_CATEGORYS,RECEIVE_SHOPS,RECEIVE_USER_INFO,LOGOUT_USER_INFO,RECEIVE_SHOP_INFO,RECEIVE_SHOP_GOODS,
  RECEIVE_SHOP_RATINGS,DECRMENT_FOOD_COUNT,INCRMENT_FOOD_COUNT,CLEARCART,SEARCHSHOP} from "./mutation-types"
import Vue from "vue"
export default {
  [RECEIVE_ADDRESS](state,{address}) {
      state.address=address;
  },
  [RECEIVE_CATEGORYS](state,{categorys}){
    state.categorys=categorys;
  },
  [RECEIVE_SHOPS](state,{shops}){
    state.shops=shops;
  },
  [RECEIVE_USER_INFO](state,userInfo){
    state.userInfo=userInfo;
  },
  [LOGOUT_USER_INFO](state){
    state.userInfo={};
  },
  [RECEIVE_SHOP_INFO](state,shopInfo){
    state.shopInfo=shopInfo
  },
  [RECEIVE_SHOP_GOODS](state,shopGoods){
    state.shopGoods=shopGoods
  },
  [RECEIVE_SHOP_RATINGS](state,shopRatings){
    state.shopRatings=shopRatings
  },
  [INCRMENT_FOOD_COUNT](state,{food}){
    if(food.count){
      food.count++
    }else {
      /*Vue只对原有的属性有数据绑定的效果*/
      Vue.set(food,'count',1)
      /*将food对象放进去，food对象里的数据一旦改变，则cartFoods里的food改变*/
      state.cartFoods.push(food)
      /*food.count=1*/
    }
  },
  [DECRMENT_FOOD_COUNT](state,{food}){
    if(food.count){
      food.count--
      if(food.count==0){
        state.cartFoods.splice(state.cartFoods.indexOf(food),1)
      }
    }
  },
  [CLEARCART](state){
    state.cartFoods.forEach(food=>{
      food.count=0
    })
    state.cartFoods=[]
  },
  [SEARCHSHOP](state,{shop}){
    state.searchShops=shop
  }
}
