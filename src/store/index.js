import Vuex from "vuex"
import Vue from "vue"
import state from "./state"
import mutations from "./mutations"
import getters from "./getters"
import actions from "./action"
/*vuex向外暴露的是一个构造函数*/
Vue.use(Vuex)
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
