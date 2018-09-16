<template>
  <div>
    <div class="search">
      <input v-model="keywords" class="search-input" type="text" placeholder="请输入城市名字或拼音">
    </div>
    <div class="search-content" v-show="keywords" ref="search">
      <ul>
        <li class="search-item border-bottom" v-for="item in list" :key="item.id" @click = "changeCityHandle(item.name)">{{item.name}}</li>
      </ul>
      <ul>
        <li class="search-item border-bottom" v-show="hasNoData">没有匹配数据</li>
      </ul>
    </div>
  </div>

</template>

<script>
import Bscroll from 'better-scroll'
import {mapMutations} from 'vuex'
export default {
  name: 'CitySearch',
  components: {},
  props: {
    cities: Object
  },
  data () {
    return {
      keywords: '',
      timer: null,
      list: []
    }
  },
  watch: {
    keywords () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      if (!this.keywords) {
        this.list = []
        return
      }
      // 防止频率过快
      this.timer = setTimeout(() => {
        const result = []
        for (let i in this.cities) {
          this.cities[i].forEach(value => {
            if (value.spell.indexOf(this.keywords) > -1 || value.name.indexOf(this.keywords) > -1) {
              result.push(value)
            }
          })
        }
        this.list = result
      }, 100)
    }
  },
  computed: {
    hasNoData () {
      return !this.list.length
    }
  },
  methods: {
    changeCityHandle (city) {
      this.changeCity(city)
      this.$router.push('/') // 路由两种跳转<reoute-link $route.push>
    },
    ...mapMutations(['changeCity']) // 改变vuex 数据
  },
  created () {},
  mounted () {
    this.scroll = new Bscroll(this.$refs.search)
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl'
  .search
    height .72rem
    padding .1rem
    background $bgColor
    .search-input
      box-sizing border-box
      width 100%
      height .62rem
      padding 0 .1rem
      line-height .62rem
      text-align center
      color #666666
      border-radius .06rem
  .search-content
    z-index 1
    overflow hidden
    position absolute
    top 1.68rem
    left 0
    bottom 0
    right 0
    background #eeeeee
    .search-item
      line-height .62rem
      padding-left .2rem
      background #ffffff
      color #666666

</style>
