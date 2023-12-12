apos.define('section-widgets', {
    extend: 'apostrophe-widgets',
  //  options={defer:true},
    construct: function(self, options) {
     //   options.defer=true;
    
      self.play = function($widget, data, options) {
     
      //  UTILS.pageTop();  
        UTILS.rellax.add();
        UTILS.scrolltrigger.init();
        UTILS.anchorTag();
     
       
      };
    }
  });