import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
Vue.use(Vuex)
export default new Vuex.Store({
  state,
  // dispath action
  // actions: {
  //   changeCity (ctx, city) {
  //     ctx.commit('changeCity', city)
  //   }
  // },
  // commit
  mutations,
  // 相当于计算属性
  getters: {
    doubleCity () {
      return state.city + ' ' + state.city
    }

  }
})
