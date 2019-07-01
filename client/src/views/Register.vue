<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-4"></div>
      <div class="col-lg-4 border formRegis">
        <b-form @submit="register" @reset="onReset" v-if="show">
          <b-form-group id="input-group-1" label="Email address:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="datauser.email"
              type="email"
              required
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="datauser.username"
              required
              placeholder="Enter name"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-2" label="Your Password:" label-for="input-23">
            <b-form-input
              type="password"
              v-model="datauser.password"
              required
              placeholder="Enter password"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-3" label="Role:" label-for="input-3">
            <b-form-select id="input-3" v-model="datauser.role" :options="roles" required></b-form-select>
          </b-form-group>

          <b-button type="submit" variant="primary">Sign Up</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </div>
      <div class="col-lg-4"></div>
    </div>
  </div>
</template>

<script>
import ax from "@/axiosApi.js";

export default {
  name: "register",
  data() {
    return {
      datauser: {
        email: "",
        password: "",
        username: "",
        role: ""
      },
      error: {
        register: ""
      },
      roles: [{ text: "Your role", value: null }, "customer", "admin"],
      show: true
    };
  },
  methods: {
    register() {
      const Toast = this.$swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000
      });
      ax.post("users/register", {
        email: this.datauser.email,
        password: this.datauser.password,
        username: this.datauser.username,
        role: this.datauser.role
      })
        .then(response => {
          Toast.fire({
            type: "success",
            title: "successfully sign up"
          });
          console.log(response.data);
          this.$router.push('/login')
        })
        .catch(err => {
          console.log(err);
          this.error.register = err.response.data.message;
        });
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.datauser.email = "";
      this.datauser.username = "";
      this.datauser.password = "";
      this.datauser.role = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>

<style>
.formRegis {
  margin-top: 2rem;
}
</style>

