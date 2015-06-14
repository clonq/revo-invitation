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
                            var payload = _.defaults(foundUser, action.payload);
                            process.emit(action.emit, payload);
                        }

                    })
                    process.emit('user:find', { by:'email', email: pin.email});
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
