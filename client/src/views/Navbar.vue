<template>
  <div class="navbar-container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">La-Pol</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/products">Products</a>
          </li>
        </ul>
          <li v-if="!isLogin" class="nav-item">
            <button class="btn btn-dark" type="submit"><a class="nav-link" href="/login">Log In</a></button>
          </li>
          <div v-else class="logout d-flex">
            <a class="nav-link" @click="logout()">Log Out</a>
            <Cart></Cart>
          </div>
      </div>
    </nav>
  </div>
</template>

<script>
import Cart from '../components/Cart.vue';
export default {
  name: 'Navbar',
  components: {
    Cart,
  },
  computed: {
    isLogin(){
      let check = this.$store.state.isLogin
      const token = localStorage.getItem('token')
      if (token){
        return  check = true;
      } else {
        return check = false;
      }
    },
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ path: '/' });
    },
  },
};
</script>
