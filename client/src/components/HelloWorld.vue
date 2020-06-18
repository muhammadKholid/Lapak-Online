<template>
  <div class="container w-100 mt-3">
    <div class="hello">
      <div id="carouselExample1" class="carousel slide z-depth-1-half p-1" data-ride="carousel">
        <div class="carousel-inner w-100">
          <div class="carousel-item active">
            <img
              class="d-block w-100"
              src="https://www.ministryofvillas.com/wp-content/uploads/2019/05/bali-denpasar-batik-supplier-2000x1333.jpg"
              alt="First slide"
            />
          </div>
          <div class="carousel-item">
            <img
              class="d-block w-100"
              src="https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1200,h_630,f_auto/w_80,x_15,y_15,g_south_west,l_klook_water/activities/egcwgtehwljeuv0ixddn/BatikMakingClass.jpg"
              alt="Second slide"
            />
          </div>
          <div class="carousel-item">
            <img
              class="d-block w-100"
              src="https://img.jakpost.net/c/2018/10/02/2018_10_02_55300_1538477678._large.jpg"
              alt="Third slide"
            />
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExample1" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExample1" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
