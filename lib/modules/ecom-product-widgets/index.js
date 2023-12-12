module.exports = {
    
    extend: 'apostrophe-pieces-widgets',
    projection: {
        _url:1,
          title: 1,
          slug: 1,
          tags: 1,
          type: 1,
          image : 1,
         description:1,
          brand : 1,
          packSize:1
      },
    // filters: {
    //     projection: {
    //       slug: 1,
    //       title: 1,
    //       description:1,
    //       image:1,
    //       _url:1
    //     }
    //   },
//     name: 'ncc-product-widgets',
//     alias: 'productSectionWidgets',
//     label: 'Product Section',
//     pluralLabel: 'Product Sections',
//     //piecesModuleName: 'myproduct',
//    // piecesModuleName:'ncc-product',
//     seo: false,
//     openGraph: false,
    
  
//     beforeConstruct : function(self,options){
//         options.addFields = [
//             {
//                 name : 'prodTitle',
//                 label : 'Product Title',
//                 help : 'OPTIONAL',
//                 type : 'string',
//                 def : 'Special Offer'
//             }
//         ].concat(options.addFields || []);
//     },
    construct: function (self, options) {
        var superPushAssets = self.pushAssets
        self.pushAssets = function () {
            superPushAssets()
            self.pushAsset('stylesheet', 'blogWidgetCss', {
                when: 'always'
            })
            self.pushAsset('script', 'user', {
                when: 'always'
            })
        }
    }
}