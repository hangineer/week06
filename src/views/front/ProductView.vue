<template>
    <h3>這是單一產品頁面</h3>
    <h4>{{ product.title }}</h4>
    <img :src="product.imageUrl" width="500" :alt="product.title">
</template>
<script>
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

export default {
  data () {
    return {
      product: {}
    }
  },
  methods: {
    getProduct () {
      const { id } = this.$route.params
      this.$http.get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/product/${id}`)
        .then(res => {
          this.product = res.data.product
        //   console.log(res)
        })
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>
