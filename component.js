module.exports = function(){
    var _ = require('underscore');

    this.init = function(config) {
        var that = this;
        this.params = _.defaults(config||{}, defaults)
        process.on('user:register.response', function(pin){
            console.log('todo: clonq/revo-invitation: ', pin);
        })
    }

}

var defaults = module.exports.defaults = {
    listen: 'user:register.response',
    models: {
        invitation: {
            // supportedMethods: ['register']
        }
    }
}
