/**
 * 字符的 Unicode 表示法
 */
//ES6 加强了对 Unicode 的支持，允许采用\uxxxx形式表示一个字符，其中xxxx表示字符的 Unicode 码点。
//这种表示法只限于码点在\u0000~\uFFFF之间的字符。超出这个范围的字符，必须用两个双字节的形式表示。
"\u0061"
// "a"

"\uD842\uDFB7"
// "𠮷"

"\u20BB7"
// " 7"
///如果直接在\u后面跟上超过0xFFFF的数值（比如\u20BB7），JavaScript 会理解成\u20BB+7。
//由于\u20BB是一个不可打印字符，所以只会显示一个空格，后面跟着一个7。


//ES6 对这一点做出了改进，只要将码点放入大括号，就能正确解读该字符
"\u{20BB7}"
// "𠮷"

"\u{41}\u{42}\u{43}"
// "ABC"

let hello = 123;
hell\u{6F} // 123

'\u{1F680}' === '\uD83D\uDE80'
// true

//JavaScript 共有 6 种方法可以表示一个字符
'\z' === 'z'  // true
'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true
'\u{7A}' === 'z' // true

/**
 * 字符串的遍历接口
 * for ... of
 */
 for (let codePoint of 'foo') {
  console.log(codePoint)
}
// "f"
// "o"
// "o"


//传统的for遍历无法识别大于oxFFFF的码点
let text = String.fromCodePoint(0x20BB7);

for (let i = 0; i < text.length; i++) {
  console.log(text[i]);
}
// " "
// " "

for (let i of text) {
  console.log(i);
}
// "𠮷"


/**
 * 直接输入 U+2028 （行分隔符） 和 U+2029（段分隔符）
 */
 '中' === '\u4e2d' // true
/*
U+005C：反斜杠（reverse solidus)
U+000D：回车（carriage return）
U+2028：行分隔符（line separator）
U+2029：段分隔符（paragraph separator）
U+000A：换行符（line feed）
*/

//JSON.parse解析，就有可能直接报错。
const json = '"\u2028"';
JSON.parse(json); // 可能报错

//JSON 格式已经冻结（RFC 7159），没法修改了。为了消除这个报错，
//ES2019 允许 JavaScript 字符串直接输入 U+2028（行分隔符）和 U+2029（段分隔符）
const PS = eval("'\u2029'"); //不会报错

/**
 * JSON.stringify() 的改造
 * 
 * UTF-8 标准规定，0xD800到0xDFFF之间的码点，不能单独使用，必须配对使用。
 * 比如，\uD834\uDF06是两个码点，但是必须放在一起配对使用，代表字符𝌆。
 * 这是为了表示码点大于0xFFFF的字符的一种变通方法。
 * 单独使用\uD834和\uDFO6这两个码点是不合法的，或者颠倒顺序也不行，
 * 因为\uDF06\uD834并没有对应的字符。
 * JSON.stringify()的问题在于，它可能返回0xD800到0xDFFF之间的单个码点。
 */
 JSON.stringify('\u{D834}') // "\u{D834}"

/**
 * 确保返回的是合法的 UTF-8 字符，ES2019 改变了JSON.stringify()的行为。
 * 如果遇到0xD800到0xDFFF之间的单个码点，或者不存在的配对形式，它会返回转义字符串
 */
 JSON.stringify('\u{D834}') // ""\\uD834""
 JSON.stringify('\uDF06\uD834') // ""\\udf06\\ud834""


 /**
  * 模板字符串
  */
//jQuery 的方法
$('#result').append(
  'There are <b>' + basket.count + '</b> ' +
  'items in your basket, ' +
  '<em>' + basket.onSale +
  '</em> are on sale!'
);

//ES6 引入了模板字符串
$('#result').append(`
  There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`);

// 普通字符串
`In JavaScript '\n' is a line-feed.`

// 多行字符串
`In JavaScript this is
 not legal.`

console.log(`string text line 1
string text line 2`);

// 字符串中嵌入变量
let name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`

//模板字符串中需要使用反引号，则前面要用反斜杠转义
let greeting = `\`Yo\` World!`;

//模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中
$('#list').html(`
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`);

//去掉模板字符串中的空格和换行可以使用trim
$('#list').html(`
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`.trim());

//模板字符串中嵌入变量，需要将变量名写在${}之中。
`User ${user.name} is not authorized to do ${action}.`

//大括号内部可以放入任意的 JavaScript 表达式，可以进行运算，以及引用对象属性。
let x = 1;
let y = 2;

`${x} + ${y} = ${x + y}`
// "1 + 2 = 3"

`${x} + ${y * 2} = ${x + y * 2}`
// "1 + 4 = 5"

let obj = {x: 1, y: 2};
`${obj.x + obj.y}`
// "3"

//模板字符串之中还能调用函数
function fn() {
  return "Hello World";
}

`foo ${fn()} bar`
// foo Hello World bar

//如果模板字符串中的变量没有声明，将报错
// 变量place没有声明
let msg = `Hello, ${place}`; // 报错

//模板字符串甚至还能嵌套
const tmpl = addrs => `
  <table>
  ${addrs.map(addr => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `).join('')}
  </table>
`;

//如果需要引用模板字符串本身，在需要时执行，可以写成函数
let func = (name) => `Hello ${name}!`;
func('Jack') // "Hello Jack!"

/**
 * 模板编译
 * 该模板使用<%...%>放置 JavaScript 代码，
 * 使用<%= ... %>输出 JavaScript 表达式。
 */
 let template = `
 <ul>
   <% for(let i=0; i < data.supplies.length; i++) { %>
     <li><%= data.supplies[i] %></li>
   <% } %>
 </ul>
 `;

// JavaScript 表达式字符串
echo('<ul>');
for(let i=0; i < data.supplies.length; i++) {
  echo('<li>');
  echo(data.supplies[i]);
  echo('</li>');
};
echo('</ul>');

/**
 * 标签模板
 */
alert`hello`
// 等同于
alert(['hello'])

let a = 5;
let b = 10;
//模板字符串前面有一个标识名tag，它是一个函数。
//整个表达式的返回值，就是tag函数处理模板字符串后的返回值。
tag`Hello ${ a + b } world ${ a * b }`;
// 等同于
tag(['Hello ', ' world ', ''], 15, 50);

function tag(stringArr, value1, value2){
  // ...
}

// 等同于

function tag(stringArr, ...values){
  // ...
}

//tag函数第一个参数是个数组，变量是第二个、第三个参数
//变量的穿插发生在数组的第一个与第二个参数之间，第二个变量发生在数组的第二个跟第三个参数之间，以此类推
/**
 * 第一个参数：['Hello ', ' world ', '']
 * 第二个参数: 15
 * 第三个参数：50
 */

 tag(['Hello ', ' world ', ''], 15, 50) //tag以此函数调用

// 编写tag函数的代码。下面是tag函数的一种写法，以及运行结果
let a = 5;
let b = 10;

function tag(s, v1, v2) {
  console.log(s[0]);
  console.log(s[1]);
  console.log(s[2]);
  console.log(v1);
  console.log(v2);

  return "OK";
}

tag`Hello ${ a + b } world ${ a * b}`;
// "Hello "
// " world "
// ""
// 15
// 50
// "OK"