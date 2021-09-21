import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: JSON.parse(localStorage.getItem('fakeToken')) || false,
    user: JSON.parse(localStorage.getItem('fakeUser')) || {name: 'Guest'},
    contacts: JSON.parse(localStorage.getItem('fakeContacts')) || {},
  },
  mutations: {
    SET_LOGIN(state, bool) {
      localStorage.setItem('fakeToken', bool);
      state.loggedIn = JSON.parse(localStorage.getItem('fakeToken'));
    },
    SET_USER(state, payload) {
      localStorage.setItem('fakeUser', bool);
      state.user = JSON.parse(localStorage.getItem('fakeUser'));
    },
    CLEAR_ALL() {
      localStorage.clear();
    },
  },
  actions: {
    LOGIN({ commit }, payload) {
      commit('SET_USER', JSON.stringify(payload));
      commit('SET_LOGIN', true);
    },
    LOGOUT({ commit }) {
      commit('CLEAR_ALL');
    },
  }
})
