<template>
  <div>
    <div class="mt-5" v-if="carts.length < 1">
      <h2>Your shopping cart still empty! Go grab your item now!</h2>
      <img src="https://image.freepik.com/free-vector/bear-vector-polar-bear-heart-valentine-cartoon-shopping-cart_71328-109.jpg" alt="bear">
    </div>
      <p style="color: red;">{{error}}</p>
    <cItem v-for="cart in carts" :key="cart._id" :datacart="cart"/>
  </div>
</template>

<script>
import cItem from "@/components/cartItem.vue";
import ax from "@/axiosApi.js";

export default {
  name: "cart",
  components: {
    cItem
  },
  data(){
      return {
          carts : [],
          error: ''
      }
  },
  created() {
    ax.get("/products/carts")
      .then(({ data }) => {
        this.carts = data;
        console.log(this.carts,'999');
        
      })
      .catch(err => {
          console.log(err);
          this.error= err.response.data.message.message
        // this.error.product = `Cannot load data! ${err.response.data.message}`;
      });
  }
};
</script>

<style>

</style>
