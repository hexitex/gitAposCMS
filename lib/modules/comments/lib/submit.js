var Filter = require('bad-words');
var async = require('async');
module.exports = function(self,options){
    self.submit = function (req, callback) {
        // Construct new filter badwords package
        // Source : https://github.com/web-mech/badwords
        var filter = new Filter();
        filter.removeWords('damn', 'hell');
        return async.series([
            insert
        ], callback);

        function insert(callback) {
           // console.log('insert from submit.js')
           // console.trace()
            var piece = {
                title: req.body.title,
                date: self.apos.launder.date(req.body.date),
                readerName: self.apos.launder.string(req.body.readerName),
                comments: filter.clean(self.apos.launder.string(req.body.comments)),
                postId: self.apos.launder.id(req.body.postId),
                published: req.body.published
            }
            return self.insert(req, piece, {
                permissions: false
            }, callback);
        }
    };

    // If You want to use native db call , just enable this below. Benefits for every user submission if got so many submission available
    // self.submit = function(req , callback){
    //   console.log("Req on piece" , req.body);

    //   var comment = {
    //     _id: self.apos.utils.generateId(),
    //     date: req.body.date,
    //     readerName: req.body.readerName,
    //     comment: req.body.comment
    //   }
    //   return self.apos.docs.db.update({
    //     _id: req.body.pieceId,
    //     workflowLocale: {
    //       $in: [
    //         'default', 'default-draft' , null
    //       ]
    //     }
    //   }, {
    //     $set : {
    //       postId : req.body.postId
    //     },
    //     $push : {
    //       comments : comment
    //     } 
    //   }, {
    //     multi: true
    //   }, callback);
    // }
}