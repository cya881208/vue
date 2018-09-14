<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="cart_decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart($event)">
                <span class="inner icon-remove_circle_outline"></span>
            </div>
        </transition>
        <div class="cart_count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart_add icon-add_circle" @click.stop.prevent="addCart($event)"></div>
    </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  export default {
    name: 'cartcontrol',
    props: {
      food: {
        type: Object
      }
    },
    mounted () {
    },
    methods: {
      addCart (event) {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count ++
        }
        this.$emit('cart', event.target)
      },
      decreaseCart (event) {
        if (!event._constructed) { // 阻止自身派发点击事件
          return
        }
        if (this.food) {
          this.food.count --
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
    .cartcontrol
        font-size:0
        .cart_decrease
            display:inline-block
            padding:6px
            transition:all 0.4s linear
            .inner
                display:inline-block
                font-size:24px
                line-height:24px
                color:rgb(0,160,220)
                transition:all 0.4s linear
            &.move-enter-active
                opacity:1
                transform:translate3d(0,0,0)// 硬件加速，动画更流畅
                .inner
                    transform:rotate(0)
            &.move-enter,&.move-leave-to
                opacity:0
                transform:translate3d(24px,0,0)
                .inner
                    transform:rotate(180deg)
        .cart_count
            display:inline-block
            vertical-align:top
            font-size:10px
            line-height:24px
            padding:6px
            color:rgb(147,153,159)
        .cart_add
            display:inline-block
            padding:6px
            font-size:24px
            line-height:24px
            color:rgb(0,160,220)

</style>