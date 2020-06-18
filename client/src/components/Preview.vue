<template>
  <div class="container">
    <div class="preview-title my-4">
      <h2 class="title">Barang yang mungkin anda cari?</h2>
    </div>
    <div class="preview-content d-flex align-items-stretch flex-wrap m-5">
      <ProductCard v-for="product in products" :key="product.id" :items="product"></ProductCard>
    </div>
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue';
import { mapState } from 'vuex'
export default {
  name: 'Preview',
  components: {
    ProductCard,
  },
  computed: {
    ...mapState(['products']),
  },
  mounted() {
    this.$store.dispatch('getProducts');
  },
};
</script>
