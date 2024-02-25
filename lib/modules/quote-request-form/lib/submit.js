var async = require('async');
module.exports = function(self,options){
    self.submitQuote = function (req, callback) {
        return async.series([
            update
        ], callback);

        function update(callback) {
            var piece = {
                title: req.body.personName,
                personName: req.body.personName,
                email: req.body.email,
                telephone:req.body.telephone,
                numberOfRooms:req.body.numberOfRooms,
                numberOfExtWalls:req.body.numberOfExtWalls,
                message: req.body.message,
                date: req.body.date,
                published: true
            }

            return self.insert(req, piece, {
                permissions: false
            }, callback);
        }
    }
}