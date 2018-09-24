<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{shopInfo.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{shopInfo.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <Star :score="shopInfo.serviceScore" :size="36" />
            <span class="score">{{shopInfo.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <Star :score="shopInfo.foodScore" :size="36" />
            <span class="score">{{shopInfo.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{shopInfo.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <div class="ratingselect" >
        <div class="rating-type border-1px">
      <span class="block positive" :class="{active: selectType===2}" @click="setSelectType(2)">
        {{descs[0]}}<span class="count">{{shopRatings.length}}</span>
      </span>
          <span class="block positive" :class="{active: selectType===0}" @click="setSelectType(0)">
        {{descs[1]}}<span class="count">{{positiveLength}}</span>
      </span>
          <span class="block negative" :class="{active: selectType===1}" @click="setSelectType(1)">
        {{descs[2]}}<span class="count">{{shopRatings.length-positiveLength}}</span>
      </span>
        </div>

        <div class="switch" :class="{on: onlyContent}" @click="toggleOnlyContent">
          <span class="iconfont icon-check_circle"></span>
          <span class="text">只看有内容的评价</span>
        </div>

      </div>
      <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-for="(rating, index) in chooseRatings" :key="index">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <Star :score="rating.score" :size="24" />
                <span class="delivery">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend">
                <span class="iconfont" :class="rating.rateType===0 ? 'icon-thumb_up' : 'icon-thumb_down'"></span>
                <span class="item" v-for="(item, index) in rating.recommend" :key="index">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime | data-format}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  import BScroll from "better-scroll"
  import Star from "../../../components/star/Star"
  import  "../../../filter/moment"
    export default {
        name: "",
      data(){
          return {
            onlyContent:false,
            selectType:2,
            descs:['全部', '满意', '不满意']
          }
      },
      computed:{
        ...mapState(['shopInfo','shopRatings']),
        chooseRatings(){
          let choose=this.shopRatings;
          if(this.onlyContent){
           choose=this.shopRatings.filter((val)=>{
              return val.text
            })
          }
          if(this.selectType!==2){
            return choose.filter((val)=>{
              return val.rateType==this.selectType
            })
          }else {
            return choose
          }
        },
        positiveLength(){
          return this.shopRatings.reduce((preTotal,rating)=>preTotal+(rating.rateType?0:1),0)
        }
      },
      components:{
        Star
      },
      mounted(){
          this.$store.dispatch("getShopRatings",()=>{
              this.$nextTick(function () {
                this.scroll=new BScroll(this.$refs.ratings, {click: true})
              })
          }
          )
      },
      methods:{
        setSelectType(type){
          this.selectType=type
        },
        toggleOnlyContent(){
          this.onlyContent=!this.onlyContent
        }
      }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"

  .ratings
    position: absolute
    top: 195px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    background: #fff
  .ratingselect
    .rating-type
      padding: 18px 0
      margin: 0 18px
      border-1px(rgba(7, 17, 27, 0.1))
      font-size: 0
      .block
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        line-height: 16px
        border-radius: 1px
        font-size: 12px
        color: rgb(77, 85, 93)
        background: rgba(77, 85, 93, 0.2)
        &.active
          background: $green
          color: #fff
        .count
          margin-left: 2px
          font-size: 8px
    .switch
      padding: 12px 18px
      line-height: 24px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      color: rgb(147, 153, 159)
      font-size: 0
      &.on
        .icon-check_circle
          color: $green
      .icon-check_circle
        display: inline-block
        vertical-align: top
        margin-right: 4px
        font-size: 24px
      .text
        display: inline-block
        vertical-align: top
        font-size: 12px
  .overview
    display: flex
    padding: 18px 0
    .overview-left
      flex: 0 0 137px
      padding: 6px 0
      width: 137px
      border-right: 1px solid rgba(7, 17, 27, 0.1)
      text-align: center
      @media only screen and (max-width: 320px)
        flex: 0 0 120px
        width: 120px
      .score
        margin-bottom: 6px
        line-height: 28px
        font-size: 24px
        color: rgb(255, 153, 0)
      .title
        margin-bottom: 8px
        line-height: 12px
        font-size: 12px
        color: rgb(7, 17, 27)
      .rank
        line-height: 10px
        font-size: 10px
        color: rgb(147, 153, 159)
    .overview-right
      flex: 1
      padding: 6px 0 6px 24px
      @media only screen and (max-width: 320px)
        padding-left: 6px
      .score-wrapper
        margin-bottom: 8px
        font-size: 0
        .title
          display: inline-block
          line-height: 18px
          vertical-align: top
          font-size: 12px
          color: rgb(7, 17, 27)
        .star
          display: inline-block
          margin: 0 12px
          vertical-align: top
        .score
          display: inline-block
          line-height: 18px
          vertical-align: top
          font-size: 12px
          color: rgb(255, 153, 0)
      .delivery-wrapper
        font-size: 0
        .title
          line-height: 18px
          font-size: 12px
          color: rgb(7, 17, 27)
        .delivery
          margin-left: 12px
          font-size: 12px
          color: rgb(147, 153, 159)
  .rating-wrapper
    padding: 0 18px
    .rating-item
      display: flex
      padding: 18px 0
      bottom-border-1px(rgba(7, 17, 27, 0.1))
      .avatar
        flex: 0 0 28px
        width: 28px
        margin-right: 12px
        img
          border-radius: 50%
      .content
        position: relative
        flex: 1
        .name
          margin-bottom: 4px
          line-height: 12px
          font-size: 10px
          color: rgb(7, 17, 27)
        .star-wrapper
          margin-bottom: 6px
          font-size: 0
          .star
            display: inline-block
            margin-right: 6px
            vertical-align: top
          .delivery
            display: inline-block
            vertical-align: top
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
        .text
          margin-bottom: 8px
          line-height: 18px
          color: rgb(7, 17, 27)
          font-size: 12px
        .recommend
          line-height: 16px
          font-size: 0
          .icon-thumb_up, .icon-thumb_down, .item
            display: inline-block
            margin: 0 8px 4px 0
            font-size: 9px
          .icon-thumb_up
            color: $yellow
          .icon-thumb_down
            color: rgb(147, 153, 159)

          .item
            padding: 0 6px
            border: 1px solid rgba(7, 17, 27, 0.1)
            border-radius: 1px
            color: rgb(147, 153, 159)
            background: #fff
        .time
          position: absolute
          top: 0
          right: 0
          line-height: 12px
          font-size: 10px
          color: rgb(147, 153, 159)
</style>
