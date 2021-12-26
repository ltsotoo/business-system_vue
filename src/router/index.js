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
        path: 'my',
        component: () => import('@/views/employee/Index.vue'),
        meta: { login_require: true, title: "中研环科-管理系统-我的设置", no: 0 },
      },
      {
        path: 'index',
        component: () => import('@/views/index/Index.vue'),
        meta: { login_require: true, title: "中研环科-管理系统-首页", no: 0 },
      },
      {
        path: 'entryContract',
        component: () => import('@/views/contract/Entry.vue'),
        meta: { login_require: true, title: "中研环科-管理系统-合同录入", no: 0 },
      },
      {
        path: 'myExpense',
        component: () => import('@/views/expense/MyExpense.vue'),
        meta: { login_require: true, title: "中研环科-管理系统-我的报销", no: 1 },
      },
      {
        path: 'contract',
        component: () => import('@/views/contract/Index.vue'),
        meta: { login_require: true, title: "中研环科-管理系统-合同管理", no: 2 },
      },
      {
        path: 'preResearch',
        component: () => import('@/views/preResearch/Index.vue'),
        meta: { login_require: true, title: "中研环科-管理系统-预设计管理", no: 3 },
      },
      {
        path: 'customer',
        component: () => import('@/views/customer/Index.vue'),
        meta: { login_require: true, title: "中研环科-管理系统-客户管理", no: 4 },
      },
      {
        path: 'product',
        component: () => import('@/views/product/Index.vue'),
        meta: { login_require: true, title: "中研环科-管理系统-产品管理", no: 5 },
      },
      {
        path: 'supplier',
        component: () => import('@/views/supplier/Index.vue'),
        meta: { login_require: true, title: "中研环科-管理系统-供应商管理", no: 6 },
      },
      {
        path: 'enterprise',
        component: () => import('@/views/enterprise/Index.vue'),
        meta: { login_require: true, title: "中研环科-管理系统-企业管理", no: 7 },
      },
      {
        path: 'expense',
        component: () => import('@/views/expense/Index.vue'),
        meta: { login_require: true, title: "中研环科-管理系统-财务管理", no: 8 },
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
  document.title = to.meta.title
  if (to.meta.login_require) {
    if (localStorage.getItem("Authorization")) {
      if (to.meta.no > 0) {
        var item = JSON.parse(
          decodeURIComponent(window.atob(localStorage.getItem("urls")))
        );
        var can = false
        for (let i = 0; i < item.length; i++) {
          if (item[i].no == to.meta.no) {
            can = true
            break
          }
        }
        if (can) {
          next()
        } else {
          next('/')
        }
      }
      next()
    } else {
      next('/')
    }
  } else {
    if (to.path == "/login" && localStorage.getItem("Authorization")) {
      next("/index")
    }
    next()
  }
})

export default router
