<template>
    <h3>這是購物車頁面</h3>
    <table class="table align-middle">
          <thead>
            <tr>
              <th></th>
              <th>品名</th>
              <th style="width: 150px">數量/單位</th>
              <th>單價</th>
              <th>小計</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="cart.carts">
              <tr v-for="item in cart.carts" :key="item.id">
                <td>
                  <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.id)"
                    :disabled="loadingStatus.loadingItem === item.id">
                    <i class="fas fa-spinner fa-pulse" v-if="loadingStatus.loadingItem === item.id"></i>
                    x
                  </button>
                </td>
                <td>
                  {{ item.product.title }}
                  <div class="text-success" v-if="item.coupon">
                    已套用優惠券
                  </div>
                </td>
                <td>
                  <div class="input-group input-group-sm">
                    <div class="input-group mb-3">
                      <input v-model.number="item.qty" @blur="updateCart(item)"
                        :disabled="loadingStatus.loadingItem === item.id" min="1" type="number" class="form-control">
                      <span class="input-group-text" id="basic-addon2">{{ item.product.unit }}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div class="mb-3">
                      <span>{{ item.product.price }}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="mb-3">
                    <span class="text-success">{{ item.product.price * item.qty }}</span>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4" class="text-end">總計</td>
              <td class="text-end text-danger">{{ cart.total }}</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total">
              <td colspan="4" class="text-end text-success">折扣價</td>
              <td class="text-end text-success">{{ cart.final_total }}</td>
            </tr>
          </tfoot>
        </table>
</template>
<script>
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

export default {
  data () {
    return {
      loadingStatus: {
        loadingItem: ''
      },
      products: [],
      product: {},
      cart: {}
    }
  },
  methods: {
    getProducts () {
      this.$http.get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/products`).then((response) => {
        this.products = response.data.products
      }).catch((err) => {
        alert(err.response.data.message)
      })
    },
    getProduct (id) {
      this.loadingStatus.loadingItem = id
      this.$http.get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/product/${id}`).then((res) => {
        this.loadingStatus.loadingItem = ''
        this.product = res.data.product
        this.$refs.userProductModal.openModal()
      }).catch((err) => {
        alert(err.res.data.message)
      })
    },
    // 更新購物車
    updateCart (data) {
      this.loadingStatus.loadingItem = data.id
      const cart = {
        product_id: data.product_id,
        qty: data.qty
      }
      this.$http.put(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart/${data.id}`, { data: cart }).then((res) => {
        alert(res.data.message)
        this.loadingStatus.loadingItem = ''
        this.getCart()
      }).catch((err) => {
        alert(err.res.data.message)
        this.loadingStatus.loadingItem = ''
      })
    },
    // 清空購物車內容
    deleteAllCarts () {
      this.$http.delete(`${VITE_APP_URL}/api/${VITE_APP_PATH}/carts`).then((response) => {
        alert(response.data.message)
        this.getCart()
      }).catch((err) => {
        alert(err.response.data.message)
      })
    },
    getCart () {
      this.$http.get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`).then((res) => {
        this.cart = res.data.data
      }).catch((err) => {
        alert(err.res.data.message)
      })
    },
    // 刪除購物車特定品項
    removeCartItem (id) {
      this.loadingStatus.loadingItem = id
      this.$http.delete(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart/${id}`).then((res) => {
        alert(res.data.message)
        this.loadingStatus.loadingItem = ''
        this.getCart()
      }).catch((err) => {
        alert(err.res.data.message)
      })
    }
  },
  mounted () {
    this.getProducts()
    this.getCart()
  }
}

</script>
