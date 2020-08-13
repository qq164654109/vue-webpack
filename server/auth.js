const fs = require('fs');
const path = require('path');

function getFile(name) {
  return path.join(__dirname, `../public/files/${name}`);
}

const userList = getFile('user.json');
const userMenuFile = getFile('userMenu.json');

module.exports = (app) => {
  // 用户登录接口
  app.post('/server/auth/login', (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    fs.readFile(userList, 'utf-8', function(err, data) {
      if (err) {
        res.status(500).send({ msg: '出错了' });
      } else {
        function validSuccess(item) {
          return item.username === username && item.password === password;
        }
        if (!!JSON.parse(data).find(validSuccess)) {
          res.send({
            username,
            access_token: username + new Date().getTime() + password 
          })
        } else {
          res.status(401).send({ msg: '用户名和密码错误' });
        }
      }
    });
  });
  // 用户路由接口
  app.get('/server/auth/menu', (req, res, next) => {
    fs.readFile(userMenuFile, 'utf-8', function(err, data) {
      if (err) {
        res.status(500).send({ msg: '出错了' });
      } else {
        res.send(JSON.parse(data));
      }
    });
  });
}