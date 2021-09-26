import Vue from 'vue'
import VueRouter from 'vue-router'
import defaultRoutes from './routes';

Vue.use(VueRouter)

const router = new VueRouter({
  routes: defaultRoutes
})

router.beforeEach((to, from, next) => {
  const LOGGED_IN = localStorage.getItem('fakeToken');
  if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!LOGGED_IN) {
          next({
              path: '/',
          });
      } else {
          next();
      }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (!LOGGED_IN) {
      next();
    } else {
      next({
        path: '/contacts',
      });
    }
  } else {
    next({
      path: '/',
    });
  }
});

router.afterEach((to, from) => {
  const DEFAULT_TITLE = 'Address Book';
  Vue.nextTick(() => {
      document.title = `${to.meta.title} | ${DEFAULT_TITLE}` || DEFAULT_TITLE;
  });
});

export default router
