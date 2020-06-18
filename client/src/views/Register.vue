<template>
  <div class="container rounded bg-dark w-25 my-5">
    <div class="title pt-4">
      <h1 class="title text-white">Register</h1>
    </div>
    <div class="form-register">
      <form class="form pb-4">
        <div class="form-group">
          <label for="exampleInputEmail1" class="text-white">Username</label>
          <input
            type="text"
            v-model="name"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
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
          <small id="emailHelp" class="form-text text-muted"
            >It must contain atleast 8 characters including at least 1 uppercase, 1 lowercase and one number.</small
          >
        </div>
        <button type="submit" class="btn btn-primary" @click.prevent="register()">Sign Up</button>
      </form>
    </div>
  </div>
</template>

<script charset="utf-8">
import { url } from '../functions/url.js';
import Swal from 'sweetalert2';
export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      role: 'user',
    };
  },
  methods: {
    register() {
      const user = {
        name: this.name,
        email: this.email,
        password: this.password,
        role: this.role,
      };
      console.log(user);
      fetch(`${url}/register`, {
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
            Swal.fire(`Hai !!`, 'Selamat berbelanja :)');
            localStorage.setItem('token', data.token);
            this.$router.push({ path: '/' });
            this.$store.dispatch('getAllCart');
          }
        });
    },
  },
};
</script>
