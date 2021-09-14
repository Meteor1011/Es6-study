// let 命令
for (let i = 0; i < 10; i++) {
  // ...
}

console.log(i);
// ReferenceError: i is not defined
// 如果使用var 最后输出的是10
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10

//如果采用let声明 声明的变量只在块级作用域中有效 最后输出的是6
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6

// 另外for循环 设置循环变量的那部分是一个父级作用域而内部循环也是个单独的子作用域
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc

// 不存在变量提升 let命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;

// 暂时性死区 只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。
// ES6 明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
// 在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）
if (true) {
  // TDZ开始
  tmp = 'abc'; // ReferenceError
  console.log(tmp); // ReferenceError

  let tmp; // TDZ结束
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}

//暂时性死亡区 意味着typeof 不在百分百安全
typeof x; // ReferenceError
let x;
// 不声明变量 不报错
typeof y // undefined

//定义bar函数 x参数默认等于y 而此时y还未定义，属于死区，如果y默认为x就不会报错
function bar(x=y, y=2){
  return [x,y]
}
bar() //报错

function bar(x = 2, y = x) {
  return [x, y];
}
bar(); // [2, 2]

// 另外下面代码也会报错  与var的行为不同
// 不报错
var x = x;

// 报错 使用let声明变量时，只要变量在还没有声明完成前使用，就会报错。上面这行就属于这个情况，在变量x的声明语句还没有执行完成前，就去取x的值，导致报错”x 未定义“。
let x = x;
// ReferenceError: x is not defined

//不允许重复声明再同一个作用域内
// 报错
function func() {
  let a = 10;
  var a = 1;
}

// 报错
function func() {
  let a = 10;
  let a = 1;
}

// 不允许再函数内部重新声明变量如:
function func(arg) {
  let arg;
}
func() // 报错

function func(arg) {
  {
    let arg;
  }
}
func() // 不报错


// 块级作用域
/***
 * 1、es5只有全局作用域和函数作用域，没有块级作用域，这带来很多不合理的场景
 * 内层变量覆盖外层变量
 * if代码块外面使用了tmp变量，内部尽管没执行但也重新声明了tmp 变量，变量提升导致覆盖外面tmp，如果执行f函数后输出为undefined
 */
 var tmp = new Date();

 function f() {
   console.log(tmp);
   if (false) {
     var tmp = 'hello world';
   }
 }
 
 f(); // undefined


/**
 * 第二种场景，用来计数的循环变量泄露为全局变量
 * 变量i 只是用来控制循环的 但是循环结束后它并没有消失而是泄露成
 * 全局变量了
 */
 var s = 'hello';

 for (var i = 0; i < s.length; i++) {
   console.log(s[i]);
 }
 
 console.log(i); // 5


/**
 * ES6 的块级作用域
 * 外层代码块不受内部代码块的影响
 * 如果两次都用var声明，最后输出才是10
 */
//let为javascript新增了块级作用域
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}

// 代码块允许任意嵌套 但是例如下面 五层作用域定义了一个变量insane 
//第四层不允许访问第五次的变量
{{{{
  {let insane = 'Hello World'}
  console.log(insane); // 报错
}}}};

//内层可以定位外层同名变量
{{{{
  let insane = 'Hello World';
  {let insane = 'Hello World'}
}}}};

// 块级作用域的出现，实际上使得获得广泛应用的匿名立即执行函数表达式（匿名 IIFE）不再必要了。
// IIFE 写法
(function () {
  var tmp = ...;
  ...
}());

// 块级作用域写法
{
  let tmp = ...;
  ...
}

/**
 * 块级作用域与函数声明
 */
//es5 规定函数只能在顶层作用域和函数作用域中声明，不能在块级作用域中声明 例如：
//根据 ES5 的规定都是非法的 浏览器没有遵守这个规定，为了兼容以前的旧代码，
//还是支持在块级作用域之中声明函数，因此上面两种情况实际都能运行，不会报错
// 情况一
if (true) {
  function f() {}
}

// 情况二
try {
  function f() {}
} catch(e) {
  // ...
}

//es6引入块级作用域，明确允许在块级作用域之中声明函数，块级作用域之中，
// 函数声明语句的行为类似于let，在块级作用域之外不可引用。
function f() { console.log('I am outside!'); }

(function () {
  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }

  f();
}());

// ES5 环境
function f() { console.log('I am outside!'); }

(function () {
  function f() { console.log('I am inside!'); }
  if (false) {
  }
  f();
}());

// 浏览器的 ES6 环境
function f() { console.log('I am outside!'); }

(function () {
  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }

  f();
}());
// Uncaught TypeError: f is not a function

// es6的块级作用域必须有大括号不然那报错
// 第一种写法，报错
if (true) let x = 1;

// 第二种写法，不报错
if (true) {
  let x = 1;
}

/**
 * const 命令
 * 声明一个只读常量 一旦声明，值则不允许修改
 * 一旦声明必须立即初始化
 * 声明的变量不提升
 * 跟let一样不可重复
 */
 const PI = 3.1415;
 PI // 3.1415
 
 PI = 3;
 // TypeError: Assignment to constant variable.
 const foo;
 // SyntaxError: Missing initializer in const declaration

//const的作用域与let命令相同：只在声明所在的块级作用域内有效
if (true) {
  const MAX = 5;
}

MAX // Uncaught ReferenceError: MAX is not defined
// 实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。
const foo = {};

// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123

// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only

const a = [];
a.push('Hello'); // 可执行
a.length = 0;    // 可执行
a = ['Dave'];    // 报错

//冻结对象应该用Object.freeze方法
const foo = Object.freeze({});

// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
foo.prop = 123;

//冻结对象的所有属性
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};

/**
 * ES6 声明变量的六种方法
 * var和function
 * let和const
 * import和class
 */

/**
 * 顶层对象的属性
 *
 */
// 再es5中顶层对象的属性与全局变量等价
window.a = 1;
a // 1

a = 2;
window.a // 2

// es6 let const 和class 命令声明的变量不再是全局变量，不属于顶层对象属性
var a = 1;
// 如果在 Node 的 REPL 环境，可以写成 global.a
// 或者采用通用方法，写成 this.a
window.a // 1

let b = 1;
window.b // undefined

