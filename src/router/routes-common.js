import Login from '@/views/login/Login';
import Home from '@/views/Home';
import Page401 from '@/views/page-error/Page401';
import Page404 from '@/views/page-error/Page404';
import Page500 from '@/views/page-error/Page500';
import PageEmpty from '@/views/page-error/PageEmpty';
import PageError from '@/views/page-error/PageError';
import { getToken } from '@/utils/auth';
import website from '@/config/website';

const commonRoutes = [
  {
    path: '/',
    name: 'App',
    component: Home
    // redirect: () => {
    //   return !getToken() ? '/login': website.auth_path
    // }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/401',
    name: 'Page401',
    component: Page401
  },
  {
    path: '/404',
    name: 'Page404',
    component: Page404
  },
  {
    path: '/500',
    name: 'Page500',
    component: Page500
  },
  {
    path: '/page-empty',
    name: 'PageEmpty',
    component: PageEmpty
  },
  {
    path: '/page-error',
    name: 'PageError',
    component: PageError
  }
];

export const whiteRouteNames = commonRoutes.map(r => r.name);

export default commonRoutes;