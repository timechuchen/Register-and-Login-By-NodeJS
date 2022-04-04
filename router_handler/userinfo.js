//导入数据库操作模块
const db = require('../db/index')
//导入处理密码的模块
const bcrypt = require('bcryptjs')

//获取用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
  //定义SQL语句
  const sql = `select id,username,nickname,email,user_pic from ev_users where id = ?`
  //执行SQL语句
  db.query(sql, req.user.id, (err, results) => {
    //执行SQL语句失败
    if (err) return res.cc(err)
    //未查到数据
    if (results.length !== 1) return res.cc('获取用户信息失败')
    //用户信息获取成功
    res.send({
      status: 200,
      message: '获取信息成功',
      data: results[0]
    })
  })
}
//更新用户信息的处理函数
exports.updataUserInfo = (req, res) => {
  //定义SQL语句
  const sql = `update ev_users set ? where id=?`
  db.query(sql, [req.body, req.body.id], (err, results) => {
    //执行SQL语句失败
    if (err) return res.cc(err)
    //未查到数据
    if (results.affectedRows !== 1) return res.cc('更新用户信息失败')
    //用户信息获取成功
    res.cc('更新用户信息成功', 200)
  })
}
//更新密码的处理函数
exports.updatePassword = (req, res) => {
  //根据id查询用户是否存在
  const sql = `select * from ev_users where id = ?`
  db.query(sql, req.user.id, (err, result) => {
    if (err) return res.cc(err)
    if (result.length !== 1) res.cc('用户不存在')
    //判断用户输入的旧密码是否正确
    const compareResult = bcrypt.compareSync(req.body.oldPwd, result[0].password)
    if (!compareResult) return res.cc('原密码错误！')
    const setPwdSql = `update ev_users set password = ? where id = ?`
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
    db.query(setPwdSql, [newPwd, req.user.id], (err, result) => {
      if (err) return res.cc(err)
      if (result.affectedRows !== 1) return res.cc('更新密码失败！')
      res.cc('更新密码成功', 200)
    })
  })
}
//更换头像的处理函数
exports.updateAvatar = (req, res) => {
  const sql = `update ev_users set user_pic = ? where id = ?`
  db.query(sql, [req.body.avatar, req.user.id], (err, result) => {
    if (err) return res.cc(err)
    if (result.affectedRows !== 1) return res.cc('头像更新失败！')
    return res.cc('头像更新成功', 200)
  })
}