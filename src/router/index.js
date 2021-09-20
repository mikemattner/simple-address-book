import Vue from 'vue'
import VueRouter from 'vue-router'
import defaultRoutes from './routes';

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: defaultRoutes
})

export default router
