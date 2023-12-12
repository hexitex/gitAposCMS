module.exports = {        
  extend: 'apostrophe-widgets',        
  label: 'One Column', 
  skipInitialModal : true,       
  addFields: [
    {
      name : 'column',
      type : 'area',
      contextual : true
    }
  ],
  beforeConstruct : function(self,options){
    options.addFields = [
      {
        name : 'width',
        type : 'string',
        def : '100%',
        label : 'Width (add px, % or vw/vh after the number)',
        help : 'Width of column'
      },
      {
        name : 'marginLeft',
        type : 'string',
        def : 'auto',
        label : 'Margin Left (add px, % or vw/vh after the number)',
        help : 'Applies a margin to the left of the column, to center the column enter "auto"'
      },
      {
        name : 'marginRight',
        type : 'string',
        def : 'auto',
        label : 'Margin Right (add px, % or vw/vh after the number)',
        help : 'Applies a margin to the Right of the column, to center the column enter "auto"'
      },
      {
        name : 'marginTop',
        type : 'string',
        def : '0',
        label : 'Margin Top (add px, % or vw/vh after the number)',
        help : 'Applies a margin to the Top of the column'
      },
      {
        name : 'marginBottom',
        type : 'string',
        def : '0',
        label : 'Margin Bottom',
        help : 'Applies a margin to the Bottom of the column in pixels'
      },
      {
        name : 'padding',
        type : 'string',
        def : '20px',
        label : 'Padding (add px, % or vw/vh after the number)',
        help : 'Applies inside padding area around the content'
      }
    
    ].concat(options.addFields || []);
  },
  construct : function(self,options){

    var superPushAssets = self.pushAssets;

    self.pushAssets = function(){
      superPushAssets();
      self.pushAsset('stylesheet' , 'oneCols' , {when : 'always'});
    }
  }
};