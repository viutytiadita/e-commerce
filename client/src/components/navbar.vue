<template>
  <div class="container-fluid">
    <div id="nav">
      <b-navbar type="dark" variant="light">
        <b-navbar-nav>
          <b-nav-item><router-link to="/">Gravity Fall</router-link></b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto"> 
          <b-nav-item><router-link v-show="!logintype" to="/register">Sign Up</router-link></b-nav-item>
          <b-nav-item><router-link v-show="!logintype" to="/login">Sign In</router-link></b-nav-item>
          <b-nav-item v-show="logintype" @click="logout">Logout</b-nav-item>
          
        </b-navbar-nav>
      </b-navbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logintype: localStorage.token
    };
  },
  methods:{
    logout(){
      const Toast = this.$swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000
      });
      localStorage.clear()
      Toast.fire({
          type: "success",
          title: "you are successfully logout!"
        });
         this.$router.push('/login')
    }
  }
};
</script>

<style>
</style>
