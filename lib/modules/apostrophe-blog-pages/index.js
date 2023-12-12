module.exports = {
   
    piecesFilters : [
        {
            name : 'tags'
        }
        ,
        {
            name : 'year'
        },
        {
            name : 'month'
        },
        {
            name : 'day'
        }
    ],
    previous: {
        projection: {
            title: 1,
            slug: 1,
            tags: 1,
            type: 1,
            blogThumbnail : 1,
            blogBody : 1,
            numberVisits : 1
        }
    },
    next: {
        projection: {
            title: 1,
            slug: 1,
            tags: 1,
            type: 1,
            blogThumbnail: 1,
            blogBody: 1,
            numberVisits: 1
        }
    },
    construct : function(self,options){
        // Push asset with super here
        var superPushAssets = self.pushAssets;

        self.pushAssets = function(){
            superPushAssets();
            self.pushAsset('stylesheet' , 'blogCss' , {when :'always'})
            self.pushAsset('script' , 'blogJs' , {when :'always'})
            self.pushAsset('script' , 'readingtime' , {when :'always'})
        }

        // No need super pattern, It provides an empty override to this.
        // Number of visits before entering the page (Increment by 1)
        self.beforeShow = function(req , callback){
            return self.apos.docs.db.update({
                _id : req.data.piece._id
            },{
                $inc : {
                    numberVisits: 1
                }
            },callback);
        }
    }
}