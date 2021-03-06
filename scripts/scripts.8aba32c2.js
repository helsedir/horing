"use strict";

function runJqueryUIRecommendationStuff() {
    $(function() {
        $(".accordion h2, .accordion h3, .accordion h4, .accordion h5").each(function() {
            var a = $(this),
                b = a.next(),
                c = a.parent();
            b.addClass(" visuallyhidden"), c.addClass(" has-hidden-content")
        }), $(".accordion h2, .accordion h3, .accordion h4, .accordion h5").click(function() {
            var a = $(this),
                b = a.next(),
                c = a.parent();
            b.hasClass("visuallyhidden") ? (b.slideUp(0, function() {
                b.removeClass("visuallyhidden").slideDown(500)
            }), c.addClass("has-visible-content"), c.removeClass("has-hidden-content")) : (b.slideUp("fast", function() {
                b.addClass("visuallyhidden").slideDown(0)
            }), c.removeClass("has-visible-content"), c.addClass("has-hidden-content"))
        }), $(window).on("load resize", function() {
            var a = $(window).width();
            599 >= a ? ($(".accordion_mobile h2").each(function() {
                var a = $(this),
                    b = a.next(),
                    c = a.parent();
                b.hasClass("visuallyhidden") || c.hasClass("has-visible-content") || c.is("a") || (b.addClass(" visuallyhidden"), c.addClass(" has-hidden-content"))
            }), $("#mainsearch").css("width", a)) : $(".accordion_mobile h2").each(function() {
                var a = $(this),
                    b = a.next(),
                    c = a.parent();
                !b.hasClass("visuallyhidden") && !c.hasClass("has-hidden-content") || a.hasClass("accordion") || c.is("a") ? c.hasClass("has-visible-content") && c.removeClass("has-visible-content") : (b.removeClass("visuallyhidden"), c.removeClass("has-hidden-content"))
            })
        }), $(".accordion_mobile h2").click(function() {
            var a = $(window).width();
            if (599 >= a) {
                var b = $(this),
                    c = b.next(),
                    d = b.parent();
                b.hasClass("accordion") || (d.hasClass("has-hidden-content") ? (d.addClass("has-visible-content"), d.removeClass("has-hidden-content"), c.slideUp(0, function() {
                    c.removeClass("visuallyhidden").slideDown(500)
                })) : (d.removeClass("has-visible-content"), d.addClass("has-hidden-content"), c.slideUp("fast", function() {
                    c.addClass("visuallyhidden").slideDown(0)
                })))
            }
        })
    }), $(".tabs").easyResponsiveTabs({
        type: "default",
        closed: !0,
        slideSpeed: 200,
        activate: function() {
            $(this).closest("ul").addClass("open")
        }
    }), $(document).on("click", ".closemodalbutton", function(a) {
        a.preventDefault(), $.magnificPopup.close()
    })
}

function runJqueryUIStuff() {
    $(".aboutguidelineicon").on("click", function(a) {
        a.preventDefault(), $(this).toggleClass("open"), $(".aboutexpand").slideToggle("fast")
    })
}

function slider(a, b) {
    a.hasClass("open") ? (b.slideUp("fast", function() {
        b.addClass("visuallyhidden").slideDown(0)
    }), a.removeClass("open"), a.addClass("closed")) : (b.slideUp(0, function() {
        b.removeClass("visuallyhidden").slideDown(500)
    }), a.removeClass("closed"), a.addClass("open"))
}
angular.module("guidelinePreviewApp", ["ngRoute", "ngResource", "toastr", "LocalStorageModule", "ui.bootstrap"]).config(["$httpProvider",
    function(a) {
        a.interceptors.push("authInterceptorService")
    }
]).config(["localStorageServiceProvider",
    function(a) {
        a.setPrefix("ls")
    }
]).config(["$routeProvider",
    function(a) {
        a.when("/", {
            templateUrl: "views/main.html",
            controller: "MainCtrl"
        }).when("/login", {
            templateUrl: "views/login.html",
            controller: "LoginCtrl"
        }).when("/:guidelineId", {
            templateUrl: "views/guideline.html",
            controller: "GuidelineCtrl"
        }).when("/:guidelineId/print", {
            templateUrl: "views/print.html",
            controller: "PrintCtrl"
        }).when("/:guidelineId/section/:sectionId", {
            templateUrl: "views/section.html",
            controller: "SectionCtrl"
        }).when("/:guidelineId/section/:sectionId/print", {
            templateUrl: "views/print.html",
            controller: "PrintCtrl"
        }).when("/:guidelineId/childsectionIndex/:sectionId", {
            templateUrl: "views/childsection.html",
            controller: "SectionCtrl"
        }).when("/:guidelineId/childsectionIndex/:sectionId/print", {
            templateUrl: "views/print.html",
            controller: "PrintCtrl"
        }).when("/:guidelineId/section/:sectionId/recommendation/:recommendationId", {
            templateUrl: "views/recommendation.html",
            controller: "RecommendationCtrl"
        }).when("/:guidelineId/section/:sectionId/recommendation/:recommendationId/print", {
            templateUrl: "views/print.html",
            controller: "PrintCtrl"
        }).when("/notpublished/:notpublished", {
            templateUrl: "views/notpublished.html"
        }).otherwise({
            redirectTo: "/"
        })
    }
]).filter("unsafe", ["$sce",
    function(a) {
        return function(b) {
            return a.trustAsHtml(b)
        }
    }
]), angular.module("guidelinePreviewApp").factory("authInterceptorService", ["$q", "$location", "localStorageService",
    function(a, b, c) {
        var d = {}, e = function(a) {
                a.headers = a.headers || {};
                var b = c.get("authorizationData");
                return b && (a.headers.Authorization = "Bearer " + b.token), a
            }, f = function(b) {
                return 401 === b.status, a.reject(b)
            };
        return d.request = e, d.responseError = f, d
    }
]);
var apiUrl = "https://data.helsedirektoratet.no/api/v1/";
angular.module("guidelinePreviewApp").factory("Guideline", ["$resource",
    function(a) {
        return a(apiUrl + "guidelines/:_id", {}, {
            update: {
                method: "PUT"
            },
            addSection: {
                method: "POST",
                params: {
                    id: "@id"
                },
                url: apiUrl + "guidelines/:id/sections/"
            },
            addAuthor: {
                method: "PUT",
                params: {
                    id: "@id",
                    authorId: "@authorId"
                },
                url: apiUrl + "guidelines/:id/authors/:authorId"
            },
            deleteAuthor: {
                method: "DELETE",
                params: {
                    id: "@id",
                    authorId: "@authorId"
                },
                url: apiUrl + "guidelines/:id/authors/:authorId"
            }
        })
    }
]).factory("Section", ["$resource",
    function(a) {
        return a(apiUrl + "sections/:_id", {}, {
            update: {
                method: "PUT"
            },
            addSection: {
                method: "POST",
                params: {
                    id: "@id"
                },
                url: apiUrl + "sections/:id/sections/"
            },
            addRecommendation: {
                method: "POST",
                params: {
                    id: "@id"
                },
                url: apiUrl + "sections/:id/recommendations/"
            }
        })
    }
]).factory("Recommendation", ["$resource",
    function(a) {
        return a(apiUrl + "recommendations/:_id", {}, {
            update: {
                method: "PUT"
            },
            addPico: {
                method: "POST",
                params: {
                    id: "@id"
                },
                url: apiUrl + "recommendations/:id/picos/"
            },
            addEmrInfo: {
                method: "POST",
                params: {
                    id: "@id"
                },
                url: apiUrl + "recommendations/:id/emrinfos/"
            },
            addKeyInfo: {
                method: "POST",
                params: {
                    id: "@id"
                },
                url: apiUrl + "recommendations/:id/keyinfo/"
            },
            addReference: {
                method: "PUT",
                params: {
                    id: "@id",
                    referenceId: "@referenceId"
                },
                url: apiUrl + "recommendations/:id/references/:referenceId"
            },
            deleteReference: {
                method: "DELETE",
                params: {
                    id: "@id",
                    referenceId: "@referenceId"
                },
                url: apiUrl + "recommendations/:id/references/:referenceId"
            }
        })
    }
]).factory("Author", ["$resource",
    function(a) {
        return a(apiUrl + "authors/:_id", {}, {
            update: {
                method: "PUT"
            }
        })
    }
]).factory("Pico", ["$resource",
    function(a) {
        return a(apiUrl + "picos/:_id", {}, {
            update: {
                method: "PUT"
            },
            addPicoCode: {
                method: "POST",
                params: {
                    id: "@id"
                },
                url: apiUrl + "picos/:id/picocodes/"
            },
            addPicoContinousOutcome: {
                method: "POST",
                params: {
                    id: "@id"
                },
                url: apiUrl + "picos/:id/picocontinousoutcomes/"
            },
            addPicoOutcome: {
                method: "POST",
                params: {
                    id: "@id"
                },
                url: apiUrl + "picos/:id/picooutcomes/"
            }
        })
    }
]).factory("PicoCode", ["$resource",
    function(a) {
        return a(apiUrl + "picoCodes/:_id", {}, {
            update: {
                method: "PUT"
            },
            addTaxonomyCode: {
                method: "POST",
                params: {
                    id: "@id"
                },
                url: apiUrl + "picoCodes/:id/taxonomyCode/"
            }
        })
    }
]).factory("TaxonomyCode", ["$resource",
    function(a) {
        return a(apiUrl + "taxonomycodes/:_id", {}, {
            update: {
                method: "PUT"
            }
        })
    }
]).factory("EmrInfo", ["$resource",
    function(a) {
        return a(apiUrl + "emrinfos/:_id", {}, {
            update: {
                method: "PUT"
            }
        })
    }
]).factory("KeyInfo", ["$resource",
    function(a) {
        return a(apiUrl + "keyinfos/:_id", {}, {
            update: {
                method: "PUT"
            }
        })
    }
]).factory("PicoContinousOutcome", ["$resource",
    function(a) {
        return a(apiUrl + "picocontinousoutcomes/:_id", {}, {
            update: {
                method: "PUT"
            }
        })
    }
]).factory("PicoOutcome", ["$resource",
    function(a) {
        return a(apiUrl + "picooutcomes/:_id", {}, {
            update: {
                method: "PUT"
            }
        })
    }
]).factory("Reference", ["$resource",
    function(a) {
        return a(apiUrl + "referances/:_id", {}, {
            update: {
                method: "PUT"
            }
        })
    }
]), angular.module("guidelinePreviewApp").factory("LoginService", ["localStorageService", "$q", "$http",
    function(a, b, c) {
        var d = {}, e = {
                userName: "horing",
                password: "Sd@M5n!w7W2s"
            }, f = "https://data.helsedirektoratet.no/",
            g = function() {
                console.log(e), console.log(f);
                var d = "grant_type=password&username=" + e.userName + "&password=" + e.password,
                    g = b.defer();
                return c.post(f + "token", d, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }).success(function(b) {
                    a.set("authorizationData", {
                        token: b.access_token,
                        userName: e.userName,
                        expires: b[".expires"]
                    }), g.resolve(b)
                }).error(function(a) {
                    g.reject(a)
                }), g.promise
            };
        return d.login = g, d
    }
]),
function(a) {
    var b, c, d, e, f, g, h, i = "Close",
        j = "BeforeClose",
        k = "AfterClose",
        l = "BeforeAppend",
        m = "MarkupParse",
        n = "Open",
        o = "Change",
        p = "mfp",
        q = "." + p,
        r = "mfp-ready",
        s = "mfp-removing",
        t = "mfp-prevent-close",
        u = function() {}, v = !! window.jQuery,
        w = a(window),
        x = function(a, c) {
            b.ev.on(p + a + q, c)
        }, y = function(b, c, d, e) {
            var f = document.createElement("div");
            return f.className = "mfp-" + b, d && (f.innerHTML = d), e ? c && c.appendChild(f) : (f = a(f), c && f.appendTo(c)), f
        }, z = function(c, d) {
            b.ev.triggerHandler(p + c, d), b.st.callbacks && (c = c.charAt(0).toLowerCase() + c.slice(1), b.st.callbacks[c] && b.st.callbacks[c].apply(b, a.isArray(d) ? d : [d]))
        }, A = function(c) {
            return c === h && b.currTemplate.closeBtn || (b.currTemplate.closeBtn = a(b.st.closeMarkup.replace("%title%", b.st.tClose)), h = c), b.currTemplate.closeBtn
        }, B = function() {
            a.magnificPopup.instance || (b = new u, b.init(), a.magnificPopup.instance = b)
        }, C = function() {
            var a = document.createElement("p").style,
                b = ["ms", "O", "Moz", "Webkit"];
            if (void 0 !== a.transition) return !0;
            for (; b.length;)
                if (b.pop() + "Transition" in a) return !0;
            return !1
        };
    u.prototype = {
        constructor: u,
        init: function() {
            var c = navigator.appVersion;
            b.isIE7 = -1 !== c.indexOf("MSIE 7."), b.isIE8 = -1 !== c.indexOf("MSIE 8."), b.isLowIE = b.isIE7 || b.isIE8, b.isAndroid = /android/gi.test(c), b.isIOS = /iphone|ipad|ipod/gi.test(c), b.supportsTransition = C(), b.probablyMobile = b.isAndroid || b.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), e = a(document), b.popupsCache = {}
        },
        open: function(c) {
            d || (d = a(document.body));
            var f;
            if (c.isObj === !1) {
                b.items = c.items.toArray(), b.index = 0;
                var h, i = c.items;
                for (f = 0; f < i.length; f++)
                    if (h = i[f], h.parsed && (h = h.el[0]), h === c.el[0]) {
                        b.index = f;
                        break
                    }
            } else b.items = a.isArray(c.items) ? c.items : [c.items], b.index = c.index || 0; if (b.isOpen) return void b.updateItemHTML();
            b.types = [], g = "", b.ev = c.mainEl && c.mainEl.length ? c.mainEl.eq(0) : e, c.key ? (b.popupsCache[c.key] || (b.popupsCache[c.key] = {}), b.currTemplate = b.popupsCache[c.key]) : b.currTemplate = {}, b.st = a.extend(!0, {}, a.magnificPopup.defaults, c), b.fixedContentPos = "auto" === b.st.fixedContentPos ? !b.probablyMobile : b.st.fixedContentPos, b.st.modal && (b.st.closeOnContentClick = !1, b.st.closeOnBgClick = !1, b.st.showCloseBtn = !1, b.st.enableEscapeKey = !1), b.bgOverlay || (b.bgOverlay = y("bg").on("click" + q, function() {
                b.close()
            }), b.wrap = y("wrap").attr("tabindex", -1).on("click" + q, function(a) {
                b._checkIfClose(a.target) && b.close()
            }), b.container = y("container", b.wrap)), b.contentContainer = y("content"), b.st.preloader && (b.preloader = y("preloader", b.container, b.st.tLoading));
            var j = a.magnificPopup.modules;
            for (f = 0; f < j.length; f++) {
                var k = j[f];
                k = k.charAt(0).toUpperCase() + k.slice(1), b["init" + k].call(b)
            }
            z("BeforeOpen"), b.st.showCloseBtn && (b.st.closeBtnInside ? (x(m, function(a, b, c, d) {
                c.close_replaceWith = A(d.type)
            }), g += " mfp-close-btn-in") : b.wrap.append(A())), b.st.alignTop && (g += " mfp-align-top"), b.wrap.css(b.fixedContentPos ? {
                overflow: b.st.overflowY,
                overflowX: "hidden",
                overflowY: b.st.overflowY
            } : {
                top: w.scrollTop(),
                position: "absolute"
            }), (b.st.fixedBgPos === !1 || "auto" === b.st.fixedBgPos && !b.fixedContentPos) && b.bgOverlay.css({
                height: e.height(),
                position: "absolute"
            }), b.st.enableEscapeKey && e.on("keyup" + q, function(a) {
                27 === a.keyCode && b.close()
            }), w.on("resize" + q, function() {
                b.updateSize()
            }), b.st.closeOnContentClick || (g += " mfp-auto-cursor"), g && b.wrap.addClass(g);
            var l = b.wH = w.height(),
                o = {};
            if (b.fixedContentPos && b._hasScrollBar(l)) {
                var p = b._getScrollbarSize();
                p && (o.marginRight = p)
            }
            b.fixedContentPos && (b.isIE7 ? a("body, html").css("overflow", "hidden") : o.overflow = "hidden");
            var s = b.st.mainClass;
            return b.isIE7 && (s += " mfp-ie7"), s && b._addClassToMFP(s), b.updateItemHTML(), z("BuildControls"), a("html").css(o), b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo || d), b._lastFocusedEl = document.activeElement, setTimeout(function() {
                b.content ? (b._addClassToMFP(r), b._setFocus()) : b.bgOverlay.addClass(r), e.on("focusin" + q, b._onFocusIn)
            }, 16), b.isOpen = !0, b.updateSize(l), z(n), c
        },
        close: function() {
            b.isOpen && (z(j), b.isOpen = !1, b.st.removalDelay && !b.isLowIE && b.supportsTransition ? (b._addClassToMFP(s), setTimeout(function() {
                b._close()
            }, b.st.removalDelay)) : b._close())
        },
        _close: function() {
            z(i);
            var c = s + " " + r + " ";
            if (b.bgOverlay.detach(), b.wrap.detach(), b.container.empty(), b.st.mainClass && (c += b.st.mainClass + " "), b._removeClassFromMFP(c), b.fixedContentPos) {
                var d = {
                    marginRight: ""
                };
                b.isIE7 ? a("body, html").css("overflow", "") : d.overflow = "", a("html").css(d)
            }
            e.off("keyup" + q + " focusin" + q), b.ev.off(q), b.wrap.attr("class", "mfp-wrap").removeAttr("style"), b.bgOverlay.attr("class", "mfp-bg"), b.container.attr("class", "mfp-container"), !b.st.showCloseBtn || b.st.closeBtnInside && b.currTemplate[b.currItem.type] !== !0 || b.currTemplate.closeBtn && b.currTemplate.closeBtn.detach(), b._lastFocusedEl && a(b._lastFocusedEl).focus(), b.currItem = null, b.content = null, b.currTemplate = null, b.prevHeight = 0, z(k)
        },
        updateSize: function(a) {
            if (b.isIOS) {
                var c = document.documentElement.clientWidth / window.innerWidth,
                    d = window.innerHeight * c;
                b.wrap.css("height", d), b.wH = d
            } else b.wH = a || w.height();
            b.fixedContentPos || b.wrap.css("height", b.wH), z("Resize")
        },
        updateItemHTML: function() {
            var c = b.items[b.index];
            b.contentContainer.detach(), b.content && b.content.detach(), c.parsed || (c = b.parseEl(b.index));
            var d = c.type;
            if (z("BeforeChange", [b.currItem ? b.currItem.type : "", d]), b.currItem = c, !b.currTemplate[d]) {
                var e = b.st[d] ? b.st[d].markup : !1;
                z("FirstMarkupParse", e), b.currTemplate[d] = e ? a(e) : !0
            }
            f && f !== c.type && b.container.removeClass("mfp-" + f + "-holder");
            var g = b["get" + d.charAt(0).toUpperCase() + d.slice(1)](c, b.currTemplate[d]);
            b.appendContent(g, d), c.preloaded = !0, z(o, c), f = c.type, b.container.prepend(b.contentContainer), z("AfterChange")
        },
        appendContent: function(a, c) {
            b.content = a, a ? b.st.showCloseBtn && b.st.closeBtnInside && b.currTemplate[c] === !0 ? b.content.find(".mfp-close").length || b.content.append(A()) : b.content = a : b.content = "", z(l), b.container.addClass("mfp-" + c + "-holder"), b.contentContainer.append(b.content)
        },
        parseEl: function(c) {
            var d, e = b.items[c];
            if (e.tagName ? e = {
                el: a(e)
            } : (d = e.type, e = {
                data: e,
                src: e.src
            }), e.el) {
                for (var f = b.types, g = 0; g < f.length; g++)
                    if (e.el.hasClass("mfp-" + f[g])) {
                        d = f[g];
                        break
                    }
                e.src = e.el.attr("data-mfp-src"), e.src || (e.src = e.el.attr("href"))
            }
            return e.type = d || b.st.type || "inline", e.index = c, e.parsed = !0, b.items[c] = e, z("ElementParse", e), b.items[c]
        },
        addGroup: function(a, c) {
            var d = function(d) {
                d.mfpEl = this, b._openClick(d, a, c)
            };
            c || (c = {});
            var e = "click.magnificPopup";
            c.mainEl = a, c.items ? (c.isObj = !0, a.off(e).on(e, d)) : (c.isObj = !1, c.delegate ? a.off(e).on(e, c.delegate, d) : (c.items = a, a.off(e).on(e, d)))
        },
        _openClick: function(c, d, e) {
            var f = void 0 !== e.midClick ? e.midClick : a.magnificPopup.defaults.midClick;
            if (f || 2 !== c.which && !c.ctrlKey && !c.metaKey) {
                var g = void 0 !== e.disableOn ? e.disableOn : a.magnificPopup.defaults.disableOn;
                if (g)
                    if (a.isFunction(g)) {
                        if (!g.call(b)) return !0
                    } else if (w.width() < g) return !0;
                c.type && (c.preventDefault(), b.isOpen && c.stopPropagation()), e.el = a(c.mfpEl), e.delegate && (e.items = d.find(e.delegate)), b.open(e)
            }
        },
        updateStatus: function(a, d) {
            if (b.preloader) {
                c !== a && b.container.removeClass("mfp-s-" + c), d || "loading" !== a || (d = b.st.tLoading);
                var e = {
                    status: a,
                    text: d
                };
                z("UpdateStatus", e), a = e.status, d = e.text, b.preloader.html(d), b.preloader.find("a").on("click", function(a) {
                    a.stopImmediatePropagation()
                }), b.container.addClass("mfp-s-" + a), c = a
            }
        },
        _checkIfClose: function(c) {
            if (!a(c).hasClass(t)) {
                var d = b.st.closeOnContentClick,
                    e = b.st.closeOnBgClick;
                if (d && e) return !0;
                if (!b.content || a(c).hasClass("mfp-close") || b.preloader && c === b.preloader[0]) return !0;
                if (c === b.content[0] || a.contains(b.content[0], c)) {
                    if (d) return !0
                } else if (e && a.contains(document, c)) return !0;
                return !1
            }
        },
        _addClassToMFP: function(a) {
            b.bgOverlay.addClass(a), b.wrap.addClass(a)
        },
        _removeClassFromMFP: function(a) {
            this.bgOverlay.removeClass(a), b.wrap.removeClass(a)
        },
        _hasScrollBar: function(a) {
            return (b.isIE7 ? e.height() : document.body.scrollHeight) > (a || w.height())
        },
        _setFocus: function() {
            (b.st.focus ? b.content.find(b.st.focus).eq(0) : b.wrap).focus()
        },
        _onFocusIn: function(c) {
            return c.target === b.wrap[0] || a.contains(b.wrap[0], c.target) ? void 0 : (b._setFocus(), !1)
        },
        _parseMarkup: function(b, c, d) {
            var e;
            d.data && (c = a.extend(d.data, c)), z(m, [b, c, d]), a.each(c, function(a, c) {
                if (void 0 === c || c === !1) return !0;
                if (e = a.split("_"), e.length > 1) {
                    var d = b.find(q + "-" + e[0]);
                    if (d.length > 0) {
                        var f = e[1];
                        "replaceWith" === f ? d[0] !== c[0] && d.replaceWith(c) : "img" === f ? d.is("img") ? d.attr("src", c) : d.replaceWith('<img src="' + c + '" class="' + d.attr("class") + '" />') : d.attr(e[1], c)
                    }
                } else b.find(q + "-" + a).html(c)
            })
        },
        _getScrollbarSize: function() {
            if (void 0 === b.scrollbarSize) {
                var a = document.createElement("div");
                a.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(a), b.scrollbarSize = a.offsetWidth - a.clientWidth, document.body.removeChild(a)
            }
            return b.scrollbarSize
        }
    }, a.magnificPopup = {
        instance: null,
        proto: u.prototype,
        modules: [],
        open: function(b, c) {
            return B(), b = b ? a.extend(!0, {}, b) : {}, b.isObj = !0, b.index = c || 0, this.instance.open(b)
        },
        close: function() {
            return a.magnificPopup.instance && a.magnificPopup.instance.close()
        },
        registerModule: function(b, c) {
            c.options && (a.magnificPopup.defaults[b] = c.options), a.extend(this.proto, c.proto), this.modules.push(b)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&times;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading..."
        }
    }, a.fn.magnificPopup = function(c) {
        B();
        var d = a(this);
        if ("string" == typeof c)
            if ("open" === c) {
                var e, f = v ? d.data("magnificPopup") : d[0].magnificPopup,
                    g = parseInt(arguments[1], 10) || 0;
                f.items ? e = f.items[g] : (e = d, f.delegate && (e = e.find(f.delegate)), e = e.eq(g)), b._openClick({
                    mfpEl: e
                }, d, f)
            } else b.isOpen && b[c].apply(b, Array.prototype.slice.call(arguments, 1));
            else c = a.extend(!0, {}, c), v ? d.data("magnificPopup", c) : d[0].magnificPopup = c, b.addGroup(d, c);
        return d
    };
    var D, E, F, G = "inline",
        H = function() {
            F && (E.after(F.addClass(D)).detach(), F = null)
        };
    a.magnificPopup.registerModule(G, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                b.types.push(G), x(i + "." + G, function() {
                    H()
                })
            },
            getInline: function(c, d) {
                if (H(), c.src) {
                    var e = b.st.inline,
                        f = a(c.src);
                    if (f.length) {
                        var g = f[0].parentNode;
                        g && g.tagName && (E || (D = e.hiddenClass, E = y(D), D = "mfp-" + D), F = f.after(E).detach().removeClass(D)), b.updateStatus("ready")
                    } else b.updateStatus("error", e.tNotFound), f = a("<div>");
                    return c.inlineElement = f, f
                }
                return b.updateStatus("ready"), b._parseMarkup(d, {}, c), d
            }
        }
    });
    var I, J = "ajax",
        K = function() {
            I && d.removeClass(I)
        }, L = function() {
            K(), b.req && b.req.abort()
        };
    a.magnificPopup.registerModule(J, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                b.types.push(J), I = b.st.ajax.cursor, x(i + "." + J, L), x("BeforeChange." + J, L)
            },
            getAjax: function(c) {
                I && d.addClass(I), b.updateStatus("loading");
                var e = a.extend({
                    url: c.src,
                    success: function(d, e, f) {
                        var g = {
                            data: d,
                            xhr: f
                        };
                        z("ParseAjax", g), b.appendContent(a(g.data), J), c.finished = !0, K(), b._setFocus(), setTimeout(function() {
                            b.wrap.addClass(r)
                        }, 16), b.updateStatus("ready"), z("AjaxContentAdded")
                    },
                    error: function() {
                        K(), c.finished = c.loadError = !0, b.updateStatus("error", b.st.ajax.tError.replace("%url%", c.src))
                    }
                }, b.st.ajax.settings);
                return b.req = a.ajax(e), ""
            }
        }
    });
    var M, N = function(c) {
            if (c.data && void 0 !== c.data.title) return c.data.title;
            var d = b.st.image.titleSrc;
            if (d) {
                if (a.isFunction(d)) return d.call(b, c);
                if (c.el) return c.el.attr(d) || ""
            }
            return ""
        };
    a.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var a = b.st.image,
                    c = ".image";
                b.types.push("image"), x(n + c, function() {
                    "image" === b.currItem.type && a.cursor && d.addClass(a.cursor)
                }), x(i + c, function() {
                    a.cursor && d.removeClass(a.cursor), w.off("resize" + q)
                }), x("Resize" + c, b.resizeImage), b.isLowIE && x("AfterChange", b.resizeImage)
            },
            resizeImage: function() {
                var a = b.currItem;
                if (a && a.img && b.st.image.verticalFit) {
                    var c = 0;
                    b.isLowIE && (c = parseInt(a.img.css("padding-top"), 10) + parseInt(a.img.css("padding-bottom"), 10)), a.img.css("max-height", b.wH - c)
                }
            },
            _onImageHasSize: function(a) {
                a.img && (a.hasSize = !0, M && clearInterval(M), a.isCheckingImgSize = !1, z("ImageHasSize", a), a.imgHidden && (b.content && b.content.removeClass("mfp-loading"), a.imgHidden = !1))
            },
            findImageSize: function(a) {
                var c = 0,
                    d = a.img[0],
                    e = function(f) {
                        M && clearInterval(M), M = setInterval(function() {
                            return d.naturalWidth > 0 ? void b._onImageHasSize(a) : (c > 200 && clearInterval(M), c++, void(3 === c ? e(10) : 40 === c ? e(50) : 100 === c && e(500)))
                        }, f)
                    };
                e(1)
            },
            getImage: function(c, d) {
                var e = 0,
                    f = function() {
                        c && (c.img[0].complete ? (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("ready")), c.hasSize = !0, c.loaded = !0, z("ImageLoadComplete")) : (e++, 200 > e ? setTimeout(f, 100) : g()))
                    }, g = function() {
                        c && (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("error", h.tError.replace("%url%", c.src))), c.hasSize = !0, c.loaded = !0, c.loadError = !0)
                    }, h = b.st.image,
                    i = d.find(".mfp-img");
                if (i.length) {
                    var j = document.createElement("img");
                    j.className = "mfp-img", c.img = a(j).on("load.mfploader", f).on("error.mfploader", g), j.src = c.src, i.is("img") && (c.img = c.img.clone()), j = c.img[0], j.naturalWidth > 0 ? c.hasSize = !0 : j.width || (c.hasSize = !1)
                }
                return b._parseMarkup(d, {
                    title: N(c),
                    img_replaceWith: c.img
                }, c), b.resizeImage(), c.hasSize ? (M && clearInterval(M), c.loadError ? (d.addClass("mfp-loading"), b.updateStatus("error", h.tError.replace("%url%", c.src))) : (d.removeClass("mfp-loading"), b.updateStatus("ready")), d) : (b.updateStatus("loading"), c.loading = !0, c.hasSize || (c.imgHidden = !0, d.addClass("mfp-loading"), b.findImageSize(c)), d)
            }
        }
    });
    var O, P = function() {
            return void 0 === O && (O = void 0 !== document.createElement("p").style.MozTransform), O
        };
    a.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(a) {
                return a.is("img") ? a : a.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var a, c = b.st.zoom,
                    d = ".zoom";
                if (c.enabled && b.supportsTransition) {
                    var e, f, g = c.duration,
                        h = function(a) {
                            var b = a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                d = "all " + c.duration / 1e3 + "s " + c.easing,
                                e = {
                                    position: "fixed",
                                    zIndex: 9999,
                                    left: 0,
                                    top: 0,
                                    "-webkit-backface-visibility": "hidden"
                                }, f = "transition";
                            return e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d, b.css(e), b
                        }, k = function() {
                            b.content.css("visibility", "visible")
                        };
                    x("BuildControls" + d, function() {
                        if (b._allowZoom()) {
                            if (clearTimeout(e), b.content.css("visibility", "hidden"), a = b._getItemToZoom(), !a) return void k();
                            f = h(a), f.css(b._getOffset()), b.wrap.append(f), e = setTimeout(function() {
                                f.css(b._getOffset(!0)), e = setTimeout(function() {
                                    k(), setTimeout(function() {
                                        f.remove(), a = f = null, z("ZoomAnimationEnded")
                                    }, 16)
                                }, g)
                            }, 16)
                        }
                    }), x(j + d, function() {
                        if (b._allowZoom()) {
                            if (clearTimeout(e), b.st.removalDelay = g, !a) {
                                if (a = b._getItemToZoom(), !a) return;
                                f = h(a)
                            }
                            f.css(b._getOffset(!0)), b.wrap.append(f), b.content.css("visibility", "hidden"), setTimeout(function() {
                                f.css(b._getOffset())
                            }, 16)
                        }
                    }), x(i + d, function() {
                        b._allowZoom() && (k(), f && f.remove(), a = null)
                    })
                }
            },
            _allowZoom: function() {
                return "image" === b.currItem.type
            },
            _getItemToZoom: function() {
                return b.currItem.hasSize ? b.currItem.img : !1
            },
            _getOffset: function(c) {
                var d;
                d = c ? b.currItem.img : b.st.zoom.opener(b.currItem.el || b.currItem);
                var e = d.offset(),
                    f = parseInt(d.css("padding-top"), 10),
                    g = parseInt(d.css("padding-bottom"), 10);
                e.top -= a(window).scrollTop() - f;
                var h = {
                    width: d.width(),
                    height: (v ? d.innerHeight() : d[0].offsetHeight) - g - f
                };
                return P() ? h["-moz-transform"] = h.transform = "translate(" + e.left + "px," + e.top + "px)" : (h.left = e.left, h.top = e.top), h
            }
        }
    });
    var Q = "iframe",
        R = "//about:blank",
        S = function(a) {
            if (b.currTemplate[Q]) {
                var c = b.currTemplate[Q].find("iframe");
                c.length && (a || (c[0].src = R), b.isIE8 && c.css("display", a ? "block" : "none"))
            }
        };
    a.magnificPopup.registerModule(Q, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function() {
                b.types.push(Q), x("BeforeChange", function(a, b, c) {
                    b !== c && (b === Q ? S() : c === Q && S(!0))
                }), x(i + "." + Q, function() {
                    S()
                })
            },
            getIframe: function(c, d) {
                var e = c.src,
                    f = b.st.iframe;
                a.each(f.patterns, function() {
                    return e.indexOf(this.index) > -1 ? (this.id && (e = "string" == typeof this.id ? e.substr(e.lastIndexOf(this.id) + this.id.length, e.length) : this.id.call(this, e)), e = this.src.replace("%id%", e), !1) : void 0
                });
                var g = {};
                return f.srcAction && (g[f.srcAction] = e), b._parseMarkup(d, g, c), b.updateStatus("ready"), d
            }
        }
    });
    var T = function(a) {
        var c = b.items.length;
        return a > c - 1 ? a - c : 0 > a ? c + a : a
    }, U = function(a, b, c) {
            return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c)
        };
    a.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function() {
                var c = b.st.gallery,
                    d = ".mfp-gallery",
                    f = Boolean(a.fn.mfpFastClick);
                return b.direction = !0, c && c.enabled ? (g += " mfp-gallery", x(n + d, function() {
                    c.navigateByImgClick && b.wrap.on("click" + d, ".mfp-img", function() {
                        return b.items.length > 1 ? (b.next(), !1) : void 0
                    }), e.on("keydown" + d, function(a) {
                        37 === a.keyCode ? b.prev() : 39 === a.keyCode && b.next()
                    })
                }), x("UpdateStatus" + d, function(a, c) {
                    c.text && (c.text = U(c.text, b.currItem.index, b.items.length))
                }), x(m + d, function(a, d, e, f) {
                    var g = b.items.length;
                    e.counter = g > 1 ? U(c.tCounter, f.index, g) : ""
                }), x("BuildControls" + d, function() {
                    if (b.items.length > 1 && c.arrows && !b.arrowLeft) {
                        var d = c.arrowMarkup,
                            e = b.arrowLeft = a(d.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")).addClass(t),
                            g = b.arrowRight = a(d.replace(/%title%/gi, c.tNext).replace(/%dir%/gi, "right")).addClass(t),
                            h = f ? "mfpFastClick" : "click";
                        e[h](function() {
                            b.prev()
                        }), g[h](function() {
                            b.next()
                        }), b.isIE7 && (y("b", e[0], !1, !0), y("a", e[0], !1, !0), y("b", g[0], !1, !0), y("a", g[0], !1, !0)), b.container.append(e.add(g))
                    }
                }), x(o + d, function() {
                    b._preloadTimeout && clearTimeout(b._preloadTimeout), b._preloadTimeout = setTimeout(function() {
                        b.preloadNearbyImages(), b._preloadTimeout = null
                    }, 16)
                }), void x(i + d, function() {
                    e.off(d), b.wrap.off("click" + d), b.arrowLeft && f && b.arrowLeft.add(b.arrowRight).destroyMfpFastClick(), b.arrowRight = b.arrowLeft = null
                })) : !1
            },
            next: function() {
                b.direction = !0, b.index = T(b.index + 1), b.updateItemHTML()
            },
            prev: function() {
                b.direction = !1, b.index = T(b.index - 1), b.updateItemHTML()
            },
            goTo: function(a) {
                b.direction = a >= b.index, b.index = a, b.updateItemHTML()
            },
            preloadNearbyImages: function() {
                var a, c = b.st.gallery.preload,
                    d = Math.min(c[0], b.items.length),
                    e = Math.min(c[1], b.items.length);
                for (a = 1; a <= (b.direction ? e : d); a++) b._preloadItem(b.index + a);
                for (a = 1; a <= (b.direction ? d : e); a++) b._preloadItem(b.index - a)
            },
            _preloadItem: function(c) {
                if (c = T(c), !b.items[c].preloaded) {
                    var d = b.items[c];
                    d.parsed || (d = b.parseEl(c)), z("LazyLoad", d), "image" === d.type && (d.img = a('<img class="mfp-img" />').on("load.mfploader", function() {
                        d.hasSize = !0
                    }).on("error.mfploader", function() {
                        d.hasSize = !0, d.loadError = !0, z("LazyLoadError", d)
                    }).attr("src", d.src)), d.preloaded = !0
                }
            }
        }
    });
    var V = "retina";
    a.magnificPopup.registerModule(V, {
        options: {
            replaceSrc: function(a) {
                return a.src.replace(/\.\w+$/, function(a) {
                    return "@2x" + a
                })
            },
            ratio: 1
        },
        proto: {
            initRetina: function() {
                if (window.devicePixelRatio > 1) {
                    var a = b.st.retina,
                        c = a.ratio;
                    c = isNaN(c) ? c() : c, c > 1 && (x("ImageHasSize." + V, function(a, b) {
                        b.img.css({
                            "max-width": b.img[0].naturalWidth / c,
                            width: "100%"
                        })
                    }), x("ElementParse." + V, function(b, d) {
                        d.src = a.replaceSrc(d, c)
                    }))
                }
            }
        }
    }),
    function() {
        var b = 1e3,
            c = "ontouchstart" in window,
            d = function() {
                w.off("touchmove" + f + " touchend" + f)
            }, e = "mfpFastClick",
            f = "." + e;
        a.fn.mfpFastClick = function(e) {
            return a(this).each(function() {
                var g, h = a(this);
                if (c) {
                    var i, j, k, l, m, n;
                    h.on("touchstart" + f, function(a) {
                        l = !1, n = 1, m = a.originalEvent ? a.originalEvent.touches[0] : a.touches[0], j = m.clientX, k = m.clientY, w.on("touchmove" + f, function(a) {
                            m = a.originalEvent ? a.originalEvent.touches : a.touches, n = m.length, m = m[0], (Math.abs(m.clientX - j) > 10 || Math.abs(m.clientY - k) > 10) && (l = !0, d())
                        }).on("touchend" + f, function(a) {
                            d(), l || n > 1 || (g = !0, a.preventDefault(), clearTimeout(i), i = setTimeout(function() {
                                g = !1
                            }, b), e())
                        })
                    })
                }
                h.on("click" + f, function() {
                    g || e()
                })
            })
        }, a.fn.destroyMfpFastClick = function() {
            a(this).off("touchstart" + f + " click" + f), c && w.off("touchmove" + f + " touchend" + f)
        }
    }(), B()
}(window.jQuery || window.Zepto),
function(a) {
    a.fn.extend({
        easyResponsiveTabs: function(b) {
            var c = {
                type: "default",
                width: "auto",
                fit: !0,
                closed: !1,
                slideSpeed: 400,
                activate: function() {}
            }, b = a.extend(c, b),
                d = b,
                e = d.type,
                f = (d.fit, d.width, d.slideSpeed),
                g = "vertical",
                h = "accordion";
            a(this).bind("tabactivate", function(a, c) {
                "function" == typeof b.activate && b.activate.call(c, a)
            }), this.each(function() {
                function c() {
                    e == g && d.addClass("resp-vtabs"), e == h && (d.addClass("resp-easy-accordion"), d.find(".resp-tabs-list").css("display", "none"))
                }
                var d = a(this);
                d.find("ul.resp-tabs-list li").addClass("resp-tab-item"), d.find(".resp-tabs-container > div").addClass("resp-tab-content"), c();
                var i;
                d.find(".resp-tab-content").before("<h3 class='resp-accordion' role='tab'></h3>");
                var j = 0;
                d.find(".resp-accordion").each(function() {
                    i = a(this);
                    var b = d.find(".resp-tab-item:eq(" + j + ")"),
                        c = d.find(".resp-accordion:eq(" + j + ")");
                    c.append(b.html()), c.data(b.data()), i.attr("aria-controls", "tab_item-" + j), j++
                });
                var k, l = 0;
                d.find(".resp-tab-item").each(function() {
                    var b = a(this);
                    b.attr("aria-controls", "tab_item-" + l), b.attr("role", "tab");
                    var c = 0;
                    d.find(".resp-tab-content").each(function() {
                        k = a(this), k.attr("aria-labelledby", "tab_item-" + c), c++
                    }), l++
                });
                !(b.closed === !0 || "accordion" === b.closed && !$respTabsList.is(":visible") || "tabs" === b.closed && $respTabsList.is(":visible")), d.find("[role=tab]").each(function() {
                    var b = a(this);
                    b.click(function(b) {
                        b.preventDefault();
                        var c = a(this),
                            e = c.attr("aria-controls");
                        return c.hasClass("resp-accordion") && c.hasClass("resp-tab-active") ? (d.find(".resp-tab-content-active").slideUp(f, function() {
                            a(this).addClass("resp-accordion-closed")
                        }), c.removeClass("resp-tab-active"), !1) : (!c.hasClass("resp-tab-active") && c.hasClass("resp-accordion") ? (d.find(".resp-tab-active").removeClass("resp-tab-active"), d.find(".resp-tab-content-active").slideUp(f).removeClass("resp-tab-content-active resp-accordion-closed"), d.find("[aria-controls=" + e + "]").addClass("resp-tab-active"), d.find(".resp-tab-content[aria-labelledby = " + e + "]").slideDown(f).addClass("resp-tab-content-active")) : (d.find(".resp-tab-active").removeClass("resp-tab-active"), d.find(".resp-tab-content-active").removeAttr("style").removeClass("resp-tab-content-active").removeClass("resp-accordion-closed"), d.find("[aria-controls=" + e + "]").addClass("resp-tab-active"), d.find(".resp-tab-content[aria-labelledby = " + e + "]").addClass("resp-tab-content-active").attr("style", "display:block")), void c.trigger("tabactivate", c))
                    })
                }), a(window).resize(function() {
                    d.find(".resp-accordion-closed").removeAttr("style")
                })
            })
        }
    })
}(jQuery), $(runJqueryUIStuff()), $(runJqueryUIRecommendationStuff()), angular.module("guidelinePreviewApp").controller("LoginCtrl", ["$scope", "$location", "authService", "$rootScope",
    function(a, b, c, d) {
        d.login = !0, a.loginData = {
            userName: "",
            password: ""
        }, a.message = "", a.login = function() {
            c.login(a.loginData).then(function() {
                b.path("/")
            }, function(b) {
                a.message = b.error_description
            })
        }
    }
]), angular.module("guidelinePreviewApp").controller("GuidelineCtrl", ["Guideline", "toastr", "$scope", "$routeParams", "$location", "ErrorService", "localStorageService", "LoginService",
    function(a, b, c, d, e, f, g, h) {
        var i = d.guidelineId,
            j = !1;
        j = e.search().preview;
        var k = g.get("authorizationData"),
            l = function() {
                a.get({
                    _id: i,
                    preview: j
                }).$promise.then(function(a) {
                    c.retningslinje = a
                }, function(a) {
                    f.handleError(a)
                })
            };
        
        if(k) {
            var expiryDate = new Date(k.expires);
            if (expiryDate < Date.now()) {
                h.login().then(function () {
                    l()
                });
            }
            else {l()}
        }
        else {h.login().then(function () {
                    l()
                });}
        
    }
]), angular.module("guidelinePreviewApp").controller("SectionCtrl", ["Section", "Guideline", "toastr", "$scope", "$routeParams", "$location", "ErrorService", "localStorageService", "LoginService",
    function(a, b, c, d, e, f, g, h, i) {
        var j = e.guidelineId,
            k = e.sectionId,
            l = !1;
        l = f.search().preview;
        var m = function() {
            b.get({
                _id: j,
                preview: l
            }).$promise.then(function(a) {
                d.guideline = a
            }, function(a) {
                g.handleError(a)
            }), a.get({
                _id: k,
                preview: l
            }).$promise.then(function(a) {
                d.section = a
            }, function(a) {
                g.handleError(a)
            })
        }, n = h.get("authorizationData");
        if(n) {
            var expiryDate = new Date(n.expires);
            if (expiryDate < Date.now()) {
                i.login().then(function () {
                    m()
                });
            }
            else {m()}
        }
        else {i.login().then(function () {
                    m()
                });}
    }
]), angular.module("guidelinePreviewApp").controller("RecommendationCtrl", ["$scope", "Recommendation", "Guideline", "toastr", "$routeParams", "$location", "ErrorService", "$rootScope", "localStorageService", "LoginService",
    function(a, b, c, d, e, f, g, h, i, j) {
        h.recommendation = !0;
        var k = e.recommendationId,
            l = e.guidelineId,
            m = !1;
        m = f.search().preview;
        var n = function() {
            b.get({
                _id: k,
                preview: m
            }).$promise.then(function(b) {
                a.recommendation = b
            }, function(a) {
                g.handleError(a)
            }), c.get({
                _id: l
            }).$promise.then(function(b) {
                a.guideline = b
            }, function(a) {
                g.handleError(a)
            })
        }, o = i.get("authorizationData");
        
        if(o) {
            var expiryDate = new Date(o.expires);
            if (expiryDate < Date.now()) {
                j.login().then(function () {
                    n()
                });
            }
            else {n()}
        }
        else {j.login().then(function () {
                    n()
                });}
    }
]), angular.module("guidelinePreviewApp").controller("MainCtrl", ["$scope", "Guideline", "toastr", "ErrorService", "localStorageService", "LoginService",
    function(a, b, c, d, e, f) {
        a.refineSearch = 0;
        var g = function() {
            b.query().$promise.then(function(b) {
                a.guidelines = b
            }, function(a) {
                d.handleError(a)
            })
        }, h = e.get("authorizationData");
        if(h) {
            var expiryDate = new Date(h.expires);
            if (expiryDate < Date.now()) {
                f.login().then(function () {
                    g()
                });
            }
            else {g()}
        }
        else {f.login().then(function () {
                    g()
                });}
    }
]).filter("isType", function() {
    return function(a, b) {
        if ("undefined" != typeof a) {
            if (0 == b) return a;
            for (var c = [], d = 0; d < a.length; d++) a[d].type == b && c.push(a[d]);
            return c
        }
    }
}), angular.module("guidelinePreviewApp").directive("responsiveTabs", function() {
    return {
        restrict: "A",
        link: function(a, b) {
            var c = function() {
                b.easyResponsiveTabs({
                    type: "default",
                    closed: !0,
                    slideSpeed: 200,
                    activate: function() {
                        $(this).closest("ul").addClass("open")
                    }
                })
            };
            a.$watch(b, c)
        }
    }
}), angular.module("guidelinePreviewApp").directive("magnificPopup", function() {
    return {
        restrict: "A",
        link: function(a, b) {
            b.magnificPopup({
                type: "inline",
                midClick: !0,
                closeBtnInside: !1
            })
        }
    }
}), angular.module("guidelinePreviewApp").directive("grading", function() {
    return {
        restrict: "A",
        link: function(a, b, c) {
            c.$observe("grading", function(a) {
                "strong" == a ? (b.addClass("gradingStrong"), b.removeClass("gradingWeak"), b.removeClass("gradingNone")) : "weak" == a ? (b.addClass("gradingWeak"), b.removeClass("gradingNone"), b.removeClass("gradingStrong")) : "null" == a ? (b.addClass("gradingNone"), b.removeClass("gradingWeak"), b.removeClass("gradingStrong")) : null == a ? (b.addClass("gradingNone"), b.removeClass("gradingWeak"), b.removeClass("gradingStrong")) : (b.addClass("gradingNone"), b.removeClass("gradingWeak"), b.removeClass("gradingStrong"))
            })
        }
    }
}), angular.module("guidelinePreviewApp").directive("accordions", function() {
    return {
        restrict: "A",
        link: function(a, b) {
            b.find(".explainingtext").hide();
            var c = function(a, b) {
                a.hasClass("open") ? (b.slideUp("fast", function() {
                    b.addClass("visuallyhidden").slideDown(0)
                }), a.removeClass("open"), a.addClass("closed")) : (b.slideUp(0, function() {
                    b.removeClass("visuallyhidden").slideDown(500)
                }), a.removeClass("closed"), a.addClass("open"))
            }, d = function() {
                    b.find("header").toggleClass("gradingBlank"), b.closest("section").toggleClass("open"), b.find("h2").toggleClass("clicked");
                    var a = b.find(".recommendationheader");
                    c(a, a.siblings(".recommendationcontent, .background_information, .button-close"))
                };
            b.find("h2").bind("click", d), b.find(".button-close").bind("click", d), b.find(".button-close").click(function(a) {
                a.preventDefault()
            })
        }
    }
}), angular.module("guidelinePreviewApp").directive("explanationClick", function() {
    return {
        restrict: "A",
        link: function(a, b) {
            var c = function() {
                var a = 300;
                b.find(".explainingtext").slideToggle(a), b.toggleClass("open"), b.find("i").toggleClass("open");
                var c = b.find("p").first();
                c.hasClass("ng-hide") && (c = c.next()), c = c[0].scrollHeight;
                var d = b.parent().find(".pulse");
                d.hasClass("closed") ? (d.animate({
                    top: c + 50 + "px"
                }, a), d.removeClass("closed")) : (d.animate({
                    top: "40px"
                }, a), d.addClass("closed"))
            };
            b.bind("click", c)
        }
    }
}), angular.module("guidelinePreviewApp").directive("aboutSection", function() {
    return {
        templateUrl: "views/partials/_aboutsection.html",
        restrict: "E",
        replace: "true"
    }
}), angular.module("guidelinePreviewApp").directive("contactinfo", function() {
    return {
        templateUrl: "views/partials/_contactinfo.html",
        restrict: "E",
        replace: "true"
    }
}), angular.module("guidelinePreviewApp").directive("feedback", function() {
    return {
        templateUrl: "views/partials/_feedback.html",
        restrict: "E",
        replace: "true"
    }
}), angular.module("guidelinePreviewApp").directive("aboutGuidelineExpand", function() {
    return {
        restrict: "A",
        link: function(a, b) {
            $(b).click(function(a) {
                a.preventDefault(), b.toggleClass("open"), b.parent().parent().parent().find(".aboutexpand").slideToggle()
            })
        }
    }
}), angular.module("guidelinePreviewApp").directive("publishedStage", function() {
    return {
        template: '<alert type="info" ng-if="publishedStageText.length > 1" ng-show="showAlert" class="publishedstage" close="closeAlert()"><p><span class="glyphicon glyphicon-info-sign"></span> {{resource}} er {{publishedStageText}}</p></alert>',
        restrict: "E",
        scope: {
            publishedStage: "=publishedstage",
            resource: "@"
        },
        link: function(a) {
            a.showAlert = !0, a.closeAlert = function() {
                a.showAlert = !1
            }, a.$watch("publishedStage", function() {
                switch (a.publishedStage) {
                    case 0:
                        a.publishedStageText = "lagret som kladd";
                        break;
                    case 1:
                        a.publishedStageText = "sent på høring";
                        break;
                    case 2:
                        a.publishedStageText = "publisert"
                }
            })
        }
    }
}), angular.module("guidelinePreviewApp").directive("recommendation", function() {
    return {
        templateUrl: "views/partials/_recommendation.html",
        replace: !0,
        restrict: "E"
    }
}), angular.module("guidelinePreviewApp").directive("recommendationStrength", function() {
    return {
        template: '<small ng-if="strengthText.length > 0">Styrke på anbefalingen: {{strengthText}}</small>',
        restrict: "EA",
        scope: {
            strength: "="
        },
        link: function(a) {
            a.$watch("strength", function() {
                switch (a.strength) {
                    case "weak":
                        a.strengthText = "svak";
                        break;
                    case "strong":
                        a.strengthText = "sterk";
                        break;
                    case "null":
                        a.strengthText = "";
                        break;
                    default:
                        a.strengthText = ""
                }
            })
        }
    }
}), angular.module("guidelinePreviewApp").service("ErrorService", ["toastr",
    function(a) {
        this.handleError = function(b) {
            401 == b.status ? a.warning("Du må være logget inn for å se denne ressursen") : 400 == b.status && "The item is not published yet." == b.data.message ? a.warning("Denne ressursen er ikke publisert enda. Du må være logget inn for å se den") : a.error("Status code: " + b.status + " " + b.statusText + " Error data: " + b.data.message, "Error!")
        }
    }
]), angular.module("guidelinePreviewApp").factory("authService", ["$http", "$q", "localStorageService",
    function(a, b, c) {
        var d = "https://data.helsedirektoratet.no/api/v1/",
            e = {}, f = {
                isAuth: !1,
                userName: ""
            }, g = function(b) {
                return i(), a.post(d + "api/v1/account/register", b).then(function(a) {
                    return a
                })
            }, h = function(e) {
                var g = "grant_type=password&username=" + e.userName + "&password=" + e.password,
                    h = b.defer();
                return a.post(d + "token", g, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }).success(function(a) {
                    c.set("authorizationData", {
                        token: a.access_token,
                        userName: e.userName,
                        expires: a[".expires"]
                    }), f.isAuth = !0, f.userName = e.userName, h.resolve(a)
                }).error(function(a) {
                    i(), h.reject(a)
                }), h.promise
            }, i = function() {
                c.remove("authorizationData"), f.isAuth = !1, f.userName = ""
            }, j = function() {
                var a = c.get("authorizationData");
                a && (f.isAuth = !0, f.userName = a.userName)
            };
        return e.saveRegistration = g, e.login = h, e.logOut = i, e.fillAuthData = j, e.authentication = f, e
    }
]), angular.module("guidelinePreviewApp").controller("PrintCtrl", ["Guideline", "Section", "Recommendation", "$routeParams", "ErrorService", "$location", "$scope", "$rootScope",
    function(a, b, c, d, e, f, g, h) {
        h.recommendation = !0;
        var i = d.guidelineId,
            j = !1;
        j = f.search().preview, a.get({
            _id: i,
            preview: j
        }).$promise.then(function(a) {
            g.guideline = a
        }, function(a) {
            e.handleError(a)
        })
    }
]), angular.module("guidelinePreviewApp").directive("printGuideline", function() {
    return {
        templateUrl: "views/partials/print/_guideline.html",
        restrict: "E",
        transclude: !0
    }
}), angular.module("guidelinePreviewApp").directive("printAuthor", function() {
    return {
        templateUrl: "views/partials/print/_author.html",
        restrict: "E",
        transclude: !0
    }
}), angular.module("guidelinePreviewApp").directive("printSection", function() {
    return {
        templateUrl: "views/partials/print/_section.html",
        restrict: "E",
        transclude: !0
    }
}), angular.module("guidelinePreviewApp").directive("printRecommendation", ["Recommendation", "ErrorService",
    function(a, b) {
        return {
            templateUrl: "views/partials/print/_recommendation.html",
            restrict: "E",
            scope: {
                recommendationId: "=recommendationid"
            },
            transclude: !0,
            link: function(c) {
                a.get({
                    _id: c.recommendationId
                }).$promise.then(function(a) {
                    c.recommendation = a
                }, function(a) {
                    b.handleError(a)
                })
            }
        }
    }
]), angular.module("guidelinePreviewApp").directive("tableOfContents", function() {
    return {
        restrict: "A",
        link: function(a, b) {
            function c() {
                a.headlines = [], angular.forEach(b[0].querySelectorAll("h1,h2,h3,h4,h5,h6"), function(b) {
                    a.headlines.push({
                        level: b.tagName[1],
                        label: angular.element(b).text(),
                        element: b
                    })
                })
            }
            a.$on("$destroy", function() {
                a.headlines = []
            }), a.scrollTo = function(a) {
                a.element.scrollIntoView()
            }, a.$watch(b, function() {
                c()
            })
        }
    }
});
