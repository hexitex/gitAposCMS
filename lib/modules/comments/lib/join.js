const Promise = require('bluebird');
module.exports = function(self,options){
    self.beforeInsert = function (req, piece, options, callback) {
        if (piece.blogId && piece.blogId.length) {
            // console.log("Running beforeInsert Exit");
            return callback(null);
        }
        if(!req.body.slug){return callback(null);}
        return Promise.try(function () {
            return self.apos.myblog.find(req)
                .criteria({
                  //  slug: req.body.slugId
                    slug: req.body.slug
                }).toObject();
        }).then((data) => {
            if (data) {
                piece.blogId = data._id;
            }
            return callback(null);
        }).catch(callback);
    }
}