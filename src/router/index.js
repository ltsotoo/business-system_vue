import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/base/Login.vue'),
    meta: { login_require: false, title: "中研环科-管理系统-登录" }
  },
  {
    path: '/',
    component: () => import('@/components/layout/Layout.vue'),
    redirect: '/login',
    children: [
      {
        path: 'index',
        component: () => import('@/views/index/Index.vue'),
        meta: { login_require: true, title: "中研环科-管理系统-首页" },
      },
      {
        path: 'my',
        component: () => import('@/views/employee/Index.vue'),
        meta: { login_require: true, title: "中研环科-管理系统-我的" },
      },
      {
        path: 'myExpense',
        component: () => import('@/views/expense/MyExpense.vue'),
        meta: { login_require: true, title: "中研环科-管理系统-我的报销" },
      },
      {
        path: 'contract',
        component: () => import('@/views/contract/Index.vue'),
        meta: { login_require: true, title: "中研环科-合同管理-首页" },
      },
      {
        path: 'customer',
        component: () => import('@/views/customer/Index.vue'),
        meta: { login_require: true, title: "中研环科-客户管理-首页" },
      },
      {
        path: 'product',
        component: () => import('@/views/product/Index.vue'),
        meta: { login_require: true, title: "中研环科-产品管理-首页" },
      },
      {
        path: 'supplier',
        component: () => import('@/views/supplier/Index.vue'),
        meta: { login_require: true, title: "中研环科-供应商管理-首页" },
      },
      {
        path: 'expense',
        component: () => import('@/views/expense/Index.vue'),
        meta: { login_require: true, title: "中研环科-财务管理-首页" },
      },
      {
        path: 'enterprise',
        component: () => import('@/views/enterprise/Index.vue'),
        meta: { login_require: true, title: "中研环科-企业管理-首页" },
      },
      {
        path: 'index/contract/entry',
        component: () => import('@/views/contract/Entry.vue'),
        meta: { login_require: true, title: "中研环科-合同管理-录入" },
      },
      {
        path: 'customer/entry',
        component: () => import('@/views/customer/Entry.vue'),
        meta: { login_require: true, title: "中研环科-客户管理-录入" },
      },
      {
        path: 'myExpense/entry',
        component: () => import('@/views/expense/Entry.vue'),
        meta: { login_require: true, title: "中研环科-我的报销-发起" },
      },

      {
        path: 'preResearch',
        component: () => import('@/views/preResearch/Index.vue'),
        meta: { login_require: true, title: "中研环科-预设计管理" },
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

const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};

router.beforeEach((to, from, next) => {
  if (to.meta.login_require) {
    if (!window.localStorage.getItem("Authorization")) {
      editTitle(to)
      next('/')
    }
    editTitle(to)
    next()
  } else {
    editTitle(to)
    next()
  }
})

function editTitle(to) {
  if (to.meta.title) {
    document.title = to.meta.title
  }
}

export default router
