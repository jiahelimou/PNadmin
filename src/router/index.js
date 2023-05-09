import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  // {
  //   path: '/documentation',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/documentation/index'),
  //       name: 'Documentation',
  //       meta: { title: 'Documentation', icon: 'documentation', affix: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/guide',
  //   component: Layout,
  //   redirect: '/guide/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/guide/index'),
  //       name: 'Guide',
  //       meta: { title: 'Guide', icon: 'guide', noCache: true }
  //     }
  //   ]
  // },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
  // {
  //   path: '/events',
  //   component: Layout,
  //   redirect: '/events/calendar-mat',
  //   alwaysShow: true, // will always show the root menu
  //   name: 'Events',
  //   meta: {
  //     title: 'Events',
  //     icon: 'education'
  //   },
  //   // hidden: true,
  //   children: [
  //     {
  //       path: 'calendar-mgt',
  //       component: () => import('@/views/events/calendar-mgt'),
  //       name: 'Calendar-MgtEvents',
  //       meta: {
  //         title: 'Calendar-Mgt',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'edit/:id(\\d+)',
  //       component: () => import('@/views/example/edit'),
  //       name: 'EditArticle',
  //       meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
  //       hidden: true
  //     },
  //     {
  //       path: 'calendar-mgt-show',
  //       component: () => import('@/views/events/calendar-mgt-show'),
  //       name: 'Calendar-MgtEvents-Show',
  //       meta: {
  //         title: 'Calendar-Mgt-Show',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       },
  //       hidden: true
  //     }
  //   ]
  // }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/page',
  //   alwaysShow: true, // will always show the root menu
  //   name: 'Permission',
  //   meta: {
  //     title: 'Permission',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'page',
  //       component: () => import('@/views/permission/page'),
  //       name: 'PagePermission',
  //       meta: {
  //         title: 'Page Permission',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'directive',
  //       component: () => import('@/views/permission/directive'),
  //       name: 'DirectivePermission',
  //       meta: {
  //         title: 'Directive Permission'
  //         // if do not set roles, means: this page does not require permission
  //       }
  //     },
  //     {
  //       path: 'user',
  //       component: () => import('@/views/permission/user'),
  //       name: 'UserPermission',
  //       meta: {
  //         title: 'User Roles'
  //         // if do not set roles, means: this page does not require permission
  //       }
  //     },
  //     {
  //       path: 'role',
  //       component: () => import('@/views/permission/role'),
  //       name: 'RolePermission',
  //       meta: {
  //         title: 'Setup Roles',
  //         roles: ['admin']
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/settings',
  //   component: Layout,
  //   redirect: '/settings/Configurations',
  //   alwaysShow: true, // will always show the root menu
  //   name: 'Settings',
  //   meta: {
  //     title: 'Settings',
  //     icon: 'el-icon-menu'
  //   },
  //   children: [
  //     {
  //       path: 'Configurations',
  //       component: () => import('@/views/settings/Configurations'),
  //       name: 'Configurations',
  //       meta: { title: 'Configurations' }
  //     }
  //   ]
  // },

  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/icons/index'),
  //       name: 'Icons',
  //       meta: { title: 'Icons', icon: 'icon', noCache: true }
  //     }
  //   ]
  // },

  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: {
      title: 'Events',
      icon: 'education'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle'
        // meta: { title: 'Create Article' }
      },
      // 修改 start
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
        hidden: true
      },
      // wu-ming
      {
        path: 'revise',
        component: () => import('@/views/example/revise'),
        name: 'ReviseArticle',
        meta: { title: 'Revise Article', noCache: true, activeMenu: '/example/table' },
        props: true,
        hidden: true
      },
      // 修改 end
      {
        path: 'components/calendar-mgt-detail',
        component: () => import('@/views/example/components/calendar-mgt-detail'),
        name: 'calendar-mgt-detail',
        meta: { title: 'calendar-mgt-detail', noCache: true, activeMenu: '/example/table' },
        hidden: true
      },
      // {
      //   path: 'list',
      //   component: () => import('@/views/example/list'),
      //   name: 'ArticleList',
      //   meta: { title: 'validate.' }
      // },
      {
        path: 'table',
        component: () => import('@/views/example/table'),
        name: 'Articletable',
        meta: { title: 'function.' }
      },
      {
        path: 'components/calendar-mgt-add',
        component: () => import('@/views/example/components/calendar-mgt-add/'),
        name: 'calendar-mgt-add',
        meta: { title: 'calendar-mgt-add' },
        hidden: true
      },
      {
        path: 'calendar-mgt-add',
        component: () => import('@/views/example/calendar-mgt-add/'),
        name: 'calendar-mgt-add',
        meta: { title: 'calendar-mgt-add' },
        hidden: true
      },
      {
        path: 'add',
        component: () => import('@/views/example/add'),
        name: 'calendar-mgt-add',
        meta: { title: 'calendar-mgt-add', noCache: true, activeMenu: '/example/list' },
        hidden: true
      }
    ]
  },

  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'Error Pages',
  //     icon: '404'
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: () => import('@/views/error-page/401'),
  //       name: 'Page401',
  //       meta: { title: '401', noCache: true }
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/error-page/404'),
  //       name: 'Page404',
  //       meta: { title: '404', noCache: true }
  //     }
  //   ]
  // },

  // {
  //   path: '/error-log',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'log',
  //       component: () => import('@/views/error-log/index'),
  //       name: 'ErrorLog',
  //       meta: { title: 'Error Log', icon: 'bug' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
