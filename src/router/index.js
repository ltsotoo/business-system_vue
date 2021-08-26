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
        component: () => import('@/views/base/Index.vue'),
        meta: { login_require: true, title: "中研环科-管理系统-首页" },
      },
      {
        path: 'my',
        component: () => import('@/views/employee/Index.vue'),
        meta: { login_require: true, title: "中研环科-管理系统-我的" },
      },
      {
        path: 'contract',
        component: () => import('@/views/contract/Index.vue'),
        meta: { login_require: true, title: "中研环科-合同管理-首页" },
      },
      {
        path: 'contract/entry',
        component: () => import('@/views/contract/Entry.vue'),
        meta: { login_require: true, title: "中研环科-合同管理-录入" },
      },
      {
        path: 'customer',
        component: () => import('@/views/customer/Index.vue'),
        meta: { login_require: true, title: "中研环科-客户管理-首页" },
      },
      {
        path: 'customer/entry',
        component: () => import('@/views/customer/Entry.vue'),
        meta: { login_require: true, title: "中研环科-客户管理-录入" },
      },
      {
        path: 'product',
        component: () => import('@/views/product/Index.vue'),
        meta: { login_require: true, title: "中研环科-产品管理-首页" },
      },
      {
        path: 'product/entry',
        component: () => import('@/views/product/Entry.vue'),
        meta: { login_require: true, title: "中研环科-产品管理-录入" },
      },
      {
        path: 'supplier',
        component: () => import('@/views/supplier/Index.vue'),
        meta: { login_require: true, title: "中研环科-供应商管理-首页" },
      },
      {
        path: 'supplier/entry',
        component: () => import('@/views/supplier/Entry.vue'),
        meta: { login_require: true, title: "中研环科-供应商管理-录入" },
      },
      {
        path: 'enterprise',
        component: () => import('@/views/enterprise/Index.vue'),
        meta: { login_require: true, title: "中研环科-企业管理-首页" },
        children: [
          {
            path: 'area',
            component: () => import('@/views/enterprise/AreaSetting.vue'),
            meta: { login_require: true, title: "中研环科-企业管理-地区管理" },
          },
          {
            path: 'office',
            component: () => import('@/views/enterprise/OfficeSetting.vue'),
            meta: { login_require: true, title: "中研环科-企业管理-办事处管理" },
          },
          {
            path: 'department',
            component: () => import('@/views/enterprise/DepartmentSetting.vue'),
            meta: { login_require: true, title: "中研环科-企业管理-部门管理" },
          },
          {
            path: 'employee',
            component: () => import('@/views/enterprise/EmployeeSetting.vue'),
            meta: { login_require: true, title: "中研环科-企业管理-员工管理" },
          },
        ]
      },
      {
        path: 'system',
        component: () => import('@/views/system/Index.vue'),
        meta: { login_require: true, title: "中研环科-系统设置-首页" },
        children: [
          {
            path: 'contract',
            component: () => import('@/views/system/ContractSetting.vue'),
            meta: { login_require: true, title: "中研环科-系统设置-合同设置" },
          },
          {
            path: 'product',
            component: () => import('@/views/system/ProductSetting.vue'),
            meta: { login_require: true, title: "中研环科-系统设置-产品设置" },
          },
          {
            path: 'enterprise',
            component: () => import('@/views/system/EnterpriseSetting.vue'),
            meta: { login_require: true, title: "中研环科-系统设置-企业设置" },
          },
        ]
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
  if (to.meta.login_require || to.meta.login_require) {
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
