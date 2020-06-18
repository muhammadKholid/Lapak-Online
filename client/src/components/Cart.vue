<template>
  <div class="dropdown mx-2">
          <router-link :to="{ name: 'Checkout' }">
    <button
      class="btn btn-secondary dropdown-toggle"
      type="button"
      id="dropdownMenuButton"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
    Cart
    </button>
          </router-link>
  </div>
</template>

<script charset="utf-8">
export default {
  name: 'Cart',
  data(){
    return{
      loading: false,
      banyakBarang: 0,
    }
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
  mounted(){
    this.$store.dispatch('getAllCart');
  },
  methods: {
    numberOfCarts(){
      this.banyakBarang = this.$store.state.carts.length;
      return this.banyakBarang;
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
  }
};
</script>
