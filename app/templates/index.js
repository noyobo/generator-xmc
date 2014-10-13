/**
 * @author <%= author.name %> <<%= author.email %>>
 */

var a = require('./mods/a');
var hello = require('./views/hello-render')

module.exports = function() {
    var html = hello({name:'noyobo'})
    alert(html)
    a.init();
    if ('@DEBUG@') {
      console.log('when @DEBUG@ show log');
    };
}
