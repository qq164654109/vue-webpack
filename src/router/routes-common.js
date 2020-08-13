import Login from '@/views/login/Login';
import Page401 from '@/views/page-template/Page401';
import Page404 from '@/views/page-template/Page404';
import Page500 from '@/views/page-template/Page500';
import PageEmpty from '@/views/page-template/PageEmpty';
import PageError from '@/views/page-template/PageError';

const commonRoutes = [
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