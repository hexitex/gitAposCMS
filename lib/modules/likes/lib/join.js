const Promise = require("bluebird");
module.exports = function(self, options){
    self.beforeInsert = function (req, piece, options, callback) {
        // Reference : https://github.com/apostrophecms/apostrophe-samples/blob/master/lib/modules/products/index.js
        // join existed , return null
        if (piece.myLikesId && piece.myLikesId.length) {
            return callback(null);
        }
        // else , makes self join ! (AUTO JOIN FEATURES !)
        return Promise.try(function () {
            // console.log("Running Promise");
            return self.apos.myblog.find(req)
                .criteria({
                    slug: req.body.slugId
                }).toObject();
        }).then((data) => {
            // push id into Joinids (joinByOne has no array.)
            if (data) {
                piece.myLikesId = data._id;
            }
            return callback(null);
        }).catch(callback);
    }
}