/**
 * 基础用法
 */
//之前的用法
let a = 1;
let b = 2;
let c = 3;
//现在的写法
let [a, b, c] = [1, 2, 3]

//嵌套数组中提取值，按对应位置，对变量赋值

let [foo, [[bar], baz]] = [1, [[2], 3]];
foo //1
bar //2
baz //3

let [ , , third] = ["foo", "bar", "baz"];
third // "baz"

let [x, , y] = [1, 2, 3];
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []

//如果解构不成功，变量的值就等于undefined。
let [foo] = []; foo //undefined
let [bar, foo] = [1]; foo //undefined

//不完全解构
let [x, y] = [1, 2, 3];
x // 1
y // 2

let [a, [b], d] = [1, [2, 3], 4];
a // 1
b // 2
d // 4

//解构中如果右侧不是数组 或者说是不可遍历的结构将会报错 如下：
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};

//Set 解构赋值
let [x, y, z] = new Set(['a', 'b', 'c'])

//只要某种数据结构具有Iterator接口 都可以采用数组形式的解构赋值
function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

let [first, second, third, fourth, fifth, sixth] = fibs();//数组中的值依次是 0,1,1,2,3,5
sixth // 5

/**
 * 默认值
 */
//指定默认值
let [foo = true] = [];
foo // true

let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'

//当一个数组成员严格等于undefined，默认值才会生效
let [x = 1] = [undefined];
x // 1

let [x = 1] = [null]; //null 不严格等于undefined所以默认值不生效
x // null

//默认值为表达式的情况
function f(){
  console.log('aaa')
}

let [x = f()] = [1];
//等价于下面的代码 f()根本不会执行
let x;
if ([1][0] === undefined) { //默认右侧数组中0位置的值如果为undefined才会执行f()方法
  x = f();
} else {
  x = [1][0]; //否则取数组第一个的值
}

//默认值使用其他的变量，这个变量必须已经声明
let [x = 1, y = x] = [];     // x=1; y=1
let [x = 1, y = x] = [2];    // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = [];     // ReferenceError: y is not defined

/**
 * 对象的结构赋值
 */
 let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
 foo // "aaa"
 bar // "bbb"

 // 对象的机构跟数组的结构是有所区别的，数组的解构是按顺序排列的  变量的取值有它的位置决定
 // 对象的属性是没有次序的 但是变量必须与属性同名才能取到正确的值
 let { bar, foo } = { foo: 'aaa', bar: 'bbb' };
foo // "aaa"
bar // "bbb"

let { baz } = { foo: 'aaa', bar: 'bbb' };
baz // undefined 解构失败为undefined

//对象的解构很方便的将对象的方法赋值到某个变量
// 例一
let { log, sin, cos } = Math;

// 例二
const { log } = console;
log('hello') // hello

//如果变量名跟属性名不一致
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'

//解构赋值的简写
let { foo: foo, bar: bar } = { foo: 'aaa', bar: 'bbb' };

//嵌套解构对象
let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};
//p是模式不是变量因此不会被赋值
let { p: [x, { y }] } = obj;
x // "Hello"
y // "World"
//如果p也要变成赋值可以写成下面这样
let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};

let { p, p: [x, { y }] } = obj;
x // "Hello"
y // "World"
p // ["Hello", {y: "World"}]

const node = {
  loc: {
    start: {
      line: 1,
      column: 5
    }
  }
};
// 第一个解构loc是变量  第二个中只有start是变量  第三次解构中只有line是变量
let { loc, loc: { start }, loc: { start: { line }} } = node;
line // 1
loc  // Object {start: Object}
start // Object {line: 1, column: 5}

//嵌套赋值
let obj = {};
let arr = [];

({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });

obj // {prop:123}
arr // [true]

//如果解构模式是嵌套的对象，子对象所在的父属性不存在 将会报错（左侧foo 右侧没找到foo属性因此报错）
let {foo: {bar}} = {baz: 'baz'};// 报错

//对象解构可以取到继承的属性
const obj1 = {};
const obj2 = { foo: 'bar' };
Object.setPrototypeOf(obj1, obj2);

const { foo } = obj1;
foo // "bar"


//对象解构也可以设置默认值 
var {x = 3} = {};
x // 3

var {x, y = 5} = {x: 1};
x // 1
y // 5

var {x: y = 3} = {};
y // 3

var {x: y = 3} = {x: 5};
y // 5

var { message: msg = 'Something went wrong' } = {};
msg // "Something went wrong"

//默认值的生效条件是对象的属性值严格等于undefined
var {x = 3} = {x: undefined};
x // 3

var {x = 3} = {x: null};
x // null


/**
 * 注意点
 * 如果要将一个已经声明的变量用于解构赋值，必须非常小心
 */
// 错误的写法 javascript引擎会将{x} 理解成一个代码块 从而发生语法错误
let x;
{x} = {x: 1};
// SyntaxError: syntax error

// 正确的写法
let x;
({x} = {x: 1});

//解构赋值中允许等号的左边不放置任何变量名如：
//可执行但无意义
({} = [true, false]);
({} = 'abc');
({} = []);

//数组可以作为特殊对象，因此可以对数组进行对象属性解构
let arr = [1, 2, 3];
let {0 : first, [arr.length - 1] : last} = arr;
first // 1
last // 3

/**
 * 字符串的解构赋值
 */
 const [a, b, c, d, e] = 'hello';
 a // "h"
 b // "e"
 c // "l"
 d // "l"
 e // "o"
//类似数组的对象有个length属性可以解构赋值
let {length : len} = 'hello';
len // 5

/**
 * 数值和布尔值的解构赋值
 * 等号右边是数值和布尔值，则会先转为对象
 */
 let {toString: s} = 123;
 s === Number.prototype.toString // true
 
 let {toString: s} = true;
 s === Boolean.prototype.toString // true

//undefined和null无法转为对象 因此解构报错
let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError

/**
 * 函数参数的解构赋值
 */
 function add([x, y]){
  return x + y;
}

add([1, 2]); // 3

[[1, 2], [3, 4]].map(([a, b]) => a + b);
// [ 3, 7 ]

//函数的解构默认值
function move({x = 0, y = 0} = {}) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]

//下面的写法会得到不一样的结果
function move({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]

//undefined就会触发函数参数的默认值
[1, undefined, 3].map((x = 'yes') => x);
// [ 1, 'yes', 3 ]

/**
 * 圆括号问题
 */
//无法使用圆括号的情况
// 全部报错 变量声明语句，模式不能使用圆括号
let [(a)] = [1];

let {x: (c)} = {};
let ({x: c}) = {};
let {(x: c)} = {};
let {(x): c} = {};

let { o: ({ p: p }) } = { o: { p: 2 } };

// 函数参数也属于变量声明，因此不能带有圆括号
// 报错
function f([(z)]) { return z; }
// 报错
function f([z,(x)]) { return x; }

//赋值语句模式
// 全部报错 整个模式放在圆括号之中，导致报错。
({ p: a }) = { p: 42 };
([a]) = [5];

//将一部分模式放在圆括号之中，导致报错
// 报错
[({ p: a }), { x: c }] = [{}, {}];

//可以使用圆括号的情况
//第一行语句中，模式是取数组的第一个成员，跟圆括号无关；
//第二行语句中，模式是p，而不是d；
//第三行语句与第一行语句的性质一致。
[(b)] = [3]; // 正确
({ p: (d) } = {}); // 正确
[(parseInt.prop)] = [3]; // 正确


/**
 * 用途
 */
//交换变量的值
let x = 1;
let y = 2;

[x, y] = [y, x];

//从函数返回多个值 函数返回多个值放到数组或者对象中返回解构这些值很方便
// 返回一个数组

function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();

// 返回一个对象

function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();

//函数参数的定义
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);

// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});

//提取 JSON 数据
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]

//函数参数的默认值
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
} = {}) {
  // ... do stuff
};

/**
 * 遍历 Map 结构
 * 配合变量的解构赋值，获取键名和键值就非常方便
 */
 const map = new Map();
 map.set('first', 'hello');
 map.set('second', 'world');
 
 for (let [key, value] of map) {
   console.log(key + " is " + value);
 }
 // first is hello
 // second is world

//如果只想获取键名，或者只想获取键值
// 获取键名
for (let [key] of map) {
  // ...
}

// 获取键值
for (let [,value] of map) {
  // ...
}

//输入模块的指定方法 解构赋值使得输入语句非常清晰。
const { SourceMapConsumer, SourceNode } = require("source-map");