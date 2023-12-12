var async = require('async');
module.exports = function(self,options){
    self.submitMember = function (req, callback) {
        return async.series([
            update
        ], callback);

        function update(callback) {
            var piece = {
                title: req.body.first+''+req.body.last,
                first: req.body.first,
                last: req.body.last,
                emailAddress: req.body.emailAddress,
              
                published: true
            }

            return self.insert(req, piece, {
                permissions: false
            }, callback);
        }
    }
}