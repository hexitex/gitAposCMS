module.exports = function(self,options){
    console.log('route.js');
    self.route('put' , 'get-review' , function(req, res){
        var cursor = self.apos.modules['reviews'].find(req, {
            productID: req.body.piece._id
        }).projection({
            title: 1,
            slug: 1,
            date: 1,
            reviews: 1,
            ratings:1,
            readerName: 1,
            productID: 1
        });

        return cursor.toArray().then((data) => {
            // console.log("Any data ?" , data);
            if (data !== undefined) {
                return res.send({
                    allreviews : data,
                    allreviewscount : data.length
                })
            }
        }).catch((e) => res.send(e))
    })
}