<template>
  <div>
    <b-button v-b-modal.modal-prevent-closing>Add New Product</b-button>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="New Product"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="nameState"
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
        >
          <b-form-input id="name-input" v-model="dataproduct.name" :state="nameState" required></b-form-input>
        </b-form-group>
        <b-form-group
          :state="nameState"
          label="Price"
          label-for="price-input"
          invalid-feedback="price is required"
        >
          <b-form-input id="price-input" v-model="dataproduct.price" type="number" required></b-form-input>
        </b-form-group>
        <b-form-group
          :state="nameState"
          label="Stock"
          label-for="stock-input"
          invalid-feedback="stock is required"
        >
          <b-form-input id="stock-input" v-model="dataproduct.stock" type="number" required></b-form-input>
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
      nameState: null
    };
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid ? "valid" : "invalid";
      return valid;
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      this.addProduct();
      // Hide the modal manually
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
    },
    addProduct() {
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

      ax.post("/products", newImage)
        .then(response => {
          Toast.fire({
            type: "success",
            title: "New Product successfully added"
          });
          console.log(response.data);

          //emit
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>