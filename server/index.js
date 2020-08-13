const auth = require('./auth');
const bodyParser = require('body-parser');

module.exports = (app) => {
  //对JSON请求体解析中间件
  app.use(bodyParser.json());
  //对urlencoded请求体解析中间件,extended:true 高级模式 false:普通 没有区别
  app.use(bodyParser.urlencoded({ extended: false }));
  // 权限接口
  auth(app)
}