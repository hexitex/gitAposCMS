module.exports = function(self,options){
    self.route('post', 'like', function (req, res) {
        // console.log("Route POST Like" , req.body);
        return self.likes.submit(req, function (err) {
            return res.send({
                status: err ? 'error' : 'ok'
            });
        })
    });
}