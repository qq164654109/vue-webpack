const fs = require('fs');
const path = require('path');

function getFile(name) {
  return path.join(__dirname, `../mock/${name}`);
}
const testData = getFile('test.json');

module.exports = (app) => {
  // 测试数据
  app.get('/server/test', (req, res, next) => {
    fs.readFile(testData, 'utf-8', function(err, data) {
      if (err) {
        res.status(500).send({ msg: '出错了' });
      } else {
        setTimeout(() => {
          res.send(JSON.parse(data));
        }, 1000);
      }
    });
  });
}