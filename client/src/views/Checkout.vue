<template>
  <div class="checkout justify-content-center">
    <Navbar></Navbar>
    <div class="content-checkout d-flex justify-content-center mt-5">
      <div class="jumbotron w-75">
        <h3 class="display mb-5">Silahkan dicheck kembali belanjaan anda ;)</h3>

        <div class="media mb-5" v-for="item in carts" :key="item.id">
          <img class="w-50 h-25" :src="item.Product.image_url" alt="" srcset="">
          <div class="content ml-4">
            <div class="m-2">
              <h2><strong>{{ item.Product.name }}</strong></h2>
              <br />
              <div class="button">
                <button class="sign" @click="minus(item)">-</button>
                <input type="number" :value="item.qty" />
                <button  class="sign" @click="plus(item)">+</button>
              </div>
              <br /><h4>{{ item.qty }} X {{ formatRupiah(item.Product.price) }}</h4>
              <h4>{{ formatRupiah(item.qty * item.Product.price) }}</h4>
            </div>
            <div class="button mt-5">
              <button type="button" class="btn btn-danger" @click="remove(item)">Delete</button>
            </div>
          </div>
        </div>

      <div class="total ml-2 d-flex justify-content-between align-items-center">
        <h4>Amount of goods: {{ getAllQty }}</h4>
        <h4>Total: {{ formatRupiah(getTotal) }}</h4>
        <a class="btn btn-primary btn-lg" href="#" role="button" @click="checkout">Checkout</a>

      </div>
      </div>
    </div>
  </div>

</template>

<script charset="utf-8">
  import Navbar from './Navbar.vue'
  import Swal from 'sweetalert2'
  import { url } from '../functions/url.js'
  export default{
    name:'Checkout',
  data() {
    return {
      qty: 1,
    };
  },
    components: {
      Navbar,
    },
  computed: {
    carts() {
      return this.$store.state.carts;
    },
    getTotal() {
      let total = 0;
      const cart = this.$store.state.carts;
      for (let i = 0; i < cart.length; i++) {
        total += cart[i].total;
      }
      return total;
    },
    getAllQty(){
      let qtyTotal = 0;
      const cart = this.$store.state.carts
      for(let i = 0; i < cart.length;i++){
        qtyTotal += cart[i].qty
      }
      return qtyTotal;
    }
  },
  created() {
    this.$store.dispatch('getAllCart');
  },
  methods: {
     checkout() {
        Swal.fire({
          title: "Sudah selesai berbelanja?",
          text: "Periksa kembali apakah barang yang dibeli sudah sesuai. ",
          showCancelButton: true,
          reverseButtons: true,
          confirmButtonColor: "#39387a",
          cancelButtonColor: "#d33",
          confirmButtonText: "Check Out",
          cancelButtonText: "Lanjut Belanja"
        })
        .then(result=>{
        if (result.value) {
          fetch(`${url}/cart/all`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              token: localStorage.getItem('token')
            }
          })
          .then(response=>{
            return response.json()
          })
          .then(cleared=>{
          console.log(cleared)
          Swal.fire({
            title: "Thank you for your order",
            text:
              "We are currently proccessing your order and we will email you with the confirmation shortly.",
            icon: "success",
            showConfirmButton: false,
            timer: 4000,
            showClass: {
              popup: "animated fadeInDown faster"
            },
            hideClass: {
              popup: "animated fadeOutUp faster"
            }
          });
          this.$store.dispatch('getAllCart')
          this.$router.push('/');
          })
          .catch(err=>{
            console.log(err)
          })
        }

        })
    },
    remove(item) {
        Swal.fire({
          title: "Hapus barang?",
          text: "Barang ini akan dihapus dari keranjangmu.",
          showCancelButton: true,
          reverseButtons: true,
          confirmButtonColor: "#39387a",
          cancelButtonColor: "#d33",
          confirmButtonText: "Hapus Barang",
          cancelButtonText: "Kembali"
        })
        .then(result=>{
        if (result.value) {
          fetch(`${url}/cart/${item.Product.id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              token: localStorage.getItem('token')
            }
          })
          .then(response=>{
            return response.json()
          })
          .then(removed=>{
          this.$store.dispatch("remove");
          this.$store.dispatch("getAllCart");
          Swal.fire({
            icon: "success",
            title: "Barang berhasil dihapus dari keranjang."
          });
          })
        }
        })
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
    minus(item) {
        let input = {
          qty: Number(item.qty) - 1,
          total: Number(item.total) - Number(item.Product.price),
          ProductId: item.ProductId,
          parameter: "minus"
        };

      fetch(`${url}/cart/${item.id}`, {
            method: 'PUT',
            body: JSON.stringify(input),
            headers: {
              'Content-Type': 'application/json',
              token: localStorage.getItem('token')
            }
          })
          .then(response=>{
            return response.json()
          })
          .then(removed=>{
          console.log(removed);
          this.$store.dispatch("getAllCart");
          })
    },
    plus(item) {
        let input = {
          qty: Number(item.qty) + 1,
          total: Number(item.total) + Number(item.Product.price),
          ProductId: item.ProductId,
          parameter: "plus"
        };
      fetch(`${url}/cart/${item.id}`, {
            method: 'PUT',
            body: JSON.stringify(input),
            headers: {
              'Content-Type': 'application/json',
              token: localStorage.getItem('token')
            }
          })
          .then(response=>{
            return response.json()
          })
          .then(removed=>{
          this.$store.dispatch("getAllCart");
          })

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
  }
  }
</script>
