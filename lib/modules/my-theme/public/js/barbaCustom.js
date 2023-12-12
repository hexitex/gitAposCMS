"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

apos.on("ready", function () {
    /**
     * BEGIN IIFE
     */
    !function (e) {
        "use strict";
        //     /**
        //      * IIFE Animations 
        //      * HOLDS All animations for better onload experience 
        //      * See https://medium.com/@vvkchandra/essential-javascript-mastering-immediately-invoked-function-expressions-67791338ddc6
        //      * Source look on files {@link http://www.ruggeri.io/js/scripts.js | BarbaJS Example}
        //      * @description Use this to hold All animations for onload experience. Use this on Barba Views , Ex : onEnterCompleted(){ ANIMATIONS.showText() }
        //      */

        var ANIMATIONS = function (e) {
            var test = 'test';

            function hideDom(domName) {
                if ((typeof domName === "string" || (typeof domName === "undefined" ? "undefined" : _typeof(domName)) === "object") && !(domName instanceof jQuery)) {
                    Array.prototype.forEach.call(domName, function (element, index) {
                        TweenMax.set(element, {
                            opacity: 0,
                         //   scale: 0, 
                        });
                    });
                } else {
                    throw new Error("You must use string on any DOM elements. use # for id while . for class name. You also can use set of arrays. For Example : \n [\".class-name\" , \"#idDomElement\"]");
                }
            }

            function detectDom() {
                if ($("xfooter").is(":visible")) {
                    console.log('alive'); // $(".svg-icon").click(); console.log('alive');
                }
            }

            return {
                //   showText : text,
                //    box : moveBox,
                removeDOM: hideDom,
                visible: detectDom
            };
        }();
        //     /**
        //      * If throw undefined, this technique should work
        //      * Source: https: //modernweb.com/45-useful-javascript-tips-tricks-and-best-practices/
        //      * @description You can call this in Chrome Debugger . Ex : ANIMATIONS (In chrome there will be an options of objects to choose)
        //      */
        e.ANIMATIONS = e.ANIMATIONS || ANIMATIONS;
    }(window), function (e) {
        "use strict";

        var DETECT = function () {

            function opera() {
                // Opera 8.0+
                var isOpera = !!window.opr && !!opr.addons || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
                return isOpera;
            }

            function firefox() {

                // Firefox 1.0+
                var isFirefox = typeof InstallTrigger !== 'undefined';

                return isFirefox;
            }

            function safari() {

                // Safari 3.0+ "[object HTMLElementConstructor]" 
                var isSafari = /constructor/i.test(window.HTMLElement) || function (p) {
                    return p.toString() === "[object SafariRemoteNotification]";
                }(!window['safari'] || typeof safari !== 'undefined' && safari.pushNotification);

                return isSafari;
            }

            function IE() {

                // Internet Explorer 6-11
                var isIE = /*@cc_on!@*/false || !!document.documentMode;

                return isIE;
            }

            function Edge() {

                // Edge 20+
                var isEdge = !DETECT.IE() && !!window.StyleMedia;

                return isEdge;
            }

            function chrome() {

                // Chrome 1+
                var isChrome = !!window.chrome && !!window.chrome.webstore;

                return isChrome;
            }

            function blink() {

                // Blink engine detection
                var isBlink = (DETECT.chrome() || DETECT.opera()) && !!window.CSS;

                return isBlink;
            }

            return {
                opera: opera,
                firefox: firefox,
                safari: safari,
                IE: IE,
                Edge: Edge,
                chrome: chrome,
                blink: blink
            };
        }();
        e.DETECTBROWSER = e.DETECTBROWSER || DETECT;
    }(window),
    /**
     * To create my own custom events
     * @param {object} window
     */
    function (e) {
        var DISPATCHER = function () {
            "use strict";

            /**
             * To store each events that is associated with the dispatcher
             */

            var Dispatcher = function () {
                function Dispatcher() {
                    _classCallCheck(this, Dispatcher);

                    this.events = {};
                }

                _createClass(Dispatcher, [{
                    key: "dispatch",
                    value: function dispatch(eventName, data, options) {
                        // Run the callback
                        // First we grab the event
                        var event = this.events[eventName];
                        // If the event exists then we fire it!
                        // Make it const so that it cannot be override !
                        // Const technique ! :D
                        if (event) {
                            event.fire(data, options);
                        }
                    }
                }, {
                    key: "on",
                    value: function on(eventName, callback) {
                        // First we grab the event from this.events
                        var event = this.events[eventName];
                        // If the event does not exist then we should create it!
                        if (!event) {
                            event = new DispatcherEvent(eventName);
                            this.events[eventName] = event;
                        }
                        // Now we add the callback to the event
                        event.registerCallback(callback);
                    }
                }, {
                    key: "off",
                    value: function off(eventName, callback) {
                        // First get the correct event
                        var event = this.events[eventName];
                        // Check that the event exists and it has the callback registered
                        if (event && event.callbacks.indexOf(callback) > -1) {
                            // if it is registered then unregister it!
                            event.unregisterCallback(callback);
                            // if the event has no callbacks left, delete the event
                            if (event.callbacks.length === 0) {
                                delete this.events[eventName];
                            }
                        }
                    }
                }]);

                return Dispatcher;
            }();

            /**
             * To have our own method
             */


            var DispatcherEvent = function () {
                function DispatcherEvent(eventName) {
                    _classCallCheck(this, DispatcherEvent);

                    this.eventName = eventName;
                    this.callbacks = [];
                }

                _createClass(DispatcherEvent, [{
                    key: "registerCallback",
                    value: function registerCallback(callback) {
                        // To push to the callbacks array
                        this.callbacks.push(callback);
                    }
                }, {
                    key: "unregisterCallback",
                    value: function unregisterCallback(callback) {
                        // Remove the provided callback from the event
                        // Get the index of the callback in the callbacks array
                        var index = this.callbacks.indexOf(callback);
                        // If the callback is in the array then remove it
                        if (index > -1) {
                            this.callbacks.splice(index, 1);
                        }
                    }
                }, {
                    key: "fire",
                    value: function fire(data) {
                        // Call each callback with the provided data
                        // We loop over a cloned version of the callbacks array
                        // in case the original array is spliced while looping
                        var callbacks = this.callbacks.slice(0);
                        // loop through the callbacks and call each one
                        callbacks.forEach(function (callback) {
                            callback(data);
                        });
                    }
                }]);

                return DispatcherEvent;
            }();

            return {
                dispatch: new Dispatcher()
            };
        }();
        e.DISPATCHER = e.DISPATCHER || DISPATCHER;
    }(window),
    /**
     * Easing Functions from Jquery
     */
    function (e) {
        var BARBAUTILS = function () {

            function promiseFunction(callback) {
                return new Promise(function (resolve, reject) {
                    callback;
                    resolve();
                });
            }

            function backClick(el) {
                if (BARBAUTILS.on()) {
                    return Barba.Pjax.goTo(Barba.HistoryManager.prevStatus().url);
                }
            }

            function checkBackButton() {
                if (!apos.user || BARBAUTILS.on() === true) return;else $(".back-container").css("display", "none");
            }

            function loopObject(object) {
                for (var key in object) {
                    // check also if property is not inherited from prototype
                    if (object.hasOwnProperty(key)) {
                        object[key]();
                    }
                }
            }

            var array = [];
            function on(bool) {
                var set = void 0;
                if (bool !== undefined) array.push(bool);
                array.forEach(function (value, index) {
                    if (index > 1) {
                        array.slice(0, array.length - array.length + 1);
                    }
                    set = value;
                });
                return set;
            }

            function isEmpty(obj) {
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) return false;
                }
                return true;
            }

            return {
                promise: promiseFunction,
                loopObject: loopObject,
                on: on,
                isObjectEmpty: isEmpty,
                checkBackButton: checkBackButton,
                backClick: backClick
            };
        }();
        e.BARBAUTILS = e.BARBAUTILS || BARBAUTILS;
    }(window),
    /**
     * For BARBA
     * @param {object} e 
     */
    function (e) {
        "use strict";

        var BARBA = function () {
            function init() {
                // For Barba JS
               // Barba.Prefetch.init();
                Barba.Pjax.init();
                Homepage.init();
                BlogShow.init();
                BlogIndex.init();
                Barba.Pjax.start();
                // Cache Disabled due to enable server side rendering nunjucks
                Barba.Pjax.cacheEnabled = true;
            }

            /**
             * EVENTS ELEMENT CLICKED
             * @param {document}
             */
            var elementClicked;
            Barba.Dispatcher.on('linkClicked', function (DOM, mouseEvent) {
                elementClicked = DOM;
            });

            /**
             * For HOMEPAGE views helper
             ```js
             // Add this on Initialize Helper
             Homepage.init()
             ```
             */
            var Homepage = Barba.BaseView.extend({
                namespace: 'main',
                onEnter: function onEnter() {
                    document.querySelector("body").setAttribute("style", ""), document.querySelector("body").style.overflow = "auto", TweenLite.set("body", {
                        cursor: "wait"
                    });
                },
                onEnterCompleted: function onEnterCompleted() {
                    // if(UTILS.desktopView()){
                    //     document.querySelector("body").style.overflow = "hidden";
                    // }
                    TweenLite.set("body", {
                        cursor: "default"
                    });
                }
            });

            var BlogShow = Barba.BaseView.extend({
                namespace: 'blog-show',
                onEnter: function onEnter() {
                    document.querySelector("body").setAttribute("style", ""), document.querySelector("body").style.overflow = "auto", TweenLite.set("body", {
                        cursor: "wait"
                    });
                },
                onEnterCompleted: function onEnterCompleted() {
                    // if (UTILS.desktopView()) {
                    //     document.querySelector("body").style.overflow = "hidden";
                    // }
                    TweenLite.set("body", {
                        cursor: "default"
                    });
                }
            });
            var BlogIndex = Barba.BaseView.extend({
                namespace: 'blog-index',
                onEnter: function onEnter() {
                    document.querySelector("body").setAttribute("style", ""), document.querySelector("body").style.overflow = "auto", TweenLite.set("body", {
                        cursor: "wait"
                    });
                },
                onEnterCompleted: function onEnterCompleted() {
                    // if (UTILS.desktopView()) {
                    //     document.querySelector("body").style.overflow = "hidden";
                    // }
                    TweenLite.set("body", {
                        cursor: "default"
                    });
                }
            });

            var timeline = new TimelineLite();

            /**
             * Hide Show Transition Descktop
             */
            var HideShowTransition = Barba.BaseTransition.extend({
                start: function start() {
                    this.whichClick = false;
                    if (document.querySelector(".back-container")) {
                        if (Barba.BaseCache.get("back")) {
              //             console.log('ST1')
                            Promise.all([this.newContainerLoading, this.boxIn()]).then(this.display.bind(this));
                        } else {
           //                console.log('ST2')
                            Promise.all([this.newContainerLoading, this.scrollTop()]).then(this.finish.bind(this));
                        }
                    } else {
        //                console.log('ST3')
                        Promise.all([this.newContainerLoading, this.scrollTop()]).then(this.finish.bind(this));
                    }
                },
                // Normal Transition
                scrollTop: function scrollTop() {
             
                    // New deffered tactic
                    // Works just like nodeJS Async.
                    // Docs : https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred
                    var deferred = Barba.Utils.deferred();
                    //console.log("Old Container on ScrollTop" , this.oldContainer);
                    var obj = {
                        y: $(window).scrollTop()
                    };
                    timeline.to(obj, HideShowTransition.timeFloat(), {
                    
                        onUpdate: function onUpdate() {
                             $('html,body').scrollTop(0)
                        },
                        onComplete: function onComplete() {
                            return deferred.resolve();
                        }
                    });
                    return deferred.promise;
                },
                finish: function finish() {
                  
                    var _this = this;
                    var $el = $(this.newContainer);
                    var oldContainer = $(this.oldContainer);
                    // Old Container MUST HIDE OR DISPLAY NONE
                    this.scrollTop();
                    timeline.to(oldContainer, HideShowTransition.timeFloat(), {
                        opacity: 0,
                      //  scale: .5, 
                    });
                    // New Container MUST SET 'VISIBLE' and ready to animate from opacity 0
                    $el.css({
                        visibility: 'visible',
                        opacity: 0,
                     //   scale: .5, 
                    });
                    // Set to 1 , or Tweenlite.to could done the same
                    timeline.to($el, HideShowTransition.timeFloat(), {
                        top: 0,
                        opacity: 1,
                      
                      //  scale: 1, 
    
                       // rotation: 180,
                        onStart: function onStart() {
                            ANIMATIONS.removeDOM(["#barba-wrapper"]);
                        },
                        onComplete: function onComplete() {
                            MAGIC.fadeIn("#barba-wrapper", 1);
                            _this.done();
                            // All widget will be run based on this call
                            apos.pageReadyWhenCalm($("[data-apos-refreshable]"));
                        }
                    });
                },

                display: function display() {
                    var _this = this;
                    var $el = $(this.newContainer);
                    var oldContainer = $(this.oldContainer);
                    // Old Container MUST HIDE OR DISPLAY NONE
                    timeline.to(oldContainer, HideShowTransition.timeFloat(), {
                        opacity: 0,
                        display: 'none',
                     //   scale: 0.5 
                    });
                    // New Container MUST SET 'VISIBLE' and ready to animate from opacity 0
                    $el.css({
                        visibility: 'visible',
                        opacity: 0,
                      //  scale: .5 
                    });
                    timeline.to($el, HideShowTransition.timeFloat(), {
                        opacity: 1,
                      //  scale: 1, 
                        onStart: function onStart() {
                            ANIMATIONS.removeDOM(["#barba-wrapper"]);
                        },
                        onComplete: function onComplete() {
                            MAGIC.fadeIn("#barba-wrapper", 1);
                            _this.done();
                            // All widget will be run based on this call
                            apos.pageReadyWhenCalm($("[data-apos-refreshable]"));
                        }
                    });
                },

                timeFloat: function timeFloat() {
                    return .2;
                }
            });

            // Don't append script here. It will run multiple times
            Barba.Dispatcher.on("transitionCompleted", function (currentStatus, previousStatus) {
                // UTILS.anchorTag();
                // if (!UTILS.rellaxObj){
                //     UTILS.rellax.init();
                //   }else{
                //     UTILS.rellax.refresh();
                //   }
                //   if (!UTILS.triggerObj){
                //     UTILS.scrolltrigger.init();
                //   }else{
                //     UTILS.scrolltrigger.resetAll();
                //     UTILS.scrolltrigger.init();
                //    // UTILS.scrolltrigger.bind();
                //   }

            });

            /**
             * @param {object} currentStatus
             * @param {object} oldStatus
             * @param {object} container
             * @param {string} newPageRawHTML
             */
            Barba.Dispatcher.on('newPageReady', function (currentStatus, oldStatus, container, newPageRawHTML) {

                // Disable all "ready" apos event that holds all your browser script
                // To fixed bug that running script multiple times when on BarbaJS. Only run apos.on("ready") once
                // The rest using Barba Events
                apos.off("ready");

                // Hide Header first
                $("header").css({
                    display: 'none'
                });

                // Insert new header HTML tag
                if (newPageRawHTML.match(/(<header[^>]*>([\s\S.]*)<\/header>)/i) !== null) {
                    if ($("header").length < 1) $("[data-apos-refreshable]").prepend($("<header />"));
                    $("header > aside").css("display", "block");
                    $('header').replaceWith($.parseHTML(newPageRawHTML.match(/(<header[^>]*>([\s\S.]*)<\/header>)/i)[0], document, true));
                } else {
                    $("header > aside").css("display", "none");
                }

                // Always running back button events

                // Append New Container to the container for smooth scroll bar issue
                // Because this scroll-content is on barba-container. So we need to append another one
                $("#barba-wrapper > div[class='scroll-content']").append(container);
                // Remove existing Scrollbar aside on page transitions
                $("#barba-wrapper > div[class='scroll-content'] > aside*").remove();

                $(".dropdown img.flag").addClass("flagvisibility");

                $(".dropdown dt a").on('click', function() {
                    $(".dropdown dd ul").toggle();
                    console.log('logged')
                });
                            
                $(".dropdown dd ul li a").on('click', function() {
                  console.log('logged')
                    var text = $(this).html();
                    $(".dropdown dt a span").html(text);
                    $(".dropdown dd ul").hide();
                    console.log('cache reset')
                   // Barba.BaseCache.reset();
                   setTimeout(function(){ location.reload();}, 600);
                    
                });
                            
                function getSelectedValue(id) {
                    return $("#" + id).find("dt a span.value").html();
                }
                
                $(document).on('click', function(e) {
                    var $clicked = $(e.target);
                    if (! $clicked.parents().hasClass("dropdown"))
                        $(".dropdown dd ul").hide();
                });
                
                $(".dropdown img.flag").toggleClass("flagvisibility");



            });

            Barba.Pjax.getTransition = function () {

                return HideShowTransition;
            };

            return {
                init: init
            };
        }();
        e.TRANSITION = e.TRANSITION || BARBA;
    }(window), function () {
        "use strict";

        // Fix bug for Barba that does not work on other browser (window.onload DEPRECATED)
        //  if (DETECTBROWSER.opera() || DETECTBROWSER.firefox() || DETECTBROWSER.safari() || DETECTBROWSER.IE() || DETECTBROWSER.Edge()) {

        try {
            TRANSITION.init();
            TweenLite.defaultOverwrite = false;
        } catch (e) {
            console.log('error starting barba', e);
        }
        //  }

        var BARBASTART = function () {
            function load() {
                TRANSITION.init();
                // To fix bug on override tween.
                // Warning Log found on Dev Console
                TweenLite.defaultOverwrite = false;
            }

            return {
                init: load
            };
        }();
        // To disable BARBA if Logged In
        if (apos.user) { 
            Barba.Pjax.preventCheck = function (evt, element) {
                return false;
            };
            BARBAUTILS.on(false);
        } else {
            BARBASTART.init();
            BARBAUTILS.on(true);
            // Custom Events to know which DOM is clicked
            $(document.body).on("click", function (e) {
                if (UTILS.regex(/back-container|back-text|back-svg/ig, $(e.target).attr("class"))) {
                    Barba.BaseCache.set("back", true);
                } else {
                    Barba.BaseCache.set("back", false);
                }
            });
        }
    }();
    /**
     * End of IIFE
     */
    BARBAUTILS.checkBackButton();

    /**
     * RULES of USING BARBAJS
     * All widgets are reinitiliazed using BARBAUTILS.reloadApos() function.
     * 
     * Every Onclick event should be in HTML. This is to prevent in BarbaJS executes multiple times on binding the event.
     * Example : 
     * <div class="name" onclick="someFunction();"></div>
     */
});

// To enable customize scroll based on barbajs
// Listen on change where apos.change is invoked
apos.on("change", function () {
    /**
     * Make all re-initialize script here for BarbaJS issue
     */

});