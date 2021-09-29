/**
 * Set 
 * ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
 */
 const s = new Set(); //构造函数

 [2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));
 
 for (let i of s) {
   console.log(i);
 }
 // 2 3 5 4

//Set函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。
// 例一
const set = new Set([1, 2, 3, 4, 4]);
[...set]
// [1, 2, 3, 4]

// 例二
const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
items.size // 5

// 例三 类数组的对象作为参数
const set = new Set(document.querySelectorAll('div'));
set.size // 56

// 类似于
const set = new Set();
document
 .querySelectorAll('div')
 .forEach(div => set.add(div));
set.size // 56

//上面代码也展示了一种去除数组重复成员的方法
[...new Set(array)]

//去除字符串里面的重复字符。
[...new Set('ababbc')].join('')
// "abc"

/**
 * 向 Set 加入值的时候，不会发生类型转换，所以5和"5"是两个不同的值。
 * Set 内部判断两个值是否不同，使用的算法叫做“Same-value-zero equality”，
 * 它类似于精确相等运算符（===），主要的区别是向 Set 加入值时认为NaN等于自身，
 * 而精确相等运算符认为NaN不等于自身。
 */
 let set = new Set();
 let a = NaN;
 let b = NaN;
 set.add(a);
 set.add(b);
 set // Set {NaN}  Set会认为NaN是相等的

//两个对象总是不相等的
let set = new Set();

set.add({});
set.size // 1

set.add({});
set.size // 2

/**
 * Set 实例的属性和方法
 * Set.prototype.constructor：构造函数，默认就是Set函数
 * Set.prototype.size：返回Set实例的成员总数
 * 
 * Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。下面先介绍四个操作方法。
 * Set.prototype.add(value)：添加某个值，返回 Set 结构本身
 * Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
 * Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员
 * Set.prototype.clear()：清除所有成员，没有返回值
 */
 s.add(1).add(2).add(2);
 // 注意2被加入了两次
 
 s.size // 2
 
 s.has(1) // true
 s.has(2) // true
 s.has(3) // false
 
 s.delete(2);
 s.has(2) // false

//下面是一个对比，看看在判断是否包括一个键上面，Object结构和Set结构的写法不同。
// 对象的写法
const properties = {
  'width': 1,
  'height': 1
};

if (properties[someName]) {
  // do something
}

// Set的写法
const properties = new Set();

properties.add('width');
properties.add('height');

if (properties.has(someName)) {
  // do something
}

//Array.from方法可以将 Set 结构转为数组
const items = new Set([1, 2, 3, 4, 5]);
const array = Array.from(items);

//这就提供了去除数组重复成员的另一种方法
function dedupe(array) {
  return Array.from(new Set(array));
}

dedupe([1, 1, 2, 3]) // [1, 2, 3]

/**
 * Set 结构的实例有四个遍历方法
 * keys方法、values方法、entries方法返回的都是遍历器对象
 * 由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。
 * Set.prototype.keys()：返回键名的遍历器
 * Set.prototype.values()：返回键值的遍历器
 * Set.prototype.entries()：返回键值对的遍历器
 * Set.prototype.forEach()：使用回调函数遍历每个成员
 * 
 * Set的遍历顺序就是插入顺序。这个特性有时非常有用，比如使用 Set 保存一个回调函数列表，调用时就能保证按照添加顺序调用。
 */
 let set = new Set(['red', 'green', 'blue']);

 for (let item of set.keys()) {
   console.log(item);
 }
 // red
 // green
 // blue
 
 for (let item of set.values()) {
   console.log(item);
 }
 // red
 // green
 // blue
 
 for (let item of set.entries()) {
   console.log(item);
 }
 // ["red", "red"]
 // ["green", "green"]
 // ["blue", "blue"]


//Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法
Set.prototype[Symbol.iterator] === Set.prototype.values
// true

let set = new Set(['red', 'green', 'blue']);

//这意味着，可以省略values方法，直接用for...of循环遍历 Set。
for (let x of set) {
  console.log(x);
}
// red
// green
// blue

//Set 结构的实例与数组一样，也拥有forEach方法，用于对每个成员执行某种操作，没有返回值
let set = new Set([1, 4, 9]);
set.forEach((value, key) => console.log(key + ' : ' + value))
// 1 : 1
// 4 : 4
// 9 : 9

//扩展运算符（...）内部使用for...of循环，所以也可以用于 Set 结构
let set = new Set(['red', 'green', 'blue']);
let arr = [...set];
// ['red', 'green', 'blue']

//扩展运算符和 Set 结构相结合，就可以去除数组的重复成员。
let arr = [3, 5, 2, 2, 5, 5];
let unique = [...new Set(arr)];
// [3, 5, 2]

//数组的map和filter方法也可以间接用于 Set 了
let set = new Set([1, 2, 3]);
set = new Set([...set].map(x => x * 2));
// 返回Set结构：{2, 4, 6}

let set = new Set([1, 2, 3, 4, 5]);
set = new Set([...set].filter(x => (x % 2) == 0));
// 返回Set结构：{2, 4}

//因此使用 Set 可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）。
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// （a 相对于 b 的）差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}

//利用Array.from 方法
// 方法一
let set = new Set([1, 2, 3]);
set = new Set([...set].map(val => val * 2));
// set的值是2, 4, 6

// 方法二
let set = new Set([1, 2, 3]);
set = new Set(Array.from(set, val => val * 2));
// set的值是2, 4, 6

/**
 * WeakSet 结构与Set类似，都是不重复的值的集合。区别是WeakSet的成员只能是对象
 * WeakSet 的成员是不适合引用的，因为它会随时消失。另外，由于 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行，
 * 运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，因此 ES6 规定 WeakSet 不可遍历。
 * 
 * WeakSet.prototype.add(value)：向 WeakSet 实例添加一个新成员。
 * WeakSet.prototype.delete(value)：清除 WeakSet 实例的指定成员
 * WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。
 */
 const ws = new WeakSet();
 ws.add(1)
 // TypeError: Invalid value used in weak set
 ws.add(Symbol())
 // TypeError: invalid value used in weak set


//WeakSet 可以接受一个数组或类似数组的对象作为参数 该数组的所有成员，都会自动成为 WeakSet 实例对象的成员。
const a = [[1, 2], [3, 4]];
const ws = new WeakSet(a);
// WeakSet {[1, 2], [3, 4]}  是a数组的成员成为 WeakSet 的成员，而不是a数组本身。这意味着，数组的成员只能是对象。
const b = [3, 4];
const ws = new WeakSet(b);
// Uncaught TypeError: Invalid value used in weak set(…

//三个实例方法
const ws = new WeakSet();
const obj = {};
const foo = {};

ws.add(window);
ws.add(obj);

ws.has(window); // true
ws.has(foo);    // false

ws.delete(window);
ws.has(window);    // false

//WeakSet 没有size属性，没有办法遍历它的成员
ws.size // undefined
ws.forEach // undefined

ws.forEach(function(item){ console.log('WeakSet has ' + item)})
// TypeError: undefined is not a function

/**
 * Foo的实例方法，只能在Foo的实例上调用。这里使用 WeakSet 的好处是，foos对实例的引用，
 * 不会被计入内存回收机制，所以删除实例的时候，不用考虑foos，也不会出现内存泄漏。
 */
 const foos = new WeakSet()
 class Foo {
   constructor() {
     foos.add(this)
   }
   method () {
     if (!foos.has(this)) {
       throw new TypeError('Foo.prototype.method 只能在Foo的实例上调用！');
     }
   }
 }


/**
 * Map
 * JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），
 * 但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。
 * Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。
 */
const data = {};
const element = document.getElementById('myDiv');

data[element] = 'metadata';
data['[object HTMLDivElement]'] // "metadata"

//ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键
const m = new Map();
const o = {p: 'Hello World'};

m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false


//如何向 Map 添加成员。作为构造函数，Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。
const map = new Map([
  ['name', '张三'],
  ['title', 'Author'] //数组为键值对
]);

map.size // 2
map.has('name') // true
map.get('name') // "张三"
map.has('title') // true
map.get('title') // "Author"

//Map构造函数接受数组作为参数，实际上执行的是下面的算法。
const items = [
  ['name', '张三'],
  ['title', 'Author']
];

const map = new Map();

items.forEach(
  ([key, value]) => map.set(key, value)
);

//如果对同一个键多次赋值，后面的值将覆盖前面的值
const map = new Map();

map
.set(1, 'aaa')
.set(1, 'bbb');

map.get(1) // "bbb"

//如果读取一个未知的键，则返回undefined
new Map().get('asfddfsasadf')
// undefined

//只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心
const map = new Map();

map.set(['a'], 555);
map.get(['a']) // undefined 不是同一个对象

//同样的值的两个实例，在 Map 结构中被视为两个键。
const map = new Map();

const k1 = ['a'];
const k2 = ['a'];

map
.set(k1, 111)
.set(k2, 222);

map.get(k1) // 111
map.get(k2) // 222

/**
 * 如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，
 * Map 将其视为一个键，比如0和-0就是一个键，布尔值true和字符串true则是两个不同的键。
 * 另外，undefined和null也是两个不同的键。虽然NaN不严格相等于自身，但 Map 将其视为同一个键。
 */
 let map = new Map();

 map.set(-0, 123);
 map.get(+0) // 123
 
 map.set(true, 1);
 map.set('true', 2);
 map.get(true) // 1
 
 map.set(undefined, 3);
 map.set(null, 4);
 map.get(undefined) // 3
 //特殊的NaN  map中也视为一样
 map.set(NaN, 123);
 map.get(NaN) // 123

//实例的属性和操作方法
//size 属性
const map = new Map();
map.set('foo', true);
map.set('bar', false);

map.size // 2

//Map.prototype.set(key, value) 有key键直接更新，没有则生成新的
const m = new Map();

m.set('edition', 6)        // 键是字符串
m.set(262, 'standard')     // 键是数值
m.set(undefined, 'nah')    // 键是 undefined

//set方法返回的是当前的Map对象，因此可以采用链式写法。
let map = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');

//Map.prototype.get(key) get方法读取key对应的键值，如果找不到key，返回undefined。
const m = new Map();

const hello = function() {console.log('hello');};
m.set(hello, 'Hello ES6!') // 键是函数

m.get(hello)  // Hello ES6!

//Map.prototype.has(key)  返回一个布尔值，表示某个键是否在当前 Map 对象之中
const m = new Map();

m.set('edition', 6);
m.set(262, 'standard');
m.set(undefined, 'nah');

m.has('edition')     // true
m.has('years')       // false
m.has(262)           // true
m.has(undefined)     // true

//Map.prototype.delete(key) 删除某个键，返回true。如果删除失败，返回false
const m = new Map();
m.set(undefined, 'nah');
m.has(undefined)     // true

m.delete(undefined)
m.has(undefined)       // false


//Map.prototype.clear() 清空所有成员  无返回值
let map = new Map();
map.set('foo', true);
map.set('bar', false);

map.size // 2
map.clear()
map.size // 0


/**
 * 遍历方法
 * Map.prototype.keys()：返回键名的遍历器。
 * Map.prototype.values()：返回键值的遍历器。
 * Map.prototype.entries()：返回所有成员的遍历器。
 * Map.prototype.forEach()：遍历 Map 的所有成员。
 * Map 的遍历顺序就是插入顺序
 */
const map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);

for (let key of map.keys()) {
  console.log(key);
}
// "F"
// "T"

for (let value of map.values()) {
  console.log(value);
}
// "no"
// "yes"

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

// 等同于使用map.entries()
for (let [key, value] of map) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

//表示 Map 结构的默认遍历器接口（Symbol.iterator属性），就是entries方法。
map[Symbol.iterator] === map.entries
// true


//Map 结构转为数组结构，比较快速的方法是使用扩展运算符（...）。
const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

[...map.keys()]
// [1, 2, 3]

[...map.values()]
// ['one', 'two', 'three']

[...map.entries()]
// [[1,'one'], [2, 'two'], [3, 'three']]

[...map]
// [[1,'one'], [2, 'two'], [3, 'three']]

//结合数组的map方法、filter方法，可以实现 Map 的遍历和过滤（Map 本身没有map和filter方法）
const map0 = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');

const map1 = new Map(
  [...map0].filter(([k, v]) => k < 3)
);
// 产生 Map 结构 {1 => 'a', 2 => 'b'}

const map2 = new Map(
  [...map0].map(([k, v]) => [k * 2, '_' + v])
    );
// 产生 Map 结构 {2 => '_a', 4 => '_b', 6 => '_c'}

//Map 还有一个forEach方法，与数组的forEach方法类似，也可以实现遍历
map.forEach(function(value, key, map) {
  console.log("Key: %s, Value: %s", key, value);
});

//forEach方法还可以接受第二个参数，用来绑定this。
const reporter = {
  report: function(key, value) {
    console.log("Key: %s, Value: %s", key, value);
  }
};

map.forEach(function(value, key, map) {
  this.report(key, value);
}, reporter);

//Map 转为数组
const myMap = new Map()
  .set(true, 7)
  .set({foo: 3}, ['abc']);
[...myMap]
// [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]

//数组转为Map
new Map([
  [true, 7],
  [{foo: 3}, ['abc']]
])
// Map {
//   true => 7,
//   Object {foo: 3} => ['abc']
// }


//Map 转为对象 如果所有 Map 的键都是字符串，它可以无损地转为对象。
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

const myMap = new Map()
  .set('yes', true)
  .set('no', false);
strMapToObj(myMap)
// { yes: true, no: false }
//如果有非字符串的键名，那么这个键名会被转成字符串，再作为对象的键名。


//对象转为 Map 可以通过Object.entries()。
let obj = {"a":1, "b":2};
let map = new Map(Object.entries(obj));

//对象转为 Map 也可以自己实现一个转换函数。
function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}

objToStrMap({yes: true, no: false})
// Map {"yes" => true, "no" => false}

/**
 * Map 转为 JSON
 * Map 转为 JSON 要区分两种情况。
 * 一种情况是，Map 的键名都是字符串，这时可以选择转为对象 JSON。
 */
 function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));
}

let myMap = new Map().set('yes', true).set('no', false);
strMapToJson(myMap)
// '{"yes":true,"no":false}'

//另一种情况是，Map 的键名有非字符串，这时可以选择转为数组 JSON。
function mapToArrayJson(map) {
  return JSON.stringify([...map]);
}

let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
mapToArrayJson(myMap)
// '[[true,7],[{"foo":3},["abc"]]]'


//JSON 转为 Map
function jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}

jsonToStrMap('{"yes": true, "no": false}')
// Map {'yes' => true, 'no' => false}

/**
 * 但是，有一种特殊情况，整个 JSON 就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。
 * 这时，它可以一一对应地转为 Map。这往往是 Map 转为数组 JSON 的逆操作。
 */
 function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr));
}

jsonToMap('[[true,7],[{"foo":3},["abc"]]]')
// Map {true => 7, Object {foo: 3} => ['abc']}


/**
 * WeakMap
 * WeakMap结构与Map结构类似，也是用于生成键值对的集合。
 * WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。
 * WeakMap的键名所指向的对象，不计入垃圾回收机制。
 */
// WeakMap 可以使用 set 方法添加成员
const wm1 = new WeakMap();
const key = {foo: 1};
wm1.set(key, 2);
wm1.get(key) // 2

// WeakMap 也可以接受一个数组，
// 作为构造函数的参数
const k1 = [1, 2, 3];
const k2 = [4, 5, 6];
const wm2 = new WeakMap([[k1, 'foo'], [k2, 'bar']]);
wm2.get(k2) // "bar"

const map = new WeakMap();
map.set(1, 2)
// TypeError: 1 is not an object!
map.set(Symbol(), 2)
// TypeError: Invalid value used as weak map key
map.set(null, 2)
// TypeError: Invalid value used as weak map key


/**
 * WeakMap的设计目的在于，有时我们想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用。请看下面的例子。
 * e1和e2是两个对象，我们通过arr数组对这两个对象添加一些文字说明。这就形成了arr对e1和e2的引用。
 * 一旦不再需要这两个对象，我们就必须手动删除这个引用，否则垃圾回收机制就不会释放e1和e2占用的内存。
 */
 const e1 = document.getElementById('foo');
 const e2 = document.getElementById('bar');
 const arr = [
   [e1, 'foo 元素'],
   [e2, 'bar 元素'],
 ];

 // 不需要 e1 和 e2 的时候
 // 必须手动删除引用
 //一旦忘了写，就会造成内存泄露
arr [0] = null;
arr [1] = null;

/**
 * WeakMap 就是为了解决这个问题而诞生的，它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。
 * 因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。
 * 也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。
 * 
 * WeakMap的专用场合就是，它的键所对应的对象，可能会在将来消失。WeakMap结构有助于防止内存泄漏。
 */
//如果你要往对象上添加数据，又不想干扰垃圾回收机制
 const wm = new WeakMap();

 const element = document.getElementById('example');
 
 wm.set(element, 'some information');
 wm.get(element) // "some information"

/**
 * WeakMap只有四个方法可用：get()、set()、has()、delete()。
 * 没有keys()、values()和entries()方法），也没有size属性
 */
 const wm = new WeakMap();

 // size、forEach、clear 方法都不存在
 wm.size // undefined
 wm.forEach // undefined
 wm.clear // undefined

//WeakMap 的另一个用处是部署私有属性。
const _counter = new WeakMap();
const _action = new WeakMap();

class Countdown {
  constructor(counter, action) {
    _counter.set(this, counter);
    _action.set(this, action);
  }
  dec() {
    let counter = _counter.get(this);
    if (counter < 1) return;
    counter--;
    _counter.set(this, counter);
    if (counter === 0) {
      _action.get(this)();
    }
  }
}

const c = new Countdown(2, () => console.log('DONE'));

c.dec()
c.dec()
// DONE
//上面代码中，Countdown类的两个内部属性_counter和_action，是实例的弱引用，
//所以如果删除实例，它们也就随之消失，不会造成内存泄漏。

/**
 * WeakRef
 * WeakSet 和 WeakMap 是基于弱引用的数据结构，ES2021 更进一步，提供了 WeakRef 对象，用于直接创建对象的弱引用。
 */
 let target = {};
 let wr = new WeakRef(target);
 //target是原始对象，构造函数WeakRef()创建了一个基于target的新对象wr。这里，wr就是一个 WeakRef 的实例，属于对target的弱引用，垃圾回收机制不会计入这个引用，
 //也就是说，wr的引用不会妨碍原始对象target被垃圾回收机制清除。

 //WeakRef 实例对象有一个deref()方法，如果原始对象存在，该方法返回原始对象；如果原始对象已经被垃圾回收机制清除，该方法返回undefined。
let target = {};
let wr = new WeakRef(target);
//deref()方法可以判断原始对象是否已被清除
let obj = wr.deref();
if (obj) { // target 未被垃圾回收机制清除
  // ...
}

//弱引用对象的一大用处，就是作为缓存，未被清除时可以从缓存取值，一旦清除缓存就自动失效。
function makeWeakCached(f) {
  const cache = new Map();
  return key => {
    const ref = cache.get(key);
    if (ref) {
      const cached = ref.deref();
      if (cached !== undefined) return cached;
    }

    const fresh = f(key);
    cache.set(key, new WeakRef(fresh));
    return fresh;
  };
}

const getImageCached = makeWeakCached(getImage);