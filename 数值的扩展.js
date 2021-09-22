/**
 * 二进制和八进制表示法
 */
//ES6 提供了二进制和八进制数值的新的写法，分别用前缀0b（或0B）和0o（或0O）表示。
0b111110111 === 503 // true
0o767 === 503 // true

/**
 * 从 ES5 开始，在严格模式之中，八进制就不再允许使用前缀0表示，
 * ES6 进一步明确，要使用前缀0o表示。
 */
// 非严格模式
(function(){
  console.log(0o11 === 011);
})() // true

// 严格模式
(function(){
  'use strict';
  console.log(0o11 === 011);
})() // Uncaught SyntaxError: Octal literals are not allowed in strict mode.

//将0b和0o前缀的字符串数值转为十进制，要使用Number方法
Number('0b111')  // 7
Number('0o10')  // 8

/**
 * 数值分隔符
 * ES2021允许使用_作为数字的分割符
 * 次分隔符未指定间隔的位数，因此可以每三位每一位甚至每四位分割
 */
 123_00 === 12_300 // true

 12345_00 === 123_4500 // true
 12345_00 === 1_234_500 // true

 //小数和科学计数法也允许使用分隔符
 // 小数
0.000_001

// 科学计数法
1e10_000

/**
 * 注意事项：
 * 不允许放在数值的前面和后面
 * 不能两个或两个以上的分隔符放一起
 * 小数点的前后不允许有分割符
 * 科学计数法里表示指数的e或者E的前后不允许有分割符
 */
// 全部报错
3_.141
3._141
1_e12
1e_12
123__456
_1464301
1464301_

//除了十进制其他进制的数值也可以使用分隔符
// 二进制
0b1010_0001_1000_0101
// 十六进制
0xA0_B0_C0

/**
 * 数值分隔符可以按字节顺序分隔数值，这在操作二进制位时，
 * 非常有用。注意，分隔符不能紧跟着进制的前缀0b、0B、0o、0O、0x、0X
 */
// 报错
0_b111111000
0b_111111000

//数值分隔符只是一种书写便利，对于 JavaScript 内部数值的存储和输出，并没有影响。
let num = 12_345;

num // 12345
num.toString() // 12345

/**
 * 下面三个将字符串转成数值的函数，不支持数值分隔符
 * 数值分隔符主要是为了编码时书写数值的方便，而不是为了处理外部输入的数据
 */
 Number()
 parseInt()
 parseFloat()

 Number('123_456') // NaN
 parseInt('123_456') // 123

 /**
  * Number.isFinite()
  * Number.isNaN()
  */
//Number.isFinite()用来检查一个数值是否为有限的（finite），
//即不是Infinity 如果参数类型不是数值，Number.isFinite一律返回false。
Number.isFinite(15); // true
Number.isFinite(0.8); // true
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // false
Number.isFinite('foo'); // false
Number.isFinite('15'); // false
Number.isFinite(true); // false

//Number.isNaN()用来检查一个值是否为NaN。
//如果参数类型不是NaN，Number.isNaN一律返回false。
Number.isNaN(NaN) // true
Number.isNaN(15) // false
Number.isNaN('15') // false
Number.isNaN(true) // false
Number.isNaN(9/NaN) // true
Number.isNaN('true' / 0) // true
Number.isNaN('true' / 'true') // true


/**
 * 它们与传统的全局方法isFinite()和isNaN()的区别在于，
 * 传统方法先调用Number()将非数值的值转为数值，
 * 再进行判断，而这两个新方法只对数值有效，
 */
 isFinite(25) // true
 isFinite("25") // true
 Number.isFinite(25) // true
 Number.isFinite("25") // false
 
 isNaN(NaN) // true
 isNaN("NaN") // true
 Number.isNaN(NaN) // true
 Number.isNaN("NaN") // false
 Number.isNaN(1) // false

/**
 * Number.parseInt()
 * Number.parseFloat()
 * 将全局方法完全移到了Number上面了
 * 逐步减少了全局性方法使得语言逐步模块化
 */
// ES5的写法
parseInt('12.34') // 12
parseFloat('123.45#') // 123.45

// ES6的写法
Number.parseInt('12.34') // 12
Number.parseFloat('123.45#') // 123.45

//Number.isInteger() 用来判断一个数值是否为整数。
Number.isInteger(25) // true
Number.isInteger(25.1) // false

//JavaScript 内部，整数和浮点数采用的是同样的储存方法，所以 25 和 25.0 被视为同一个值。
Number.isInteger(25) // true
Number.isInteger(25.0) // true

//如果参数不是数值，Number.isInteger返回false。
Number.isInteger() // false
Number.isInteger(null) // false
Number.isInteger('15') // false
Number.isInteger(true) // false

/**
 * 注意，由于 JavaScript 采用 IEEE 754 标准，
 * 数值存储为64位双精度格式，数值精度最多可以达到 53 个
 * 二进制位（1 个隐藏位与 52 个有效位）。
 * 如果数值的精度超过这个限度，第54位及后面的位就会被丢弃，
 * 这种情况下，Number.isInteger可能会误判。
 */
 Number.isInteger(3.0000000000000002) // true

 /**
  * Number.isInteger的参数明明不是整数，但是会返回true。原因就是这个小数的精度达到了小数点后16个十进制位，转成二进制位超过了53个二进制位，导致最后的那个2被丢弃了。
  * 类似的情况还有，如果一个数值的绝对值小于Number.MIN_VALUE（5E-324），即小于 JavaScript 能够分辨的最小值，会被自动转为 0。这时，Number.isInteger也会误判。
  */
  Number.isInteger(5E-324) // false
  Number.isInteger(5E-325) // true

/**
 * 上面代码中，5E-325由于值太小，会被自动转为0，因此返回true。
 * 总之，如果对数据精度的要求较高，不建议使用Number.isInteger()判断一个数值是否为整数。
 */
//浮点数的计算是不准确的
0.1 + 0.2
// 0.30000000000000004

0.1 + 0.2 - 0.3
// 5.551115123125783e-17

5.551115123125783e-17.toFixed(20)
// '0.00000000000000005551'

//上面代码解释了，为什么比较0.1 + 0.2与0.3得到的结果是false
0.1 + 0.2 === 0.3 // false

/**
 * Number.EPSILON可以用来设置“能够接受的误差范围”。
 * 比如，误差范围设为 2 的-50 次方
 * （即Number.EPSILON * Math.pow(2, 2)），
 * 即如果两个浮点数的差小于这个值，
 * 我们就认为这两个浮点数相等。
 */
 5.551115123125783e-17 < Number.EPSILON * Math.pow(2, 2)
 // true

//Number.EPSILON的实质是一个可以接受的最小误差范围
function withinErrorMargin (left, right) {
  return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
}

0.1 + 0.2 === 0.3 // false
withinErrorMargin(0.1 + 0.2, 0.3) // true

1.1 + 1.3 === 2.4 // false
withinErrorMargin(1.1 + 1.3, 2.4) // true

/**
 * 安全整数和 Number.isSafeInteger()
 * JavaScript 能够准确表示的整数范围在-2^53到2^53之间（不含两个端点），
 * 超过这个范围，无法精确表示这个值。
 */
 Math.pow(2, 53) // 9007199254740992

 9007199254740992  // 9007199254740992
 9007199254740993  // 9007199254740992
 
 Math.pow(2, 53) === Math.pow(2, 53) + 1
 // true

//ES6 引入了Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量，用来表示这个范围的上下限。
Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1
// true
Number.MAX_SAFE_INTEGER === 9007199254740991
// true

Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER
// true
Number.MIN_SAFE_INTEGER === -9007199254740991
// true

//Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内
Number.isSafeInteger('a') // false
Number.isSafeInteger(null) // false
Number.isSafeInteger(NaN) // false
Number.isSafeInteger(Infinity) // false
Number.isSafeInteger(-Infinity) // false

Number.isSafeInteger(3) // true
Number.isSafeInteger(1.2) // false
Number.isSafeInteger(9007199254740990) // true
Number.isSafeInteger(9007199254740992) // false

Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1) // false
Number.isSafeInteger(Number.MIN_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1) // false

/**
 * 这个函数的实现很简单，就是跟安全整数的两个边界值比较一下。
 */
 Number.isSafeInteger = function (n) {
  return (typeof n === 'number' &&
    Math.round(n) === n &&
    Number.MIN_SAFE_INTEGER <= n &&
    n <= Number.MAX_SAFE_INTEGER);
}

/**
 * 实际使用这个函数时，需要注意。
 * 验证运算结果是否落在安全整数的范围内，
 * 不要只验证运算结果，而要同时验证参与运算的每个值。
 */
 Number.isSafeInteger(9007199254740993)
 // false
 Number.isSafeInteger(990)
 // true
 Number.isSafeInteger(9007199254740993 - 990)
 // true
 9007199254740993 - 990
 // 返回结果 9007199254740002
 // 正确答案应该是 9007199254740003

/**
 * 上面代码中，9007199254740993不是一个安全整数，
 * 但是Number.isSafeInteger会返回结果，
 * 显示计算结果是安全的。这是因为，这个数超出了精度范围，
 * 导致在计算机内部，以9007199254740992的形式储存。
 */
 9007199254740993 === 9007199254740992
 // true

 /**
  * 如果只验证运算结果是否为安全整数，
  * 很可能得到错误结果。下面的函数可以同时验证两
  * 个运算数和运算结果。
  */
  function trusty (left, right, result) {
    if (
      Number.isSafeInteger(left) &&
      Number.isSafeInteger(right) &&
      Number.isSafeInteger(result)
    ) {
      return result;
    }
    throw new RangeError('Operation cannot be trusted!');
  }
  
  trusty(9007199254740993, 990, 9007199254740993 - 990)
  // RangeError: Operation cannot be trusted!
  
  trusty(1, 2, 3)
  // 3

//Math.trunc() 去除一个数的小数部分，返回整数部分
Math.trunc(4.1) // 4
Math.trunc(4.9) // 4
Math.trunc(-4.1) // -4
Math.trunc(-4.9) // -4
Math.trunc(-0.1234) // -0

//对于非数值，Math.trunc内部使用Number方法将其先转为数值。
Math.trunc('123.456') // 123
Math.trunc(true) //1
Math.trunc(false) // 0
Math.trunc(null) // 0

//对于空值和无法截取整数的值，返回NaN
Math.trunc(NaN);      // NaN
Math.trunc('foo');    // NaN
Math.trunc();         // NaN
Math.trunc(undefined) // NaN

//对于没有部署这个方法的环境，可以用下面的代码模拟
Math.trunc = Math.trunc || function(x) {
  return x < 0 ? Math.ceil(x) : Math.floor(x);
};

/**
 * Math.sign()判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。
 * 参数为正数，返回+1；
 * 参数为负数，返回-1；
 * 参数为 0，返回0；
 * 参数为-0，返回-0;
 * 其他值，返回NaN。
 */
 Math.sign(-5) // -1
 Math.sign(5) // +1
 Math.sign(0) // +0
 Math.sign(-0) // -0
 Math.sign(NaN) // NaN

//如果参数是非数值，会自动转为数值。对于那些无法转为数值的值，会返回NaN。
Math.sign('')  // 0
Math.sign(true)  // +1
Math.sign(false)  // 0
Math.sign(null)  // 0
Math.sign('9')  // +1
Math.sign('foo')  // NaN
Math.sign()  // NaN
Math.sign(undefined)  // NaN

//对于没有部署这个方法的环境，可以用下面的代码模拟。
Math.sign = Math.sign || function(x) {
  x = +x; // convert to a number
  if (x === 0 || isNaN(x)) {
    return x;
  }
  return x > 0 ? 1 : -1;
};

/**
 * Math.cbrt() 计算一个数值的立方根
 */
 Math.cbrt(-1) // -1
 Math.cbrt(0)  // 0
 Math.cbrt(1)  // 1
 Math.cbrt(2)  // 1.2599210498948732

//对于非数值，Math.cbrt()方法内部也是先使用Number()方法将其转为数值。
Math.cbrt('8') // 2
Math.cbrt('hello') // NaN

//对于没有部署这个方法的环境，可以用下面的代码模拟。
Math.cbrt = Math.cbrt || function(x) {
  var y = Math.pow(Math.abs(x), 1/3);
  return x < 0 ? -y : y;
};


/**
 * Math.imul()
 * 返回两个数以 32 位带符号整数形式相乘的结果，返回的也是一个 32 位的带符号整数。
 * 对于那些很大的数的乘法，低位数值往往都是不精确的，Math.imul方法可以返回正确的低位数值。
*/
 Math.imul(2, 4)   // 8
 Math.imul(-1, 8)  // -8

 //错误的结果0
 Ma(0x7fffffff * 0x7fffffff)|0 // 0
 //Math.imul方法可以返回正确的值 1
 Math.imul(0x7fffffff, 0x7fffffff) // 1

/**
 * Math.fround()
 * 返回一个数的32位单精度浮点数形式
 */
 Math.fround(0)   // 0
 Math.fround(1)   // 1
 Math.fround(2 ** 24 - 1)   // 16777215

//如果参数的绝对值大于 224，返回的结果便开始丢失精度
Math.fround(2 ** 24)       // 16777216
Math.fround(2 ** 24 + 1)   // 16777216

/**
 * Math.fround方法的主要作用，
 * 是将64位双精度浮点数转为32位单精度浮点数。
 * 如果小数的精度超过24个二进制位，返回值就会不同于原值，
 * 否则返回值不变（即与64位双精度值一致）。
 */
// 未丢失有效精度
Math.fround(1.125) // 1.125
Math.fround(7.25)  // 7.25

// 丢失精度
Math.fround(0.3)   // 0.30000001192092896
Math.fround(0.7)   // 0.699999988079071
Math.fround(1.0000000123) // 1

//对于 NaN 和 Infinity，此方法返回原值。对于其它类型的非数值，
//Math.fround 方法会先将其转为数值，再返回单精度浮点数。
Math.fround(NaN)      // NaN
Math.fround(Infinity) // Infinity

Math.fround('5')      // 5
Math.fround(true)     // 1
Math.fround(null)     // 0
Math.fround([])       // 0
Math.fround({})       // NaN

//如果没有定义此方法，可以这样模拟
Math.fround = Math.fround || function (x) {
  return new Float32Array([x])[0];
};


/**
 * Math.hypot() 
 * Math.hypot方法返回所有参数的平方和的平方根
 * 用于计算直角三角形的两直角边的平方和的开方
 */
 //3 的平方加上 4 的平方，等于 5 的平方
 Math.hypot(3, 4);        // 5 
 Math.hypot(3, 4, 5);     // 7.0710678118654755
 Math.hypot();            // 0
 Math.hypot(NaN);         // NaN
 Math.hypot(3, 4, 'foo'); // NaN
 Math.hypot(3, 4, '5');   // 7.0710678118654755
 Math.hypot(-3);          // 3

