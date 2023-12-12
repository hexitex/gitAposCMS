module.exports = {
  extend: 'apostrophe-pieces',
  name: 'ecom-product',
  label: 'Product',
  pluralLabel: 'Products',
  alias :'myproduct',
  perPage: 40,
 // defaultSort: { title: 1},   
  sort: {  ecomsubcategories: 1,title: 1},   
  restApi: {
    safeFilters: [ 'serial', 'tags' ]
  },
  projection: {
    _url:1,
      title: 1,
      slug: 1,
      tags: 1,
      type: 1,
      image : 1,
     description:1,
      brand : 1,
      packSize:1,
      volume:1,
      weight:1,
   //  nccsubcategories:1,
      // ncccategories:1,
  },
  addFields: [
    {
      name: 'title',
      label: 'Name',
      type: 'string',
      required: true
    },
    {
      name: 'brand',
      label: 'Brand',
      type: 'string',
      required: true
    },
    {
      name: 'description',
      label: 'Description',
      type: 'area',
      required: true,
      options: {
        widgets: {
          'apostrophe-rich-text': {
            toolbar: [ 'Bold', 'Italic', 'Link', 'Unlink' ]
          }
        }
      }
    },
    {
      name: 'quantity',
      label: 'Quantity In Stock',
      type: 'integer',
      required: true
    },
    {
      name: 'packSize',
      label: 'PackSize',
      type: 'integer',
      required: true
    },
    {
      name: 'volume',
      label: 'Volume',
      type: 'float',
      required: false
    },
    {
      name: 'weight',
      label: 'Weight',
      type: 'float',
      required: false
    },
    {
      name: 'serial',
      label: 'Serial number',
      type: 'string',
      required: true
    },
    {
      name: 'price',
      label: 'Price',
      type: 'float',
      required: true
    },
    {
      name: 'discount',
      label: 'Discount %',
      type: 'integer',
      required: false
    },
    {
      name: 'vat',
      label: 'VAT/Taxes % that overwrite global setting',
      type: 'integer',
      required: false
    },
    {
      name: 'total',
      label: 'Total',
      type: 'float',
      required: true,
      contextual: true
    },
    {
      name: 'image',
      label: 'Image',
      type: 'singleton',
      required: true,
      widgetType: 'apostrophe-images',
      options: {
        limit: 1,
        minSize: [ 200, 200 ],
        aspectRatio: [ 1, 1 ]
      }
    },
    {name: 'nsection',   label: 'Additional Content - edit on page', type: 'area', contextual: true},
    {
      name: 'pdfs',
      label: 'Files',
      type: 'singleton',
      widgetType: 'apostrophe-files',
      options: {
        limit: 5,
        extensions: [ 'pdf','txt','docx' ],
        extensionMaps: {},
        image: false
      },
      required: false
    },
    {
      name: '_ecomsubcategories',
      label: 'SubCategories',
      // Must match the `name` option given when configuring `fabric` as a subclass of pieces.
      // You could skip this since the name of the join matches the name of the other type.
      withType: 'ecom-subcategory',
      type: 'joinByArray',
      filters: {
        // Fetch just enough information
        projection: {
          title: 1,
          slug: 1,
          type: 1,
          tags: 1,
          categoryId:1
        }
      }
    }
    ,
   
   
    {
      name: '_reviews',
      type: 'joinByOneReverse',
      withType: 'reviews',
      reverseOf: '_ecom-product'
  },
  {
      name: 'productConfig',
      label: 'Enable Reviews in Product ?',
      type: 'select',
      choices: [
          { label: 'Reviews', value: 'review', showFields:['enableReviews'] },
      ]
  },
  {
    name: 'enableReviews',
    label: 'Enable Reviews',
    type: 'singleton',
    widgetType: 'reviews'
},
  ],
  addFilters: [
    {
      name: 'serial',
      label: 'Serial / Part No / MF Product ID'
    },
    {
      name: 'tags',
      label: 'Tags'
    },
    {
      name: 'subcategory',
      label: 'Subcategories'
    },
    // {
    //   name: 'category',
    //   label: 'Categories'
    // },
    {
      name: 'slug',
      type: 'string',
      label: 'Slug',
      contextual: true
  }
  ],
  arrangeFields: [
    {
      name: 'details',
      label: 'Values',
      fields: ['price','discount','total','quantity','packSize','weight','volume','vat']
  },
  {
    name: 'brief',
    label: 'Decription Section',
    fields: ['serial','title','brand', 'image','nsection','desption','pdfs','ecomsubcategories','tags']
},
{
     name : 'config',
     label : 'Review',
     fields: ['reviewConfig', 'enableReview']
},

{
    name: 'admin',
    label: 'Administrative',
    fields: ['slug', 'tags','_reviews'],
    last: true
}
],
  construct: function(self, options) {
    self.beforeSave = function(req, piece, options, callback) {
      // Round price up to 2 digits
      piece.price = Number(piece.price).toFixed(2);
      // Add global or product vat
      if (piece.vat) {
        piece.price = piece.price * (1 + (piece.vat / 100));
      } else if (req.data.global.shopVat) {
        piece.price = piece.price * (1 + (req.data.global.shopVat / 100));
      }

      // Calculate total with discount
      piece.total = piece.discount ? piece.price * (1 - (piece.discount / 100)) : piece.price;
      piece.total = Number(piece.total).toFixed(2);
      return callback();
    };

    // Add a review
    // self.apos.app.post('/products/reviews', function (req, res, next) {
    //   const productId = req.body.productId;
    //   const review = {
    //     text: req.body.review,
    //     user: req.user.firstName,
    //     reviewDate:new Date()
    //   };
    //   self.apos.docs.db.update({
    //     _id: productId
    //   }, { $addToSet: { reviews: review } }, (err) => {
    //     if (err) {
    //       return res.json(false);
    //     } else {
    //       return res.json(true);
    //     }
    //   });

    // });

    // // Add a ratings
    // self.apos.app.post('/products/ratings', function (req, res, next) {
    //   const productId = req.body.productId;
    //   // Get product
    //   self.apos.docs.getManager('ncc-product').find(req,
    //     {
    //       _id: productId
    //     }, {rating: 1, ratedUser: 1}).toArray((err, product) => {
    //     if (err) {
    //       return res.json(false);
    //     }
    //     console.log(product);
    //     // See if user already add a rating
    //     if (product[0].ratedUser && product[0].ratedUser.includes(req.user._id)) {
    //       return res.json(false);
    //     }
    //     let rating;
    //     if (product[0].rating) {
    //       rating = (product[0].rating + req.body.rating) / 2;
    //     } else {
    //       rating = req.body.rating;
    //     }
    //     self.apos.docs.db.update({
    //       _id: productId
    //     }, { $addToSet: { ratedUser: req.user._id }, $set: { rating } }, (err) => {
    //       if (err) {
    //         return res.json(false);
    //       } else {
    //         return res.json(true);
    //       }
    //     });
    //   });

   // });
  }
};
