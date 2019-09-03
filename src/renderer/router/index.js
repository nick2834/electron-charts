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
      path: '/heatmap',
      name: 'Heatmap',
      meta: {
        title: "热力图"
      },
      component: require('@/views/Heatmap').default
    },
    // {
    //   path: '/lines',
    //   name: 'Lines',
    //   meta: {
    //     title: "路径图"
    //   },
    //   component: require('@/views/lines').default
    // },
    {
      path: '/windgl',
      name: 'Windgl',
      meta: {
        title: "全球风力"
      },
      component: require('@/views/windgl').default
    },
    {
      path: '/flowgl',
      name: 'Flowgl',
      meta: {
        title: "GL 矢量场图"
      },
      component: require('@/views/flowgl').default
    },
    {
      path: '*',
      redirect: '/',
      hidden: true
    }
  ],
  linkActiveClass: 'isActive'
})