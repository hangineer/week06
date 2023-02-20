<template>
    <h3>這是登入頁面</h3>
    <div>
      <div class="container">
        <div class="row justify-content-center">
          <h1 class="h3 mb-3 font-weight-normal">
            請先登入
          </h1>
          <div class="col-8">
            <form id="form" class="form-signin"  @submit.prevent="login">
              <div class="form-floating mb-3">
                <input type="email" class="form-control" id="username"
                  placeholder="name@example.com" v-model="userInfo.username" required autofocus>
                <label for="username">Email address</label>
              </div>
              <div class="form-floating">
                <input type="password" class="form-control" id="password"
                  placeholder="Password" v-model="userInfo.password" required>
                <label for="password">Password</label>
              </div>
              <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
                登入
              </button>
            </form>
        </div>
        </div>
        <p class="mt-5 mb-3 text-muted">
          &copy; 2021~∞ - 六角學院
        </p>
      </div>
    </div>
</template>
<script>
import Swal from 'sweetalert2'
const { VITE_APP_URL } = import.meta.env

export default {
  data () {
    return {
      userInfo: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.$http.post(`${VITE_APP_URL}/admin/signin`, this.userInfo)
        .then(res => {
          const { token, expired } = res.data
          //   寫入
          document.cookie = `adminToken = ${token}; expired = ${new Date(expired)};`
          this.$router.push('/admin/products')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '請確認電子郵件與密碼無誤',
            showConfirmButton: true,
            timer: 3000
          })
          console.dir(err)
          throw (err)
        })
    }
  }
}
</script>
