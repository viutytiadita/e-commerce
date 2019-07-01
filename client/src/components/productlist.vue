<template>
  <div>
    <p>{{error.product}}</p>
    <addingProduct v-show="roletype == 'admin'" />
    <div class="container">
      <div class="row">
        <div class="col-md-12 d-flex m-3">
          <pItem v-for="product in products" :key="product._id" :dataitem="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pItem from "@/components/productitem.vue";
import addingProduct from "@/components/addingproduct.vue";
import ax from "@/axiosApi.js";

export default {
  name: "allList",
  components: {
    pItem,
    addingProduct
  },
  data() {
    return {
      products: [],
      error: {
        product: ""
      },
      roletype: localStorage.role,
    };
  },
  created() {
    ax.get("/products")
      .then(({ data }) => {
        this.products = data;
      })
      .catch(err => {
        this.error.product = `Cannot load data! ${err.response.data.message}`;
      });
  },
  methods: {}
};
</script>

<style>
</style>
