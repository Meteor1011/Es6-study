/**
 * 扩展运算符
 * 扩展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。
 */
 console.log(...[1, 2, 3])
 // 1 2 3
 
 console.log(1, ...[2, 3, 4], 5)
 // 1 2 3 4 5
 
 [...document.querySelectorAll('div')]
 // [<div>, <div>, <div>]

//该运算符主要用于函数调用
function push(array, ...items) {
  array.push(...items);
  console.log(array)
}
push([],[1,2,3]) // [[1,2,3]]

function add(x, y) {
  return x + y;
}

const numbers = [4, 38];
add(...numbers) // 42


//扩展运算符与正常的函数参数可以结合使用，非常灵活。
function f(v, w, x, y, z) {console.log(v,w,x,y,z) }
const args = [0, 1];
f(-1, ...args, 2, ...[3]);

//扩展运算符后面还可以放置表达式
const arr = [
  ...(x > 0 ? ['a'] : []),
  'b',
];

//如果扩展运算符后面是一个空数组，则不产生任何效果
[...[], 1]
// [1]

//只有函数调用时，扩展运算符才可以放在圆括号中，否则会报错。
(...[1, 2])
// Uncaught SyntaxError: Unexpected number

console.log((...[1, 2]))
// Uncaught SyntaxError: Unexpected number

console.log(...[1, 2])
// 1 2


//替代函数的 apply 方法
// ES5 的写法
function f(x, y, z) {
  // ...
}
var args = [0, 1, 2];
f.apply(null, args);

// ES6的写法
function f(x, y, z) {
  // ...
}
let args = [0, 1, 2];
f(...args);


//下面是扩展运算符取代apply方法的一个实际的例子，应用Math.max方法，简化求出一个数组最大元素的写法。
// ES5 的写法
Math.max.apply(null, [14, 3, 77])

// ES6 的写法
Math.max(...[14, 3, 77])

// 等同于
Math.max(14, 3, 77);


//另一个例子是通过push函数，将一个数组添加到另一个数组的尾部
// ES5的 写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
Array.prototype.push.apply(arr1, arr2);

// ES6 的写法
let arr1 = [0, 1, 2];
let arr2 = [3, 4, 5];
arr1.push(...arr2);


//下面是另外一个例子
// ES5
new (Date.bind.apply(Date, [null, 2015, 1, 1]))
// ES6
new Date(...[2015, 1, 1]);


/**
 * 扩展运算符的应用
 */
//复制数组 数组是复合的数据类型，直接复制的话，只是复制了指向底层数据结构的指针，而不是克隆一个全新的数组。
const a1 = [1, 2];
const a2 = a1;

a2[0] = 2;
a1 // [2, 2]

//ES5 只能用变通方法来复制数组
const a1 = [1, 2];
const a2 = a1.concat();

a2[0] = 2;
a1 // [1, 2]

//扩展运算符提供了复制数组的简便写法
const a1 = [1, 2];
// 写法一
const a2 = [...a1];
// 写法二
const [...a2] = a1;


//合并数组 扩展运算符提供了数组合并的新写法
const arr1 = ['a', 'b'];
const arr2 = ['c'];
const arr3 = ['d', 'e'];

// ES5 的合并数组
arr1.concat(arr2, arr3);
// [ 'a', 'b', 'c', 'd', 'e' ]

// ES6 的合并数组
[...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]

//不过，这两种方法都是浅拷贝，使用的时候需要注意。
const a1 = [{ foo: 1 }];
const a2 = [{ bar: 2 }];

const a3 = a1.concat(a2);
const a4 = [...a1, ...a2];

a3[0] === a1[0] // true
a4[0] === a1[0] // true

//与解构赋值结合 扩展运算符可以与解构赋值结合起来，用于生成数组
// ES5
a = list[0], rest = list.slice(1)
// ES6
[a, ...rest] = list

//下面是另外一些例子
const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]

const [first, ...rest] = [];
first // undefined
rest  // []

const [first, ...rest] = ["foo"];
first  // "foo"
rest   // []

//如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错
const [...butLast, last] = [1, 2, 3, 4, 5];
// 报错

const [first, ...middle, last] = [1, 2, 3, 4, 5];
// 报错


//字符串 扩展运算符还可以将字符串转为真正的数组
[...'hello'] // [ "h", "e", "l", "l", "o" ]

//上面的写法，有一个重要的好处，那就是能够正确识别四个字节的 Unicode 字符
'x\uD83D\uDE80y'.length // 4
[...'x\uD83D\uDE80y'].length // 3

//凡是涉及到操作四个字节的 Unicode 字符的函数，都有这个问题。因此，最好都用扩展运算符改写。
let str = 'x\uD83D\uDE80y';

str.split('').reverse().join('')
// 'y\uDE80\uD83Dx'

[...str].reverse().join('')
// 'y\uD83D\uDE80x'

/**
 * 上面代码中，先定义了Number对象的遍历器接口，
 * 扩展运算符将5自动转成Number实例以后，就会调用这个接口，就会返回自定义的结果
 */
 Number.prototype[Symbol.iterator] = function*() {
  let i = 0;
  let num = this.valueOf();
  while (i < num) {
    yield i++;
  }
}

console.log([...5]) // [0, 1, 2, 3, 4]

//对于那些没有部署 Iterator 接口的类似数组的对象，扩展运算符就无法将其转为真正的数组。
let arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
};

// TypeError: Cannot spread non-iterable object.
let arr = [...arrayLike];

//Map 和 Set 结构，Generator 函数

//扩展运算符内部调用的是数据结构的 Iterator 接口，因此只要具有 Iterator 接口的对象，都可以使用扩展运算符，比如 Map 结构。
let map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

let arr = [...map.keys()]; // [1, 2, 3]

//Generator 函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符。
const go = function*(){
  yield 1;
  yield 2;
  yield 3;
};

[...go()] // [1, 2, 3]

//如果对没有 Iterator 接口的对象，使用扩展运算符，将会报错
const obj = {a: 1, b: 2};
let arr = [...obj]; // TypeError: Cannot spread non-iterable object

/**
 * Array.from()
 * 用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象
 * 包括 ES6 新增的数据结构 Set 和 Map
 */
 let arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']

//只要是部署了 Iterator 接口的数据结构，Array.from都能将其转为数组。
Array.from('hello')
// ['h', 'e', 'l', 'l', 'o']

let namesSet = new Set(['a', 'b'])
Array.from(namesSet) // ['a', 'b']

//如果参数是一个真正的数组，Array.from会返回一个一模一样的新数组
Array.from([1, 2, 3])
// [1, 2, 3]

//值得提醒的是，扩展运算符（...）也可以将某些数据结构转为数组。
// arguments对象
function foo() {
  const args = [...arguments];
}

// NodeList对象
[...document.querySelectorAll('div')]

/**
 * 扩展运算符背后调用的是遍历器接口（Symbol.iterator），如果一个对象没有部署这个接口，
 * 就无法转换。Array.from方法还支持类似数组的对象。所谓类似数组的对象，本质特征只有一点，
 * 即必须有length属性。因此，任何有length属性的对象，都可以通过Array.from方法转为数组，
 * 而此时扩展运算符就无法转换。
 */
 Array.from({ length: 3 });
 // [ undefined, undefined, undefined ]

//对于还没有部署该方法的浏览器，可以用Array.prototype.slice方法替代。
const toArray = (() =>
  Array.from ? Array.from : obj => [].slice.call(obj)
)();

//Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);

Array.from([1, 2, 3], (x) => x * x)
// [1, 4, 9]

//下面的例子将数组中布尔值为false的成员转为0
Array.from([1, , 2, , 3], (n) => n || 0)
// [1, 0, 2, 0, 3]

//另一个例子是返回各种数据的类型
function typesOf () {
  return Array.from(arguments, value => typeof value)
}
typesOf(null, [], NaN)
// ['object', 'object', 'number']

/**
 * Array.of()
 * 用于将一组值，转换为数组
 * 这个方法的主要目的，是弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()的行为有差异。
 */
 Array.of(3, 11, 8) // [3,11,8]
 Array.of(3) // [3]
 Array.of(3).length // 1

 Array() // []
 Array(3) // [, , ,]
 Array(3, 11, 8) // [3, 11, 8]

//Array.of()基本上可以用来替代Array()或new Array()，并且不存在由于参数不同而导致的重载。它的行为非常统一。
//Array.of()总是返回参数值组成的数组。如果没有参数，就返回一个空数组
Array.of() // []
Array.of(undefined) // [undefined]
Array.of(1) // [1]
Array.of(1, 2) // [1, 2]

//Array.of()方法可以用下面的代码模拟实现
function ArrayOf(){
  return [].slice.call(arguments);
}

/**
 * 数组实例的 copyWithin()
 * 在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。
 * 
 * target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
 * start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算。
 * end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算。
 */
 Array.prototype.copyWithin(target, start = 0, end = this.length)

 [1, 2, 3, 4, 5].copyWithin(0, 3)
// [4, 5, 3, 4, 5] 上面代码表示将从 3 号位直到数组结束的成员（4 和 5），复制到从 0 号位开始的位置，结果覆盖了原来的 1 和 2。

//下面是更多例子。

// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
// [4, 2, 3, 4, 5]

// -2相当于3号位，-1相当于4号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1)
// [4, 2, 3, 4, 5]

// 将3号位复制到0号位
[].copyWithin.call({length: 5, 3: 1}, 0, 3)
// {0: 1, 3: 1, length: 5}

// 将2号位到数组结束，复制到0号位
let i32a = new Int32Array([1, 2, 3, 4, 5]);
i32a.copyWithin(0, 2);
// Int32Array [3, 4, 5, 4, 5]

// 对于没有部署 TypedArray 的 copyWithin 方法的平台
// 需要采用下面的写法
[].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
// Int32Array [4, 2, 3, 4, 5]

/**
 * 数组实例的 find() 和 findIndex()
 * find方法，用于找出第一个符合条件的数组成员。
 * 它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，
 * 然后返回该成员。如果没有符合条件的成员，则返回undefined。
 * 
 * 数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。
 */
 [1, 4, -5, 10].find((n) => n < 0)
 // -5

 [1, 5, 10, 15].find(function(value, index, arr) {
  return value > 9;
}) // 10 

[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2

//这两个方法都可以接受第二个参数，用来绑定回调函数的this对象
function f(v){
  return v > this.age;
}
let person = {name: 'John', age: 20};
[10, 12, 26, 15].find(f, person);    // 26

//另外，这两个方法都可以发现NaN，弥补了数组的indexOf方法的不足。
[NaN].indexOf(NaN)
// -1
//Object.is 判断两个值是否为同一个值
[NaN].findIndex(y => Object.is(NaN, y))
// 0 上面代码中，indexOf方法无法识别数组的NaN成员，但是findIndex方法可以借助Object.is方法做到。

/**
 * 数组实例的 fill()
 * 使用给定值，填充一个数组
 * fill方法用于空数组的初始化非常方便。数组中已有的元素，会被全部抹去。
 */
 ['a', 'b', 'c'].fill(7)
 // [7, 7, 7]
 
 new Array(3).fill(7)
 // [7, 7, 7]

//fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置
 ['a', 'b', 'c'].fill(7, 1, 2)
 // ['a', 7, 'c']   fill方法从 1 号位开始，向原数组填充 7，到 2 号位之前结束

/**
 * 数组实例的 entries()，keys() 和 values()
 * ES6 提供三个新的方法——entries()，keys()和values()——用于遍历数组 
 * 可以用for...of循环进行遍历，唯一的区别是
 * keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。
 */
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"

//如果不使用for...of循环，可以手动调用遍历器对象的next方法，进行遍历
let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']

/**
 * 数组实例的 includes()
 * 返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。ES2016 引入了该方法。
 */
 [1, 2, 3].includes(2)     // true
 [1, 2, 3].includes(4)     // false
 [1, 2, NaN].includes(NaN) // true

/**
 * 该方法的第二个参数表示搜索的起始位置，默认为0。如果第二个参数为负数，则表示倒数的位置，
 * 如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始。
 */
 [1, 2, 3].includes(3, 3);  // false
 [1, 2, 3].includes(3, -1); // true

/**
 * indexOf方法有两个缺点，一是不够语义化，它的含义是找到参数值的第一个出现位置，
 * 所以要去比较是否不等于-1，表达起来不够直观。二是，它内部使用严格相等运算符（===）进行判断，这会导致对NaN的误判。
 */
 [NaN].indexOf(NaN)
 // -1

 [NaN].includes(NaN)
// true


//如果当前环境不支持该方法
const contains = (() =>
  Array.prototype.includes
    ? (arr, value) => arr.includes(value)
    : (arr, value) => arr.some(el => el === value)
)();
contains(['foo', 'bar'], 'baz'); // => false

/**
 * 数组实例的 flat()，flatMap()
 * 数组的成员有时还是数组，Array.prototype.flat()用于将嵌套的数组“拉平”，
 * 变成一维的数组。该方法返回一个新数组，对原数据没有影响。
 */
 [1, 2, [3, 4]].flat()
 // [1, 2, 3, 4]

//flat()默认只会“拉平”一层，如果想要“拉平”多层的嵌套数组，可以将flat()方法的参数写成一个整数，表示想要拉平的层数，默认为1。
[1, 2, [3, [4, 5]]].flat()
// [1, 2, 3, [4, 5]]

[1, 2, [3, [4, 5]]].flat(2)
// [1, 2, 3, 4, 5]

//如果不管有多少层嵌套，都要转成一维数组，可以用Infinity关键字作为参数
[1, [2, [3]]].flat(Infinity)
// [1, 2, 3]

//如果原数组有空位，flat()方法会跳过空位
[1, 2, , 4, 5].flat()
// [1, 2, 4, 5]

//flatMap()方法对原数组的每个成员执行一个函数（相当于执行Array.prototype.map()），
//然后对返回值组成的数组执行flat()方法。该方法返回一个新数组，不改变原数组。
//先执行map 再执行flat
// 相当于 [[2, 4], [3, 6], [4, 8]].flat()
[2, 3, 4].flatMap((x) => [x, x * 2])
// [2, 4, 3, 6, 4, 8]

//flatMap()只能展开一层数组。
// 相当于 [[[2]], [[4]], [[6]], [[8]]].flat()
[1, 2, 3, 4].flatMap(x => [[x * 2]])
// [[2], [4], [6], [8]]

//flatMap()方法的参数是一个遍历函数，该函数可以接受三个参数，分别是当前数组成员、当前数组成员的位置（从零开始）、原数组。
arr.flatMap(function callback(currentValue[, index[, array]]) {
  // ...
}[, thisArg]) //flatMap()方法还可以有第二个参数，用来绑定遍历函数里面的this


/**
 * 数组的空位 
 * 注意，空位不是undefined，一个位置的值等于undefined，依然是有值的。空位是没有任何值，in运算符可以说明这一点。
 */
//第一个数组的 0 号位置是有值的，第二个数组的 0 号位置没有值
 0 in [undefined, undefined, undefined] // true
 0 in [, , ,] // false

//ES5 对空位的处理，已经很不一致了，大多数情况下会忽略空位。
// forEach方法
[,'a'].forEach((x,i) => console.log(i)); // 1

// filter方法
['a',,'b'].filter(x => true) // ['a','b']

// every方法
[,'a'].every(x => x==='a') // true

// reduce方法
[1,,2].reduce((x,y) => x+y) // 3

// some方法
[,'a'].some(x => x !== 'a') // false

// map方法
[,'a'].map(x => 1) // [,1]

// join方法
[,'a',undefined,null].join('#') // "#a##"

// toString方法
[,'a',undefined,null].toString() // ",a,,"


//ES6 则是明确将空位转为undefined。
//Array.from方法会将数组的空位，转为undefined，也就是说，这个方法不会忽略空位。
Array.from(['a',,'b'])
// [ "a", undefined, "b" ]

//扩展运算符（...）也会将空位转为undefined
[...['a',,'b']]
// [ "a", undefined, "b" ]

//copyWithin()会连空位一起拷贝 最后那个逗号后面不算是数组中的空数据
[,'a','b',,].copyWithin(2,0) // [,"a",,"a"]

//fill()会将空位视为正常的数组位置。
new Array(3).fill('a') // ["a","a","a"]

//for...of循环也会遍历空位。
let arr = [, ,];
for (let i of arr) {
  console.log(1);
}
// 1
// 1

//entries()、keys()、values()、find()和findIndex()会将空位处理成undefined
// entries()
[...[,'a'].entries()] // [[0,undefined], [1,"a"]]

// keys()
[...[,'a'].keys()] // [0,1]

// values()
[...[,'a'].values()] // [undefined,"a"]

// find()
[,'a'].find(x => true) // undefined

// findIndex()
[,'a'].findIndex(x => true) // 0


/**
 * Array.prototype.sort() 的排序稳定性
 * 排序稳定性（stable sorting）是排序算法的重要属性，
 * 指的是排序关键字相同的项目，排序前后的顺序不变。
 */
 const arr = [
  'peach',
  'straw',
  'apple',
  'spork'
];

const stableSorting = (s1, s2) => {
  if (s1[0] < s2[0]) return -1;
  return 1;
};

arr.sort(stableSorting)
// ["apple", "peach", "straw", "spork"]
//上面代码对数组arr按照首字母进行排序。排序结果中，straw在spork的前面，跟原始顺序一致，所以排序算法stableSorting是稳定排序
const unstableSorting = (s1, s2) => {
  if (s1[0] <= s2[0]) return -1;
  return 1;
};

arr.sort(unstableSorting)
// ["apple", "peach", "spork", "straw"]

//Array.prototype.sort()的默认排序算法必须稳定。这个规定已经做到了，现在 JavaScript 各个主要实现的默认排序算法都是稳定的。