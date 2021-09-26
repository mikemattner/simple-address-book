import Login from '../views/login/Login.vue';
import Contacts from '../views/contacts/Contacts.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login', 
      layout: 'login',
      guest: true,
    },
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: Contacts,
    meta: {
      title: 'Contacts', 
      layout: 'app',
      requiresAuth: true,
    },
  },
]

export default routes;