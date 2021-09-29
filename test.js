var target = function () { return 'I am the target'; }
var obj = {
  
}
var handler = {
  apply: function (target, ctx, args) {
    console.log(target, ctx, args)
    return 'I am the proxy';
  }
};

var p = new Proxy(target, handler);

p.apply(obj,[1,2])