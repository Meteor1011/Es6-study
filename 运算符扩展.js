/**
 * 指数运算符
 * ES2016 新增了一个指数运算符（**）。 a ** b    a的b次方运算
 */
 2 ** 2 // 4
 2 ** 3 // 8

// 这个运算符的一个特点是右结合，而不是常见的左结合。多个指数运算符连用时，是从最右边开始计算的。
// 相当于 2 ** (3 ** 2)
2 ** 3 ** 2
// 512

//指数运算符可以与等号结合，形成一个新的赋值运算符（**=）
let a = 1.5;
a **= 2;
// 等同于 a = a * a;

let b = 4;
b **= 3;
// 等同于 b = b * b * b;

/**
 * 链判断运算符
 * 如果读取对象内部的某个属性，往往需要判断一下，属性的上层对象是否存在。
 * 比如，读取message.body.user.firstName这个属性，安全的写法是写成下面这样。
 */
// 错误的写法
const  firstName = message.body.user.firstName || 'default';

// 正确的写法
const firstName = (message
  && message.body
  && message.body.user
  && message.body.user.firstName) || 'default';

//三元运算符?:也常用于判断对象是否存在
const fooInput = myForm.querySelector('input[name=foo]')
const fooValue = fooInput ? fooInput.value : undefined

///这样的层层判断非常麻烦，因此 ES2020 引入了“链判断运算符”（optional chaining operator）?.，简化上面的写法
const firstName = message?.body?.user?.firstName || 'default';
const fooValue = myForm.querySelector('input[name=foo]')?.value

//下面是判断对象方法是否存在，如果存在就立即执行的例子。
iterator.return?.() //iterator.return如果有定义，就会调用该方法，否则iterator.return直接返回undefined，不再执行?.后面的部分。

//对于那些可能没有实现的方法，这个运算符尤其有用。
if (myForm.checkValidity?.() === false) {
  // 表单校验失败
  return;
}

/**
 * 链判断运算符?.有三种写法。
 * obj?.prop // 对象属性是否存在
 * obj?.[expr] // 同上
 * func?.(...args) // 函数或对象方法是否存在
 */
 let hex = "#C0FFEE".match(/#([A-Z]+)/i)?.[1];
//字符串的match()方法，如果没有发现匹配会返回null，如果发现匹配会返回一个数组，?.运算符起到了判断作用

// 下面是?.运算符常见形式，以及不使用该运算符时的等价形式。
a?.b
// 等同于
a == null ? undefined : a.b

a?.[x]
// 等同于
a == null ? undefined : a[x]

a?.b()
// 等同于
a == null ? undefined : a.b()

a?.()
// 等同于
a == null ? undefined : a()

//本质上，?.运算符相当于一种短路机制，只要不满足条件，就不再往下执行。
a?.[++x]
// 等同于
a == null ? undefined : a[++x]

//如果属性链有圆括号，链判断运算符对圆括号外部没有影响，只对圆括号内部有影响
(a?.b).c
// 等价于
(a == null ? undefined : a.b).c

//以下写法是禁止的，会报错。
// 构造函数
new a?.()
new a?.b()

// 链判断运算符的右侧有模板字符串
a?.`{b}`
a?.b`{c}`

// 链判断运算符的左侧是 super
super?.()
super?.foo

// 链运算符用于赋值运算符左侧
a?.b = c

//右侧不得为十进制数值
/**
 * 为了保证兼容以前的代码，允许foo?.3:0被解析成foo ? .3 : 0，
 * 因此规定如果?.后面紧跟一个十进制数字，那么?.不再被看成是一个完整的运算符，
 * 而会按照三元运算符进行处理，也就是说，那个小数点会归属于后面的十进制数字，形成一个小数。
 */


/**
 * Null 判断运算符 ??
 * 
 * 上面的三行代码都通过||运算符指定默认值，但是这样写是错的。
 * 开发者的原意是，只要属性的值为null或undefined，
 * 默认值就会生效，但是属性的值如果为空字符串或false或0，默认值也会生效。
 */
 const headerText = response.settings.headerText || 'Hello, world!';
 const animationDuration = response.settings.animationDuration || 300;
 const showSplashScreen = response.settings.showSplashScreen || true;

//这个运算符很适合判断函数参数是否赋值。
function Component(props) {
  const enable = props.enabled ?? true;
  // …
}
//等同于
function Component(props) {
  const {
    enabled: enable = true,
  } = props;
  // …
}

/**
 * ??本质上是逻辑运算，它与其他两个逻辑运算符&&和||有一个优先级问题，
 * 它们之间的优先级到底孰高孰低。优先级的不同，往往会导致逻辑运算的结果不同。
 * 现在的规则是，如果多个逻辑运算符一起使用，必须用括号表明优先级，否则会报错。
 */
// 报错
lhs && middle ?? rhs
lhs ?? middle && rhs
lhs || middle ?? rhs
lhs ?? middle || rhs

//上面四个表达式都会报错，必须加入表明优先级的括号
(lhs && middle) ?? rhs;
lhs && (middle ?? rhs);

(lhs ?? middle) && rhs;
lhs ?? (middle && rhs);

(lhs || middle) ?? rhs;
lhs || (middle ?? rhs);

(lhs ?? middle) || rhs;
lhs ?? (middle || rhs);


/**
 * 逻辑赋值运算符
 * ES2021 引入了三个新的逻辑赋值运算符（logical assignment operators），将逻辑运算符与赋值运算符进行结合。
 */
// 或赋值运算符
x ||= y
// 等同于
x || (x = y)

// 与赋值运算符
x &&= y
// 等同于
x && (x = y)

// Null 赋值运算符
x ??= y
// 等同于
x ?? (x = y)

//它们的一个用途是，为变量或属性设置默认值
// 老的写法
user.id = user.id || 1;

// 新的写法
user.id ||= 1;

//上面示例中，参数对象opts如果不存在属性foo和属性baz，则为这两个属性设置默认值。有了“Null 赋值运算符”以后，就可以统一写成下面这样
 //原来
 function example(opts) {
  opts.foo = opts.foo ?? 'bar';
  opts.baz ?? (opts.baz = 'qux');
}

//现在
function example(opts) {
  opts.foo ??= 'bar';
  opts.baz ??= 'qux';
}