// This configures the apostrophe-pages module to add a "home" page type to the
// pages menu

module.exports = {
  deleteFromTrash:true,
  scene:'user',
  filters: {
   // Grab our ancestor pages, with two levels of subpages
    ancestors: {
      children: {
        depth: 4,
      //  areas: ['thumbnailPages']
      }
    },
    // We usually want children of the current page, too
    children: true
  },
  types: [
   
  {
    name: 'likeHome',
    label: 'Default Page'
  },
    {
    name: 'apostrophe-blog-page',
    label: 'Blog'
  },
  // {
  //   name: 'portfolios-page',
  //   label: 'Coins and Tokens'
  // },
  {
    name: 'home',
    label: 'Home'
  }

    // Add more page types here, but make sure you create a corresponding
    // template in lib/modules/apostrophe-pages/views/pages!
  ],
  park: [{
    title: 'Search',
    slug: '/search',
    type: 'apostrophe-search',
    label: 'Search',
    parkedId: 'search',
    published: true
  }]
  // other apostrophe-pages options like `types` ...
}
