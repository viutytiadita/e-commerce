<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-4"></div>
      <div class="col-lg-4 border mt-4">
        <b-form @submit.prevent="login">
          <b-form-group id="input-group-1" label="Email address:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="datauser.email"
              type="email"
              required
              placeholder="Enter email"
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
        <b-button type="submit" variant="primary">Sign Up</b-button>
        </b-form>
      </div>
      <div class="col-lg-4"></div>
    </div>
    
  </div>
</template>

<script>
import ax from '@/axiosApi.js'

export default {
  name: 'Login',
  data () {
    return {
      datauser: {
        email: '',
        password: ''
      },
      error:{
        login: ''
      }
    }
  },
  methods: {
    login () {
      const Toast = this.$swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000
      });
      ax.post('/users/login',{
        email: this.datauser.email,
          password: this.datauser.password
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('role', data.role)
          Toast.fire({
            type: "success",
            title: "successfully login"
          });
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
          this.error.login = err.response.data.message
        })
    }
  }
}
</script>

<style>
</style>
