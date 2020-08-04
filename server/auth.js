module.exports = (app) => {
  console.log(__dirname)
  // 用户路由接口
  app.get('/server/user/menu', (req, res, next) => {
    res.json({
      abc: 'server-test'
    });
  })
}