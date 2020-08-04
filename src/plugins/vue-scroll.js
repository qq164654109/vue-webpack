import Vue from 'vue';
import vuescroll from 'vuescroll/dist/vuescroll-native';
import 'vuescroll/dist/vuescroll.css';

Vue.use(vuescroll, {
  ops: {
    bar: {
      background: 'rgba(125, 125, 125, 0.7)'
    }
  }
});