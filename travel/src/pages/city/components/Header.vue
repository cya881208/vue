<template>
  <div class="header">城市选择
    <router-link to="/">
      <div class="iconfont back-icon">&#xe624;</div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'CityHeader',
  components: {},
  props: {},
  data () {
    return {
    }
  },
  watch: {},
  computed: {},
  methods: {},
  created () {},
  mounted () {}
}
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl'
  .header
    position relative
    text-align  center
    height $headerHeight
    line-height  $headerHeight
    overflow hidden
    color #ffffff
    background $bgColor
    .back-icon
      position absolute
      top 0
      left 0
      font-size .4rem
      width .64rem
      text-align center
      color #ffffff
</style>
