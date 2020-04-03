import Vue from 'vue'
import routes from './routes'
import store from './store'

const app = new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      const matchingView = routes[this.currentRoute]
      return matchingView
        ? require('./pages/' + matchingView + '.vue')
        : require('./pages/404.vue')
    }
  },
  render (h) {
    return h(this.ViewComponent)
  }
})

window.addEventListener('popstate', () => {
  // HTML5������������ؼ������ˡ���һҳ�¼�
  app.currentRoute = window.location.pathname
  console.log(app.currentRoute)
})
