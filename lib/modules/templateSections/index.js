module.exports = {

    extend: 'apostrophe-pieces',
    name: 'templateSections',
    alias: 'templateSections',
    label: 'Section Template',
    pluralLabel: 'Section Templates',
    seo: false,
    openGraph: false,
    perPage: 20,

    label: 'Section Templates',
    addFields: [{
      name: 'title',
      label: 'Name',
      type: 'string',
      required: true,
    },
    {
      name: 'nsection',
      type: 'area',
      contextual: true
    },
  
  ],
    construct: function (self, options) {
    //   self.pushAsset('script', 'always', {
    //     when: 'always'
    // });
    },
  contextual: true
}