<template>
    <transition name="move">
        <div v-show="showFlag" class="food" ref="food">
            <div class="food-content">
                <div class="img-header">
                    <img :src="food.image" alt="">
                    <div class="back" @click="hide">
                        <i class="icon-arrow_lift"></i>
                    </div>
                </div>
                <div class="content">
                    <h1 class="title">
                        {{food.name}}
                    </h1>
                    <div class="detail">
                        <span class="sell-count">月售{{food.sellCount }}份</span>
                        <span class="rating">好评率{{food.rating}}% </span>
                    </div>
                    <div class="price">
                        <span class="now">¥{{food.price}}</span><span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                        <v-cartcontrol @cart="addFood" :food="food"></v-cartcontrol>
                    </div>
                    <transition name="addCartMove">
                        <div class="buy" @click.stop.prevent="addFirst" v-show="!food.count || food.count===0">
                            加入购物车
                        </div>
                    </transition>
                </div>
                <v-split v-show="food.info"></v-split>
                <div class="info" v-show="food.info">
                    <h1 class="title">商品信息</h1>
                    <p class="text">{{food.info}}</p>
                </div>
                <v-split></v-split>
                <div class="rating">
                    <h1 class="title">商品评价</h1>
                    <v-ratingselect @selecttype="setType" @content="setOnlycontent" :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></v-ratingselect>
                    <div class="rating-wrapper">
                        <ul v-show="food.ratings && food.ratings.length">
                            <li v-show="needShow(rating.rateType,rating.text)" v-for="(rating,index) in food.ratings" class="rating-item">
                                <div class="user">
                                    <span class="name">{{rating.username}}</span>
                                    <img width="12" height="12" :src="rating.avatar" alt="">
                                </div>
                                <div class="time">{{rating.rateTime |formatDate}}</div>
                                <p class="text">
                                    <span :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType ===1}"></span>
                                    {{rating.text}}
                                </p>
                            </li>
                        </ul>
                        <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
  import Bscroll from 'better-scroll'
  import Vue from 'vue'
  import Cartcontrol from '@/components/cartcontrol/cartcontrol'
  import Split from '@/components/split/split'
  import Ratingselect from '@/components/ratingselect/ratingselect'
  import {formatDate} from '@/common/js/date'

  const ALL = 2

  export default {
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    components: {
      'v-cartcontrol': Cartcontrol,
      'v-split': Split,
      'v-ratingselect': Ratingselect
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    methods: {
      show () {
        this.showFlag = true
        this.selectType = ALL
        this.onlyContent = true

        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new Bscroll(this.$refs.food, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
      hide () {
        this.showFlag = false
      },
      addFirst (event) { // 添加到购物车
        if (!event._constructed) { // 阻止pc端点击后执行两次
          return
        }
        this.$emit('cart', event.target) // 传输点击的目标元素
        Vue.set(this.food, 'count', 1) // 设置初始值1
      },
      addFood (target) {
        this.$emit('cart', event.target)
      },
      needShow (type, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return type === this.selectType
        }
      },
      setType (type) {
        this.selectType = type
        // 手动刷新better-scroll重新计算页面高度
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      setOnlycontent () {
        this.onlyContent = !this.onlyContent
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
    @import "../../common/stylus/mixin.styl"
    .food
        position: fixed
        left: 0
        top: 0
        bottom: 48px
        z-index: 30 pxz
        width: 100%
        background: #fff
        transition:all 0.3s
        &.move-enter-active
            transform:translate3d(0,0,0)
        &.move-enter,&.move-leave-to
            transform:translate3d(100%,0,0)
        .img-header
            position:relative
            width:100%
            height:0
            padding-top:100%
            img
                position:absolute
                top:0
                left:0
                width:100%
                height:100%
            .back
                position:fixed
                left:0
                top:10px
                .icon-arrow_lift
                    display:block
                    padding:10px
                    font-size:20px
                    color:#fff
        .content
            position:relative
            padding:18px
            .title
                font-size:14px
                line-height:14px
                margin-bottom:8px
                font-weight:700
                color:rgb(7,17,27)
            .detail
                margin-bottom:18px
                line-height:10px
                height:10px
                font-size:10px
                color:rgb(147,153,159)
                .sell-count .rating
                    margin-right:12px
            .price
                line-height:24px
                font-weight:700px
                .now,.old
                    line-height:24px
                    margin-right:0
                .now
                    font-size:14px
                    font-weight:700px
                    color:rgb(240,20,20)
                .old
                    font-size:10px
                    color:rgb(147,153,159)
                    text-decoration:line-through
            .cartcontrol-wrapper
                position:absolute
                right:12px
                bottom:12px
            .buy
                position:absolute
                right:18px
                bottom:18px
                z-index:10
                padding:0 12px
                text-align:center
                line-height:24px
                height:24px
                font-size:10px
                color:#fff
                background:rgb(0,160,220)
                border-radius:12px
                box-sizing:border-box
                transition:all 0.2s
                &.addCartMove-enter-active
                    opacity:1
                &.addCartMove-enter,&.addCartMove-leave-to
                    opacity:0
        .info
            padding:18px
            .title
                line-height:14px
                margin-bottom:16px
                font-size:14px
                font-weight:700
                color:rgb(7,17,27)
            .text
                color:rgb(77,85,93)
                line-height:24px
                font-size:12px
                font-weight:200
                padding:0 8px
        .rating
            padding-top:18px
            .title
                line-height:14px
                margin-left:18px
                font-size:14px
                font-weight:700
                color:rgb(7,17,27)
            .rating-wrapper
                padding: 0 18px
                height: auto
                .rating-item
                    position: relative
                    padding: 16px 0
                    border-1px(rgba(7, 17, 27, 0.1))
                    .user
                        position: absolute
                        right: 0
                        top: 16px
                        line-height: 12px
                        font-size: 0
                        .name
                            display: inline-block
                            margin-right: 6px
                            vertical-align: top
                            font-size: 10px
                            color: rgb(147, 153, 159)
                        .avatar
                            border-radius: 50%
                    .time
                        margin-bottom: 6px
                        line-height: 12px
                        font-size: 10px
                        color: rgb(147, 153, 159)
                    .text
                        line-height: 16px
                        font-size: 12px
                        color: rgb(7, 17, 27)
                        .icon-thumb_up, .icon-thumb_down
                            margin-right: 4px
                            line-height: 16px
                            font-size: 12px
                        .icon-thumb_up
                            color: rgb(0, 160, 220)
                        .icon-thumb_down
                            color: rgb(147, 153, 159)

                .no-rating
                    padding: 16px 0
                    font-size: 12px
                    color: rgb(147, 153, 159)
 </style>