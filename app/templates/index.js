/**
 * @author <%= author.name %> <<%= author.email %>>
 */

var a = require('./mods/a');
var hello = require('./views/hello-render')
// 在你删除此行代码的时候, 请记住 require views 文件的时候一定更要加上  -render !!!
// @see https://github.com/kissyteam/xtemplate

module.exports = function() {
    var html = hello({name:'world'})
    alert(html)
    a.init();
    if ('@DEBUG@') {
      console.log('when @DEBUG@ show log');
    };
}

// 在你删除此代码块的时候, 请记住
// 代码书写风格遵循 commonJS 规范
// @see http://wiki.commonjs.org/wiki/Modules/1.0
