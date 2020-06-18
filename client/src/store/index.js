import Vue from 'vue';
import Vuex from 'vuex';
import { url } from '../functions/url.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    carts: [],
    product: null,
    isLogin: false,
    numberOfCarts: 0,
  },
  mutations: {
    SET_PRODUCTS(state, payload) {
      state.products = payload;
    },
    SET_PRODUCT(state, payload) {
      state.product = payload;
    },
    ADD_TO_CART(state, payload) {
      state.carts = payload;
    },
    ADD_AMOUNT_CART(state, payload) {
      state.numberOfCarts++;
    },
    DELETE_AMOUNT_CART(state, payload) {
      state.numberOfCarts--;
    },
  },
  actions: {
    getProducts({ commit }) {
      fetch(`${url}/products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((datas) => {
          commit('SET_PRODUCTS', datas.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getProduct({ commit }, payload) {
      fetch(`${url}/products/${payload}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          commit('SET_PRODUCT', data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addProductToCart({ commit }, payload) {
      let input = {
        id: payload.product.id,
        total: payload.product.price,
        qty: payload.qty,
      };
      fetch(`${url}/cart`, {
        method: 'POST',
        body: JSON.stringify(input),
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          commit('ADD_TO_CART', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllCart({ commit }) {
      fetch(`${url}/cart`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((datas) => {
          commit('ADD_TO_CART', datas);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    remove({ commit }, payload) {
      commit('DELETE_AMOUNT_CART');
    },
  },
  modules: {},
});
