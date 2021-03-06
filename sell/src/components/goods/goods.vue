<template>
    <div class="goods">
        <div class="menu_wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item,index) in goods" class="menu_item" :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)">
                    <span class="text border-1px">
                    <span v-show="item.type > 0" class="icon" :class="classMap[item.type] "></span>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods_wrapper" ref="foodWrapper">
            <ul>
                <li v-for="(item,index) in goods" class="menu_item food_list_hood">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li @click="selectFood(food,$event)" v-for="(food,index) in item.foods" class="food_item border-1px">
                            <div class="icon">
                                <img width="57" height="57" :src="food.icon" alt=""/>
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span><span v-show="food.rating">好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">¥{{food.price}}</span><span class="old " v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <v-cartcontrol @cart="getEvent" :food="food"></v-cartcontrol>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <v-shopcart  ref="shopcart" :select-foods = 'selectFoods' :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></v-shopcart>
        <v-food  @cart="getEvent" :food="selectedFood" ref="food"></v-food>
    </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import Shopcart from '@/components/shopcart/shopcart'
  import Cartcontrol from '@/components/cartcontrol/cartcontrol'
  import Food from '@/components/food/food'

  const ERR_OK = 0
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      }
    },
    components: {
      'v-shopcart': Shopcart,
      'v-cartcontrol': Cartcontrol,
      'v-food': Food
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      },
      selectFoods () {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },

    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      this.$http.get('/api/goods').then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.goods = response.data
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
        }
      })
    },
    methods: {
      selectMenu (index, event) { // 点击左侧menu，影响右侧foods，event就是事件对象
        if (!event._constructed) { // _constructed是better-scroll事件对象属性，原生事件没有在这个属性,所以不执行下面的函数,也就是说阻止pc端的点击事件
          return
        }
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food_list_hood')
        let el = foodList[index]
        this.foodScroll.scrollToElement(el, 300)
          // console.log(index)
      },

      selectFood (food, event) {
        if (!event._constructed) {
          return
        }
        this.selectedFood = food
        this.$refs.food.show()
      },

      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true // better-scroll会阻止默认事件，自己派生点击事件,
        })
        this.foodScroll = new BScroll(this.$refs.foodWrapper, {
          click: true,
          probeType: 3
        })
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight () { // 滚动右侧foodScroll，影响左侧menu
        // 获取list
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food_list_hood')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
        // console.log(this.listHeight)
      },

      getEvent (event) {
        // 体验优化,异步执行下落动画
        this.$nextTick(() => {
          this.$refs.shopcart.drop(event)
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
    @import "../../common/stylus/mixin.styl"
    .goods
        display: flex
        position: absolute
        top: 174px
        bottom: 46px
        width: 100%
        overflow: hidden
        .menu_wrapper
            flex: 0 0 80px
            width: 80px
            background: #f3f5f7
            .menu_item
                display: table
                height: 54px
                width: 56px
                padding: 0 12px
                line-height: 14px
                &.current
                    position: relative
                    z-index: 10
                    margin-top: -1px
                    background: #fff
                    font-weight: 700
                    .text
                        border-none()
                .icon
                    display: inline-block
                    vertical-align: top
                    width: 12px
                    height: 12px
                    margin-right: 2px
                    background-size: 12px 12px
                    background-repeat: no-repeat
                    &.decrease
                        bg-image('decrease_3')
                    &.discount
                        bg-image('discount_3')
                    &.guarantee
                        bg-image('guarantee_3')
                    &.invoice
                        bg-image('invoice_3')
                    &.special
                        bg-image('special_3')
                .text
                    display: table-cell
                    width: 56px
                    vertical-align: middle
                    border-1px(rgba(7, 17, 27, 0.1))
                    font-size: 12px
        .foods_wrapper
            flex: 1
            .title
                padding-left: 14px
                height: 26px
                line-height: 26px
                border-left: 2px solid #d9dde1
                font-size: 12px
                color: rgb(147, 153, 159)
                background: #f3f5f7
            .food_item
                display: flex
                margin: 18px
                padding-bottom: 18px
                border-1px(rgba(7, 17, 27, 0.1))
                &:last-child
                    border-none()
                    margin-bottom: 0
                .icon
                    flex: 0 0 57px
                    margin-right: 10px
                .content
                    flex: 1
                    .name
                        margin: 2px 0 8px 0
                        height: 14px
                        line-height: 14px
                        font-size: 14px
                        color: rgb(7, 17, 27)
                    .desc, .extra
                        line-height: 10px
                        font-size: 10px
                        color: rgb(147, 153, 159)
                    .desc
                        line-height: 12px
                        margin-bottom: 8px
                    .extra
                        .count
                            margin-right: 12px
                    .price
                        font-weight: 700
                        line-height: 24px
                        .now
                            margin-right: 8px
                            font-size: 14px
                            color: rgb(240, 20, 20)
                        .old
                            text-decoration: line-through
                            font-size: 10px
                            color: rgb(147, 153, 159)
                    .cartcontrol-wrapper
                        position: absolute
                        right: 0
                        bottom: 12px


</style>