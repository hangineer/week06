<template>
    <h3>這是產品頁面</h3>
    <table class="table">
        <tbody>
            <tr v-for="product in products" :key="product.id">
                <td>{{ product.title }}</td>
                <td><img :src="product.imageUrl" :alt="product.title" width="200"></td>
                <td>
                    <RouterLink class="btn btn-outline-secondary" :to="`/product/${product.id}`">查看產品</RouterLink>
                    <button type="button" class="btn btn-outline-primary ms-2" @click="addToCart(product.id)" :disabled="isDisabled">加入購物車</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
// import 要置於const之上
// import axios from 'axios'
import { RouterLink } from 'vue-router'
// 解構
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

export default {
  data () {
    return {
      products: [],
      isDisabled: false
    }
  },
  components: {
    RouterLink
  },
  methods: {
    getProducts () {
      this.$http.get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/products/all`)
        .then(res => {
          this.products = res.data.products
        })
    },
    addToCart (id) {
      const data = {
        product_id: id,
        qty: 1
      }
      this.isDisabled = true
      this.$http.post(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`, { data })
        .then(res => {
          alert(res.data.message)
          this.isDisabled = false
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
