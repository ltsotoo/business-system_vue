import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/components/layout/Layout.vue'),
    children: [
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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
