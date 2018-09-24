// latitude: 40.10038, // 纬度
//   longitude: 116.36867, // 经度
//   address: {}, // 地址信息对象
// categorys: [], // 分类数组
/*处理ajax请求。获取数据*/
import {reqAddress, reqCategorys, reqShops, reqUser, reqLogout, reqShopInfo, reqShopRatings,reqShopGoods,reqSearchGoods} from "../api/index"
import {RECEIVE_ADDRESS,RECEIVE_SHOPS,RECEIVE_CATEGORYS,RECEIVE_USER_INFO,LOGOUT_USER_INFO,RECEIVE_SHOP_INFO,RECEIVE_SHOP_GOODS,
  RECEIVE_SHOP_RATINGS,INCRMENT_FOOD_COUNT,DECRMENT_FOOD_COUNT,CLEARCART,SEARCHSHOP} from "./mutation-types";
export default {
  async getAddress({commit, state}) {
    const geohash = state.latitude + "," + state.longitude;
    /*相当于成功了执行了then操作，返回结果*/
    const result = await reqAddress(geohash);
    if (result.code == 0) {
      commit(RECEIVE_ADDRESS, {address:result.data});
    }
  },
  async getCategorys({commit}) {
    /*相当于成功了执行了then操作，返回结果*/
    const result = await reqCategorys();
      commit(RECEIVE_CATEGORYS, {categorys:result.data});
  },
  async getShops({commit,state}) {
    /*相当于成功了执行了then操作，返回结果*/
    const result = await reqShops({latitude:state.latitude,longitude:state.longitude});
    commit(RECEIVE_SHOPS, {shops:result.data});
  },
  /*记录用户提交的信息*/
  recordUser({commit},userInfo){
    commit(RECEIVE_USER_INFO,userInfo)
  },
  /*异步获取用户信息*/
  async getUserInfo({commit}) {
    const result = await reqUser()
    if (result.code == 0) {
      const userInfo = result.data;
      commit(RECEIVE_USER_INFO, userInfo)
    }
  },
    /*用户异步登出*/
  async logout({commit}){
      const result=await reqLogout()
      if(result.code==0){
        const userInfo=result.data
        commit(LOGOUT_USER_INFO,{userInfo})
      }
    },
  async getShopInfo({commit}){
      const result=await reqShopInfo()
      if(result.code==0){
        const shopInfo=result.data
        commit(RECEIVE_SHOP_INFO,shopInfo)
      }
  },
  async getShopGoods({commit},callback){
    const result=await reqShopGoods()
    if(result.code==0){
      const shopgoods=result.data
      commit(RECEIVE_SHOP_GOODS,shopgoods)
      //拿到数据后通知回调函数执行
     callback&& callback();
    }
  },
  async getShopRatings({commit},callback){
    const result=await reqShopRatings()
    if(result.code==0){
      const shopratings=result.data
      commit(RECEIVE_SHOP_RATINGS,shopratings)
    }
    callback&&callback()
  },
  // 增加/减少指定食物的数量
  updateFoodCount ({commit}, {food, isAdd}) {
    if(isAdd) {
      commit(INCRMENT_FOOD_COUNT, {food})
    } else {
      commit(DECRMENT_FOOD_COUNT, {food})
    }
  },
  //清空购物车
  clearCart({commit}){
    commit(CLEARCART)
  },
  /*搜索商铺*/
  async searchShop({commit,state},keyword){
    const geohash = state.latitude + "," + state.longitude;
    const result= await reqSearchGoods(geohash,keyword)
    if(result.code==0){
      const shop=result.data
      commit(SEARCHSHOP,{shop})
    }
  }

}
