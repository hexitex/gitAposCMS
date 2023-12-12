module.exports = {        
  extend: 'apostrophe-widgets',        
  label: 'Two Columns', 
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
    }
  ],
  beforeConstruct : function(self,options){
    options.addFields = [
      {
        name : 'marginBetween',
        type : 'integer',
        def : 40,
        label : 'Margin Between Column (px)',
        help : 'It applies on margin-right on first column'
      },
      {
        name : 'marginBottom',
        type : 'integer',
        def : 0,
        label : 'Margin Bottom Column (px)',
        help : 'It applies on bottom of all column'
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
      },
      {
        name:'ratio',
        label: 'Ratio',
        type:'select',
        def:'5050',
        choices: [
          {
            label: '25% 75%',
            value: '2575',
          },
          {
            label: '75% 25%',
            value: '7525',
          },
         
          {
            label: '50% 50%',
            value: '5050'
          }
          
        ]
      }
    ].concat(options.addFields || []);
  },
  construct : function(self,options){

    var superPushAssets = self.pushAssets;

    self.pushAssets = function(){
      superPushAssets();
      self.pushAsset('stylesheet' , 'twoColumns' , {when : 'always'});
    }
  }
};