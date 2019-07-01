<template>
  <div>
    <div>
      <b-card :img-src="datacart.product_id.picture" img-alt="Card image" img-right class="gambar">
        <b-card-text>
          <h5>{{datacart.product_id.name}}<b-badge v-show="datacart.count > 0">{{datacart.count}}</b-badge></h5>
          Rp {{datacart.product_id.price}},-
          <b-button @click="removeCart(datacart._id)" variant="primary">remove</b-button>
        </b-card-text>
      </b-card>
    </div>
  </div>
</template>

<script>
import ax from "@/axiosApi.js";

export default {
  name: "cartitem",
  props: ["datacart"],
  methods: {
    removeCart(id) {
      const Toast = this.$swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000
      });
      ax.delete(`/products/carts/${id}`)
        .then(({ data }) => {
          Toast.fire({
            type: "success",
            title: "successfully remove cart"
          });
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
.gambar img {
  width: 6rem;
  height: 6rem;
}

.gambar {
  text-align: left;
}
</style>
