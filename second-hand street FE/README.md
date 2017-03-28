# second-hand-street-FE
***模仿他人之作***
+ 自动化构建工具：gulp+webpack
+ mvvm框架：angularJS
+ 对象，数组处理：lodash
+ UI库：angular-ui-bootstrap
+ 路由组件： angular-ui-router
+ es6代码转换：babel

## 前端路由
```
商品（goods）
  ├── /home                     =>  获取首页（最近发布，收藏最多，浏览最多）商品
  ├── /goods?type=a&subtype=b   =>  获取某类型的商品
  └── /goods/:id                =>  获取某商品的详细信息
```

## 开发进度
+ 第一周（resolve）
    + 搭建以gulp+webpack为自动化构建工具的开发环境
+ 第二周（resolve）
    + non-responsive bootstrap
    + navbar模块
    + UibModalReset组件,认识$sce服务
    + sidebar模块
    + sidebar子菜单，获取焦点，传参
+ 第三周（pending）
    + 挂载模拟路由，测试页面跳转
    + 首页单个商品组件
    + 重构整个目录结构
    + footer组件，解决页面跳动和body不能100%