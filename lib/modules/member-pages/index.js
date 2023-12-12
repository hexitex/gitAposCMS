module.exports = {
  name: 'member-page',
  piecesModuleName: 'member',
  label: 'Member Page',
  extend: 'apostrophe-pieces-pages',
  perPage: 40,
  defaultSort: { memberNumber: 1,  title: 1},
  piecesFilters: [
    {
      name: 'tags'
    },
   
    {
      name:'title'
    }
    
   
  ],

  projection: {
    _url: 1,
    title: 1,
    slug: 1,
    tags: 1,
    type: 1,
  
    
  },
  
  
  construct: function (self, options) {
 
    self.pushAsset('stylesheet', 'member', {
      when: 'always'
    });

   
  },
};