/**
 * String.fromCodePoint()
 *String.raw()
 *实例方法：codePointAt()
 *实例方法：normalize()
 *实例方法：includes(), startsWith(), endsWith()
 *实例方法：repeat()
 *实例方法：padStart()，padEnd()
 *实例方法：trimStart()，trimEnd()
 *实例方法：matchAll()
 *实例方法：replaceAll()
 */

//String.fromCharCode() 与 String.codePointAt()相反
String.fromCharCode(0x20BB7)
// "ஷ" 不能识别大于0xFFFF的码点 以此溢出舍去最高位2
//String.fromCodePoint()方法，可以识别大于0xFFFF的字符
String.fromCodePoint(0x20BB7)
// "𠮷"
String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y'
// true

/**
 * String.raw()
 * 返回原始字符串 即转义后的字符串
 */

 String.raw`Hi\n${2+3}!`
 // 实际返回 "Hi\\n5!"，显示的是转义后的结果 "Hi\n5!"
 
 String.raw`Hi\u000A!`;
 // 实际返回 "Hi\\u000A!"，显示的是转义后的结果 "Hi\u000A!"

//如果原字符串的斜杠已经转义，那么String.raw()会进行再次转义。
String.raw`Hi\\n`
// 返回 "Hi\\\\n"

String.raw`Hi\\n` === "Hi\\\\n" // true

// `foo${1 + 2}bar`
// 等同于
String.raw({ raw: ['foo', 'bar'] }, 1 + 2) // "foo3bar"
//raw函数的第一个参数是个对象对象中的raw属性值等同于原始的模板字符串解析后得到的数组。
String.raw = function (strings, ...values) {
  let output = '';
  let index;
  for (index = 0; index < values.length; index++) {
    output += strings.raw[index] + values[index];
  }

  output += strings.raw[index]
  return output;  
}

/**
 * codePointAt()
 * codePointAt()方法返回的是码点的十进制值，
 * 如果想要十六进制的值，可以使用toString()方法转换一下。
 * codePointAt()方法的参数，仍然是不正确的
 * 字符a在字符串s的正确位置序号应该是 1，但是必须向codePointAt()方法传入 2
 */
 let s = '𠮷a';

 s.codePointAt(0).toString(16) // "20bb7"
 s.codePointAt(2).toString(16) // "61" 

//解决这个问题的一个办法是使用for...of循环，因为它会正确识别 32 位的 UTF-16 字符。
let s = '𠮷a';
for (let ch of s) {
  console.log(ch.codePointAt(0).toString(16));
}
// 20bb7
// 61

//使用扩展运算符（...）进行展开运算。
let arr = [...'𠮷a']; // arr.length === 2
arr.forEach(
  ch => console.log(ch.codePointAt(0).toString(16))
);
// 20bb7
// 61

///codePointAt()方法是测试一个字符由两个字节还是由四个字节组成的最简单方法
//0xFFFF 两个字节
function is32Bit(c) {
  return c.codePointAt(0) > 0xFFFF;
}

is32Bit("𠮷") // true
is32Bit("a") // false

/**
 * includes(), startsWith(), endsWith()
 * 
 * includes()：返回布尔值，表示是否找到了参数字符串。
 * startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
 * endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。
 * 均支持第二个参数 表示从哪里开始搜索
 */
 includes()：//返回布尔值，表示是否找到了参数字符串。
 startsWith()：//返回布尔值，表示参数字符串是否在原字符串的头部。
 endsWith()：//返回布尔值，表示参数字符串是否在原字符串的尾部。

 let s = 'Hello world!';
/**
 * 使用第二个参数n时，endsWith的行为与其他两个方法有所不同。
 * 它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。
 */
 s.startsWith('world', 6) // true
 s.endsWith('Hello', 5) // true 从0到第五index查找不包括5
 s.includes('Hello', 6) // false

/**
 * repeat()
 * 方法返回一个新字符串，表示将原字符串重复n次
 */
 'x'.repeat(3) // "xxx"
 'hello'.repeat(2) // "hellohello"
 'na'.repeat(0) // ""

//参数如果是小数，会被取下取整。
'na'.repeat(2.9) // "nana"

//repeat的参数是负数或者Infinity，会报错。
'na'.repeat(Infinity)
// RangeError
'na'.repeat(-1)
// RangeError


// 0 到-1 之间的小数，则等同于 0
'na'.repeat(-0.9) // ""

//参数NaN等同于 0
'na'.repeat(NaN) // ""

//如果repeat的参数是字符串，则会先转换成数字
'na'.repeat('na') // ""
'na'.repeat('3') // "nanana"


/**
 * padStart()，padEnd() 用于头部补全、用于尾部补全
 */
'x'.padStart(5, 'ab') // 'ababx' x的头部（即前面）补全长度到5
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab' x的尾部补全即（后面）补全长度到5
'x'.padEnd(4, 'ab') // 'xaba'

//如果原字符串的长度，等于或大于最大长度，则字符串补全不生效，返回原字符串。
'xxx'.padStart(2, 'ab') // 'xxx'
'xxx'.padEnd(2, 'ab') // 'xxx'

//如果用来补全的字符串与原字符串，两者的长度之和超过了最大长度，则会截去超出位数的补全字符串。
'abc'.padStart(10, '0123456789')
// '0123456abc'

//省略第二个参数，默认使用空格补全长度
'x'.padStart(4) // '   x'
'x'.padEnd(4) // 'x   '

//padStart()的常见用途是为数值补全指定位数。
'1'.padStart(10, '0') // "0000000001"
'12'.padStart(10, '0') // "0000000012"
'123456'.padStart(10, '0') // "0000123456"

//另一个用途是提示字符串格式。
'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"

/**
 * trimStart()消除字符串头部的空格，
 * trimEnd()消除尾部的空格
 * 它们返回的都是新字符串，不会修改原始字符串。
 * 
 * trimLeft()是trimStart()的别名，trimRight()是trimEnd()的别名。
 */
 const s = '  abc  ';

 s.trim() // "abc"
 s.trimStart() // "abc  "
 s.trimEnd() // "  abc"

/**
 * matchAll()方法返回一个正则表达式在当前字符串的所有匹配
 */

/**
 * replaceAll() 匹配所有 不改变原字符串
 * 字符串的实例方法replace()只能替换第一个匹配
 */
 'aabbcc'.replace('b', '_')
 // 'aa_bcc'

//如果要替换所有的匹配，不得不使用正则表达式的g修饰符。
'aabbcc'.replace(/b/g, '_')
// 'aa__cc'

'aabbcc'.replaceAll('b', '_')
// 'aa__cc'

//如果searchValue是一个不带有g修饰符的正则表达式，replaceAll()会报错。这一点跟replace()不同。
// 不报错
'aabbcc'.replace(/b/, '_')

// 报错 带全局g不报错
'aabbcc'.replaceAll(/b/, '_')

/**
 * replaceAll()的第二个参数replacement是一个字符串，表示替换的文本，
 * 其中可以使用一些特殊字符串。
  $&：匹配的字符串。
  $` ：匹配结果前面的文本。
  $'：匹配结果后面的文本。
  $n：匹配成功的第n组内容，n是从1开始的自然数。这个参数生效的前提是，第一个参数必须是正则表达式。
  $$：指代美元符号$。
 */
// $& 表示匹配的字符串，即`b`本身
// 所以返回结果与原字符串一致
'abbc'.replaceAll('b', '$&')
// 'abbc'

// $` 表示匹配结果之前的字符串
// 对于第一个`b`，$` 指代`a`
// 对于第二个`b`，$` 指代`ab`
'abbc'.replaceAll('b', '$`')
// 'aaabc'

// $' 表示匹配结果之后的字符串
// 对于第一个`b`，$' 指代`bc`
// 对于第二个`b`，$' 指代`c`
'abbc'.replaceAll('b', `$'`)
// 'abccc'

// $1 表示正则表达式的第一个组匹配，指代`ab`
// $2 表示正则表达式的第二个组匹配，指代`bc`
'abbc'.replaceAll(/(ab)(bc)/g, '$2$1')
// 'bcab'

// $$ 指代 $
'abc'.replaceAll('b', '$$')
// 'a$c'

//replaceAll()的第二个参数replacement除了为字符串，也可以是一个函数，
//该函数的返回值将替换掉第一个参数searchValue匹配的文本。
'aabbcc'.replaceAll('b', () => '_')
// 'aa__cc'

/**
 * 这个替换函数可以接受多个参数。
 * 第一个参数是捕捉到的匹配内容，
 * 第二个参数捕捉到是组匹配（有多少个组匹配，就有多少个对应的参数）。
 * 此外，最后还可以添加两个参数，倒数第二个参数是捕捉到的内容在整个字符串中的位置，
 * 最后一个参数是原字符串。
 */
 const str = '123abc456';
 const regex = /(\d+)([a-z]+)(\d+)/g;
 
 function replacer(match, p1, p2, p3, offset, string) {
   return [p1, p2, p3].join(' - ');
 }
 
 str.replaceAll(regex, replacer)
 // 123 - abc - 456