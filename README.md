# Register-and-Login-By-NodeJS

学习 Node.js 的一个登陆注册的业务的练习

---

> 这是根据 B 站黑马 Node.js 后面跟着做的一个登陆注册业务，其中包括登陆注册，权限验证等

**所用技术：**

- 以 Node.js 为核心，主要使用了 Node 的基本语法以及 ES6 的新语法。
- 使用了 cors 中间件解决跨域问题。
- 使用 joi 和 jsonwebtoken 中间件对请求进行权限验证。
- 使用 bcryptjs 对数据库密码进行加密以及解密。

**快速开始**

1. 执行 db 文件夹下的 nodejs_2022-04-04_203519.sql 文件创建数据库以及表。
2. 在该项目根目录下执行 npm install 命令安装相关依赖包。
3. 执行 node app.js 开启 3007 端口服务。
4. 通过 postman 等接口测试工具可执行 登陆业务逻辑练习接口.pdf 中的接口。
