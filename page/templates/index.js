/**
 * @author <%= author.name %> <<%= author.email %>>
 */

var a = require('./mods/a');

module.exports = function() {
    a.init();
    if ('@DEBUG@') {
      console.log('when @DEBUG@ show log');
    };
}
