import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import Goods from '@/components/goods/goods'
import Ratings from '@/components/ratings/ratings'
import Seller from '@/components/seller/seller'

Vue.use(Router)
Vue.use(Resource)

export default new Router({
  linkActiveClass: 'active',
  // 这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面.
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/goods',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/ratings',
      name: 'Ratings',
      component: Ratings
    },
    {
      path: '/seller',
      name: 'Seller',
      component: Seller
    }
  ]
})
// router.push('Goods');// 相当于应用一进来就显示goods的内容
// router.push方法就是用来动态导航到不同的链接的。它会向history栈添加一个新的记录，点击<router-link :to="...">等同于调用router.push(...)。
