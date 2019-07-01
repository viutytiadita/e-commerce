<template>
  <div class="container-fluid border">
    <div class="row">
      <div class="col-lg-8 border">
      <productlist/>

      </div>
      <div class="col-lg-4">
      <cartlist/>

      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import productlist from '@/components/productlist.vue'
import cartlist from '@/components/cartlist.vue'

export default {
  name: 'home',
  components: {
    productlist, cartlist
  }
}
</script>
