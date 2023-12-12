const _ = require("lodash");
module.exports = function(self, options){
  //  console.log("getting comments");
    self.on('apostrophe-pages:beforeSend', 'getReviews', function (req) {
            if (_.has(req, "params.slug") && _.has(req, "data.piece.enableReviews")) {
           //  console.log("Piece Id" , req.data.piece._id);
            var cursor = self.apos.modules['reviews'].find(req, {
                docId: req.data.piece._id
            }).projection({
                title: 1,
                slug: 1,
                date: 1,
                reviews: 1,
                readerName: 1,
                ratings:1
            });
         //   console.log("got comments");
            return cursor.toArray().then((data) => {
                // console.log("Any data ?" , data);
                if (data !== undefined) {
                    req.data.allreviews = data;
                    req.data.allreviewscount = data.length;
                    return;
                }
            }).catch((e) => res.send(e))
        } else {
            return null
        }
    })
}