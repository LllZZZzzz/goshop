<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleShow">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight: totalCount}">
              <i class="iconfont icon-shopping_cart" :class="{highlight:totalCount}"></i>
            </div>
            <div class="num" v-if="totalCount">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight:totalCount}">￥{{totalPrice}}</div>
          <div class="desc">配送费￥{{shopInfo.deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click="pay">
          <div class="pay" :class="payClass">
            {{payText}}
          </div>
        </div>
      </div>
      <transition name="swipe">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="clearCart">清空</span>
<!--            <Button type="default" style="float: right" @click.native="clearCart">清空</Button>-->
          </div>
          <div class="list-content" ref="foods">
            <ul>
              <li class="food" v-for="(food, index) in cartFoods" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price"><span>￥{{food.price}}</span></div>
                <div class="cartcontrol-wrapper">
                  <cart-control :food="food" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="toggleShow"></div>
    </transition>
  </div>
</template>

<script>
  import { MessageBox,Toast ,Button} from 'mint-ui';
  import BScroll from 'better-scroll'
  import {mapState, mapGetters} from 'vuex'
  import CartControl from '../CartControl/CartControl.vue'
  export default {
    data () {
      return {
        isShow: false,
/*        balls: [
          {isShow: false},
          {isShow: false},
          {isShow: false},
          {isShow: false},
          {isShow: false}
        ],
        droppingBalls: [] // 保存所有正在显示的ball*/
      }
    },
    methods: {
      toggleShow () {
        /*必须在有东西的时候才能显示*/
        if(this.totalCount) {
          this.isShow = !this.isShow
        }
      },
      clearCart () {
        MessageBox.confirm('确定清空购物车吗?').then(
          action => {
            this.$store.dispatch('clearCart')
            /*Toast({
              message: '清除成功啦!!!',
              position: 'middle',
              duration: 1000
            })*/
          },
          () => {
            console.log('点击了取消')
          }
        )
      },
      pay () {
        const {totalPrice} = this
        const {minPrice} = this.info
        if(totalPrice>=minPrice) {
          Toast(`需要支付${totalPrice}元`)
        }
      }
    },
    computed: {
      ...mapState(['shopInfo', 'cartFoods']),
/*      ...mapGetters(['totalCount', 'totalPrice']),*/
      payClass() {
        const {totalPrice} = this;
        console.log(totalPrice)
        const {minPrice} = this.shopInfo;
        return totalPrice >= minPrice ? 'enough' : 'not-enough'
      },
      payText() {
        const {totalPrice} = this
        const {minPrice} = this.shopInfo
        if (totalPrice === 0) {
          return `￥${minPrice}元起送`
        } else if (totalPrice < minPrice) {
          return `还差￥${minPrice - totalPrice}元起送`
        } else {
          return '去结算'
        }
      },
      listShow() {
        /*列表显示的条件是isShow==true 并且购物车有东西*/
        if (this.cartFoods.length === 0) {
          // 一旦数量变为0时, 设置isShow为false
          this.isShow = false
          return false
        }
        if (this.isShow) {
          this.$nextTick(() => {
            /*单例: 只有一个实例
            实现:
                1. 在创建之前: 判断只有不存在时才创建
                2. 在创建之后: 保存*/
            if (!this.scroll) {
              /*单利，保证只创建一个滚动条*/
              this.scroll = new BScroll(this.$refs.foods, {click: true})
            } else {
              /*在滚动条存在后，改变购物车的东西，打开后要刷新滚动条，重新获取高度*/
              this.scroll.refresh() // 刷新滚动
            }
          })
          return true
        }
      },
      totalCount(){
        return this.cartFoods.reduce(((preTotal,food)=> preTotal+food.count),0)
      },
      totalPrice(){
        /*return state.cartFoods.reduce((preTotal,food)=>{
          preTotal+food.count*food.price
        },0)*/
        return this.cartFoods.reduce((preTotal, food) => preTotal + food.count * food.price, 0)
      }
    },
    components: {
      CartControl,
      Button
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"

  .shopcart
    position fixed
    left 0
    bottom 0
    z-index 50
    width 100%
    height 48px
    .content
      display flex
      background #141d27
      font-size 0
      color rgba(255, 255, 255, 0.4)
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          vertical-align top
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          border-radius 50%
          background #141d27
          .logo
            width 100%
            height 100%
            border-radius 50%
            text-align center
            background #2b343c
            &.highlight
              background $green
            .icon-shopping_cart
              line-height 44px
              font-size 24px
              color #80858a
              &.highlight
                color #fff
          .num
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 700
            color #ffffff
            background rgb(240, 20, 20)
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display inline-block
          vertical-align top
          margin-top 5px
          line-height 24px
          padding-right 12px
          box-sizing border-box
          font-size 16px
          font-weight 700
          color #fff
          &.highlight
            color #fff
        .desc
          display inline-block
          vertical-align bottom
          margin-bottom 15px
          margin-left -45px
          font-size 10px
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          height 48px
          line-height 48px
          text-align center
          font-size 12px
          font-weight 700
          color #fff
          &.not-enough
            background #2b333b
          &.enough
            background #00b43c
            color #fff
    .ball-container
      .ball
        position fixed
        left 32px
        bottom 22px
        z-index 200
        transition all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width 16px
          height 16px
          border-radius 50%
          background $green
          transition all 0.4s linear
    .shopcart-list
      position absolute
      left 0
      top 0
      z-index -1
      width 100%
      transform translateY(-100%)
      &.swipe-enter-active, &.swipe-leave-active
        transition transform .3s
      &.swipe-enter, &.swipe-leave-to
        transform translateY(0)
      .list-header
        height 40px
        line-height 40px
        padding 0 18px
        background #f3f5f7
        border-bottom 1px solid rgba(7, 17, 27, 0.1)
        .title
          float left
          font-size 14px
          color rgb(7, 17, 27)
        .empty
          float right
          font-size 12px
          color rgb(0, 160, 220)

      .list-content
        padding 0 18px
        max-height 217px
        overflow hidden
        background #fff
        .food
          position relative
          padding 12px 0
          box-sizing border-box
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height 24px
            font-size 14px
            color rgb(7, 17, 27)
          .price
            position absolute
            right 90px
            bottom 12px
            line-height 24px
            font-size 14px
            font-weight 700
            color rgb(240, 20, 20)
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 6px

  .list-mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 40
    backdrop-filter blur(10px)
    opacity 1
    background rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition all 0.5s
    &.fade-enter, &.fade-leave-to
      opacity 0
      background rgba(7, 17, 27, 0)
</style>
