const _ = require("lodash");
module.exports = function(self, options){
    self.on('apostrophe-pages:beforeSend', 'getComments', function (req) {
        // Hacky method , only in pieces have params.slug
        // if (req.params.slug && req.data.piece.blogComments) {
            if (_.has(req, "params.slug") && _.has(req, "data.piece.enableComments")) {
             console.log("Piece Id" , req.data.piece._id);
            var cursor = self.apos.modules['comments'].find(req, {
                postId: req.data.piece._id
            }).projection({
                title: 1,
                slug: 1,
                date: 1,
                comments: 1,
                readerName: 1,
                postId: 1
            });

            return cursor.toArray().then((data) => {
                // console.log("Any data ?" , data);
                if (data !== undefined) {
                    req.data.allcomments = data;
                    req.data.allcommentscount = data.length;
                    return;
                }
            }).catch((e) => res.send(e))
        } else {
            return null
        }
    })
}