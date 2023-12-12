module.exports = function(self, options){
    // To make it ajax call like information
    self.route('put', 'get-like', function (req, res) {
        var likesCursor = self.apos.modules['likes'].find(req, {
            postId: req.body.pieceId
        }).projection({
            title: 1,
            slug: 1,
            postId: 1,
            numberLikes: 1
        });
        return likesCursor.toObject().then((data) => {
            if (data !== undefined) {
                return res.send({
                    likesInfo: data,
                    likesCount: data.numberLikes
                });
            }
            return res.send({
                likesInfo: null
            });
        }).catch((e) => res.send(e));
    });
}