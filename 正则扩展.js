/**
 * RegExp 构造函数
 */
var regex = new RegExp('xyz', 'i');
// 等价于
var regex = /xyz/i;

//参数是一个正则表示式，这时会返回一个原有正则表达式的拷贝
var regex = new RegExp(/xyz/i);
// 等价于
var regex = /xyz/i;

//ES5 不允许此时使用第二个参数添加修饰符，否则会报错
var regex = new RegExp(/xyz/, 'i');
// Uncaught TypeError: Cannot supply flags when constructing one RegExp from another

//es6修改了不允许使用第二个参数的修饰符这种行为，如果RegExp构造函数第一个参数是正则表达式可以使用第二个参数指定修饰符
//返回来的正则表达式会忽略原有的正则表达式的修饰符
new RegExp(/abc/ig, 'i').flags
// "i"

/**
 * 字符串的正则表达式
 * match()
 * replace()
 * search()
 * split()
 */
//es6的这个四个方法内部调用了RegExp的实例方法
String.prototype.match 调用 RegExp.prototype[Symbol.match]
String.prototype.replace 调用 RegExp.prototype[Symbol.replace]
String.prototype.search 调用 RegExp.prototype[Symbol.search]
String.prototype.split 调用 RegExp.prototype[Symbol.split]

/**
 * u 修饰符
 * u修饰符，含义为“Unicode 模式”，
 * 用来正确处理大于\uFFFF的 Unicode 字符
 */
 /^\uD83D/u.test('\uD83D\uDC2A') // false
 /^\uD83D/.test('\uD83D\uDC2A') // true

//点字符 除了换行符以外的任意单个字符。对于码点大于0xFFFF的 Unicode 字符，
//点字符不能识别，必须加上u修饰符。
var s = '𠮷';
//如果不添加u修饰符，正则表达式就会认为字符串为两个字符，从而匹配失败。
/^.$/.test(s) // false
/^.$/u.test(s) // true

/**
 * Unicode 字符表示法
 * ES6 新增了使用大括号表示 Unicode 字符，这种表示法在正则表达式中必须加上u修饰符，
 * 才能识别当中的大括号，否则会被解读为量词。
 */
 /\u{61}/.test('a') // false 不加u表示匹配61个连续的u
 /\u{61}/u.test('a') // true
 /\u{20BB7}/u.test('𠮷') // true


//量词（即数量词） 使用u修饰符后，所有量词都会正确识别码点大于0xFFFF的 Unicode 字符
/a{2}/.test('aa') // true
/a{2}/u.test('aa') // true
/𠮷{2}/.test('𠮷𠮷') // false
/𠮷{2}/u.test('𠮷𠮷') // true

//\S是预定义模式，匹配所有非空白字符。只有加了u修饰符，它才能正确匹配码点大于0xFFFF的 Unicode 字符。
function codePointLength(text) {
  var result = text.match(/[\s\S]/gu);
  return result ? result.length : 0;
}

var s = '𠮷𠮷';

s.length // 4
codePointLength(s) // 2

//i 修饰符
//有些 Unicode 字符的编码不同，但是字型很相近，比如，\u004B与\u212A都是大写的K。
//不加u修饰符，就无法识别非规范的K字符。
/[a-z]/i.test('\u212A') // false
/[a-z]/iu.test('\u212A') // true

//转义  没有u修饰符的情况下，正则中没有定义的转义（如逗号的转义\,）无效，而在u模式会报错。
/\,/ // /\,/
/\,/u // 报错

/**
 * RegExp.prototype.unicode 属性
 * 正则实例对象新增unicode属性，表示是否设置了u修饰符
 */
 const r1 = /hello/;
 const r2 = /hello/u;
 
 r1.unicode // false
 r2.unicode // true

/**
 * y 修饰符
 * 除了u修饰符，ES6 还为正则表达式添加了y修饰符，叫做“粘连”（sticky）修饰符。
 * y修饰符的作用与g修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。
 * 不同之处在于，g修饰符只要剩余位置中存在匹配就可，
 * 而y修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义。
 */
 var s = 'aaa_aa_a';
 var r1 = /a+/g;
 var r2 = /a+/y;
 
 r1.exec(s) // ["aaa"]
 r2.exec(s) // ["aaa"]
 
 r1.exec(s) // ["aa"]
 r2.exec(s) // null        _aa_a 从头匹配返回null


//lastIndex 属性可以更好的说明y修饰符
const REGEX = /a/g;

// 指定从2号位置（y）开始匹配
REGEX.lastIndex = 2;

// 匹配成功
const match = REGEX.exec('xaya');

// 在3号位置匹配成功
match.index // 3

// 下一次匹配从4号位开始
REGEX.lastIndex // 4

// 4号位开始匹配失败
REGEX.exec('xaya') // null


// y修饰符同样遵守lastIndex属性 但是要求必须在lastIndex指定的位置发现匹配
const REGEX = /a/y;

// 指定从2号位置开始匹配
REGEX.lastIndex = 2;

// 不是粘连，匹配失败
REGEX.exec('xaya') // null

// 指定从3号位置开始匹配
REGEX.lastIndex = 3;

// 3号位置是粘连，匹配成功
const match = REGEX.exec('xaya');
match.index // 3
REGEX.lastIndex // 4

//y修饰符号隐含了头部匹配的标志^
/b/y.exec('aba')
// null

//字符串对象的replace方法的例子
const REGEX = /a/gy;
'aaxa'.replace(REGEX, '-') // '--xa'

//单单一个y修饰符对match方法，只能返回第一个匹配，必须与g修饰符联用，才能返回所有匹配
'a1a2a3'.match(/a\d/y) // ["a1"]
'a1a2a3'.match(/a\d/gy) // ["a1", "a2", "a3"]

//如果字符串里面没有非法字符，y修饰符与g修饰符的提取结果是一样的。但是，一旦出现非法字符，两者的行为就不一样了。
tokenize(TOKEN_Y, '3x + 4') //无法忽略非法字符
// [ '3' ]
tokenize(TOKEN_G, '3x + 4')
// [ '3', '+', '4' ]

//检测是否设置了y修饰符
RegExp.prototype.sticky
var r = /hello\d/y;
r.sticky // true

/**
 * RegExp.prototype.flags
 * 返回修饰符
 */
// ES5 的 source 属性
// 返回正则表达式的正文
/abc/ig.source
// "abc"

// ES6 的 flags 属性
// 返回正则表达式的修饰符
/abc/ig.flags
// 'gi'

/**
 * s 修饰符：dotAll 模式
 * 行终止符
 * U+000A 换行符（\n）
 * U+000D 回车符（\r）
 * U+2028 行分隔符（line separator）
 * U+2029 段分隔符（paragraph separator）
 */
 /foo.bar/.test('foo\nbar')
 // false 无法识别换行符
// [^]匹配非空字符
 /foo[^]bar/.test('foo\nbar')
 // true
// 引入s可以匹配任意非空字符 这被称为dotAll模式，即点（dot）代表一切字符。
 /foo.bar/s.test('foo\nbar') // true

///s修饰符和多行修饰符/m不冲突，两者一起使用的情况下，.匹配所有字符，而^和$匹配每一行的行首和行尾。
const re = /foo.bar/s;
// 另一种写法
// const re = new RegExp('foo.bar', 's');

re.test('foo\nbar') // true
re.dotAll // true
re.flags // 's'

/**
 * 先行断言
 * “先行断言”指的是，x只有在y前面才匹配，必须写成/x(?=y)/。
 * 比如，只匹配百分号之前的数字，要写成/\d+(?=%)/。
 * “先行否定断言”指的是，x只有不在y前面才匹配，必须写成/x(?!y)/。
 * 比如，只匹配不在百分号之前的数字，要写成/\d+(?!%)/。
 */
 /\d+(?=%)/.exec('100% of US presidents have been male')  // ["100"]
 /\d+(?!%)/.exec('that’s all 44 of them')                 // ["44"]

/**
 * 后行断言
 * “后行断言”正好与“先行断言”相反，x只有在y后面才匹配，必须写成/(?<=y)x/。
 * 比如，只匹配美元符号之后的数字，要写成/(?<=\$)\d+/。
 * “后行否定断言”则与“先行否定断言”相反，x只有不在y后面才匹配，必须写成/(?<!y)x/。
 * 比如，只匹配不在美元符号后面的数字，要写成/(?<!\$)\d+/。
 */
 /(?<=\$)\d+/.exec('Benjamin Franklin is on the $100 bill')  // ["100"]
 /(?<!\$)\d+/.exec('it’s is worth about €90')                // ["90"]

//使用后行断言进行字符串替换
const RE_DOLLAR_PREFIX = /(?<=\$)foo/g;
'$foo %foo foo'.replace(RE_DOLLAR_PREFIX, 'bar');
// '$bar %foo foo'

//后行断言的组匹配，与正常情况下结果是不一样的
/**
 * 需要捕捉两个组匹配。没有“后行断言”时，
 * 第一个括号是贪婪模式，
 * 第二个括号只能捕获一个字符，所以结果是105和3。
 * 而“后行断言”时，由于执行顺序是从右到左，
 * 第二个括号是贪婪模式，第一个括号只能捕获一个字符，
 * 所以结果是1和053。
 */
/(?<=(\d+)(\d+))$/.exec('1053') // ["", "1", "053"]
/^(\d+)(\d+)$/.exec('1053') // ["1053", "105", "3"]
