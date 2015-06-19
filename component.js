module.exports = function(){
    var _ = require('underscore');

    this.init = function(config) {
        var self = this;
        this.params = _.defaults(config||{}, defaults)
        process.on('invitation:process', function(pin){
            console.log('invitation:process: ', pin);
            if(pin.code) {
                var action = self.params.for[pin.code];
                if(!!action) {
                    process.once('user:find.by.email.'+pin.email+'.response', function(foundUser){
                        if(action.emit) {
                            var payload = _.mapObject(action.payload, function(val, key){
                                if(/^<%(.*)%>$/.test(val)) {
                                    val = /^<%(.*)%>$/.exec(val)[1];
                                    if(foundUser[val]) val = foundUser[val];
                                }
                                return val;
                            });
                            payload = _.defaults(foundUser, payload);
                            process.emit(action.emit, payload);
                        }
                    });
                    process.emit('user:findOne', { email: pin.email });
                }
            }
        })
    }

}

var defaults = module.exports.defaults = {
    models: {
        invitation: {
            supportedMethods: ['process']
        }
    }
}
