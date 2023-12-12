module.exports = {        
  extend: 'apostrophe-widgets',        
  label: 'Three Columns', 
  skipInitialModal : true,       
  addFields: [
    {
      name : 'columnOne',
      type : 'area',
      contextual : true
    },
    {
      name : 'columnTwo',
      type : 'area',
      contextual : true
    },
    {
      name : 'columnThree',
      type : 'area',
      contextual : true
    }
  ],
  beforeConstruct : function(self,options){
    options.addFields = [
      {
        name : 'marginBetween',
        type : 'integer',
        def : 20,
        label : 'Margin Between Columns (px)',
        help : 'Applies margin-right on first and second column '
      },
      {
        name:'stack',
        label: 'Stack when at width',
        type:'select',
        def:'900',
        choices: [
          {
            label: '900 pixels',
            value: '900',
          },
          {
            label: '800 pixels',
            value: '800'
          }
          ,
          {
            label: '700 pixels',
            value: '700'
          }
          ,
          {
            label: '600 pixels',
            value: '600'
          }
          ,
          {
            label: 'Never',
            value: '0'
          }
        ]
      }
    ].concat(options.addFields || []);
  },
  construct : function(self,options){

    var superPushAssets = self.pushAssets;

    self.pushAssets = function(){
      superPushAssets();
      self.pushAsset('stylesheet' , 'threeColumns' , {when : 'always'});
    }
  }
};