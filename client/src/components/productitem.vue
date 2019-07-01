<template>
  <div>
    <b-card
      :title="dataitem.name"
      :img-src="dataitem.picture"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 15rem;"
      class="mb-2"
    >
      <b-card-text>
        <p>Rp {{dataitem.price}},-</p>
        <small>{{dataitem.stock}} pcs</small>
      </b-card-text>

      <b-button v-show="roletype == 'customer'" variant="primary" @click="addtoCart(dataitem)">Add To Cart</b-button>
      <b-button v-show="roletype == 'admin'" @click="deleteProduct(dataitem._id)">delete</b-button>
      <b-button v-show="roletype == 'admin'" v-b-modal.modal-prevent-closing-edit>edit</b-button>
    </b-card>

    <b-modal
      id="modal-prevent-closing-edit"
      ref="modal"
      title="Edit Product"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk(dataitem._id)"
    >
      <form @submit.prevent="editProduct(dataitem._id)">
        <b-form-group
          :state="nameState"
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
        >
          <b-form-input
            id="name-input"
            v-model="dataproduct.name"
            :state="nameState"
            :value="dataitem.name"
            autocomplete="off"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          :state="nameState"
          label="Price"
          label-for="price-input"
          invalid-feedback="price is required"
        >
          <b-form-input
            id="price-input"
            v-model="dataproduct.price"
            type="number"
            :value="dataitem.price"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          :state="nameState"
          label="Stock"
          label-for="stock-input"
          invalid-feedback="stock is required"
        >
          <b-form-input
            id="stock-input"
            v-model="dataproduct.stock"
            type="number"
            :value="dataitem.stock"
            required
          ></b-form-input>
        </b-form-group>

        <picture-input
          ref="pictureInput"
          @change="onChange"
          width="300"
          height="300"
          margin="16"
          accept="image/jpeg, image/png"
          size="10"
          buttonClass="btn"
          :customStrings="{
        upload: '<h1>Bummer!</h1>',
        drag: 'Drag a 😺 GIF or GTFO'
      }"
        ></picture-input>
      </form>
    </b-modal>
  </div>
</template>

<script>
import PictureInput from "vue-picture-input";
import ax from "@/axiosApi.js";

export default {
  name: "item",
  props: ["dataitem"],
  components: {
    PictureInput
  },
  data() {
    return {
      dataproduct: {
        name: "",
        price: "",
        stock: ""
      },
      roletype: localStorage.role,
      nameState: null
    };
  },
  methods: {
    addtoCart(product) {
      const Toast = this.$swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000
      });
      if (product.stock <= 0) {
        Toast.fire({
          type: "error",
          title: "stock is empty, cannot add to cart"
        });
      } else {
        ax.patch(`/products/${product._id}`, { stock: product.stock })
          .then(({ data }) => {
            ax.get(`/products/carts/${product._id}`).then(({ data }) => {
              if (data) {
                ax.patch(`/products/carts/${data._id}`, {
                  count: data.count
                }).then(({ data }) => {
                  console.log(data);
                  Toast.fire({
                    type: "success",
                    title: "successfully add to cart"
                  });
                });
              } else {
                ax.post("/products/carts", {
                  product_id: product._id
                })
                  .then(response => {
                    console.log(response.data, "addcart");
                    Toast.fire({
                      type: "success",
                      title: "successfully add to cart"
                    });
                  })
                  .catch(err => {
                    console.log(err);
                  });
              }
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    deleteProduct(id) {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        })
        .then(result => {
          if (result.value) {
            ax.delete(`/products//${id}`)
              .then(({ data }) => {
                this.$swal.fire(
                  "Deleted!",
                  "one product has been deleted.",
                  "success"
                );
              })
              .catch(err => {
                console.log(err);
              });
          }
        });
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
    },
    handleOk(id) {
      // Trigger submit handler
      this.editProduct(id);
    },
    editProduct(id) {
      const Toast = this.$swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000
      });

      let newImage = new FormData();
      newImage.append("image", this.$refs.pictureInput.file);
      newImage.append("name", this.dataproduct.name);
      newImage.append("price", this.dataproduct.price);
      newImage.append("stock", this.dataproduct.stock);

      ax.put(`/products//${id}`, newImage)
        .then(({ data }) => {
          Toast.fire({
            type: "success",
            title: "successfully editted"
          });
        })
        .catch(err => {
          console.log(err);
        });

      this.$nextTick(() => {
        this.$refs.modal.hide();
      });
    },
    onChange(image) {
      console.log("New picture selected!");
      if (image) {
        console.log("Picture loaded.");
        this.image = image;
      } else {
        console.log("FileReader API not supported: use the <form>, Luke!");
      }
    }
  }
};
</script>

<style>
img {
  height: 15rem;
}
</style>
