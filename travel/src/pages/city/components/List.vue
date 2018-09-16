<template>
  <div class="list" ref="wrapper">
    <div>
      <div class="area">
        <div class="title border-topbottom">当前城市</div>
        <div class="button-list">
          <div class="button-wrapper">
            <div class="button">
              {{this.city}}
            </div>
          </div>
        </div>
      </div>
      <div class="area">
        <div class="title border-topbottom">热门城市</div>
        <div class="button-list">
          <div class="button-wrapper" v-for="item in hot" :key="item.id" @click="changeCityHandle(item.name)">
            <div class="button">
              {{item.name}}
            </div>
          </div>

        </div>
      </div>
      <div class="area" v-for="(item,index) of cities" :key="index" :ref="index">
        <div class="title border-topbottom">{{index}}</div>
        <div class="item-list">
          <div class="item border-bottom" v-for="innerItem of item" :key="innerItem.id" @click="changeCityHandle(innerItem.name)">
            {{innerItem.name}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'CityList',
  components: {},
  props: {
    cities: Object,
    hot: Array,
    letter: String
  },
  data () {
    return {

    }
  },
  watch: {
    letter () {
      if (this.letter) {
        const element = this.$refs[this.letter][0] // 获取dom
        this.scroll.scrollToElement(element) // 滚动到指定dom
      }
    }
  },
  computed: {
    ...mapState(['city'])
  },
  methods: {
    changeCityHandle (city) {
      this.changeCity(city)
      this.$router.push('/')
    },
    ...mapMutations(['changeCity'])
  },
  created () {},
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper)
  }
}
</script>
<style lang="stylus" scoped>
  .border-topbottom
    &:before
      border-color #cccccc
    &:after
      border-color #cccccc
  .border-bottom
    &:before
      border-color #cccccc
  .list
    position absolute
    top 1.78rem
    left 0
    bottom 0
    right 0
    overflow hidden
    .title
      line-height .54rem
      background #eeeeee
      padding-left .2rem
      color #666
      font-size .26rem
    .button-list
      overflow hidden
      padding .1rem .6rem .1rem .1rem
      .button-wrapper
        width 33.33%
        float left
        .button
          text-align center
          padding .1rem 0
          margin .1rem
          border .02rem solid #cccccc
          border-radius .06rem
    .item-list
      .item
        line-height .76rem
        padding-left .2rem

</style>
