/**
 * @name Routing configuration of umi
 * @description Only support the configuration of path, component, routes, redirect, wrappers, name, icon
 * @param path  path only supports two placeholder configurations, the first is the form of the dynamic parameter :id, the second is the * wildcard, and the wildcard can only appear at the end of the routing string.
 * @param component Configure the path of the React component to be rendered after matching location and path. It can be an absolute path or a relative path. If it is a relative path, it will start from src/pages.
 * @param routes Configure sub-routes, usually used when you need to add layout components for multiple paths.
 * @param redirect Configure routing jump
 * @param wrappers Configure the packaging component of the routing component. Through the packaging component, more functions can be combined into the current routing component. For example, it can be used for permission verification at the routing level
 * @param name Configure the title of the route. By default, the value of menu.xxxx in the internationalization file menu.ts is read. If the name is configured as login, the value of menu.login in menu.ts is read as the title
 * @param icon Configure the icon of the route
 * @doc https://umijs.org/docs/guides/routes
 */

import ROUTES_PATH from '../src/constants/routesPath';

export default [
  {
    path: '/user',
    layout: false,
    component: '@/layouts/public',
    routes: [
      {
        name: 'login',
        path: ROUTES_PATH.LOGIN,
        component: './User/Login',
      },
    ],
  },
  {
    path: ROUTES_PATH.DASHBOARD,
    name: 'dashboard',
    icon: 'dashboard',
    component: './Dashboard',
  },
  {
    path: ROUTES_PATH.NFT,
    name: 'nft',
    icon: 'appstore',
    component: './nft/management',
  },
  {
    path: `${ROUTES_PATH.NFT_DETAIL}/:id`,
    component: './nft/detail',
  },
  {
    path: `${ROUTES_PATH.NFT_EDITION}/:id`,
    component: './nft/creation',
  },
  {
    path: ROUTES_PATH.NFT_CREATION,
    component: './nft/creation',
  },
  {
    path: ROUTES_PATH.SALE,
    name: 'sale',
    icon: 'fund',
    component: './SaleOrder/management',
  },
  {
    path: `${ROUTES_PATH.SALE_DETAIL}/:id`,
    component: './SaleOrder/detail',
  },
  {
    path: `${ROUTES_PATH.SALE_EDITION}/:id`,
    component: './SaleOrder/creation',
  },
  {
    path: ROUTES_PATH.SALE_CREATION,
    component: './SaleOrder/creation',
  },
  {
    path: ROUTES_PATH.REVENUE,
    name: 'revenue',
    icon: 'wallet',
    component: './Revenue/management',
  },
  {
    path: ROUTES_PATH.TAG,
    name: 'revenue',
    icon: 'wallet',
    component: './Revenue/management',
  },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   routes: [
  //     {
  //       path: '/admin',
  //       redirect: '/admin/sub-page',
  //     },
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       component: './Admin',
  //     },
  //   ],
  // },
  // {
  //   name: 'list.table-list',
  //   icon: 'table',
  //   path: '/list',
  //   component: './TableList',
  // },
  {
    path: '/',
    redirect: ROUTES_PATH.DASHBOARD,
  },
  {
    path: '*',
    layout: false,
    component: './exception/404',
  },
];
