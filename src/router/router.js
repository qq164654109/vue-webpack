import VueRouter from 'vue-router';
import store from '@/store';
import asyncRoutes from './routes-async';
import PageView from '@/views/page-template/PageView';
import PageIframe from '@/views/page-template/PageIframe';
import Page404 from '@/views/page-template/Page404';
import { camelToCrossLine } from '@/utils';

export default class AuthVueRouter extends VueRouter {
  constructor(opts) {
    super(opts)
    
    this.authRoutes = null;
    this._initialOpts = opts;
    
    if (store.state.user.userMenu.length > 0) {
      this.updateRoutes(store.state.user.userMenu);
    }
  }
  updateRoutes(aMenu = []) {
    if (this.authRoutes) {
      this.resetRouter();
    }
    this.authRoutes = this._generateRoutes(aMenu);
    this.addRoutes([
      {
        path: '/',
        name: 'Home',
        component: asyncRoutes.Home
      },
      ...this.authRoutes,
      {
        path: '*',
        component: Page404
      }
    ])
  }
  resetRouter() {
    // 重置路由规则
    const newRouter = new VueRouter(this._initialOpts);
    this.matcher = newRouter.matcher;
    this.authRoutes = null;
  }
  setQuery(query) {
    this.push({ query });
  }
  _generateRoutes(aMenu, parentPath = '') {
    return aMenu.map(oMenu => {
      const { name, type, children, extra, ...meta } = oMenu;
      let baseConf = {
        path: parentPath + '/' + camelToCrossLine(name),
        name,
        meta
      };
      let componentConf = (() => {
        if (type === '内嵌链接') {
          return {
            props: { src: extra },
            component: PageIframe
          };
        } else if (type === '动态路由') {
          return {
            path: baseConf.path + extra,
            props: true,
            component: this._getComponent(oMenu)
          };
        } else {
          return {
            component: this._getComponent(oMenu)
          };
        }
      })();
      let childrenConf = children && children.length > 0 ? {
        children: this._generateRoutes(children, baseConf.path)
      } : null;
      let redirectConf = childrenConf ? {
        redirect: { name: childrenConf.children[0].name }
      } : null;
      return Object.assign(baseConf, componentConf, childrenConf, redirectConf);
    })
  }
  _getComponent({name, title, children}) {
    if (asyncRoutes[name]) {
      return asyncRoutes[name];
    } else if (children && children.length > 0) {
      return PageView;
    } else {
      return {
        functional: true,
        render(h) {
          const style = {
            padding: '100px 0',
            lineHeight: '45px',
            textAlign: 'center'
          };
          return h('div', {style}, [
            h('p', {style: {fontSize: '24px', color: '#3886FF'}}, title),
            h('p', {style: {fontSize: '18px', color: '#ccc'}}, '组件未找到，占位使用'),
          ]);
        }
      }
    }
  }
}