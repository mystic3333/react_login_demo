const express = require('express')
const app = express()
const router = require('./router')
const debug = require('debug')('my-application')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use('/api', router)

//解决跨域
app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
      res.send(200);
    }
    else {
      next();
    }
  });

var server = app.listen(3100,function() {
    var host = server.address().address
    var port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})