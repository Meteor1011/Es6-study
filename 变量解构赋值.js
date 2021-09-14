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

