<template>
  <div class="container rounded bg-dark w-25 my-5">
    <div class="title pt-4">
      <h1 class="title text-white">Login</h1>
    </div>
    <div class="form-login">
      <form class="form pb-4">
        <div class="form-group">
          <label for="exampleInputEmail1" class="text-white">Email address</label>
          <input
            type="email"
            v-model="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <small id="emailHelp" class="form-text text-muted"
            >We'll never share your email with anyone else.</small
          >
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1" class="text-white">Password</label>
          <input
            type="password"
            v-model="password"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" class="btn btn-primary" @click.prevent="login()">Sign In</button>
        <p class="text-white">Don't have an account? <a href="/register">Sign up here!</a></p>
      </form>
    </div>
  </div>
</template>

<script charset="utf-8">
import { url } from '../functions/url.js';
import Swal from 'sweetalert2';
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      const user = {
        email: this.email,
        password: this.password,
      };
      console.log(user);
      fetch(`${url}/login`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.message == "Cannot read property 'role' of null") {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: data.message,
              footer: '<a href>Why do I have this issue?</a>',
            });
          } else {
            Swal.fire('Login!', 'success');
            localStorage.setItem('token', data.token);
            this.$router.push({ path: '/products' });
            this.$store.dispatch('getAllCart');
          }
        });
    },
  },
};
</script>
