apos.define('apostrophe-blog-widgets' , {
    extend : 'apostrophe-pieces-widgets',
    construct : function(self,options){
        self.play = function($widget,data,options){
            var mySwiper = new Swiper($widget.find('.blog-container'), {
                // autoplay: {
                //     delay: 3500,
                // },
               
                // grabCursor: true,
                // loop: true,
                // centeredSlides: true,
                // pagination: pagination,
                // loopedSlides: numberOfSlides,
                // delay: delay,
                // autoplay: autoplay,
                //  slidesPerView: 'auto',
                 slidesPerView: 4,
                spaceBetween: 0,
                autoHeight:false,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    dynamicBullets: true
                },
                breakpoints: {
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 0,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 0,
                    },
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 0
                    },
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 0
                    }
                },
                on: {
                    paginationRender: function (swiper, paginationEl) {
                        // Remove pagination if one
                        if (this.pagination.bullets.length === 1) {
                            $(".swiper-pagination").css("display", "none");
                            // swiper.pagination.update();
                        }
                    },
                }
            });
         }
    }
})