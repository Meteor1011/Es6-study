/**
 * ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值
 * 概述
 * ES5 的对象属性名都是字符串，这容易造成属性名的冲突。
 * 比如，你使用了一个他人提供的对象，但又想为这个对象添加新的方法（mixin 模式），
 * 新方法的名字就有可能与现有方法产生冲突。如果有一种机制，
 * 保证每个属性的名字都是独一无二的就好了，这样就从根本上防止属性名的冲突。
 * 这就是 ES6 引入Symbol的原因。
 */
 let s = Symbol();

 typeof s
 // "symbol"


//Symbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。
let s1 = Symbol('foo');
let s2 = Symbol('bar');

s1 // Symbol(foo)
s2 // Symbol(bar)
//s1和s2是两个 Symbol 值。如果不加参数，它们在控制台的输出都是Symbol()，不利于区分。
//有了参数以后，就等于为它们加上了描述，输出的时候就能够分清，到底是哪一个值。
s1.toString() // "Symbol(foo)"
s2.toString() // "Symbol(bar)"

//如果 Symbol 的参数是一个对象，就会调用该对象的toString方法，将其转为字符串，然后才生成一个 Symbol 值。
const obj = {
  toString() {
    return 'abc';
  }
};
const sym = Symbol(obj);
sym // Symbol(abc)

//Symbol函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的Symbol函数的返回值是不相等的。
// 没有参数的情况
let s1 = Symbol();
let s2 = Symbol();

s1 === s2 // false

// 有参数的情况
let s1 = Symbol('foo');
let s2 = Symbol('foo');

s1 === s2 // false

//Symbol 值不能与其他类型的值进行运算，会报错
let sym = Symbol('My symbol');

"your symbol is " + sym
// TypeError: can't convert symbol to string
`your symbol is ${sym}`
// TypeError: can't convert symbol to string

//但是，Symbol 值可以显式转为字符串。
let sym = Symbol('My symbol');

String(sym) // 'Symbol(My symbol)'
sym.toString() // 'Symbol(My symbol)'

//Symbol 值也可以转为布尔值，但是不能转为数值
let sym = Symbol();
Boolean(sym) // true
!sym  // false

if (sym) {
  // ...
}

Number(sym) // TypeError
sym + 2 // TypeError

/**
 * Symbol.prototype.description
 * 创建 Symbol 的时候，可以添加一个描述。 此方法返回描述
 */
 const sym = Symbol('foo');

//上面的用法不是很方便。ES2019 提供了一个实例属性description，直接返回 Symbol 的描述。
const sym = Symbol('foo');

String(sym) // "Symbol(foo)"
sym.toString() // "Symbol(foo)"

const sym = Symbol('foo');

sym.description // "foo"

/**
 * 作为属性名的 Symbol
 * 由于每一个 Symbol 值都是不相等的，这意味着 Symbol 值可以作为标识符，用于对象的属性名，
 * 就能保证不会出现同名的属性。这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。
 */

 let mySymbol = Symbol();

 // 第一种写法
 let a = {};
 a[mySymbol] = 'Hello!';
 
 // 第二种写法
 let a = {
   [mySymbol]: 'Hello!'
 };
 
 // 第三种写法
 let a = {};
 Object.defineProperty(a, mySymbol, { value: 'Hello!' });
 
 // 以上写法都得到同样结果
 a[mySymbol] // "Hello!"

//Symbol 值作为对象属性名时，不能用点运算符
const mySymbol = Symbol();
const a = {};

a.mySymbol = 'Hello!';
a[mySymbol] // undefined //当做Symbol变量不能用
a['mySymbol'] // "Hello!"

//同理，在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中。
let s = Symbol();

let obj = {
  [s]: function (arg) { ... }
};

obj[s](123);

//Symbol 类型还可以用于定义一组常量，保证这组常量的值都是不相等的
const log = {};

log.levels = {
  DEBUG: Symbol('debug'),
  INFO: Symbol('info'),
  WARN: Symbol('warn')
};
console.log(log.levels.DEBUG, 'debug message');
console.log(log.levels.INFO, 'info message');

///下面是另外一个例子
const COLOR_RED    = Symbol();
const COLOR_GREEN  = Symbol();

function getComplement(color) {
  switch (color) {
    case COLOR_RED:
      return COLOR_GREEN;
    case COLOR_GREEN:
      return COLOR_RED;
    default:
      throw new Error('Undefined color');
    }
}

/**
 * 实例：消除魔术字符串
 * 魔术字符串指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值。
 * 风格良好的代码，应该尽量消除魔术字符串，改由含义清晰的变量代替。
 * 字符串Triangle就是一个魔术字符串。它多次出现，与代码形成“强耦合”，不利于将来的修改和维护。
 */
 function getArea(shape, options) {
  let area = 0;

  switch (shape) {
    case 'Triangle': // 魔术字符串
      area = .5 * options.width * options.height;
      break;
    /* ... more code ... */
  }

  return area;
}

getArea('Triangle', { width: 100, height: 100 }); // 魔术字符串

//常用的消除魔术字符串的方法，就是把它写成一个变量。
const shapeType = {
  triangle: 'Triangle'
};

function getArea(shape, options) {
  let area = 0;
  switch (shape) {
    case shapeType.triangle:
      area = .5 * options.width * options.height;
      break;
  }
  return area;
}

getArea(shapeType.triangle, { width: 100, height: 100 });

//我们把Triangle写成shapeType对象的triangle属性，这样就消除了强耦合。
//如果仔细分析，可以发现shapeType.triangle等于哪个值并不重要，
//只要确保不会跟其他shapeType属性的值冲突即可。因此，这里就很适合改用 Symbol 值。
const shapeType = {
  triangle: Symbol()
};
//除了将shapeType.triangle的值设为一个 Symbol，其他地方都不用修改

/**
 * 属性名的遍历
 * Symbol 作为属性名，遍历对象的时候，该属性不会出现在for...in、for...of循环中，
 * 也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回
 * 
 * Object.getOwnPropertySymbols()方法，可以获取指定对象的所有 Symbol 属性名。
 * 该方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。
 */
 const obj = {};
 let a = Symbol('a');
 let b = Symbol('b');
 
 obj[a] = 'Hello';
 obj[b] = 'World';
 
 const objectSymbols = Object.getOwnPropertySymbols(obj);
 
 objectSymbols
 // [Symbol(a), Symbol(b)]

//Object.getOwnPropertySymbols()方法与for...in循环、Object.getOwnPropertyNames方法进行对比的例子。
const obj = {};
const foo = Symbol('foo');

obj[foo] = 'bar';

for (let i in obj) {
  console.log(i); // 无输出
}

Object.getOwnPropertyNames(obj) // []
Object.getOwnPropertySymbols(obj) // [Symbol(foo)]

//Reflect.ownKeys()方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。
let obj = {
  [Symbol('my_key')]: 1,
  enum: 2,
  nonEnum: 3
};

Reflect.ownKeys(obj)
//  ["enum", "nonEnum", Symbol(my_key)]

//由于以 Symbol 值作为键名，不会被常规方法遍历得到。我们可以利用这个特性，为对象定义一些非私有的、但又希望只用于内部的方法。
let size = Symbol('size');

class Collection {
  constructor() {
    this[size] = 0;
  }

  add(item) {
    this[this[size]] = item;
    this[size]++;
  }

  static sizeOf(instance) {
    return instance[size];
  }
}

let x = new Collection();
Collection.sizeOf(x) // 0

x.add('foo');
Collection.sizeOf(x) // 1

Object.keys(x) // ['0']
Object.getOwnPropertyNames(x) // ['0']
Object.getOwnPropertySymbols(x) // [Symbol(size)]
//对象x的size属性是一个 Symbol 值，所以Object.keys(x)、Object.getOwnPropertyNames(x)都无法获取它。这就造成了一种非私有的内部方法的效果


/**
 * Symbol.for()，Symbol.keyFor()
 * 我们希望重新使用同一个 Symbol 值，Symbol.for()方法可以做到这一点。
 * 它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。
 * 如果有，就返回这个 Symbol 值，否则就新建一个以该字符串为名称的 Symbol 值，并将其注册到全局。
 */
 let s1 = Symbol.for('foo');
 let s2 = Symbol.for('foo');
 //s1和s2都是 Symbol 值，但是它们都是由同样参数的Symbol.for方法生成的，所以实际上是同一个值。
 s1 === s2 // true

//如果你调用Symbol.for("cat")30 次，每次都会返回同一个 Symbol 值，但是调用Symbol("cat")30 次，会返回 30 个不同的 Symbol 值。
Symbol.for("bar") === Symbol.for("bar")
// true

Symbol("bar") === Symbol("bar")
// false

//Symbol.keyFor()方法返回一个已登记的 Symbol 类型值的key。
let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"
//非Symbol.for 生成的不能返回 key
let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined

//Symbol.for()为 Symbol 值登记的名字，是全局环境的，不管有没有在全局环境运行。
function foo() {
  return Symbol.for('bar');
}

const x = foo();
const y = Symbol.for('bar');
console.log(x === y); // true

/**
 * 实例：模块的 Singleton 模式
 * Singleton 模式指的是调用一个类，任何时候返回的都是同一个实例
 */
// mod.js
function A() {
  this.foo = 'hello';
}

if (!global._foo) {
  global._foo = new A();
}

module.exports = global._foo;

//加载上面的mod.js
const a = require('./mod.js');
console.log(a.foo);

//但是全局变量中的global._foo是可以修改的
global._foo = { foo: 'world' };

const a = require('./mod.js');
console.log(a.foo);
//上面的代码，会使得加载mod.js的脚本都失真
//为了防止这种情况出现，我们就可以使用 Symbol。
// mod.js
const FOO_KEY = Symbol.for('foo');

function A() {
  this.foo = 'hello';
}
//上面代码中，可以保证global[FOO_KEY]不会被无意间覆盖，但还是可以被改写。
if (!global[FOO_KEY]) {
  global[FOO_KEY] = new A();
}

module.exports = global[FOO_KEY];

/**
 * ES6 还提供了 11 个内置的 Symbol 值，指向语言内部使用的方法。
 * Symbol.hasInstance  对象的Symbol.hasInstance属性，指向一个内部方法。
 * 当其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法。
 * 比如，foo instanceof Foo在语言内部，实际调用的是Foo[Symbol.hasInstance](foo)。
 */
class MyClass {
  [Symbol.hasInstance](foo) {
    return foo instanceof Array;
  }
}
//Symbol.hasInstance方法，会在进行instanceof运算时自动调用，判断左侧的运算子是否为Array的实例。
[1, 2, 3] instanceof new MyClass() // true

//下面是另一个例子
class Even {
  static [Symbol.hasInstance](obj) {
    return Number(obj) % 2 === 0;
  }
}

// 等同于
const Even = {
  [Symbol.hasInstance](obj) {
    return Number(obj) % 2 === 0;
  }
};

1 instanceof Even // false
2 instanceof Even // true
12345 instanceof Even // false

/*
 * Symbol.isConcatSpreadable
 * 对象的Symbol.isConcatSpreadable属性等于一个布尔值，
 * 表示该对象用于Array.prototype.concat()时，是否可以展开。
 */
let arr1 = ['c', 'd'];
['a', 'b'].concat(arr1, 'e') // ['a', 'b', 'c', 'd', 'e']
arr1[Symbol.isConcatSpreadable] // undefined 
//数组的默认行为是可以展开，Symbol.isConcatSpreadable默认等于undefined。该属性等于true时，也有展开的效果。

let arr2 = ['c', 'd'];
arr2[Symbol.isConcatSpreadable] = false;
['a', 'b'].concat(arr2, 'e') // ['a', 'b', ['c','d'], 'e']

//类似数组的对象正好相反，默认不展开。它的Symbol.isConcatSpreadable属性设为true，才可以展开。
let obj = {length: 2, 0: 'c', 1: 'd'};
['a', 'b'].concat(obj, 'e') // ['a', 'b', obj, 'e']

obj[Symbol.isConcatSpreadable] = true;
['a', 'b'].concat(obj, 'e') // ['a', 'b', 'c', 'd', 'e']

//Symbol.isConcatSpreadable属性也可以定义在类里面
class A1 extends Array {
  constructor(args) {
    super(args);
    this[Symbol.isConcatSpreadable] = true;
  }
}
class A2 extends Array {
  constructor(args) {
    super(args);
  }
  get [Symbol.isConcatSpreadable] () {
    return false;
  }
}
//注意，Symbol.isConcatSpreadable的位置差异，A1是定义在实例上，A2是定义在类本身，效果相同。

let a1 = new A1(); //设置为true可以展开
a1[0] = 3;
a1[1] = 4;
let a2 = new A2(); //设置为false不可以展开
a2[0] = 5;
a2[1] = 6;
[1, 2].concat(a1).concat(a2)
// [1, 2, 3, 4, [5, 6]]

/**
 * Symbol.match
 * 对象的Symbol.match属性，指向一个函数。当执行str.match(myObject)时，
 * 如果该属性存在，会调用它，返回该方法的返回值
 */
 String.prototype.match(regexp)
 // 等同于
 regexp[Symbol.match](this)
 
 class MyMatcher {
   [Symbol.match](string) {
     return 'hello world'.indexOf(string);
   }
 }
 
 'e'.match(new MyMatcher()) // 1

/**
 * Symbol.replace
 * 对象的Symbol.replace属性，指向一个方法，当该对象被String.prototype.replace方法调用时，会返回该方法的返回值。
 */
 String.prototype.replace(searchValue, replaceValue)
 // 等同于
 searchValue[Symbol.replace](this, replaceValue)

//下面是一个例子
const x = {};
x[Symbol.replace] = (...s) => console.log(s);

'Hello'.replace(x, 'World') // ["Hello", "World"]