//导入 express 模块
const express = require('express')
//创建服务器的实例对象
const app = express()
const joi = require('joi')
//导入 cors 中间件（解决跨域请求），并注册为全局可用的中间件
const cors = require('cors')
app.use(cors())
//配置解析表单数据的中间件，注意：这个自带的中间件只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({ extended: false }))

//在路由之前封装一个 res.cc函数
app.use((req, res, next) => {
  //默认是失败的情况，err可能是错误对象，也可能是一个错误的描述字符串
  res.cc = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})

//在路由之前配置解析 token 的中间件
const expressJWT = require('express-jwt')
const config = require('./config')

app.use(expressJWT({ secret: config.jwtSecreKey, algorithms: ['HS256'] }).unless({ path: [/^\/api/] }))

//导入并使用用户路由模块 
const userRouter = require('./router/user')
//意思是以后每次访问 userRouter 路由的时候，前面都要加上一个 /api
app.use('/api', userRouter)
//导入并使用用户信息的路由模块
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)

//定义错误级别中间件
app.use((err, req, res, next) => {
  //验证失败导致的错误
  if (err instanceof joi.ValidationError) return res.cc(err)
  //身份认证失败的错误
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
  //未知的错误
  return res.cc(err)
})

//启动服务器
app.listen(3007, () => {
  console.log('api server running at http://127.0.0.1:3007');
})