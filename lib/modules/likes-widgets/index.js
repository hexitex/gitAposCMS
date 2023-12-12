const fs = require("fs");
const path = require("path");
module.exports = {        
  extend: 'apostrophe-widgets',        
  label: 'Applause',      
  contextualOnly : true,
  defer : true,
  scene : 'user',
  
  construct : function(self,options){

    // Read all lib file technique :D
    var pathLib = path.join(__dirname + "/lib");
    fs.readdirSync(pathLib).filter((file)=>{
      require(pathLib + "/" + file)(self, options);
    });
    
    var superPushAssets = self.pushAssets;
    self.pushAssets = function(){
      superPushAssets();
      self.pushAsset('script' , 'always' , {when : 'always'});
      self.pushAsset('stylesheet' , 'likesWidget' , {when : 'always'});
    }
    
    self.likes = self.apos.likesForm;
  }  
};