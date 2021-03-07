const express = require('express')
const router = express.Router();

router.post('/login', (req, res) => {
  let responseObj = {};
  let {
    user,
    password
  } = req.body;
  if (user == 'admin' && password == 123456) {
    responseObj = {
      status: 0,
      msg: '登录成功',
      token: 123456
    }
  } else {
    responseObj = {
      status: 1,
      msg: '用户名或密码错误'
    }
  }
  res.send(responseObj)
})

module.exports = router
