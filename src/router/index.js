import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/traffic',
    component: Layout,
    redirect: '/channel/list',
    name: 'channel',
    meta: { title: '交通仿真', icon: 'order', roles: ['admin', 'operate'], noCache: true },
    children: [
      {
        path: 'pricing-strategy',
        name: 'pricing-strategy',
        component: () => import('@/views/CitySimulation/PricingStrategy'),
        meta: { title: '定价策略', icon: 'ticketed', roles: ['admin', 'operate'], noCache: true }
      },
      {
        path: 'city-flow',
        name: 'city-flow',
        component: () => import('@/views/CitySimulation/CityFlow'),
        meta: { title: '车流模拟', icon: 'ticket-check', roles: ['admin', 'operate'] }
      }
    ]
  },
  // {
  //   path: '/ticketing',
  //   component: Layout,
  //   redirect: '/ticketing/list',
  //   name: 'ticketing',
  //   meta: { title: '票务订单', icon: 'order', roles: ['admin', 'operate'], noCache: true },
  //   children: [
  //     {
  //       path: 'ticketing-query',
  //       name: 'ticketing-query',
  //       component: () => import('@/views/tks/TicketingList'),
  //       meta: { title: '订单查询', icon: 'query', roles: ['admin', 'operate'], noCache: true }
  //     },
  //     {
  //       path: 'ticketing-out',
  //       name: 'ticketing-out',
  //       component: () => import('@/views/tks/TicketingOut'),
  //       meta: { title: '出票', icon: 'ticketed', roles: ['admin', 'operate'], noCache: true }
  //     },
  //     {
  //       path: 'ticketing-out-detail',
  //       name: 'ticketing-out-detail',
  //       hidden: true,
  //       component: () => import('@/views/tks/TicketingOutDetail'),
  //       meta: { title: '出票单详情', icon: 'ticketed', roles: ['admin', 'operate'], noCache: true }
  //     },
  //     {
  //       path: 'ticketing-refund',
  //       name: 'ticketing-refund',
  //       component: () => import('@/views/tks/TicketingRefund'),
  //       meta: { title: '退票', icon: 'ticket-cancel', roles: ['admin', 'operate'], noCache: true }
  //     },
  //     {
  //       path: 'ticketing-refund-detail',
  //       name: 'ticketing-refund-detail',
  //       hidden: true,
  //       component: () => import('@/views/tks/TicketingRefundDetail'),
  //       meta: { title: '退票单详情', icon: 'ticket-cancel', roles: ['admin', 'operate'], noCache: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/notice',
  //   component: Layout,
  //   redirect: '/notice/list',
  //   name: 'notice',
  //   meta: { title: '公告管理', icon: 'order', roles: ['admin', 'operate'], noCache: true },
  //   children: [
  //     {
  //       path: 'notice-manage',
  //       name: 'notice-manage',
  //       component: () => import('@/views/tps/NoticeManage'),
  //       meta: { title: '公告管理', icon: 'query', roles: ['admin', 'operate'], noCache: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/basedata',
  //   component: Layout,
  //   redirect: '/basedata/list',
  //   name: 'basedata',
  //   meta: { title: '基础数据维护', icon: 'order', roles: ['admin', 'operate'], noCache: true },
  //   children: [
  //     {
  //       path: 'basedata-planetype',
  //       name: 'basedata-planetype',
  //       component: () => import('@/views/bds/PlaneTypeMaintain'),
  //       meta: { title: '机型维护', icon: 'example', roles: ['admin', 'operate'] }
  //     },
  //     {
  //       path: 'basedata-seatCodeMatch',
  //       name: 'basedata-seatCodeMatch',
  //       component: () => import('@/views/bds/SeatCodeMatch'),
  //       meta: { title: '舱等舱位对应关系维护', icon: 'example', roles: ['admin', 'operate'] }
  //     }
  //   ]
  // },
  // {
  //   path: '/setting',
  //   component: Layout,
  //   redirect: '/setting/list',
  //   name: 'setting',
  //   meta: { title: '配置中心', icon: 'order', roles: ['admin', 'operate'], noCache: true },
  //   children: [
  //     {
  //       path: 'setting-saleForbid',
  //       name: 'setting-saleForbid',
  //       component: () => import('@/views/bds/SaleForbid'),
  //       meta: { title: '机票禁售配置', icon: 'example', roles: ['admin', 'operate'] }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]
