var _ = require('lodash');
module.exports = {
    construct : function(self,options){
        // Template Filter that returns {{ anything | toArray }}
        self.addFilter('toArray', function (object) {
            return [object];
        });

        self.addFilter('findObject' , function(object , element){
            var find = _.find(object, element ? element : null);
            return find;
        })
    }
}