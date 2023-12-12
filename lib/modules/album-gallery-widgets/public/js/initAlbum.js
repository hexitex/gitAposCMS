apos.define('album-gallery-widgets', {
    extend: 'apostrophe-widgets',

    // beforeConstruct : function(self,options){
    //     var rotate=data.rotate;
    //     var stretch=data.stretch;
    //     var depth=data.depth;
    //     var modifier=data.modifier;
    //     var shadows=data.shadows;
    // },
    construct: function (self, options) {

        self.play = function ($widget, data, options) {

            // var getAlbum = $widget.find("[data-album]").attr("data-album");
            data = self.getData($widget)
            var album = $widget.find('#' + data.albumName);

            //       console.log(JSON.stringify(data));
            var rotate = data.rotate;
            var stretch = data.stretch;
            var depth = data.depth;
            var modifier = data.modifier;
            var shadows = data.shadows;
            var numberOfSlides = data.textPlayer.length;
            var loop = data.loop;
            var pagination = data.pagination;
            var delay = data.delay;
            var speed=data.speed;
            var autoplay = data.autoplay;
            var effect = data.effect;
            var limitRotation = data.limitRotation;
            var crossFade=data.crossFade;
            var direction=data.direction;
            var slidesPerView=data.slidesPerView;

            //  var data=data;
            $.extend(true, window.apos, {
                WIDGETS: {
                    album: function () {

                        return readyAlbum;
                    }
                }
            })
            if (autoplay){
                autoplay={delay:delay}
            }
            //  console.log('rotate ',data.rotate);
            if (effect === 'cover') {
                var readyAlbum = new Swiper(album, {
                  //  init:false,
                    effect: 'coverflow',
                    grabCursor: true,
                    loop: loop,
                    centeredSlides: true,
                    pagination: pagination,
                    loopedSlides: numberOfSlides,
                    speed: speed,
                    delay:delay,
                    autoplay: autoplay,//autoplay,
                    slidesPerView: slidesPerView,
                    direction:direction,
                  //  waitForTransition:false,

                    coverflowEffect: {
                        rotate: rotate,
                        stretch: stretch,
                        depth: depth,
                        modifier: modifier,
                        slideShadows: shadows,
                    },
                    breakpoints: {
                        768: {
                            spaceBetween: 20,
                        },
                        640: {
                            spaceBetween: 10,
                        },
                        320: {
                            spaceBetween: 5,
                        }
                    },
                    navigation: {
                        el: '.swiper-navigation',
                      //  hide: true
                    },
                    scrollbar: {
                        el: '.swiper-scrollbar',
                      //  hide: true
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                      //  hide:pagination
                    },
                   
                });
            }
            if (effect === 'flip') {
                var readyAlbum = new Swiper(album, {
                    effect: 'flip',
                    grabCursor: true,
                    loop: loop,
                    centeredSlides: true,
                    pagination: pagination,
                    loopedSlides: numberOfSlides,
                    delay: delay,
                    speed: speed,
                    autoplay: autoplay,
                    slidesPerView: slidesPerView,
                    direction:direction,

                    flipEffect: {
                        rotate: rotate,
                        limitRotation: limitRotation,
                        slideShadows: shadows,
                    },

                    navigation: {
                        el: '.swiper-navigation',
                      //  hide: true
                    },
                    scrollbar: {
                        el: '.swiper-scrollbar',
                      //  hide: true
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                      //  hide:pagination
                    }
                });
            }
            if (effect === 'cube') {
                var readyAlbum = new Swiper(album, {
                    effect: 'cube',
                    grabCursor: true,
                    loop: loop,
                    centeredSlides: true,
                    pagination: pagination,
                    loopedSlides: numberOfSlides,
                    delay: delay,
                    speed: speed,
                    autoplay: autoplay,
                    slidesPerView: slidesPerView,
                    direction:direction,

                    cubeEffect: {
                        shadow:shadows,
                        slideShadows: shadows
                    },

                    navigation: {
                        el: '.swiper-navigation',
                      //  hide: true
                    },
                    scrollbar: {
                        el: '.swiper-scrollbar',
                      //  hide: true
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                      //  hide:pagination
                    }
                });
            }
            if (effect === 'fade') {
                var readyAlbum = new Swiper(album, {
                    effect: 'fade',
                    grabCursor: true,
                    loop: loop,
                    centeredSlides: true,
                    pagination: pagination,
                    loopedSlides: numberOfSlides,
                    delay: delay,
                    speed: speed,
                    autoplay: autoplay,
                    slidesPerView: slidesPerView,
                    direction:direction,

                    fadeEffect: {

                        crossFade: crossFade
                    },

                    navigation: {
                        el: '.swiper-navigation',
                      //  hide: true
                    },
                    scrollbar: {
                        el: '.swiper-scrollbar',
                      //  hide: true
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                      //  hide:pagination
                    }
                });
            }
           
        }
    


    }
})