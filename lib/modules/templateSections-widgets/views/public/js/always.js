const _ = require('lodash');
apos.define('templateSection-widgets', {
    extend: 'apostrophe-widgets',
    options={defer:true},
   
    construct: function(self, options) {
 
         self.play = function($widget, data, options) {
        apos.remapDotPaths()
        console.log('remapped')
  
            UTILS.rellax.add();
            
     
            UTILS.scrolltrigger.resetAll();
            UTILS.scrolltrigger.init();
     
          
        UTILS.anchorTag();
     
       
      };
    }
  });


  