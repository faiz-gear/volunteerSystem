//1.导入express模块
const express = require('express')
//2.创建服务器实例
const app = express();
// write your code here...
const cors = require('cors')
app.use(cors())

app.use(express.json())

const router = require('./router')
app.use(router)

//3.启动服务器
app.listen(80, () => {
  console.log('server running at http://127.0.0.1')
})
