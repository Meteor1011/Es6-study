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


