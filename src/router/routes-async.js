// Home 默认为首页组件

export default {
  Home: () => import(/* webpackChunkName: "Home" */ '@/views/home/Home'),
  Test: () => import(/* webpackChunkName: "test" */ '@/views/test/Test')
}