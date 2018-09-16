<template>
  <div class="list">
    <div class="item"
    v-for="item of letters"
    :key="item"
    @click="handleLetterClick"
    @touchstart.prevent = "handleTouchStart"
    @touchmove = "handleTouchMove"
    @touchend = "handleTouchEnd"
    :ref="item"
    >
      {{item}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CityAlphabet',
  components: {},
  props: {
    cities: {}
  },
  data () {
    return {
      touchStatus: false,
      startY: 0,
      timmer: null
    }
  },
  watch: {},
  computed: {
    letters () {
      const letters = []
      for (let i in this.cities) {
        letters.push(i)
      }
      return letters // ['A','B']
    }
  },
  methods: {
    handleLetterClick (e) {
      this.$emit('change', e.target.innerText)
    },
    handleTouchStart () {
      this.touchStatus = true
    },
    handleTouchMove (e) {
      if (this.touchStatus) {
        if (this.timmer) {
          clearTimeout(this.timmer)
        }
        this.timmer = setTimeout(() => {
          const touchY = e.touches[0].clientY - 89
          const index = Math.floor((touchY - this.startY) / 20) // 计算出滑动的位置 20每个字母的高度
          // console.log(this.letters[index])
          // index 在这个区间内 就传递给父组件
          if (index >= 0 && index < this.letters.length) {
            this.$emit('change', this.letters[index])
          }
        }, 16)
      }
    },
    handleTouchEnd () {
      this.touchStatus = false
    }
  },
  created () {},
  updated () {
    this.startY = this.$refs['A'][0].offsetTop
  },
  mounted () {}
}
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl'
  .list
    display flex
    flex-direction column
    justify-content center
    position absolute
    top 1.78rem
    right 0
    bottom 0
    width .4rem
    .item
      line-height .4rem
      text-align center
      color $bgColor

</style>
