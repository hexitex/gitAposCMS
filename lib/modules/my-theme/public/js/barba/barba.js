! function (t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define("Barba", [], e) : "object" == typeof exports ? exports.Barba = e() : t.Barba = e()
}(this, function () {
    return function (t) {
        function e(r) {
            if (n[r]) return n[r].exports;
            var i = n[r] = {
                exports: {},
                id: r,
                loaded: !1
            };
            return t[r].call(i.exports, i, i.exports, e), i.loaded = !0, i.exports
        }
        var n = {};
        return e.m = t, e.c = n, e.p = "http://localhost:8080/dist", e(0)
    }([function (t, e, n) {
        "function" != typeof Promise && (window.Promise = n(1));
        var r = {
            version: "1.0.0",
            BaseTransition: n(4),
            BaseView: n(6),
            BaseCache: n(8),
            Dispatcher: n(7),   
            HistoryManager: n(9),
            Pjax: n(10),
            Prefetch: n(13),
            Utils: n(5)
        };
        t.exports = r
    }, function (t, e, n) {
        (function (e) {
            ! function (n) {
                function r() {}

                function i(t, e) {
                    return function () {
                        t.apply(e, arguments)
                    }
                }

                function o(t) {
                    if ("object" != typeof this) throw new TypeError("Promises must be constructed via new");
                    if ("function" != typeof t) throw new TypeError("not a function");
                    this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], h(t, this)
                }

                function s(t, e) {
                    for (; 3 === t._state;) t = t._value;
                    return 0 === t._state ? void t._deferreds.push(e) : (t._handled = !0, void l(function () {
                        var n = 1 === t._state ? e.onFulfilled : e.onRejected;
                        if (null === n) return void(1 === t._state ? a : c)(e.promise, t._value);
                        var r;
                        try {
                            r = n(t._value)
                        } catch (t) {
                            return void c(e.promise, t)
                        }
                        a(e.promise, r)
                    }))
                }

                function a(t, e) {
                    try {
                        if (e === t) throw new TypeError("A promise cannot be resolved with itself.");
                        if (e && ("object" == typeof e || "function" == typeof e)) {
                            var n = e.then;
                            if (e instanceof o) return t._state = 3, t._value = e, void u(t);
                            if ("function" == typeof n) return void h(i(n, e), t)
                        }
                        t._state = 1, t._value = e, u(t)
                    } catch (e) {
                        c(t, e)
                    }
                }

                function c(t, e) {
                    t._state = 2, t._value = e, u(t)
                }

                function u(t) {
                    2 === t._state && 0 === t._deferreds.length && l(function () {
                        t._handled || p(t._value)
                    });
                    for (var e = 0, n = t._deferreds.length; e < n; e++) s(t, t._deferreds[e]);
                    t._deferreds = null
                }

                function f(t, e, n) {
                    this.onFulfilled = "function" == typeof t ? t : null, this.onRejected = "function" == typeof e ? e : null, this.promise = n
                }

                function h(t, e) {
                    var n = !1;
                    try {
                        t(function (t) {
                            n || (n = !0, a(e, t))
                        }, function (t) {
                            n || (n = !0, c(e, t))
                        })
                    } catch (t) {
                        if (n) return;
                        n = !0, c(e, t)
                    }
                }
                var d = setTimeout,
                    l = "function" == typeof e && e || function (t) {
                        d(t, 0)
                    },
                    p = function (t) {
                        "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", t)
                    };
                o.prototype.catch = function (t) {
                    return this.then(null, t)
                }, o.prototype.then = function (t, e) {
                    var n = new this.constructor(r);
                    return s(this, new f(t, e, n)), n
                }, o.all = function (t) {
                    var e = Array.prototype.slice.call(t);
                    return new o(function (t, n) {
                        function r(o, s) {
                            try {
                                if (s && ("object" == typeof s || "function" == typeof s)) {
                                    var a = s.then;
                                    if ("function" == typeof a) return void a.call(s, function (t) {
                                        r(o, t)
                                    }, n)
                                }
                                e[o] = s, 0 === --i && t(e)
                            } catch (t) {
                                n(t)
                            }
                        }
                        if (0 === e.length) return t([]);
                        for (var i = e.length, o = 0; o < e.length; o++) r(o, e[o])
                    })
                }, o.resolve = function (t) {
                    return t && "object" == typeof t && t.constructor === o ? t : new o(function (e) {
                        e(t)
                    })
                }, o.reject = function (t) {
                    return new o(function (e, n) {
                        n(t)
                    })
                }, o.race = function (t) {
                    return new o(function (e, n) {
                        for (var r = 0, i = t.length; r < i; r++) t[r].then(e, n)
                    })
                }, o._setImmediateFn = function (t) {
                    l = t
                }, o._setUnhandledRejectionFn = function (t) {
                    p = t
                }, "undefined" != typeof t && t.exports ? t.exports = o : n.Promise || (n.Promise = o)
            }(this)
        }).call(e, n(2).setImmediate)
    }, function (t, e, n) {
        (function (t, r) {
            function i(t, e) {
                this._id = t, this._clearFn = e
            }
            var o = n(3).nextTick,
                s = Function.prototype.apply,
                a = Array.prototype.slice,
                c = {},
                u = 0;
            e.setTimeout = function () {
                return new i(s.call(setTimeout, window, arguments), clearTimeout)
            }, e.setInterval = function () {
                return new i(s.call(setInterval, window, arguments), clearInterval)
            }, e.clearTimeout = e.clearInterval = function (t) {
                t.close()
            }, i.prototype.unref = i.prototype.ref = function () {}, i.prototype.close = function () {
                this._clearFn.call(window, this._id)
            }, e.enroll = function (t, e) {
                clearTimeout(t._idleTimeoutId), t._idleTimeout = e
            }, e.unenroll = function (t) {
                clearTimeout(t._idleTimeoutId), t._idleTimeout = -1
            }, e._unrefActive = e.active = function (t) {
                clearTimeout(t._idleTimeoutId);
                var e = t._idleTimeout;
                e >= 0 && (t._idleTimeoutId = setTimeout(function () {
                    t._onTimeout && t._onTimeout()
                }, e))
            }, e.setImmediate = "function" == typeof t ? t : function (t) {
                var n = u++,
                    r = !(arguments.length < 2) && a.call(arguments, 1);
                return c[n] = !0, o(function () {
                    c[n] && (r ? t.apply(null, r) : t.call(null), e.clearImmediate(n))
                }), n
            }, e.clearImmediate = "function" == typeof r ? r : function (t) {
                delete c[t]
            }
        }).call(e, n(2).setImmediate, n(2).clearImmediate)
    }, function (t, e) {
        function n() {
            h && u && (h = !1, u.length ? f = u.concat(f) : d = -1, f.length && r())
        }

        function r() {
            if (!h) {
                var t = s(n);
                h = !0;
                for (var e = f.length; e;) {
                    for (u = f, f = []; ++d < e;) u && u[d].run();
                    d = -1, e = f.length
                }
                u = null, h = !1, a(t)
            }
        }

        function i(t, e) {
            this.fun = t, this.array = e
        }

        function o() {}
        var s, a, c = t.exports = {};
        ! function () {
            try {
                s = setTimeout
            } catch (t) {
                s = function () {
                    throw new Error("setTimeout is not defined")
                }
            }
            try {
                a = clearTimeout
            } catch (t) {
                a = function () {
                    throw new Error("clearTimeout is not defined")
                }
            }
        }();
        var u, f = [],
            h = !1,
            d = -1;
        c.nextTick = function (t) {
            var e = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
            f.push(new i(t, e)), 1 !== f.length || h || s(r, 0)
        }, i.prototype.run = function () {
            this.fun.apply(null, this.array)
        }, c.title = "browser", c.browser = !0, c.env = {}, c.argv = [], c.version = "", c.versions = {}, c.on = o, c.addListener = o, c.once = o, c.off = o, c.removeListener = o, c.removeAllListeners = o, c.emit = o, c.binding = function (t) {
            throw new Error("process.binding is not supported")
        }, c.cwd = function () {
            return "/"
        }, c.chdir = function (t) {
            throw new Error("process.chdir is not supported")
        }, c.umask = function () {
            return 0
        }
    }, function (t, e, n) {
        var r = n(5),
            i = {
                oldContainer: void 0,
                newContainer: void 0,
                newContainerLoading: void 0,
                extend: function (t) {
                    return r.extend(this, t)
                },
                init: function (t, e) {
                    var n = this;
                    return this.oldContainer = t, this._newContainerPromise = e, this.deferred = r.deferred(), this.newContainerReady = r.deferred(), this.newContainerLoading = this.newContainerReady.promise, this.start(), this._newContainerPromise.then(function (t) {
                        n.newContainer = t, n.newContainerReady.resolve()
                    }), this.deferred.promise
                },
                done: function () {
                    this.oldContainer.parentNode.removeChild(this.oldContainer), this.newContainer.style.visibility = "visible", this.deferred.resolve()
                },
                start: function () {}
            };
        t.exports = i
    }, function (t, e) {
        var n = {
            getCurrentUrl: function () {
                return window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search
            },
            cleanLink: function (t) {
                return t.replace(/#.*/, "")
            },
            xhrTimeout: 5e3,
            xhr: function (t) {
                var e = this.deferred(),
                    n = new XMLHttpRequest;
                return n.onreadystatechange = function () {
                    if (4 === n.readyState) return 200 === n.status ? e.resolve(n.responseText) : e.reject(new Error("xhr: HTTP code is not 200"))
                }, n.ontimeout = function () {
                    return e.reject(new Error("xhr: Timeout exceeded"))
                }, n.open("GET", t), n.timeout = this.xhrTimeout, n.setRequestHeader("x-barba", "yes"), n.send(), e.promise
            },
            extend: function (t, e) {
                var n = Object.create(t);
                for (var r in e) e.hasOwnProperty(r) && (n[r] = e[r]);
                return n
            },
            deferred: function () {
                return new function () {
                    this.resolve = null, this.reject = null, this.promise = new Promise(function (t, e) {
                        this.resolve = t, this.reject = e
                    }.bind(this))
                }
            },
            getPort: function (t) {
                var e = "undefined" != typeof t ? t : window.location.port,
                    n = window.location.protocol;
                return "" != e ? parseInt(e) : "http:" === n ? 80 : "https:" === n ? 443 : void 0
            }
        };
        t.exports = n
    }, function (t, e, n) {
        var r = n(7),
            i = n(5),
            o = {
                namespace: null,
                extend: function (t) {
                    return i.extend(this, t)
                },
                init: function () {
                    var t = this;
                    r.on("initStateChange", function (e, n) {
                        n && n.namespace === t.namespace && t.onLeave()
                    }), r.on("newPageReady", function (e, n, r) {
                        t.container = r, e.namespace === t.namespace && t.onEnter()
                    }), r.on("transitionCompleted", function (e, n) {
                        e.namespace === t.namespace && t.onEnterCompleted(), n && n.namespace === t.namespace && t.onLeaveCompleted()
                    })
                },
                onEnter: function () {},
                onEnterCompleted: function () {},
                onLeave: function () {},
                onLeaveCompleted: function () {}
            };
        t.exports = o
    }, function (t, e) {
        var n = {
            events: {},
            on: function (t, e) {
                this.events[t] = this.events[t] || [], this.events[t].push(e)
            },
            off: function (t, e) {
                t in this.events != !1 && this.events[t].splice(this.events[t].indexOf(e), 1)
            },
            trigger: function (t) {
                if (t in this.events != !1)
                    for (var e = 0; e < this.events[t].length; e++) this.events[t][e].apply(this, Array.prototype.slice.call(arguments, 1))
            }
        };
        t.exports = n
    }, function (t, e, n) {
        var r = n(5),
            i = {
                data: {},
                extend: function (t) {
                    return r.extend(this, t)
                },
                set: function (t, e) {
                    this.data[t] = e
                },
                get: function (t) {
                    return this.data[t]
                },
                reset: function () {
                    this.data = {}
                }
            };
        t.exports = i
    }, function (t, e) {
        var n = {
            history: [],
            add: function (t, e) {
                e || (e = void 0), this.history.push({
                    url: t,
                    namespace: e
                })
            },
            currentStatus: function () {
                return this.history[this.history.length - 1]
            },
            prevStatus: function () {
                var t = this.history;
                return t.length < 2 ? null : t[t.length - 2]
            }
        };
        t.exports = n
    }, function (t, e, n) {
        var r = n(5),
            i = n(7),
            o = n(11),
            s = n(8),
            a = n(9),
            c = n(12),
            u = {
                Dom: c,
                History: a,
                Cache: s,
                cacheEnabled: !0,
                transitionProgress: !1,
                ignoreClassLink: "no-barba",
                start: function () {
                    this.init()
                },
                init: function () {
                    var t = this.Dom.getContainer(),
                        e = this.Dom.getWrapper();
                    e.setAttribute("aria-live", "polite"), this.History.add(this.getCurrentUrl(), this.Dom.getNamespace(t)), i.trigger("initStateChange", this.History.currentStatus()), i.trigger("newPageReady", this.History.currentStatus(), {}, t, this.Dom.currentHTML), i.trigger("transitionCompleted", this.History.currentStatus()), this.bindEvents()
                },
                bindEvents: function () {
                    document.addEventListener("click", this.onLinkClick.bind(this)), window.addEventListener("popstate", this.onStateChange.bind(this))
                },
                getCurrentUrl: function () {
                    return r.cleanLink(r.getCurrentUrl())
                },
                goTo: function (t) {
                    window.history.pushState(null, null, t), this.onStateChange()
                },
                forceGoTo: function (t) {
                    window.location = t
                },
                load: function (t) {
                    var e, n = r.deferred(),
                        i = this;
                    return e = this.Cache.get(t), e || (e = r.xhr(t), this.Cache.set(t, e)), e.then(function (t) {
                        var e = i.Dom.parseResponse(t);
                        i.Dom.putContainer(e), i.cacheEnabled || i.Cache.reset(), n.resolve(e)
                    }, function () {
                        i.forceGoTo(t), n.reject()
                    }), n.promise
                },
                getHref: function (t) {
                    if (t) return t.getAttribute && "string" == typeof t.getAttribute("xlink:href") ? t.getAttribute("xlink:href") : "string" == typeof t.href ? t.href : void 0
                },
                onLinkClick: function (t) {
                    for (var e = t.target; e && !this.getHref(e);) e = e.parentNode;
                    if (this.preventCheck(t, e)) {
                        t.stopPropagation(), t.preventDefault(), i.trigger("linkClicked", e, t);
                        var n = this.getHref(e);
                        this.goTo(n)
                    }
                },
                preventCheck: function (t, e) {
                    if (!window.history.pushState) return !1;
                    var n = this.getHref(e);
                    return !(!e || !n) && (!(t.which > 1 || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey) && ((!e.target || "_blank" !== e.target) && (window.location.protocol === e.protocol && window.location.hostname === e.hostname && (r.getPort() === r.getPort(e.port) && (!(n.indexOf("#") > -1) && ((!e.getAttribute || "string" != typeof e.getAttribute("download")) && (r.cleanLink(n) != r.cleanLink(location.href) && !e.classList.contains(this.ignoreClassLink))))))))
                },
                getTransition: function () {
                    return o
                },
                onStateChange: function () {
                    var t = this.getCurrentUrl();
                    if (this.transitionProgress && this.forceGoTo(t), this.History.currentStatus().url === t) return !1;
                    this.History.add(t);
                    var e = this.load(t),
                        n = Object.create(this.getTransition());
                    this.transitionProgress = !0, i.trigger("initStateChange", this.History.currentStatus(), this.History.prevStatus());
                    var r = n.init(this.Dom.getContainer(), e);
                    e.then(this.onNewContainerLoaded.bind(this)), r.then(this.onTransitionEnd.bind(this))
                },
                onNewContainerLoaded: function (t) {
                    var e = this.History.currentStatus();
                    e.namespace = this.Dom.getNamespace(t), i.trigger("newPageReady", this.History.currentStatus(), this.History.prevStatus(), t, this.Dom.currentHTML)
                },
                onTransitionEnd: function () {
                    this.transitionProgress = !1, i.trigger("transitionCompleted", this.History.currentStatus(), this.History.prevStatus())
                }
            };
        t.exports = u
    }, function (t, e, n) {
        var r = n(4),
            i = r.extend({
                start: function () {
                    this.newContainerLoading.then(this.finish.bind(this))
                },
                finish: function () {
                    document.body.scrollTop = 0, this.done()
               //     console.log('ST1')
                }
            });
        t.exports = i
    }, function (t, e) {
        var n = {
            dataNamespace: "namespace",
            wrapperId: "barba-wrapper",
            containerClass: "barba-container",
            currentHTML: document.documentElement.innerHTML,
            parseResponse: function (t) {
                this.currentHTML = t;
                var e = document.createElement("div");
                e.innerHTML = t;
                var n = e.querySelector("title");
                return n && (document.title = n.textContent), this.getContainer(e)
            },
            getWrapper: function () {
                var t = document.getElementById(this.wrapperId);
                if (!t) throw new Error("Barba.js: wrapper not found!");
                return t
            },
            getContainer: function (t) {
                if (t || (t = document.body), !t) throw new Error("Barba.js: DOM not ready!");
                var e = this.parseContainer(t);
                if (e && e.jquery && (e = e[0]), !e) throw new Error("Barba.js: no container found");
                return e
            },
            getNamespace: function (t) {
                return t && t.dataset ? t.dataset[this.dataNamespace] : t ? t.getAttribute("data-" + this.dataNamespace) : null
            },
            putContainer: function (t) {
                t.style.visibility = "hidden";
                var e = this.getWrapper();
                e.appendChild(t)
            },
            parseContainer: function (t) {
                return t.querySelector("." + this.containerClass)
            }
        };
        t.exports = n
    }, function (t, e, n) {
        var r = n(5),
            i = n(10),
            o = {
                ignoreClassLink: "no-barba-prefetch",
                init: function () {
                    return !!window.history.pushState && (document.body.addEventListener("mouseover", this.onLinkEnter.bind(this)), void document.body.addEventListener("touchstart", this.onLinkEnter.bind(this)))
                },
                onLinkEnter: function (t) {
                    for (var e = t.target; e && !i.getHref(e);) e = e.parentNode;
                    if (e && !e.classList.contains(this.ignoreClassLink)) {
                        var n = i.getHref(e);
                        if (i.preventCheck(t, e) && !i.Cache.get(n)) {
                            var o = r.xhr(n);
                            i.Cache.set(n, o)
                        }
                    }
                }
            };
        t.exports = o
    }])
});