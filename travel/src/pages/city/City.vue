<template>
  <div>
    <city-header></city-header>
    <city-search :cities = "cities"></city-search>
    <city-list :cities = "cities" :hot="hotCities" :letter = "letter"></city-list>
    <city-alphaber :cities = "cities" @change = "handelLetterChange"></city-alphaber>
  </div>
</template>

<script>
import axios from 'axios'
import CityHeader from './components/Header'
import CitySearch from './components/Search'
import CityList from './components/List'
import CityAlphaber from './components/Alphabet'
export default {
  name: 'City',
  components: {
    CityHeader,
    CitySearch,
    CityList,
    CityAlphaber
  },
  props: {},
  data () {
    return {
      cities: {},
      hotCities: [],
      letter: ''
    }
  },
  watch: {},
  computed: {},
  methods: {
    getCityInfo () {
      axios.get('/api/city.json').then(this.getHandleCityInfoSucc)
    },
    getHandleCityInfoSucc (res) {
      res = res.data
      if (res.ret && res.data) {
        const data = res.data
        this.cities = data.cities
        this.hotCities = data.hotCities
      }
    },
    handelLetterChange (letter) {
      this.letter = letter
    }
  },
  created () {},
  mounted () {
    this.getCityInfo()
  }
}
</script>
<style lang="stylus" scoped>
</style>
