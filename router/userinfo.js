const express = require('express')

const router = express.Router()

//导入路由处理函数模块
const userinfo_handler = require('../router_handler/userinfo')
//导入数据验证的中间件
const expressJoi = require('@escook/express-joi')
//导入需要的验证追责对象
const { update_userinfo_schema, update_password_schema, update_avatar } = require('../schema/user')

//挂载获取用户信息路由
router.get('/userinfo', userinfo_handler.getUserInfo)
//挂载更新用户信息的路由，并且要先进行验证
router.put('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updataUserInfo)
//重置密码路由
router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updatePassword)
//更新用户头像路由
router.post('/update/avatar', expressJoi(update_avatar), userinfo_handler.updateAvatar)

module.exports = router