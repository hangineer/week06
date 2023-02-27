<template>
    <h3>這是後台頁面</h3>
    <router-link to="/">回前台首頁</router-link> |
    <router-link to="/admin/products">後台產品列表</router-link> |
    <router-link to="/admin/orders">後台訂單列表</router-link> |
    <a href="#" @click.prevent="logout">登出</a>
    <hr>
    <RouterView></RouterView>
</template>
<script>
import { RouterView } from 'vue-router'
import Swal from 'sweetalert2'
const { VITE_APP_URL } = import.meta.env

export default {
  components: {
    RouterView
  },
  methods: {
    logout () {
      // 清除cookie
      document.cookie = `adminToken =; expired = ${new Date()};`
      Swal.fire({
        icon: 'success',
        title: '登出成功',
        showConfirmButton: true,
        timer: 2000
      })
      this.$router.push('/login')
    },
    async checkIsAdmin () {
      await this.$http.post(`${VITE_APP_URL}/api/user/check`)
        .then(res => {
          if (!res.data.success) {
            Swal.fire({
              icon: 'error',
              title: '登入及驗證失敗',
              showConfirmButton: true,
              timer: 1000
            })
            this.$router.push('/login')
          } else {
            Swal.fire({
              icon: 'success',
              title: '登入及驗證成功',
              showConfirmButton: true,
              timer: 1000
            })
          }
        })
    }
  },
  mounted () {
    // 讀取
    const adminToken = document.cookie.replace(/(?:(?:^|.*;\s*)adminToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = adminToken
    this.checkIsAdmin()
  }
}
</script>
