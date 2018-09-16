<template>
  <div>
    <detai-banner :sightName="sightName" :bannerImg='bannerImg' :gallaryImgs = "gallaryImgs"></detai-banner>
    <detail-header></detail-header>
    <div class="content">
      <detail-list :list = "list"></detail-list>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import DetaiBanner from './components/Banner'
import DetailHeader from './components/Header'
import DetailList from './components/List'
export default {
  name: 'Detail',
  components: {
    DetaiBanner,
    DetailHeader,
    DetailList
  },
  props: {},
  data () {
    return {
      sightName: '',
      bannerImg: '',
      gallaryImgs: [],
      list: []
    }
  },
  watch: {},
  computed: {},
  methods: {
    getDetailInfo () {
      axios.get('/api/detail.json', {
        params: {
          id: this.$route.params.id
        }
      }).then(this.getDetailInfoSucc)
    },
    getDetailInfoSucc (res) {
      res = res.data
      if (res.ret && res.data) {
        const data = res.data
        this.sightName = data.sightName
        this.bannerImg = data.bannerImg
        this.gallaryImgs = data.gallaryImgs
        this.list = data.categoryList
      }
    }
  },
  created () {},
  mounted () {
    this.getDetailInfo()
  }
}
</script>
<style lang="stylus" scoped>
.content
  height 50rem

</style>
