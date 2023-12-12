const async = require("async");
const Promise = require("bluebird");
module.exports = function(self , options){
    self.submit = function (req, callback) {
      //  console.log('like ', req.body.numberLikes)
        return async.series([
            update
        ], callback)

        function update(callback) {
            return Promise.try(function () {
              //  console.log('finding')
                return self.apos.docs.find(req)
                    .criteria({
                        title: req.body.title,
                        postId: req.body.postId
                    })
                    .toObject();
            }).then((data) => {
                
            //    if (parseInt(data.numberLikes)<0){data.numberLikes=0}
               // console.log('adding to ',data.numberLikes)
                var piece = {
                    title: req.body.title,
                    numberLikes: data ? data.numberLikes + 1 : parseInt(req.body.numberLikes),
                    postId: req.body.postId,
                    published: req.body.published
                }
                if (data) {
                   // console.log('trying update',piece.numberLikes)
                    return self.apos.docs.db.update({
                        _id: data._id
                    }, {
                        $set: piece
                    }, {
                        multi: true
                    }, callback);
                } else if (data === undefined) {
                  //  console.log('no data')
                    return self.insert(req, piece, {
                        permissions: false
                    }, callback);
                }
            });
        }
    }

    // Enable this if you create new collection
    // For creating NEW COLLECTION(But you cannot see in pieces admin bar data directly. Use it when you need EXTERNAL DATA only)
    // self.submit = function (req, callback) {
    //     return async.series([
    //         database,
    //         update
    //     ], callback)

    //     function database(callback) {
    //         return self.apos.db.collection('likes', function (err, collection) {
    //             self.db = collection;
    //             return callback(err);
    //         })
    //     }

    //     function update(callback) {
    //         return Promise.try(function () {
    //             console.log("Any Likes DB ?", self.db);
    //             return self.db.find({
    //                 title: req.body.title,
    //                 postId: req.body.postId
    //             }).toArray();
    //         }).then((data) => {
    //             console.log("Any data ?", data.length);
    //             var piece = {
    //                 title: req.body.title,
    //                 numberLikes: data ? data.numberLikes + 1 : req.body.numberLikes,
    //                 postId: req.body.postId,
    //                 published: req.body.published
    //             }
    //             if (data.length >= 1) {
    //                 console.log("Running Update");
    //                 return self.db.update({
    //                     _id: data._id
    //                 }, {
    //                     $set: piece
    //                 }, {
    //                     multi: true
    //                 }, callback);
    //             } else if (data.length === 0) {
    //                 // piece._id = self.db;
    //                 console.log("Running Insert");
    //                 return self.db.insert(piece, callback);
    //             }
    //         });
    //     }
    // }
}