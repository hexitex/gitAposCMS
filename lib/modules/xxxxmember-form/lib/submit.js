var async = require('async');
module.exports = function(self,options){
    self.submitContact = function (req, callback) {
        return async.series([
            update
        ], callback);

        function update(callback) {
            var piece = {
                title: req.body.first+req.body.last,
                first: req.body.first,
                last: req.body.last,
                emailAddress: req.body.emailAddress,
                address1: req.body.address1,
                address2: req.body.address2,
                address3: req.body.address3,
                address4: req.body.address4,
                country: req.body.country,
                postcode:req.body.postcode,
                mobile: req.body.mobile,
                joinedDate: req.body.joinedDate,
                published: true
            }

            return self.insert(req, piece, {
                permissions: false
            }, callback);
        }
    }
}