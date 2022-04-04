//导入数据局连接池模块
const db = require('../db/index')
//导入 bcrypt 加密包
const bcrypt = require('bcryptjs')
//导入生成 token 的包
const jwt = require('jsonwebtoken')
const config = require('../config')

//注册新用户的处理函数
exports.regUser = (req, res) => {
  //获取客户端提交到服务器的用户信息
  const userinfo = req.body
  //对表单的数据进行合法性的校验
  // if (!userinfo.username || !userinfo.password) {
  //   // return res.send({ status: 1, message: '用户名或密码不合法！' })
  //   return res.cc('用户名或密码不合法！')
  // }
  //定义SQL语句
  const sql = `select * from ev_users where username=?`
  db.query(sql, [userinfo.username], (err, result) => {
    if (err) {
      // return res.send({ status: 1, message: err.message })
      return res.cc(err.message)
    }
    //判断用户名是否被占用
    if (result.length > 0) {
      // return res.send({ status: 1, message: '用户名以被占用，请更换用户名' })
      return res.cc('用户名以被占用，请更换用户名')
    }
    //调用 bcrypt.hashSycn() 进行密码的加密
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    //定义插入新用户的SQL语句
    const sql_insert = `insert into ev_users set ?`
    //执行SQL语句
    db.query(sql_insert, { username: userinfo.username, password: userinfo.password }, (err, results) => {
      //判断sql语句是否执行成功
      if (err) return res.cc(err.message)
      //判断影响行数
      if (results.affectedRows !== 1) return res.send({ status: 1, message: '注册用户失败，稍后再试' })
      //注册成功
      // res.send({ status: 200, message: '注册成功' })
      res.cc('注册成功', 200)
    })
  })
}

//用户登陆的处理函数
exports.login = (req, res) => {
  //接收表单的数据 
  const userinfo = req.body
  //定义一个SQL语句
  const sql = `select * from ev_users where username=?`
  db.query(sql, userinfo.username, (err, result) => {
    //执行SQL语句失败
    if (err) return res.cc(err)
    //SQL语句执行成功，但是未找到该用户
    if (result.length !== 1) return res.cc('用户不存在')
    //判断密码是否正确
    const comresult = bcrypt.compareSync(userinfo.password, result[0].password)
    if (!comresult) return res.cc('密码错误')
    //在服务端生成 TOKEN 字符串
    const user = { ...result[0], password: null, user_pic: null }
    //对用户信息进行加密生成 token 字符串
    const tokenStr = jwt.sign(user, config.jwtSecreKey, { expiresIn: config.expirsIn })
    //调用res.send将token响应给客户端
    res.send({
      status: 200,
      message: '登陆成功',
      token: 'Bearer ' + tokenStr
    })
  })
}