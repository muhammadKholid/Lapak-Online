<template>
  <div class="home">
    <Navbar></Navbar>
    <HelloWorld></HelloWorld>
    <Preview></Preview>
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import Navbar from './Navbar.vue';
import Preview from '../components/Preview.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
    Navbar,
    Preview,
    Footer,
  },
};
</script>
