import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'


import TestBetterScroll from '@/components/test/TestBetterScroll'

Vue.use(Router)

export default new Router({
  //mode:'history',//history，默认为hash
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/test-better-scroll',
      name: 'TestBetterScroll',
      component: TestBetterScroll
    }
  ]
})
