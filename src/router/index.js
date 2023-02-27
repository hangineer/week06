import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/FrontLayout.vue'),
    // 巢狀路由: 共用版型使用，path中不需要加上最前面的斜線
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/front/HomeView.vue')
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../views/front/AboutView.vue')
      },
      {
        path: 'products',
        component: () => import('../views/front/AllProducts.vue')
      },
      {
        path: 'product/:id',
        component: () => import('../views/front/ProductView.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/front/CartView.vue')
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('../views/AdminLayout.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/admin/adminProducts.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/admin/adminOrders.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/front/LoginView.vue')
  },
  // 404頁面
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})
router.beforeEach(async (to, from) => {
  // if (
  //   // make sure the user is authenticated
  //   !isAuthenticated &&
  //   // ❗️ Avoid an infinite redirect
  //   to.path !== 'Login'
  // ) {
  //   // redirect the user to the login page
  //   return { path: '/login' }
  // }
})
export default router
