module.exports = function(self,options){
    self.allLikeSchema = function () {
        self.likeSchema = self.apos.schemas.subset(self.schema,
            ['numberLikes', 'postId']
        )
    };
}