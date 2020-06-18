import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Products from '../views/Products.vue';
import Checkout from '../views/Checkout.vue';
import Product from '../components/Product.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
  },
  {
    path: '/cart',
    name: 'Checkout',
    component: Checkout,
  },
  {
    path: '/item/:id',
    component: Product,
    name: 'Product',
    props: true,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

const guard = (to, from, next) => {
  const token = localStorage.getItem('token');
  if ((to.name === 'Login' || to.name === 'Register') && token) {
    next({ name: 'Home' });
  } else if (!(to.name === 'Login' || to.name === 'Register' || to.name === 'Home') && !token) {
    next({ name: 'Login' });
  } else {
    next();
  }
};

router.beforeEach(guard);

export default router;
