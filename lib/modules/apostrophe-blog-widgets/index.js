module.exports = {
    label : 'Blog Section',
    filters: {
        projection: {
          slug: 1,
          title: 1,
          blogThumbnail:1,
          blogBody:1,
          _url:1
        }
      },
    beforeConstruct : function(self,options){
        options.addFields = [
            {
                name : 'blogTitle',
                label : 'Blog Title',
                help : 'OPTIONAL',
                type : 'string',
                def : 'Latest Blog'
            }
        ].concat(options.addFields || []);
    },
    construct: function (self, options) {
        var superPushAssets = self.pushAssets
        self.pushAssets = function () {
            superPushAssets()
            self.pushAsset('stylesheet', 'blogWidgetCss', {
                when: 'always'
            })
            self.pushAsset('script', 'blogWidget', {
                when: 'always'
            })
        }
    }
}