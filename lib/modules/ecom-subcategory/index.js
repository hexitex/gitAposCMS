module.exports = {
  extend: 'apostrophe-pieces',
  name: 'ecom-subcategory',
  label: 'SubCategory',
  alias:'ecomsubcategories',
  pluralLabel: 'SubCategories',
  addFields: [
    {
      name: 'title',
      label: 'Name',
      type: 'string',
      required: true
    },
    {
      name: '_category',
     
      // Must match the `name` option given when configuring `fabric` as a subclass of pieces.
      // You could skip this since the name of the join matches the name of the other type.
      withType: 'ecom-category',
      type: 'joinByOne',
    //  sortify: true,
      filters: {
       
        // Fetch just enough information
        projection: {
          title: 1,
          slug: 1,
          type: 1,
          tags: 1
        
        },
      
      },
      required: true
    }
   
  ],

    construct: function(self, options) {
      self.on('apostrophe-pages:beforeSend', 'fetchSubCats', async function(req) {
       // console.log(req.query.ecomcategories)
        if (req.path+''=='/products')
        {
          //console.log('doing it')
        req.data.subcats = await self.apos.docs.getManager('ecom-subcategory').find(
          req,
          {
             categoryId:req.query.ecomcategories
          }
        ).projection({
          title: 1,
          slug: 1,
          _id:1
         
      })
        .sort({ title: 1 })
        .toArray();
       
        }
      });
    }
  };


