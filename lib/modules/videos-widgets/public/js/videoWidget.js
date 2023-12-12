apos.define('videos-widgets' , {
    extend : 'apostrophe-widgets',
    construct : function(self,options){
        self.play = function($widget , data,options){
                const players = new Plyr($widget.find('#js-player'), {
                    captions: {
                        active: true
                    }
                });
                var element = $widget.find('div.video-container > div:first-child');
                if (element.length > 1 && $widget.find("js-player")) {
                    for (var i = 0; i <= element.length; i++) {
                        element[i].addEventListener('enterfullscreen', function () {
                            console.log("Entering full screen");
                           
                        })
                        element[i].addEventListener('exitfullscreen', function () {
                           
                        })
                    }
                } else if (element.length == 1 && $widget.find("js-player")) {
                    element[0].addEventListener('enterfullscreen', function () {
                        
                    })
                    element[0].addEventListener('enterfullscreen', function () {
                        
                    })
                }
        }
    }
})