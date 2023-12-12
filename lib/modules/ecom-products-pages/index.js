module.exports = {
  name: 'ecom-products-pages',
  piecesModuleName: 'ecom-product',
  label: 'Product Page',
  extend: 'apostrophe-pieces-pages',
  perPage: 90,
 // defaultSort: { ecomsubcategories: 1,  title: 1},
  piecesFilters: [
    {
      name: 'tags'
    },
    {
      name: 'ecomsubcategories'
    },
   
  ],
  // {
  //   name: 'ecomcategories'


  projection: {
    _url: 1,
    title: 1,
    slug: 1,
    tags: 1,
    type: 1,
    image: 1,
    description: 1,
    brand: 1,
    packSize: 1
    //,
    //ecomsubcategories:1
  },
  
  previous: {
    projection: {
      _url: 1,
      title: 1,
      slug: 1,
      tags: 1,
      type: 1,
      image: 1
      //  description:1,
      //  brand : 1
    }
  },
  next: {
    projection: {
      _url: 1,
      title: 1,
      slug: 1,
      tags: 1,
      type: 1,
      image: 1,
      //  description: 1,
      //  brand: 1
    }
  },

  construct: function (self, options) {
    self.pushAsset('script', 'user', { when: 'always' });
    //  self.pushAsset('script', 'starMaker', { when: 'user' });
    self.pushAsset('stylesheet', 'products', {
      when: 'always'
    });

    // self.on('apostrophe-pages:beforeSend', 'checkncccats', function (req) {


    //   for (var sc in req.data.subcats) {
    //     console.log('sc_id :' + req.data.subcats[sc]._id)
    //     for (var pc in req.data.pieces) {
    //       console.log('nnccsubcatids :' + req.data.pieces[pc].nccsubcategoriesIds)
    //       if (req.data.pieces[pc].nccsubcategoriesIds.indexOf(req.data.subcats[sc]._id) > -1) {
    //         console.log('keep ' + pc)
    //       }
    //       else {
    //         req.data.pieces.splice(pc, 1);
    //         console.log('drop ' + pc)
    //       }
    //     }
    //   }
    // }
    // )
  },
};