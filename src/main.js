import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import './plugins/axios'

import Home from './pages/Home'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Home,
      meta: {
        title: 'CRUD | Home'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
