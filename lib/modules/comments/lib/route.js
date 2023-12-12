module.exports = function(self,options){
    self.route('put' , 'get-comment' , function(req, res){
        var cursor = self.apos.modules['comments'].find(req, {
            postId: req.body.piece._id
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
                return res.send({
                    allcomments : data,
                    allcommentscount : data.length
                })
            }
        }).catch((e) => res.send(e))
    })
}