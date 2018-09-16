<template>
    <div class="wrapper">
        <swiper :options="swiperOption" v-if="showSwiper">
          <!-- slides -->
          <swiper-slide v-for="(item,index) in list" :key=index>
            <img class="swiper-img" :src="item.imgUrl" alt="">
          </swiper-slide>

          <!-- Optional controls -->
          <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
export default {
  name: 'HomeSwiper',
  components: {},
  props: {
    list: Array
  },
  data () {
    return {
      swiperOption: {
        loop: true,
        pagination: '.swiper-pagination'
      }
    }
  },
  watch: {},
  computed: {
    showSwiper () {
      return this.list.length
    }
  },
  methods: {},
  created () {},
  mounted () {}
}
</script>
<style lang="stylus" scoped>
  .wrapper >>> .swiper-pagination-bullet-active //穿透
    background: #fff
  .wrapper
    overflow: hidden
    width: 100%
    height: 0
    padding-bottom: 31.25%
    background: #eee
    .swiper-img
      width: 100%
</style>
