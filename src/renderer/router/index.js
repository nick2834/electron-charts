import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'layout',
      meta: {
        title: "模拟地球",
        icon: "icon-piechart"
      },
      component: require('@/views/index').default
    },
    {
      path: '/heatmap',
      name: 'Heatmap',
      meta: {
        title: "热力图",
        icon: "icon-pointmap"
      },
      component: require('@/views/Heatmap').default
    },
    {
      path: '/bar',
      name: 'Bar',
      meta: {
        title: "柱状图",
        icon: "icon-barchart"
      },
      component: require('@/views/bar').default
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
        title: "全球风力",
        icon: "icon-radarchart"
      },
      component: require('@/views/windgl').default
    },
    {
      path: '/winds',
      name: 'winds',
      meta: {
        title: "全球风力2",
        icon: "icon-radarchart"
      },
      component: require('@/views/winds').default
    },
    {
      path: '/flowgl',
      name: 'Flowgl',
      meta: {
        title: "GL 矢量场图",
        icon: "icon-areachart"
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