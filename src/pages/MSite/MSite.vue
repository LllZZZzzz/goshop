<template>
    <div class="msite">
      <!-- <HeaderTop :title="address.name">
         <router-link slot="search" to="/search" class="header_search">
           <i class="iconfont icon-sousuo"></i>
         </router-link>

         <router-link slot="login" :to="userInfo._id?'/userinfo':'/login'" class="header_login">
           <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
           <span class="header_login_text " v-else>
             <i class="iconfont icon-person"></i>
           </span>
         </router-link>
       </HeaderTop>-->
      <HeaderTop title="临潼区陕鼓大道">
        <span slot="left" class="header_search">
          <i class="iconfont icon-sousuo"></i>
        </span>
        <span slot="right" class="header_login" >
          登录|注册
          <!--<i class="iconfont icon-person"></i>-->
        </span>
      </HeaderTop>
      <div class="miste-content-wrapper">
        <div class="miste-content">
          <!--首页导航-->
          <nav class="msite_nav border-1px">
            <!--轮播图-->
            <div class="swiper-container"> <!--v-if="categorysArr.length>0"-->
              <div class="swiper-wrapper">
                <div class="swiper-slide" ><!--v-for="(cs, index) in categorysArr" :key="index"-->
                  <a href="javascript:" class="link_to_food"><!--class="link_to_food" v-for="(c, index2) in cs" :key="index2"-->
                    <div class="food_container">
                      <img src="./images/nav/1.jpg"/> <!--:src="imgBaseUrl+c.image_url"-->
                    </div>
                    <span>1</span>
                  </a>
                  <a href="javascript:" class="link_to_food">
                    <div class="food_container">
                      <img src="./images/nav/2.jpg">
                    </div>
                    <span>2</span>
                  </a>
                  <a href="javascript:" class="link_to_food">
                    <div class="food_container">
                      <img src="./images/nav/3.jpg">
                    </div>
                    <span>3</span>
                  </a>
                  <a href="javascript:" class="link_to_food">
                    <div class="food_container">
                      <img src="./images/nav/4.jpg">
                    </div>
                    <span>4</span>
                  </a>
                  <a href="javascript:" class="link_to_food">
                    <div class="food_container">
                      <img src="./images/nav/5.jpg">
                    </div>
                    <span>5</span>
                  </a>
                  <a href="javascript:" class="link_to_food">
                    <div class="food_container">
                      <img src="./images/nav/6.jpg">
                    </div>
                    <span>6</span>
                  </a>
                  <a href="javascript:" class="link_to_food">
                    <div class="food_container">
                      <img src="./images/nav/7.jpg">
                    </div>
                    <span>7</span>
                  </a>
                  <a href="javascript:" class="link_to_food">
                    <div class="food_container">
                      <img src="./images/nav/8.jpg">
                    </div>
                    <span>8</span>
                  </a>
                </div>
                <div class="swiper-slide" >
                  <a href="javascript:" class="link_to_food">
                    <div class="food_container">
                      <img src="./images/nav/9.jpg">
                    </div>
                    <span>9</span>
                  </a>
                  <a href="javascript:" class="link_to_food">
                    <div class="food_container">
                      <img src="./images/nav/10.jpg">
                    </div>
                    <span>10</span>
                  </a>
                  <a href="javascript:" class="link_to_food">
                    <div class="food_container">
                      <img src="./images/nav/11.jpg">
                    </div>
                    <span>11</span>
                  </a>
                  <a href="javascript:" class="link_to_food">
                    <div class="food_container">
                      <img src="./images/nav/12.jpg">
                    </div>
                    <span>12</span>
                  </a>
                  <a href="javascript:" class="link_to_food">
                    <div class="food_container">
                      <img src="./images/nav/13.jpg">
                    </div>
                    <span>13</span>
                  </a>
                  <a href="javascript:" class="link_to_food">
                    <div class="food_container">
                      <img src="./images/nav/14.jpg">
                    </div>
                    <span>14</span>
                  </a>
                  <a href="javascript:" class="link_to_food">
                    <div class="food_container">
                      <img src="./images/nav/4.jpg">
                    </div>
                    <span>15</span>
                  </a>
                  <a href="javascript:" class="link_to_food">
                    <div class="food_container">
                      <img src="./images/nav/6.jpg">
                    </div>
                    <span>16</span>
                  </a>
                </div>
              </div>
              <!--添加分页器 -->
              <div class="swiper-pagination"></div>
            </div>
            <!--<img src="./images/msite_back.svg" >--><!--v-else-->
          </nav>
          <!--首页附近商家-->
          <div class="msite_shop_list border-1px">
            <div class="shop_header">
              <i class="iconfont icon-xuanxiang"></i>
              <span class="shop_header_title">附近商家</span>
            </div>
            <ShopList />
          </div>
        </div>
      </div>
    </div>

</template>

<script>
  import Swiper from 'swiper'
  import "swiper/dist/css/swiper.min.css"
  import HeaderTop from '../../components/HeaderTop/HeaderTop'
  import ShopList from '../../components/ShopList/ShopList'
    export default {
    components:{
      HeaderTop,
      ShopList
    },
    data () {
      return {
        imgBaseUrl: 'https://fuss10.elemecdn.com'
      }
    },
    mounted () {
      new Swiper('.swiper-container',{
        loop:true,
        pagination:{
          el:".swiper-pagination"
        }
      });

      /*this.$store.dispatch('getCategorys')
      this.$store.dispatch('getShops')*/
    }
    /*computed: {
    ...mapState(['address', 'categorys', 'userInfo']),

        categorysArr () {
        const max = 8
        const arr = []
        const {categorys} = this
        let tempArr = null
        categorys.forEach((c, index) => {
          if(!tempArr) {
            tempArr = []
            arr.push(tempArr)
          }
          if(tempArr.length<max) {
            tempArr.push(c)
          }
          if(tempArr.length===max) {
            tempArr = null
          }
        })

        return arr
      }
    },*/
    /*watch: {
      categorys(value) {
        this.$nextTick(() => {
          new Swiper('.swiper-container', {
            pagination: {
              el: '.swiper-pagination',
            },
            loop: true
          })
          new BScroll('.miste-content-wrapper', {
            click: true
          })
        })
      }
    }*/
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite
    width 100%
    height: 100%
    .miste-content-wrapper
      position fixed
      top: 45px
      bottom: 46px
      width: 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0 10px
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px


</style>
