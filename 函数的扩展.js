//es6之前不允许给函数设置默认值
function log(x, y) {
  y = y || 'World';
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello World


//避免这个问题，通常需要先判断一下参数y是否被赋值，如果没有，再等于默认值。
if (typeof y === 'undefined') {
  y = 'World';
}

//ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面
function log(x, y = 'World') {
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello

//ES6 的写法比 ES5 简洁许多，而且非常自然
function Point(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}

const p = new Point();
p // { x: 0, y: 0 }

//参数变量是默认声明的，所以不能用let或const再次声明
function foo(x = 5) {
  let x = 1; // error
  const x = 2; // error
}

//使用参数默认值时，函数不能有同名参数。
// 不报错
function foo(x, x, y) {
  // ...
}

// 报错
function foo(x, x, y = 1) {
  // ...
}
// SyntaxError: Duplicate parameter name not allowed in this context

//参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的。
let x = 99;
function foo(p = x + 1) {
  console.log(p);
}

foo() // 100

x = 100;
foo() // 101

//与解构赋值默认值结合使用
function foo({x, y = 5}) {
  console.log(x, y);
}

foo({}) // undefined 5
foo({x: 1}) // 1 5
foo({x: 1, y: 2}) // 1 2
foo() // TypeError: Cannot read property 'x' of undefined

function foo({x, y = 5} = {}) {
  console.log(x, y);
}

foo() // undefined 5

//解构赋值默认值的例子
function fetch(url, { body = '', method = 'GET', headers = {} }) {
  console.log(method);
}

fetch('http://example.com', {})
// "GET"

fetch('http://example.com')
// 报错

//双重默认值
function fetch(url, { body = '', method = 'GET', headers = {} } = {}) {
  console.log(method);
}
//函数fetch没有第二个参数时，函数参数的默认值就会生效，然后才是解构赋值的默认值生效，变量method才会取到默认值GET
fetch('http://example.com')
// "GET"


//作为练习，请问下面两种写法有什么差别
// 写法一
function m1({x = 0, y = 0} = {}) {
  return [x, y];
}

// 写法二
function m2({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}

/**
 * 上面两种写法都对函数的参数设定了默认值，
 * 区别是写法一函数参数的默认值是空对象，
 * 但是设置了对象解构赋值的默认值；
 * 写法二函数参数的默认值是一个有具体属性的对象，
 * 但是没有设置对象解构赋值的默认值。
 */
// 函数没有参数的情况
m1() // [0, 0]
m2() // [0, 0]

// x 和 y 都有值的情况
m1({x: 3, y: 8}) // [3, 8]
m2({x: 3, y: 8}) // [3, 8]

// x 有值，y 无值的情况
m1({x: 3}) // [3, 0]
m2({x: 3}) // [3, undefined]

// x 和 y 都无值的情况
m1({}) // [0, 0];
m2({}) // [undefined, undefined]

m1({z: 3}) // [0, 0]
m2({z: 3}) // [undefined, undefined]


/**
 * 参数默认值的位置
 * 定义了默认值的参数，应该是函数的尾参数。
 * 因为这样比较容易看出来，到底省略了哪些参数。
 * 如果非尾部的参数设置默认值，实际上这个参数是没法省略的。
 */
// 例一
function f(x = 1, y) {
  return [x, y];
}

f() // [1, undefined]
f(2) // [2, undefined]
f(, 1) // 报错
f(undefined, 1) // [1, 1]

// 例二
function f(x, y = 5, z) {
  return [x, y, z];
}

f() // [undefined, 5, undefined]
f(1) // [1, 5, undefined]
f(1, ,2) // 报错
f(1, undefined, 2) // [1, 5, 2]


//如果传入undefined，将触发该参数等于默认值，null则没有这个效果
function foo(x = 5, y = 6) {
  console.log(x, y);
}

foo(undefined, null)
// 5 null


/**
 * 函数的 length 属性
 * length属性的含义是，该函数预期传入的参数个数
 */
 (function (a) {}).length // 1
 (function (a = 5) {}).length // 0
 (function (a, b, c = 5) {}).length // 2


/**
 * 作用域
 * 设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。等到初始化结束，这个作用域就会消失。
 * 这种语法行为，在不设置参数默认值时，是不会出现的。
 */
 var x = 1;

 function f(x, y = x) {
   console.log(y);
 }
 
 f(2) // 2

//全局变量x不存在，就会报错
function f(y = x) {
  let x = 2;
  console.log(y);
}

f() // ReferenceError: x is not defined

//下面这样写，也会报错
var x = 1;

function foo(x = x) {
  // ...
}

foo() // ReferenceError: x is not defined

//如果参数的默认值是一个函数，该函数的作用域也遵守这个规则
let foo = 'outer';

function bar(func = () => foo) {
  let foo = 'inner';
  console.log(func());
}

bar(); // outer

//如果写成下面这样，就会报错。
function bar(func = () => foo) {
  let foo = 'inner';
  console.log(func());
}
//匿名函数里面的foo指向函数外层，但是函数外层并没有声明变量foo，所以就报错了。
bar() // ReferenceError: foo is not defined

//下面是一个更复杂的例子。
/**
 * 函数foo的参数形成一个单独作用域。这个作用域里面，
 * 首先声明了变量x，然后声明了变量y，y的默认值是一个匿名函数。
 * 这个匿名函数内部的变量x，指向同一个作用域的第一个参数x。
 * 函数foo内部又声明了一个内部变量x，
 * 该变量与第一个参数x由于不是同一个作用域
 * 所以不是同一个变量，因此执行y后，内部变量x和外部全局变量x的值都没变。
 */
var x = 1;
function foo(x, y = function() { x = 2; }) {
  var x = 3;
  y();
  console.log(x);
}

foo() // 3
x // 1

/**
 * 如果将var x = 3的var去除，函数foo的内部变量x就指向第一个参数x，
 * 与匿名函数内部的x是一致的，所以最后输出的就是2，
 * 而外层的全局变量x依然不受影响。
 */
 var x = 1;
 function foo(x, y = function() { x = 2; }) {
   x = 3;
   y();
   console.log(x);
 }
 
 foo() // 2
 x // 1


/**
 * rest 参数
 * rest 参数（形式为...变量名），用于获取函数的多余参数，这样就不需要使用arguments对象了。
 * rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中
 */
 function add(...values) {
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}

add(2, 5, 3) // 10

//下面是一个 rest 参数代替arguments变量的例子。
// arguments变量的写法
function sortNumbers() {
  return Array.from(arguments).sort();
}

// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();

/**
 * arguments对象不是数组，而是一个类似数组的对象。
 * 所以为了使用数组的方法，必须使用Array.from先将其转为数组。
 * rest 参数就不存在这个问题，它就是一个真正的数组，
 * 数组特有的方法都可以使用。下面是一个利用 rest 参数改写数组push方法的例子。
 */
 function push(array, ...items) {
  items.forEach(function(item) {
    array.push(item);
    console.log(item);
  });
}

var a = [];
push(a, 1, 2, 3)


//rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错
// 报错
function f(a, ...b, c) {
  // ...
}

//函数的length属性，不包括 rest 参数
(function(a) {}).length  // 1
(function(...a) {}).length  // 0
(function(a, ...b) {}).length  // 1


/**
 * 严格模式 
 * 从 ES5 开始，函数内部可以设定为严格模式  
 */
 function doSomething(a, b) {
  'use strict';
  // code
}

//ES2016 做了一点修改，规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。
// 报错
function doSomething(a, b = a) {
  'use strict';
  // code
}

// 报错
const doSomething = function ({a, b}) {
  'use strict';
  // code
};

// 报错
const doSomething = (...a) => {
  'use strict';
  // code
};

const obj = {
  // 报错
  doSomething({a, b}) {
    'use strict';
    // code
  }
};

// 报错
function doSomething(value = 070) {
  'use strict';
  return value;
}

//两种方法可以规避这种限制。第一种是设定全局性的严格模式，这是合法的。
'use strict';

function doSomething(a, b = a) {
  // code
}

//第二种是把函数包在一个无参数的立即执行函数里面。
const doSomething = (function () {
  'use strict';
  return function(value = 42) {
    return value;
  };
}());

/**
 * name 属性
 * 返回该函数的函数名
 */
 function foo() {}
 foo.name // "foo"

//需要注意的是，ES6 对这个属性的行为做出了一些修改。如果将一个匿名函数赋值给一个变量，ES5 的name属性，会返回空字符串，而 ES6 的name属性会返回实际的函数名。
var f = function () {};

// ES5
f.name // ""

// ES6
f.name // "f"

//如果将一个具名函数赋值给一个变量，则 ES5 和 ES6 的name属性都返回这个具名函数原本的名字。
const bar = function baz() {};

// ES5
bar.name // "baz"

// ES6
bar.name // "baz"

//Function构造函数返回的函数实例，name属性的值为anonymous。
(new Function).name // "anonymous"

//bind返回的函数，name属性值会加上bound前缀。
function foo() {};
foo.bind({}).name // "bound foo"

(function(){}).bind({}).name // "bound "


/**
 * 箭头函数
 * ES6 允许使用“箭头”（=>）定义函数
 * 如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分
 */
 var f = v => v;

 // 等同于
 var f = function (v) {
   return v;
 };

var f = () => 5;
// 等同于
var f = function () { return 5 };

var sum = (num1, num2) => num1 + num2;
// 等同于
var sum = function(num1, num2) {
  return num1 + num2;
};

//如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用return语句返回
var sum = (num1, num2) => { return num1 + num2; }

//由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错。
// 报错
let getTempItem = id => { id: id, name: "Temp" };

// 不报错
let getTempItem = id => ({ id: id, name: "Temp" });

//下面是一种特殊情况，虽然可以运行，但会得到错误的结果。 表达式的情况是可以定义的但是执行结果是有问题的
let foo = () => { a: 1 };
foo() // undefined
/**
 * 上面代码中，原始意图是返回一个对象{ a: 1 }，但是由于引擎认为大括号是代码块，
 * 所以执行了一行语句a: 1。这时，a可以被解释为语句的标签，
 * 因此实际执行的语句是1;，然后函数就结束了，没有返回值。
 */

//如果箭头函数只有一行语句，且不需要返回值，可以采用下面的写法，就不用写大括号了
let fn = () => void doesNotReturn();

//箭头函数可以与变量解构结合使用
const full = ({ first, last }) => first + ' ' + last;

// 等同于
function full(person) {
  return person.first + ' ' + person.last;
}


//箭头函数使得表达更加简洁
const isEven = n => n % 2 === 0;
const square = n => n * n;

//箭头函数的一个用处是简化回调函数
// 普通函数写法
[1,2,3].map(function (x) {
  return x * x;
});

// 箭头函数写法
[1,2,3].map(x => x * x);


//另一个例子是
var result = values.sort(function (a, b){
  return a - b;
})

//箭头函数
var result = values.sort((a, b) => a - b)

/**
 * 所谓的rest，顾名思义就是获取剩余的参数，函数中所有多余的参数都会放进数组中然后赋值给这个rest参数
 * @param  {...any} nums 
 * @returns  数组
 */
//rest 参数与箭头函数结合的例子
const numbers = (...nums) => nums

numbers([1,2,4]) // [[1,2,4]]

numbers(1, 2, 3, 4, 5)
// [1,2,3,4,5]

const headAndTail = (head, ...tail) => [head, tail];

headAndTail(1, 2, 3, 4, 5)
// [1,[2,3,4,5]]


//对于普通函数来说，内部的this指向函数运行时所在的对象，但是这一点对箭头函数不成立。
//它没有自己的this对象，内部的this就是定义时上层作用域中的this。
//也就是说，箭头函数内部的this指向是固定的，相比之下，普通函数的this指向是可变的。
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

var id = 21;

foo.call({ id: 42 });
// id: 42
/**
 * setTimeout()的参数是一个箭头函数，这个箭头函数的定义生效是在foo函数生成时，
 * 而它的真正执行要等到 100 毫秒后。如果是普通函数，执行时this应该指向全局对象window，这时应该输出21。
 * 但是，箭头函数导致this总是指向函数定义生效时所在的对象（本例是{id: 42}），所以打印出来的是42
 */


//下面例子是回调函数分别为箭头函数和普通函数，对比它们内部的this指向
//定时器一直再运行
function Timer() {
  this.s1 = 0;
  this.s2 = 0;
  // 箭头函数
  setInterval(() => this.s1++, 1000);
  // 普通函数
  setInterval(function () {
    this.s2++;
  }, 1000);
}

var timer = new Timer();

setTimeout(() => console.log('s1: ', timer.s1), 3100);
setTimeout(() => console.log('s2: ', timer.s2), 3100);
// s1: 3
// s2: 0

//请问下面的代码之中，this的指向有几个？
function foo() {
  return () => {
    return () => {
      return () => {
        console.log('id:', this.id);
      };
    };
  };
}

var f = foo.call({id: 1});
/**
 * 答案是this的指向只有一个，就是函数foo的this，这是因为所有的内层函数都是箭头函数，
 * 都没有自己的this，它们的this其实都是最外层foo函数的this。所以不管怎么嵌套，t1、t2、t3都输出同样的结果。
 * 如果这个例子的所有内层函数都写成普通函数，那么每个函数的this都指向运行时所在的不同对象。
 */
var t1 = f.call({id: 2})()(); // id: 1
var t2 = f().call({id: 3})(); // id: 1
var t3 = f()().call({id: 4}); // id: 1

//由于箭头函数没有自己的this，所以当然也就不能用call()、apply()、bind()这些方法去改变this的指向
(function() {
  return [
    (() => this.x).bind({ x: 'inner' })()
  ];
}).call({ x: 'outer' });
// ['outer']

/**
 * 不适用场合 箭头函数
 * 第一个场合是定义对象的方法，且该方法内部包括this
 */
 const cat = {
  lives: 9,
  jumps: () => {
    this.lives--;
  }
}
/**
 * cat.jumps()方法是一个箭头函数，这是错误的。调用cat.jumps()时，
 * 如果是普通函数，该方法内部的this指向cat；如果写成上面那样的箭头函数，
 * 使得this指向全局对象，因此不会得到预期结果。这是因为对象不构成单独的作用域，
 * 导致jumps箭头函数定义时的作用域就是全局作用域。
 */
// 再看一个例子。
globalThis.s = 21;

const obj = {
  s: 42,
  m: () => console.log(this.s)
};

obj.m() // 21


/**
 * 箭头函数的嵌套
 * 箭头函数内部，还可以再使用箭头函数。下面是一个 ES5 语法的多重嵌套函数。
 */
 function insert(value) {
  return {into: function (array) {
    return {after: function (afterValue) {
      array.splice(array.indexOf(afterValue) + 1, 0, value);
      return array;
    }};
  }};
}

insert(2).into([1, 3]).after(1); //[1, 2, 3]

//上面这个函数，可以使用箭头函数改写
let insert = (value) => ({into: (array) => ({after: (afterValue) => {
  array.splice(array.indexOf(afterValue) + 1, 0, value);
  return array;
}})});

insert(2).into([1, 3]).after(1); //[1, 2, 3]


//下面是一个部署管道机制（pipeline）的例子，即前一个函数的输出是后一个函数的输入。
const pipeline = (...funcs) =>
  val => funcs.reduce((a, b) => b(a), val);

const plus1 = a => a + 1;
const mult2 = a => a * 2;
const addThenMult = pipeline(plus1, mult2);

addThenMult(5)
// 12

//如果觉得上面的写法可读性比较差，也可以采用下面的写法。
const plus1 = a => a + 1;
const mult2 = a => a * 2;

mult2(plus1(5))
// 12

/**
 * 尾调用优化
 * 尾调用（Tail Call）是函数式编程的一个重要概念，本身非常简单，一句话就能说清楚，
 * 就是指某个函数的最后一步是调用另一个函数。
 */
 function f(x){
  return g(x);
} //函数f最后调用了函数g 这个就叫尾调用

//以下三种情况，都不属于尾调用
// 情况一 赋值变量
function f(x){
  let y = g(x);
  return y;
}

// 情况二 重新计算了
function f(x){
  return g(x) + 1;
}

// 情况三 未返回结果
function f(x){
  g(x);
}

//情况三等同于下面的代码
function f(x){
  g(x);
  return undefined;
}

//尾调用不一定出现在函数尾部，只要是最后一步操作即可
function f(x) {
  if (x > 0) {
    return m(x)
  }
  return n(x);
}

/**
 * 尾调用优化
 * 我们知道，函数调用会在内存形成一个“调用记录”，又称“调用帧”（call frame），
 * 保存调用位置和内部变量等信息。如果在函数A的内部调用函数B，那么在A的调用帧上方，
 * 还会形成一个B的调用帧。等到B运行结束，将结果返回到A，B的调用帧才会消失。如果函数B内部还调用函数C，
 * 那就还有一个C的调用帧，以此类推。所有的调用帧，就形成一个“调用栈”（call stack）。
 * 尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，因为调用位置、内部变量等信息都不会再用到了，
 * 只要直接用内层函数的调用帧，取代外层函数的调用帧就可以了。
 */
function f() {
  let m = 1;
  let n = 2;
  return g(m + n);
}
f();

// 等同于
function f() {
  return g(3);
}
f();

// 等同于
g(3);


