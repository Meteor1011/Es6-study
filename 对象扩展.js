/**
 * 属性的简洁表示法 
 * ES6 允许在大括号里面，直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。
 */
 const foo = 'bar';
 const baz = {foo};
 baz // {foo: "bar"}
 
 // 等同于
 const baz = {foo: foo};

//属性名就是变量名, 属性值就是变量值
function f(x, y) {
  return {x, y};
}

// 等同于

function f(x, y) {
  return {x: x, y: y};
}

f(1, 2) // Object {x: 1, y: 2}

//除了属性简写，方法也可以简写。
const o = {
  method() {
    return "Hello!";
  }
};

// 等同于
const o = {
  method: function() {
    return "Hello!";
  }
};

let birth = '2000/01/01';

const Person = {

  name: '张三',

  //等同于birth: birth
  birth,

  // 等同于hello: function ()...
  hello() { console.log('我的名字是', this.name); }

};

//这种写法用于函数的返回值，将会非常方便
function getPoint() {
  const x = 1;
  const y = 10;
  return {x, y};
}

getPoint()
// {x:1, y:10}

//CommonJS 模块输出一组变量，就非常合适使用简洁写法
let ms = {};

function getItem (key) {
  return key in ms ? ms[key] : null;
}

function setItem (key, value) {
  ms[key] = value;
}

function clear () {
  ms = {};
}

module.exports = { getItem, setItem, clear };
// 等同于
module.exports = {
  getItem: getItem,
  setItem: setItem,
  clear: clear
};

//属性的赋值器（setter）和取值器（getter），事实上也是采用这种写法
const cart = {
  _wheels: 4,

  get wheels () {
    return this._wheels;
  },

  set wheels (value) {
    if (value < this._wheels) {
      throw new Error('数值太小了！');
    }
    this._wheels = value;
  }
}

//简洁写法在打印对象时也很有用
let user = {
  name: 'test'
};

let foo = {
  bar: 'baz'
};

console.log(user, foo)
// {name: "test"} {bar: "baz"}
console.log({user, foo})
// {user: {name: "test"}, foo: {bar: "baz"}}

//注意，简写的对象方法不能用作构造函数，会报错。
const obj = {
  f() {
    this.foo = 'bar';
  }
};

new obj.f() // 报错

/**
 * 属性名表达式
 * 定义对象的属性，有两种方法。
 */
// 方法一
obj.foo = true;

// 方法二
obj['a' + 'bc'] = 123;

//在 ES5 中只能使用方法一（标识符）定义属性。
var obj = {
  foo: true,
  abc: 123
};

//ES6 允许字面量定义对象时，用方法二（表达式）作为对象的属性名，即把表达式放在方括号内。
let propKey = 'foo';

let obj = {
  [propKey]: true,
  ['a' + 'bc']: 123
};

//下面是另一个例子。
let lastWord = 'last word';

const a = {
  'first word': 'hello',
  [lastWord]: 'world'
};

a['first word'] // "hello"
a[lastWord] // "world"
a['last word'] // "world"

//表达式还可以用于定义方法名。
let obj = {
  ['h' + 'ello']() {
    return 'hi';
  }
};

obj.hello() // hi


//注意，属性名表达式与简洁表示法，不能同时使用，会报错。
// 报错 Uncaught SyntaxError: Unexpected token '}'
const foo = 'bar';
const bar = 'abc';
const baz = { [foo] };

// 正确
const foo = 'bar';
const baz = { [foo]: 'abc'};

//注意，属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串[object Object]，这一点要特别小心。
const keyA = {a: 1};
const keyB = {b: 2};

const myObject = {
  [keyA]: 'valueA',
  [keyB]: 'valueB'
};

myObject // Object {[object Object]: "valueB"}

/**
 * 方法的 name 属性
 * 函数的name属性，返回函数名。对象方法也是函数，因此也有name属性。
*/
const person = {
  sayName() {
    console.log('hello!');
  },
};

person.sayName.name   // "sayName"

/**
 * 如果对象的方法使用了取值函数（getter）和存值函数（setter），
 * 则name属性不是在该方法上面，而是该方法的属性的描述对象的get和set属性上面，
 * 返回值是方法名前加上get和set
 */
const obj = {
  get foo() {},
  set foo(x) {}
};

obj.foo.name
// TypeError: Cannot read property 'name' of undefined

const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo');

descriptor.get.name // "get foo"
descriptor.set.name // "set foo"

/**
 * 有两种特殊情况：bind方法创造的函数，
 * name属性返回bound加上原函数的名字；
 * Function构造函数创造的函数，name属性返回anonymous。
 */
 (new Function()).name // "anonymous"

 var doSomething = function() {
   // ...
 };
 doSomething.bind().name // "bound doSomething"

//如果对象的方法是一个 Symbol 值，那么name属性返回的是这个 Symbol 值的描述
const key1 = Symbol('description');
const key2 = Symbol();
let obj = {
  [key1]() {},
  [key2]() {},
};
//上面代码中，key1对应的 Symbol 值有描述，key2没有。
obj[key1].name // "[description]"
obj[key2].name // ""

//属性的可枚举性和遍历
//对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。
//Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象。
let obj = { foo: 123 };
Object.getOwnPropertyDescriptor(obj, 'foo')
//  {
//    value: 123,
//    writable: true,
//    enumerable: true, 称为“可枚举性”
//    configurable: true 
//  }

//目前，有四个操作会忽略enumerable为false的属性。
for...in //循环：只遍历对象自身的和继承的可枚举的属性。
Object.keys() //：返回对象自身的所有可枚举的属性的键名。
JSON.stringify() //：只串行化对象自身的可枚举的属性。
Object.assign() //： 忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。

//ES6 规定，所有 Class 的原型的方法都是不可枚举的
Object.getOwnPropertyDescriptor(class {foo() {}}.prototype, 'foo').enumerable
// false
//总的来说，操作中引入继承的属性会让问题复杂化，大多数时候，我们只关心对象自身的属性。所以，尽量不要用for...in循环，而用Object.keys()代替。


/**
 * 属性的遍历
 * for...in 遍历对象自身的和继承的可枚举属性
 * Object.keys(obj)  返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。
 * Object.getOwnPropertyNames(obj)  返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。
 * Object.getOwnPropertySymbols(obj) 返回一个数组，包含对象自身的所有 Symbol 属性的键名。
 * Reflect.ownKeys(obj) 返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。
 * 首先遍历所有数值键，按照数值升序排列。
 * 其次遍历所有字符串键，按照加入时间升序排列。
 * 最后遍历所有 Symbol 键，按照加入时间升序排列。
 */
 Reflect.ownKeys({ [Symbol()]:0, b:0, 10:0, 2:0, a:0 })
 // ['2', '10', 'b', 'a', Symbol()]
 //数组的属性次序是这样的，首先是数值属性2和10，其次是字符串属性b和a，最后是 Symbol 属性。

/**
 * super 关键字
 * this关键字总是指向函数所在的当前对象，ES6 又新增了另一个类似的关键字super，指向当前对象的原型对象。
 */
const proto = {
  foo: 'hello'
};

const obj = {
  foo: 'world',
  find() {
    return super.foo;
  }
};
// 设置obj的原型对象是proto
Object.setPrototypeOf(obj, proto);
obj.find() // "hello"

//super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。
//第一种写法是super用在属性里面，第二种和第三种写法是super用在一个函数里面，然后赋值给foo属性。
//目前，只有对象方法的简写法可以让 JavaScript 引擎确认，定义的是对象的方法。
// 报错
const obj = {
  foo: super.foo
}

// 报错
const obj = {
  foo: () => super.foo
}

// 报错
const obj = {
  foo: function () {
    return super.foo
  }
}


//super.foo等同于Object.getPrototypeOf(this).foo（属性）或Object.getPrototypeOf(this).foo.call(this)（方法）。
const proto = {
  x: 'hello',
  foo() {
    console.log(this.x);
  },
};

const obj = {
  x: 'world',
  foo() {
    super.foo();
  }
}

Object.setPrototypeOf(obj, proto);

obj.foo() // "world"


/**
 * 对象的扩展运算符
 */
//解构赋值
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }

//由于解构赋值要求等号右边是一个对象，所以如果等号右边是undefined或null，就会报错，因为它们无法转为对象。
let { ...z } = null; // 运行时错误
let { ...z } = undefined; // 运行时错误

//解构赋值必须是最后一个参数，否则会报错
let { ...x, y, z } = someObject; // 句法错误
let { x, ...y, ...z } = someObject; // 句法错误

//解构赋值的拷贝是浅拷贝，即如果一个键的值是复合类型的值（数组、对象、函数）、那么解构赋值拷贝的是这个值的引用，而不是这个值的副本。
let obj = { a: { b: 1 } };
let { ...x } = obj;
obj.a.b = 2;
x.a.b // 2

//扩展运算符的解构赋值，不能复制继承自原型对象的属性。
let o1 = { a: 1 };
let o2 = { b: 2 };
o2.__proto__ = o1;
let { ...o3 } = o2;
o3 // { b: 2 }
o3.a // undefined

const o = Object.create({ x: 1, y: 2 });
o.z = 3;
//变量x是单纯的解构赋值，所以可以读取对象o继承的属性；变量y和z是扩展运算符的解构赋值，只能读取对象o自身的属性，所以变量z可以赋值成功，变量y取不到值
let { x, ...newObj } = o;
let { y, z } = newObj;
x // 1
y // undefined
z // 3

//ES6 规定，变量声明语句之中，如果使用解构赋值，扩展运算符后面必须是一个变量名，
//而不能是一个解构赋值表达式，所以上面代码引入了中间变量newObj，如果写成下面这样会报错。
let { x, ...{ y, z } } = o; /// ...后面必须跟一个变量
// SyntaxError: ... must be followed by an identifier in declaration contexts

//解构赋值的一个用处，是扩展某个函数的参数，引入其他操作。
function baseFunction({ a, b }) {
  // ...
}
//原始函数baseFunction接受a和b作为参数，函数wrapperFunction在baseFunction的基础上进行了扩展，能够接受多余的参数，并且保留原始函数的行为
function wrapperFunction({ x, y, ...restConfig }) {
  // 使用 x 和 y 参数进行操作
  // 其余参数传给原始函数
  return baseFunction(restConfig);
}

/**
 * 扩展运算符
 * 取出参数对象的所有可遍历属性
 */
 let z = { a: 3, b: 4 };
 let n = { ...z };
 n // { a: 3, b: 4 }

// 由于数组是特殊的对象，所以对象的扩展运算符也可以用于数组。
let foo = { ...['a', 'b', 'c'] };
foo
// {0: "a", 1: "b", 2: "c"}

//如果扩展运算符后面是一个空对象，则没有任何效果
{...{}, a: 1}
// { a: 1 }

//如果扩展运算符后面不是对象，则会自动将其转为对象。
// 等同于 {...Object(1)}
{...1} // {}

// 等同于 {...Object(true)}
{...true} // {}

// 等同于 {...Object(undefined)}
{...undefined} // {}

// 等同于 {...Object(null)}
{...null} // {}

//如果扩展运算符后面是字符串，它会自动转成一个类似数组的对象，因此返回的不是空对象。
{...'hello'}
// {0: "h", 1: "e", 2: "l", 3: "l", 4: "o"}

//对象的扩展运算符等同于使用Object.assign()方法
let aClone = { ...a };
// 等同于
let aClone = Object.assign({}, a);

//上面的例子只是拷贝了对象实例的属性，如果想完整克隆一个对象，还拷贝对象原型的属性，可以采用下面的写法。
// 写法一
const clone1 = {
  __proto__: Object.getPrototypeOf(obj),
  ...obj
};

// 写法二
const clone2 = Object.assign(
  Object.create(Object.getPrototypeOf(obj)),
  obj
);

// 写法三
const clone3 = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
)

//扩展运算符可以用于合并两个对象
let ab = { ...a, ...b };
// 等同于
let ab = Object.assign({}, a, b);

//如果用户自定义的属性，放在扩展运算符后面，则扩展运算符内部的同名属性会被覆盖掉。
let aWithOverrides = { ...a, x: 1, y: 2 };
// 等同于
let aWithOverrides = { ...a, ...{ x: 1, y: 2 } };
// 等同于
let x = 1, y = 2, aWithOverrides = { ...a, x, y };
// 等同于
let aWithOverrides = Object.assign({}, a, { x: 1, y: 2 });

//这用来修改现有对象部分的属性就很方便了。
let newVersion = {
  ...previousVersion,
  name: 'New Name' // Override the name property
};

//如果把自定义属性放在扩展运算符前面，就变成了设置新对象的默认属性值。
let aWithDefaults = { x: 1, y: 2, ...a };
// 等同于
let aWithDefaults = Object.assign({}, { x: 1, y: 2 }, a);
// 等同于
let aWithDefaults = Object.assign({ x: 1, y: 2 }, a);

//与数组的扩展运算符一样，对象的扩展运算符后面可以跟表达式。
const obj = {
  ...(x > 1 ? {a: 1} : {}),
  b: 2,
};

//扩展运算符的参数对象之中，如果有取值函数get，这个函数是会执行的
let a = {
  get x() {
    throw new Error('not throw yet');
  }
}
//取值函数get在扩展a对象时会自动执行，导致报错。
let aWithXGetter = { ...a }; // 报错

/**
 * AggregateError 错误对象
 *  errors：数组，它的每个成员都是一个错误对象。该参数是必须的。
 *  message：字符串，表示 AggregateError 抛出时的提示信息。该参数是可选的
 * 
 * AggregateError 在一个错误对象里面，封装了多个错误。如果某个单一操作，
 * 同时引发了多个错误，需要同时抛出这些错误，那么就可以抛出一个 AggregateError 错误对象，
 * 把各种错误都放在这个对象里面。
 */
//AggregateError 本身是一个构造函数，用来生成 AggregateError 实例对象。
AggregateError(errors[, message])

const error = new AggregateError([
  new Error('ERROR_11112'),
  new TypeError('First name must be a string'),
  new RangeError('Transaction value must be at least 1'),
  new URIError('User profile link must be https'),
], 'Transaction cannot be processed')

//AggregateError的实例对象有三个属性
  //name：错误名称，默认为“AggregateError”。
  //message：错误的提示信息。
  //errors：数组，每个成员都是一个错误对象。

  try {
    throw new AggregateError([
      new Error("some error"),
    ], 'Hello');
  } catch (e) {
    console.log(e instanceof AggregateError); // true
    console.log(e.message);                   // "Hello"
    console.log(e.name);                      // "AggregateError"
    console.log(e.errors);                    // [ Error: "some error" ]
  }