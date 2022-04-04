const express = require('express')

const router = express.Router()

//导入用户路由处理函数对应的模块
const user_handler = require('../router_handler/user')

//导入数据验证的中间件
const expressJoi = require('@escook/express-joi')
//导入需要的验证追责对象
const { reg_login_schema } = require('../schema/user')

//注册新用户
router.post('/reguser', expressJoi(reg_login_schema), user_handler.regUser)

//注册新用户
router.post('/login', expressJoi(reg_login_schema), user_handler.login)

module.exports = router