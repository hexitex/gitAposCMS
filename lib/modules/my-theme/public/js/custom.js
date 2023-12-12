apos.on('ready',function () {
 
  !function (e , d) {
    var UTILS = (function () {

      var isPortrait= function () {
        return window.innerHeight > window.innerWidth;
      }

      var isLandscape= function () {
        return (window.orientation === 90 || window.orientation === -90);
      }

      var customCallback= function (callback) {
        var myArgument = arguments;
        callback(myArgument);
      }

      // FULL SCREEN HELPER
      /* View in fullscreen */
      var openFullscreen= function (elem,callback) {
        if (elem.requestFullscreen) {
          elem.requestFullscreen(callback);
        } else if (elem.mozRequestFullScreen) { /* Firefox */
          elem.mozRequestFullScreen(callback);
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
          elem.webkitRequestFullscreen(callback);
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
          elem.msRequestFullscreen(callback);
        }
      }

      /* Close fullscreen */
      var closeFullscreen=function (callback) {
        if (d.exitFullscreen) {
          d.exitFullscreen(callback);
        } else if (d.mozCancelFullScreen) { /* Firefox */
          d.mozCancelFullScreen(callback);
        } else if (d.webkitExitFullscreen) { /* Chrome, Safari and Opera */
          d.webkitExitFullscreen(callback);
        } else if (d.msExitFullscreen) { /* IE/Edge */
          d.msExitFullscreen(callback);
        }
      }

      /**
       * For Regex Testing
       * @param {regex} regex - Must Use Regex Format
       * @param {*} test - Can test anything regards of regex format
       */
      var regexTester= function (regex , test){
        return (regex).test(test);
      }

      var scrollIntoView=function (element , y , duration){
      /// console.log('xxxx')
          return $('html, body').animate({
                scrollTop: y
              }, duration);
      }

      
      /**
       * Mobile View UTILS
       * @returns Boolean
       */
      var mobileView=function (){
        return (window.innerWidth <= 640);
      }

      /**
       * Desktop View UTILS
       * @returns Boolean
       */
      var desktopView=function (){
        return ($(window).width() >= 640);
      }

      /**
       * Serializer for calling all function to put in window jquery event
       * @example $(window).on("resize scroll" , UTILS.serializer(func1 , func2 , func3));
       */
      var serializer=function () {
        // arguments is a list of functions
        var args = Array.prototype.slice.call(arguments, 0); // clone the arguments

        return function () {
          // arguments are passed by the event system
          var ret;

          for (var i = 0; i < args.length; i++) {
            ret = args[i].apply(this, arguments);
            if (ret === false) return ret;
          }
          return ret;
        };
      }

      /**
       * Make any DOM element to Array()
       * @param {string} element - Ex : "#barba-wrapper"
       */
      var toArray=function (element){
        if(!(element instanceof jQuery) && typeof element === "string"){
          return $(element).toArray();
        }else{
          console.error("You must insert a string to target DOM. Ex : \"section\"")
        }
      }

      /**
       * Just a smooth scroll callback helper
       * @param {string} target - Ex : ".container"
       * @param {string} hash - return window.location.hash value
       */
      var callbackFocus=function (target , hash){
        var $target = $(target);
        if(hash !== undefined)
          window.location.hash = hash;
        $target.focus();
        if ($target.is(":focus")) { // Checking if the target was focused
          return false;
        } else {
          $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
          $target.focus(); // Set focus again
        };
        return;
      }

      var loadHash=function (){
        if(window.location.hash.length > 0){
        var smoothTarget = document.querySelectorAll(window.location.hash).length ? window.location.hash : '[name=' + window.location.hash.slice(1) + ']';
          console.log('xxx')
            return $('html, body').animate({
              scrollTop: $(smoothTarget).offset().top
            }, 1000, function () {
              // Callback after animation
              // Must change focus!
              UTILS.callbackFocus(smoothTarget, window.location.hash);
            });
          }
        }
      

      function anchorTag(){
        // To Hash Location
       // unbind first
        $('a[href*="#"]')
          .not('[href="#"]')
          .not('[href="#0"]').unbind( "click" );

        $('a[href*="#"]')
          .not('[href="#"]')
          .not('[href="#0"]')
          .click(function (event) {
            // On-page links
            if (
              location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
              location.hostname == this.hostname
            ) {
              console.log('ST1')
              var hash = this.hash;
              // Figure out element to scroll to
              var target = $(this.hash);
              target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
              var smoothTarget = document.querySelectorAll(this.hash).length ? this.hash : '[name=' + this.hash.slice(1) + ']';
              // Does a scroll target exist?
              if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                // Check to see if navigation is open
              
                   return $('html, body').animate({
                    scrollTop: target.offset().top
                  }, 1000, function () {
                    // Callback after animation
                    // Must change focus!
                    UTILS.callbackFocus(target , hash);
                  });
                }
              }
           // }
          });
          return;
      }

      var tagScroll=function (tagSwiper) {
      //   try{
      //   if (UTILS.desktopView() && $(".tag-filters").is(":visible") /* && UTILS.regex((/^(\/(blog|blogs))$/g), window.location.pathname) */) {
      //     switch (true) {
      //       case ($(window).scrollTop() > $(".tag-filters").offset().top):
      //         var bottomElement = $(".search-field").offset().top + $(".search-field").outerHeight();
      //         console.log("Running Fixed");
      //         $(".tags-area").addClass("fixed-tag");
      //         $(".tags-area").append("<div class=\"close-tag \">Close/Open</div>");
      //         $(".button-next").css("display", "none");
      //         $(".button-prev").css("display", "none");
      //         $("div[area-label='Next Slide']").removeClass("button-next");
      //         $("div[area-label='Prev Slide']").removeClass("button-prev");
      //         if ($("div.close-tag").is(":visible")) {
      //           $("div.close-tag").click(function () {
      //             $(".tags-area").toggleClass("close-tag-transition");
      //           })
      //         }
      //         tagSwiper.update();
      //         break;

      //       case ($(window).scrollTop() <= bottomElement):
      //         console.log("Remove Fix Tag");
      //         $(".tags-area").removeClass("fixed-tag");
      //         $("div.close-tag").remove();
      //         $("div[area-label='Next Slide']").addClass("button-next");
      //         $("div[area-label='Prev Slide']").addClass("button-prev");
      //         $(".button-next").removeAttr("style");
      //         $(".button-prev").removeAttr("style");
      //         tagSwiper.update();
      //         break;
      //     }
      //   }
      //    else {
      //     return null;
      //   }
      //  } catch(e){}
      }

      var tag=function (){
        // if ($(".tag-filters").is(":visible")) {
        //   console.log("Running Tags Visible");
        //   var tagSwiper = new Swiper(".tag-filters", {
        //     speed: 400,
        //     slidesPerView: 'auto',
        //     navigation: {
        //       nextEl: '.button-next',
        //       prevEl: '.button-prev',
        //       disabledClass: 'button-disabled'
        //     },
        //     grabCursor: true,
        //     breakpoints: {
        //       640: {
        //         slidesPerColumn: 2
        //       }
        //     },
        //     on: {
        //       resize: function () {
        //         this.update();
        //       }
        //     }
        //   });
        //   UTILS.blogIndexWidgets.tagScroll(tagSwiper);
        // }
      }
     
      var rellaxObj =null;
      var rellaxEls=new Array();
      // Rellax Plugin
      var rellax = {
            d:document ,     
            add: function () {
           // console.log('starting relax');
           d.querySelectorAll('.rellax').forEach( function(el){
             if (!rellaxEls.includes(el))
             {
              UTILS.rellaxObj = new Rellax(el);
              rellaxEls.push(el);
              console.log('add rellax')
             }
           });
          }
           
      }
      var triggerObj =null;
      var triggerEls=new Array();
      var scrolltrigger = {
            d:document ,     
            init: function () {
       
          d.querySelectorAll('.transitions').forEach( function(el){
            if (!triggerEls.includes(el) && triggerObj)
            {
              try{ triggerObj.bind(el);}catch(error){triggerEls.pop(el)}
              triggerEls.push(el);
            //console.log(' add trgger')
            }else if(!triggerObj){
              //console.log(' new trgger')
              triggerObj= new ScrollTrigger();
              d.querySelectorAll('.transitions').forEach( function(ell){              
                triggerEls.push(ell);
              })
              return;
            }
          });
        },
         

            bind: function (el) {
              if (UTILS.triggerObj) {
             console.log('found old trigger to bind to');
             UTILS.triggerObj.bind(el);
              }
            }
      }          
     
      pageTop=function(){$('html,body').scrollTop(3);setTimeout(function(){$('html,body').scrollTop(0)},20);}
     
      return {
      
        openFullscreen : openFullscreen,
        closeFullscreen : closeFullscreen,
        callback: customCallback,
      
        scrollIntoView : scrollIntoView,
     
        callbackFocus : callbackFocus,
     
        toArray : toArray,
        mobileView : mobileView,
        desktopView : desktopView,
      
        regex : regexTester,
        serializer : serializer,
        isPortrait : isPortrait,
        isLandscape : isLandscape,

            
        blogIndexWidgets : {
          tagScroll: tagScroll,
          tag: tag
        },
        anchorTag: anchorTag,
       loadHash : loadHash,
        rellax: rellax,
        rellaxObj: rellaxObj,
        scrolltrigger : scrolltrigger,
        pageTop:pageTop
      }
    })();
    e.UTILS = e.UTILS || UTILS;
  }(window , document),
  /**
  * ANOTHER ANIMATIONS
  * @param {object} e 
  */

  function (e) {
    var MAGIC = (function () {


      function fadeInAnimation(className, time , trigger) {
        if ((typeof className === "string" || typeof className === "object") && !(className instanceof jQuery) && typeof time === "number") {
          //var scrollMagic, 
          var array, allQuery;
          array = [],
          
            allQuery = d.querySelectorAll(className),
            // Define FadeIn Event
            Array.prototype.forEach.call(allQuery, function (element, index) {
           
                $(element).animate({ opacity: 1 }, 400)
               
            });
        } else {
          console.error("You must specify className correctly using string or set of arrays. Don't forget Time(Number) for animation duration. fadeIn(\"#barba-wrapper\" , 1)");
        }
      }

     
      var d = document,
        w = window;
      return {
        fadeIn: fadeInAnimation,
      
        // magicController: pushMagic
      }
    })(e);
    e.MAGIC = e.MAGIC || MAGIC;
  }(window),
  function (e) {
    var ONPAGE = (function () {
      function animateOnPage(){
     
        // UTILS.pageTop();
      
      }

      return {
        init : animateOnPage
      }

    })();
    e.ONPAGE = e.ONPAGE || ONPAGE;
  }(window),
  function () {
    var INITIALIZE = (function () {
      function initialize() {
        console.log("Running Initialize");
        var resizeScroll = function(){
          UTILS.blogIndexWidgets.tag();
        }
        resizeScroll();
     ///   console.log('yyyy')
        return;
      }

      return {
        init: initialize
      }
    })();
    /**
     * cannot run using window.onload to override
     * Must use outside of IIFE to initialize
     */
    $.fn.extend({
      toggleText: function (a, b) {
        return this.text(this.text() == b ? a : b);
      },
      isInViewport: function () {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();

        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();

        return elementBottom > viewportTop && elementTop < viewportBottom;
      }
    });
    INITIALIZE.init();
  }();
  /**
   * Local Scripts Code (Unglobal)
   */
  var isIE = /*@cc_on!@*/ false || !!document.documentMode;
  // Edge 20+
  var isEdge = !isIE && !!window.StyleMedia;
  // UTILS.homepageWidgets.homepageCount();
  lozad(document.querySelector("img"), {
    load: function (el) {
      el.onload = function () {
        el.classList.add("loading");
      }
    }
  }).observe();
})

