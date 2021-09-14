## ECMAScript 和 JavaScript 的关系 
1. 1996年 JavaScript作者将其交给ECMA标准话组织，次年ECMA发布了1.0版本，一是商标问题 二是想体现制定者是ECMA,因此 ECMAScript 和 JavaScript 的关系是，前者是后者的规格，后者是前者的一种实现（另外的 ECMAScript 方言还有 JScript 和 ActionScript）。日常场合，这两个词是可以互换的。
2. ECMAScript的历史
## Babel转码器
```
  //转码前
  input.map(item => item + 1);
  //转码后
  input.map(function (item){
    return item = 1；
  })
```
```
$ npm install --save-dev @babel/core
```
## 配置文件.babelrc
Babel的配置文件是.babelrc,存放在项目根目录下。使用Babel的第一步，就是配置这个文件

该文件用来设置转码规则和插件
```
{
  "presets": [],
  "plugins": []
}
```
presets字段设定转码规则，官方提供以下的规则集，你可以根据需要安装
```
# 最新转码规则
$ npm install --save-dev @babel/preset-env

# react 转码规则
$ npm install --save-dev @babel/preset-react
```
然后，将这些规则加入.babelrc。
```
{
    "presets": [
      "@babel/env",
      "@babel/preset-react"
    ],
    "plugins": []
  }
```
注意，以下所有 Babel 工具和模块的使用，都必须先写好.babelrc

## 命令行转码
Babel 提供命令行工具@babel/cli，用于命令行转码。
安装如下：
```
$ npm install --save-dev @babel/cli
```
基本用法如下：
```
# 转码结果输出到标准输出
$ npx babel example.js

# 转码结果写入一个文件
# --out-file 或 -o 参数指定输出文件
$ npx babel example.js --out-file compiled.js
# 或者
$ npx babel example.js -o compiled.js

# 整个目录转码
# --out-dir 或 -d 参数指定输出目录
$ npx babel src --out-dir lib
# 或者
$ npx babel src -d lib

# -s 参数生成source map文件
$ npx babel src -d lib -s
```
