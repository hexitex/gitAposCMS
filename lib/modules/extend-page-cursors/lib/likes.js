const _ = require("lodash");
module.exports = function(self, options){
    // Server Side Rendering without Ajax (Fix bugs when apos.change() triggers)
    self.on('apostrophe-pages:beforeSend', 'getLikes', function (req) {
        if (_.has(req, "params.slug") && _.has(req, "data.piece.enableLikes")) {
            var likesCursor = self.apos.modules['likes'].find(req, {
                postId: req.data.piece._id
            }).projection({
                title: 1,
                slug: 1,
                postId: 1,
                numberLikes: 1
            });
            return likesCursor.toObject().then((data) => {
                if (data !== undefined) {
                    req.data.likesInfo = data;
                    req.data.likesCount = data.numberLikes;
                    return;
                }
            }).catch((e) => res.send(e));
        } else {
            return null;
        }
    })
}