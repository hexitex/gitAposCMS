apos.on('enhance' , function(){
    if ((/^(\/(blog|blogs|articles|story|news)\/).*$/g).test(window.location.pathname)) {
    var typingTimer
    var doneInterval = 500 // in milliseconds
    var searchInput = $("#blog-list input[data-search='on']")
    var searchQuery;
   // window.scrollTo(0, 0); 
   // 
    searchInput.keyup(function (event) {
        // On typing
        searchQuery = $(this).serialize()
        clearTimeout(typingTimer)
        typingTimer = setTimeout(BLOGHELPER.doneSearchTyping, doneInterval)
    })
    searchInput.keydown(function (event) {
        // finishes typing
        // keydown is when you HOLD the key without releasing it. It will run the counter if you do console log
        console.log(event.key)
        clearTimeout(typingTimer)
    })

    !function(e){
        var BLOGHELPER = (function(){
             function doneSearchTyping() {
                 if (searchQuery) {
                     // do search
                     var url = window.location.pathname + '?' + searchQuery
                     document.location.href = url // to navigate current document into relevant URL ! COOL
                 }
             }

             function scrolling() {
                 var windowPercentage;
                //  if (!apos.user) {
                //      windowPercentage = UTILS.getScroll().scrollTop / $("article").height() * 100
                //  } else {
                     windowPercentage = parseInt($(window).scrollTop()) / parseFloat($('article').height()) * 100;
                //  }

                 $("div.post-scroll").css({
                     width: windowPercentage + "%"
                 });
             }

             /**
              * Toggle Button
              * @param {string} classname CONTAINER ELEMENT
              * @param {string} item - FLEX ITEM
              */
             function toggleButton(classname, item) {
            //      new ScrollReveal().reveal(classname, {
            //          distance: '100px',
            //          origin: 'bottom',
            //          opacity: 0
            //      });
            //      $("div.collapse-button").click(function () {
            //          new ScrollReveal().reveal(item ? item : classname, {
            //              distance: '100px',
            //              origin: 'bottom',
            //              opacity: 0,
            //              beforeReveal: function () {
            //                  $("div.blog-loop").css({
            //                      justifyContent: "space-between"
            //                  })
            //                  $("div.blog-loop").find($(".end-container")).css({
            //                      display: 'block'
            //                  });
            //              },
            //              afterReveal: function () {
            //                  // Fix bug that makes element disappear
            //                  // after reveal
            //                  ScrollReveal().sync();
            //                  ScrollReveal().destroy();
            //              }
            //          });
            //      })
            //      $("div.uncollapse-button").click(function () {
            //          new ScrollReveal().reveal(item ? item : classname, {
            //              distance: '100px',
            //              origin: 'bottom',
            //              opacity: 0,
            //              beforeReveal: function () {
            //                  $("div.blog-loop").css({
            //                      justifyContent: 'flex-start'
            //                  })
            //                  $("div.blog-loop").find($(".end-container")).css({
            //                      display: 'none'
            //                  });
            //              },
            //              afterReveal: function () {
            //                  // Fix bug that makes element disappear
            //                  // after reveal
            //                  ScrollReveal().sync();
            //                  ScrollReveal().destroy();
            //              }
            //          });
            //      })
              }
            return {
                doneSearchTyping : doneSearchTyping,
                toggleButton : toggleButton,
                scrolling : scrolling
            }
        })();
        e.BLOGHELPER = e.BLOGHELPER || BLOGHELPER;
    }(window);

    // Match regex for testing
    // OR in regex is just | . Only one vertical line . Not like Javascript like this ||
    if ((/^(\/(blog|blogs|articles|story|news)\/).*$/g).test(window.location.pathname)) {
        $(window).on("resize scroll", BLOGHELPER.scrolling);
       
        $('article').readingTime({
            lessThanAMinuteString: 'Quick'
        });
    }


    // Only in Index List Page OR Index list page got search query
    if ((/^(\/(blog|blogs|articles|story|news))$/g).test(window.location.pathname) || (/^(\/(blog|blogs|articles|story|news))(\?(q|search)=).*$/g).test(window.location.pathname + window.location.search)){
        BLOGHELPER.toggleButton('.blog-loop', '.directory');
        UTILS.blogIndexWidgets.tag();
    }

    // Get query string and highlight it (Using Mark.js)
    // See docs : https://markjs.io/
    if ((/^(\/(blog|blogs|articles|story|news))(\?(q|search)=).*$/g).test(window.location.pathname + window.location.search)) {
        console.log("Running Search Query");
        var parameter = new URL(window.location.href).searchParams
        var search = parameter.get('search')
        var context = document.querySelector('.blog-loop')
        var instance = new Mark(context)
        if (search) {
            instance.mark(search, {
                className: 'highlight'
            })
        }
    }
}})