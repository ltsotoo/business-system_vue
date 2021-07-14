import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: () => import('@/views/base/Login.vue'),
  },
  {
    path: '/',
    component: () => import('@/components/layout/Layout.vue'),
    children: [
      {
        path: 'index',
        component: () => import('@/views/base/Index.vue'),
      },
      {
        path: 'contract',
        component: () => import('@/views/contract/Index.vue'),
      },
      {
        path: 'contract/entry',
        component: () => import('@/views/contract/EntryContract.vue'),
      },
      {
        path: 'customer',
        component: () => import('@/views/customer/Index.vue'),
      },
      {
        path: 'customer/entry',
        component: () => import('@/views/customer/EntryCustomer.vue'),
      },
      {
        path: 'product',
        component: () => import('@/views/product/Index.vue'),
      },
      {
        path: 'product/entry',
        component: () => import('@/views/product/EntryProduct.vue'),
      },
    ]
  },
  {
    path: '*',
    redirect: '/index',
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.login) {
    if (!JSON.parse(window.localStorage.getItem("Au"))) {
      next({
        path: '/'
      })
    }
    next()
  }else{
    next()
  }
})

export default router
