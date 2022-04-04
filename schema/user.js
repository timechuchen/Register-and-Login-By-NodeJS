//导入定义验证规则的包
const joi = require('joi')

//定义用户名和密码的验证规则
const username = joi.string().min(1).max(10).required()

const password = joi.string().pattern(/^[\S]{6,20}$/).required()

const id = joi.number().integer().min(1).required()

const nickname = joi.string().required()

const email = joi.string().email().required()

const avatar = joi.string().dataUri().required()

//定义注册和登陆表单数据的对着对象
exports.reg_login_schema = {
  body: {
    username,
    password
  }
}
//定义更新用户信息验证规则
exports.update_userinfo_schema = {
  body: {
    id,
    nickname,
    email
  }
}
//定义重置密码的验证规则
exports.update_password_schema = {
  body: {
    oldPwd: password,
    newPwd: joi.not(joi.ref('oldPwd')).concat(password)
  }
}
//定义头像的验证规则
exports.update_avatar = {
  body: {
    avatar
  }
}