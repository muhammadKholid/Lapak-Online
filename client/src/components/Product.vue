<template>
  <div class="product-page">
    <Navbar></Navbar>
    <div class="container row m-5" v-if="!loading">
      <div class="col-4">
        <img :src="getImageUrl()" class="w-100" alt="" srcset="" />
      </div>
      <div class="text-left col-8">
        <h1 class="mb-4">{{ product.name }}</h1>
        <h3 class="harga mb-3">Price: {{ formatRupiah(product.price) }}</h3>
        <p class="mt-3">Stock: {{ product.stock }}</p>

        <div class="button">
          <button class="sign" @click="decrement()">-</button>
          <input type="number" :value="qty" />
          <button  class="sign" @click="increment()">+</button>
        </div>
        <div class="btn-submit">
          <button class="btn btn-primary" @click="addCart">Add to Cart</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../views/Navbar.vue';
import Swal from 'sweetalert2';
export default {
  name: 'Product',
  props: ['id'],
  data() {
    return {
      qty: 1,
      total: 0,
      image: '',
      loading: false,
    };
  },
  components: {
    Navbar,
  },
  computed: {
    product() {
      return this.$store.state.product;
    },
  },
  methods: {
    getImageUrl(){
      return this.image = this.product.image_url;
    },
    addCart() {
      this.loading = true;

      let token = localStorage.getItem('token');
      const hargaTotal = this.formatRupiah(this.qty * this.product.price)
      if (token) {
      if(this.product.stock < this.qty){
       Swal.fire({
            title: "This product is almost out of stock",
            text:
              "Mohon maaf saat in stock barang sudah hampir habis, mohon kurangi jumlah barang dan coba lagi.",
            icon: "waning",
            showConfirmButton: false,
            timer: 3000,
            showClass: {
              popup: "animated fadeInDown faster"
            },
            hideClass: {
              popup: "animated fadeOutUp faster"
            }
          });
      } else {
        Swal.fire({
          title: 'Harga total menjadi:',
          text: hargaTotal,
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Add to cart!'
        }).then((result) => {
          if (result.value) {
            this.loading = false;
            this.$store.dispatch('addProductToCart', { product: this.product, qty: this.qty });
            this.$router.push({ path: '/products' })
          }
        })
      }
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Please login first.',
        });
      }
    },
    increment() {
      this.qty++;
    },
    decrement() {
      if (this.qty === 1) {
        Swal.fire({
          icon: 'warning',
          title: 'Negative quantity not allowed',
        });
      } else {
        this.qty--;
      }
    },
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
  },
};
</script>
<style>
input{
  background-color: #f0ece2;
  border: 0;
  padding: .5rem;
}
.button .sign{
  background-color: #252525;
  color: #f5f5f5;
  width: 3vw;
  padding: .5rem;
  border-style: none;
}
.btn-submit{
  margin-top: 1.5rem;
}
</style>
