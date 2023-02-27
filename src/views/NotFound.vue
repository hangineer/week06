<template>
    <h3>這是404頁面</h3>
    <router-link to="/">回到首頁</router-link>
    <RouterView></RouterView>
</template>
<script>
import { RouterView } from 'vue-router'

export default {
  components: {
    RouterView
  }
}
</script>
