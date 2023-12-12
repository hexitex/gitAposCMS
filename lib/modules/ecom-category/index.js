module.exports = {
  extend: 'apostrophe-pieces',
  name: 'ecom-category',
  label: 'Category',
  pluralLabel: 'Categories',
  alias:'ecomcategories',
  contextual: true,
  addFields: [
    {
      name: 'title',
      label: 'Name',
      type: 'string',
      required: true,
      sortify: true
    },
    {
      name: '_ecom-subcategory',
      type: 'joinByOneReverse',
      withType: 'ecom-subcategory',
      label: 'Subcategories',
      //idField: 'sub-category',
      filters: {
      projection: {
        title: 1,
        slug: 1,
        type: 1,
        tags: 1
      }
    }
  }
  ],
  construct: function(self, options) {
    self.on('apostrophe-pages:beforeSend', 'fetchCats', async function(req) {
      // console.log(req.path)
      if (req.path+''=='/products')
      {
        //console.log('doing it')
      req.data.cats = await self.apos.docs.getManager('ecom-category').find(
        req,
        {
         //  title: {
         //         }
        }
      )
      .sort({ title: 1 })
      .toArray();
      }
    });
  }
};
