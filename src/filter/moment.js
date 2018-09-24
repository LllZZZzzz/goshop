import Vue from "vue"
/*import moment from "moment"*/
import format from "date-fns/format"
Vue.filter("data-format",(val,formatStr="YYYY-MM-DD HH:mm:ss")=>{
  return format(value,formatStr)
})
/*这个模块也不用向外暴露，只需要运行加载即可*/
