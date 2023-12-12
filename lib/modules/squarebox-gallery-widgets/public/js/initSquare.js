// Reference Plugin : http://veno.es/venobox/
// And Github Link : https://github.com/nicolafranchini/VenoBox
apos.define('squarebox-gallery-widgets' , {
    extend : 'apostrophe-widgets',
    construct : function(self, options){
        self.play = function($widget , data, options){
            $widget.find('.image-viewer').venobox({
                titleattr: 'data-title',
                spinner: 'wave',
                numerationPosition: 'top',
                titlePosition: 'bottom',
                overlayColor: '#f1f2f6ee',
                titleBackground: '#f1f2f6ee',
                titleColor: '#0F58FF',
                // closeBackground: '#0F58FF',
                numerationBackground: '#0F58FF',
                spinColor: '#0F58FF',
            //    arrowsColor: '#0F58FF',
                numeratio: true
            })
        }
    }
})