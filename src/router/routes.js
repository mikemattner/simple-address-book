import Login from '../views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login', 
      layout: 'login',
    },
  }
]

export default routes;