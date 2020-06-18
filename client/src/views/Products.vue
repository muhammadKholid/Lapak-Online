<template>
  <div class="products-page">
    <Navbar></Navbar>
    <div class="title-content mt-3">
      <h2 class="title p-2">Products' List</h2>
    </div>
    <div class="products-list d-flex align-items-stretch flex-wrap mt-4">
      <ProductCard v-for="product in products" :key="product.id" :items="product"></ProductCard>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue';
import Navbar from './Navbar.vue';
import Footer from '../components/Footer.vue'
import { mapState } from 'vuex';
export default {
  name: 'Products',
  components: {
    ProductCard,
    Navbar,
    Footer,
  },
  computed: {
    ...mapState(['products']),
  },
  mounted() {
    this.$store.dispatch('getProducts');
    this.$store.dispatch('getAllCart');
  },
};
</script>
