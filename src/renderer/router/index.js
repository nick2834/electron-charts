import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'layout',
      meta: {
        title: "Gl路径"
      },
      component: require('@/views/index').default
    },
    {
      path: '/index2',
      name: 'index2',
      meta: {
        title: "Gl路径2"
      },
      component: require('@/views/index2').default
    },
    {
      path: '*',
      redirect: '/',
      hidden: true
    }
  ],
  linkActiveClass: 'isActive'
})