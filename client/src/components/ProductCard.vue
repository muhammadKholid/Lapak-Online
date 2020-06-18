<template>
  <div class="col-3">
    <div class="card text-left">
      <img :src="items.image_url" alt="product" class="w-100" />
      <div class="card-body">
        <h4 class="card-title" @click.prevent="fetchOneProduct">
          <router-link :to="{ name: 'Product', params: { id: items.id } }">
            {{ items.name }}
          </router-link>
        </h4>
        <strong>{{ formatRupiah(items.price) }}</strong>
        <p class="card-text">{{ new Date(items.createdAt).toString().slice(0, 15) }}</p>
        <div>
          <button class="btn btn-secondary" @click.prevent="addToCart">Tambah ke kranjang</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
export default {
  name: 'ProductCard',
  props: ['items'],
  methods: {
    formatRupiah(angka) {
      let reverse = angka
        .toString()
        .split('')
        .reverse()
        .join('');
      let ribuan = reverse.match(/\d{1,3}/g);
      let rupiah = ribuan
        .join('.')
        .split('')
        .reverse()
        .join('');
      return 'Rp. ' + rupiah;
    },
    addToCart() {
      let token = localStorage.getItem('token');
      if (token) {
        let instance = this;
        this.$store.dispatch('addProductToCart', { product: instance.items, qty: 1 });
        this.$store.dispatch('getAllCart')
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Please login first.',
        });
      }
    },
    fetchOneProduct() {
      let instance = this;
      this.$store.dispatch('getProduct', instance.items.id );
    },
  },
};
</script>
