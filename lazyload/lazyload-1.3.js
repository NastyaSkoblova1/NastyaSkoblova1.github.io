function t_lazyload_update(){"undefined"!=typeof lazyload_cover&&lazyload_cover.update(),"undefined"!=typeof lazyload_img&&lazyload_img.update(),"undefined"!=typeof lazyload_bgimg&&lazyload_bgimg.update()}!function(t,e){"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?module.exports=e():t.LazyLoad=e()}(this,function(){function t(t,e,o){var l;d?t.addEventListener(e,o):u&&(t.attachEvent("on"+e,(l=t,function(){o.call(l,window.event)})),t=null)}function e(t,e,o){d?t.removeEventListener(e,o):u&&t.detachEvent("on"+e,o)}function o(t,e,o){var l,n,i;function s(){return window.innerWidth||l.documentElement.clientWidth||document.body.clientWidth}function a(t){return t.getBoundingClientRect().top+n-l.documentElement.clientTop}function r(t){return t.getBoundingClientRect().left+i-l.documentElement.clientLeft}return l=t.ownerDocument,n=window.pageYOffset||l.body.scrollTop,i=window.pageXOffset||l.body.scrollLeft,"fixed"===t.getAttribute("data-content-cover-parallax")&&t.closest&&t.closest(".t-cover__container")&&(t=t.closest(".t-cover__container")),!((e===window?(window.innerHeight||l.documentElement.clientHeight||document.body.clientHeight)+n:a(e)+e.offsetHeight)<=a(t)-o||(e===window?n:a(e))>=a(t)+1200+t.offsetHeight||(e===window?s()+window.pageXOffset:r(e)+s())<=r(t)-o||(e===window?i:r(e))>=r(t)+o+t.offsetWidth)}function l(){return(new Date).getTime()}function n(t,e){_?t.classList.add(e):t.className+=(t.className?" ":"")+e}function i(t,e){_?t.classList.remove(e):t.className=t.className.replace(new RegExp("(^|\\s+)"+e+"(\\s+|$)")," ").replace(/^\s+/,"").replace(/\s+$/,"")}function s(t,e,o,l){var n=e.getAttribute("data-"+l),i=e.getAttribute("data-"+o),s=t.tagName;return"IMG"===s?(i&&t.setAttribute("srcset",i),void(n&&t.setAttribute("src",n))):"IFRAME"===s?void(n&&t.setAttribute("src",n)):void(t.style.backgroundImage="url("+n+")")}function a(t,e){return function(){return t.apply(e,arguments)}}function r(e){h||(c={elements_selector:"img",container:window,threshold:300,throttle:50,data_src:"original",data_srcset:"original-set",class_loading:"loading",class_loaded:"loaded",skip_invisible:!0,show_while_loading:!0,callback_load:null,callback_error:null,callback_set:null,callback_processed:null,placeholder:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"},d=!!window.addEventListener,u=!!window.attachEvent,_=!!document.body.classList,h=!0),this._settings=function(t,e){var o,l={};for(o in t)t.hasOwnProperty(o)&&(l[o]=t[o]);for(o in e)e.hasOwnProperty(o)&&(l[o]=e[o]);return l}(c,e),this._queryOriginNode=this._settings.container===window?document:this._settings.container,this._previousLoopTime=0,this._loopTimeout=null,this._handleScrollFn=a(this.handleScroll,this),t(window,"resize",this._handleScrollFn),this.update()}var c,d,u,_,h=!1;return r.prototype._showOnLoad=function(o){var l,a=this._settings;o.getAttribute("src")||o.setAttribute("src",a.placeholder),t(l=document.createElement("img"),"load",function t(){null!==a&&(a.callback_load&&a.callback_load(o),s(o,o,a.data_srcset,a.data_src),a.callback_set&&a.callback_set(o),i(o,a.class_loading),n(o,a.class_loaded),e(l,"load",t))}),t(l,"error",function(){i(o,a.class_loading),a.callback_error&&a.callback_error(o)}),n(o,a.class_loading),s(l,o,a.data_srcset,a.data_src)},r.prototype._showOnAppear=function(o){function l(){null!==a&&(a.callback_load&&a.callback_load(o),i(o,a.class_loading),n(o,a.class_loaded),e(o,"load",l))}var a=this._settings;("IMG"===o.tagName||"IFRAME"===o.tagName)&&(t(o,"load",l),t(o,"error",function(){e(o,"load",l),i(o,a.class_loading),a.callback_error&&a.callback_error(o)}),n(o,a.class_loading)),s(o,o,a.data_srcset,a.data_src),a.callback_set&&a.callback_set(o)},r.prototype._loopThroughElements=function(){var t,e,l=this._settings,n=this._elements,i=n?n.length:0,s=[];for(t=0;i>t;t++)e=n[t],l.skip_invisible&&e.isSkipByPosition||o(e,l.container,l.threshold)&&(l.show_while_loading?this._showOnAppear(e):this._showOnLoad(e),s.push(t),e.wasProcessed=!0);for(;s.length>0;)n.splice(s.pop(),1),l.callback_processed&&l.callback_processed(n.length);0===i&&this._stopScrollHandler()},r.prototype._purgeElements=function(){var t,e=this._elements,o=e.length,l=[];for(t=0;o>t;t++)e[t].wasProcessed&&l.push(t);for(;l.length>0;)e.splice(l.pop(),1)},r.prototype._startScrollHandler=function(){this._isHandlingScroll||(this._isHandlingScroll=!0,t(this._settings.container,"scroll",this._handleScrollFn))},r.prototype._stopScrollHandler=function(){this._isHandlingScroll&&(this._isHandlingScroll=!1,e(this._settings.container,"scroll",this._handleScrollFn))},r.prototype.handleScroll=function(){var t,e,o;this._settings&&(e=l(),0!==(o=this._settings.throttle)?0>=(t=o-(e-this._previousLoopTime))||t>o?(this._loopTimeout&&(clearTimeout(this._loopTimeout),this._loopTimeout=null),this._previousLoopTime=e,this._loopThroughElements()):this._loopTimeout||(this._loopTimeout=setTimeout(a(function(){this._previousLoopTime=l(),this._loopTimeout=null,this._loopThroughElements()},this),t)):this._loopThroughElements())},r.prototype.update=function(){this._elements=function(t){var e;try{e=Array.prototype.slice.call(t)}catch(i){var o,l=[],n=t.length;for(o=0;o<n;o++)l.push(t[o]);e=l}return e.forEach(function(t){t.isSkipByPosition=null===t.offsetParent&&0===$(t).parents(".t396__carrier-wrapper").length&&"fixed"!==t.getAttribute("data-content-cover-parallax")}),e}(this._queryOriginNode.querySelectorAll(this._settings.elements_selector)),this._purgeElements(),this._loopThroughElements(),this._startScrollHandler()},r.prototype.destroy=function(){e(window,"resize",this._handleScrollFn),this._loopTimeout&&(clearTimeout(this._loopTimeout),this._loopTimeout=null),this._stopScrollHandler(),this._elements=null,this._queryOriginNode=null,this._settings=null},r}),window.lazy="y",$(document).ready(function(){setTimeout(function(){lazyload_cover=new LazyLoad({elements_selector:".t-cover__carrier",show_while_loading:!1,data_src:"content-cover-bg",placeholder:"",threshold:700})},100),setTimeout(function(){lazyload_img=new LazyLoad({elements_selector:".t-img",threshold:800}),lazyload_bgimg=new LazyLoad({elements_selector:".t-bgimg",show_while_loading:!1,placeholder:"",threshold:800}),lazyload_iframe=new LazyLoad({elements_selector:".t-iframe"}),$(document).bind("slide.bs.carousel",function(t){setTimeout(function(){lazyload_cover.update(),lazyload_img.update(),lazyload_bgimg.update()},500)}),window.isMobile&&($("body").append("<div class='t-mbfix'></div>"),setTimeout(function(){$(".t-mbfix").addClass("t-mbfix_hide")},50),setTimeout(function(){$(".t-mbfix").remove()},1e3))},500)});

var lzld='03022001';
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.LazyLoad = factory();
    }
}(this, function() {

    var _defaultSettings,
        _supportsAddEventListener,
        _supportsAttachEvent,
        _supportsClassList,
        _isInitialized = false;


    /*
     * PRIVATE FUNCTIONS *NOT RELATED* TO A SPECIFIC INSTANCE OF LAZY LOAD
     * -------------------------------------------------------------------
     */

    function _init() {
        if (!_isInitialized) {
            _defaultSettings = {
                elements_selector: "img",
                container: window,
                threshold: 300,
                throttle: 50,
                data_src: "original",
                data_srcset: "original-set",
                class_loading: "loading",
                class_loaded: "loaded",
                skip_invisible: true,
                show_while_loading: true,
                callback_load: null,
                callback_error: null,
                callback_set: null,
                callback_processed: null,
                placeholder: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            };
            _supportsAddEventListener = !!window.addEventListener;
            _supportsAttachEvent = !!window.attachEvent;
            _supportsClassList = !!document.body.classList;

            _isInitialized = true;
        }
    }

    function _addEventListener(element, eventName, callback) {
        // Use addEventListener if available
        if (_supportsAddEventListener) {
            element.addEventListener(eventName, callback);
            return;
        }
        // Otherwise use attachEvent, set this and event
        if (_supportsAttachEvent) {
            element.attachEvent('on' + eventName, (function(el) {
                return function() {
                    callback.call(el, window.event);
                };
            }(element)));
            // Break closure and primary circular reference to element
            element = null;
        }
    }

    function _removeEventListener(element, eventName, callback) {
        // Use removeEventListener if available
        if (_supportsAddEventListener) {
            element.removeEventListener(eventName, callback);
            return;
        }
        // Otherwise use detachEvent
        if (_supportsAttachEvent) {
            element.detachEvent('on' + eventName, callback);
        }
    }

    function _isInsideViewport(element, container, threshold) {
        // Set threshold smaller, if passed less than 3sec from page loading. To avoid load unnessesery images at opening page
        if(window.flag_performance_pass3000!==true && typeof performance=='object' && performance.now()<3000){
            threshold=300;
        }else{
            window.flag_performance_pass3000=true;
        }

        var ownerDocument, documentTop, documentLeft;

        function _getDocumentWidth() {
            return window.innerWidth || (ownerDocument.documentElement.clientWidth || document.body.clientWidth);
        }

        function _getDocumentHeight() {
            return window.innerHeight || (ownerDocument.documentElement.clientHeight || document.body.clientHeight);
        }

        function _getTopOffset(element) {
            return element.getBoundingClientRect().top + documentTop - ownerDocument.documentElement.clientTop;
        }

        function _getLeftOffset(element) {
            return element.getBoundingClientRect().left + documentLeft - ownerDocument.documentElement.clientLeft;
        }

        function _isBelowViewport() {
            var fold;
            if (container === window) {
                fold = _getDocumentHeight() + documentTop;
            } else {
                fold = _getTopOffset(container) + container.offsetHeight;
            }
            return fold <= _getTopOffset(element) - threshold;
        }

        function _isAtRightOfViewport() {
            var fold;
            if (container === window) {
                fold = _getDocumentWidth() + window.pageXOffset;
            } else {
                fold = _getLeftOffset(container) + _getDocumentWidth();
            }
            return fold <= _getLeftOffset(element) - threshold;
        }

        function _isAboveViewport() {
            var fold;
            // hack for cases with img above viewport without thumbnail (height === 0)
            var localThreshold = 1200;
            if (container === window) {
                fold = documentTop;
            } else {
                fold = _getTopOffset(container);
            }
            return fold >= _getTopOffset(element) + localThreshold + element.offsetHeight;
        }

        function _isAtLeftOfViewport() {
            var fold;
            if (container === window) {
                fold = documentLeft;
            } else {
                fold = _getLeftOffset(container);
            }
            return fold >= _getLeftOffset(element) + threshold + element.offsetWidth;
        }

        ownerDocument = element.ownerDocument;
        documentTop = window.pageYOffset || ownerDocument.body.scrollTop;
        documentLeft = window.pageXOffset || ownerDocument.body.scrollLeft;

        if (element.getAttribute('data-content-cover-parallax') === 'fixed' && element.closest && element.closest('.t-cover__container')) {
            element = element.closest('.t-cover__container');
        }
        return !_isBelowViewport() && !_isAboveViewport() && !_isAtRightOfViewport() && !_isAtLeftOfViewport();
    }

    function _now() {
        var d = new Date();
        return d.getTime();
    }

    function _merge_objects(obj1, obj2) {
        var obj3 = {},
            propertyName;
        for (propertyName in obj1) {
            if (obj1.hasOwnProperty(propertyName)) {
                obj3[propertyName] = obj1[propertyName];
            }
        }
        for (propertyName in obj2) {
            if (obj2.hasOwnProperty(propertyName)) {
                obj3[propertyName] = obj2[propertyName];
            }
        }
        return obj3;
    }

    function _convertToArray(nodeSet) {
        var elsArray;
        try {
            elsArray = Array.prototype.slice.call(nodeSet);
        } catch (e) {
            var array = [],
                i, l = nodeSet.length;

            for (i = 0; i < l; i++) {
                array.push(nodeSet[i]);
            }
            elsArray = array;
        }
        elsArray.forEach(function(element) {
            element.isSkipByPosition = element.offsetParent === null && $(element).parents('.t396__carrier-wrapper').length === 0 && element.getAttribute('data-content-cover-parallax') !== 'fixed';
        });
        return elsArray;
    }

    function _addClass(element, className) {
        /* HTML 5 compliant browsers. */
        if (_supportsClassList) {
            element.classList.add(className);
            return;
        }
        /* Legacy browsers (IE<10) support. */
        element.className += (element.className ? ' ' : '') + className;
    }

    function _removeClass(element, className) {
        /* HTML 5 compliant browsers. */
        if (_supportsClassList) {
            element.classList.remove(className);
            return;
        }
        /* Legacy browsers (IE<10) support. */
        element.className = element.className.replace(new RegExp("(^|\\s+)" + className + "(\\s+|$)"), ' ').replace(/^\s+/, '').replace(/\s+$/, '');
    }

    function _setSources(target, source, srcsetDataAttribute, srcDataAttribute) {

        var src = source.getAttribute('data-' + srcDataAttribute);

        if(src==null)return;

        var width = source.clientWidth;
        var height = source.clientHeight;

        var $this = $(source);
        //for sliders - need get upper wrapper
        if (($this.hasClass('t-slds__bgimg') || $this.hasClass('t-slds__img')) && !$this.hasClass('t827__image')) {
            var wrp=$this.parents('.t-slds__container');
            if(wrp.length==0){
                //if this is gallery mini bullet
                wrp=$this.parents('.t-slds__thumbsbullet').length;
            }
            if(wrp.length){
                width = wrp.width();
                height = wrp.height();
            }
        }

		var x='';
		var y='';
		var bgsize='';
		var bgatt='';
		var comm='';
		var rule='';

		var round=1;
		var doo=true;
		var skip=false;

		if(window.lazy_imgoptimoff=='yes')doo=false;

		if (source.tagName === "IMG") {
			comm='resize';
		}else{
			//x=source.style.backgroundPositionX;
			//y=source.style.backgroundPositionY;
			var foo=$this.css('backgroundPosition').split(" ");
			x=foo[0];
			y=foo[1];
			if(x=='50%'){x='center';}else if(x=='0%'){x='left';}else if(x=='100%'){x='right';}
			if(y=='50%'){y='center';}else if(y=='0%'){y='top';}else if(y=='100%'){x='bottom';}
			bgsize=$this.css('background-size');
			bgatt=$this.css('background-attachment');
			if(bgsize=='contain'){comm='contain';}else{comm='cover';}
			if(bgatt=='fixed')skip=true;
		}

		if(typeof $this.attr('data-lazy-rule')!='undefined'){
			rule=$this.attr('data-lazy-rule');
			var a=rule.split(','), i;
			for (i = 0; i < a.length; i++) {
				if(a[i].indexOf('round:')>-1){
					round=(a[i].split(':')[1])*1;
				}
				if(a[i].indexOf('comm:')>-1){
					comm=a[i].split(':')[1];
					if(comm!='resize' && comm!='cover' && comm!='contain')doo=false;
				}
				if(a[i].indexOf('skip')>-1){
					skip=true;
				}
				if(a[i].indexOf('optimoff')>-1){
					doo=false;
				}
			}
		}

		if (round>1) {
			var foo=t_lazyload_round(comm,width,height,round);
			width=foo[0];
			height=foo[1];
		}

		if (comm=="cover" && width>0 && height>0 && width<=1000) {
			if(width===Math.ceil(width/5)*5 && height===Math.ceil(height/5)*5){
				//ok
			}else if(['200x151','640x712','320x356','670x744','335x372','300x225','500x375','400x301','748x832','374x416','670x502','335x251','360x234','560x622','280x311','640x416'].indexOf(width+'x'+height) > -1){
				//ok
			}else if(['353x245','155x151','158x164','372x495','280x272','117x117','291x280','280x269','335x241','283x283','150x156','353x233','414x730','372x362','275x206','290x322','248x207','177x136','173x173','280x308','195x214','248x191','155x196','163x203','320x444','158x162','176x203','412x700','360x88','360x616','167x167','130x144','280x233','560x314','320x299','372x275','320x178','372x242','360x352','353x294','260x182','372x310','335x344','374x432','414x500','374x360','220x338','150x146','335x239','176x176','320x302','374x260','360x568','191x221','192x192','372x558','335x188','320x358','335x258','374x575','26x26','353x360','360x206','335x248','335x322','167x256','560x364','155x172','163x216','163x181','360x257','374x561','374x243','220x212','177x148','291x324','167x160','375x749','335x387','172x172','260x302','414x700','220x254','177x172','374x519','176x169','320x352','335x233','150x203','360x207','158x121','360x396','158x131','150x98','220x169','182x202','320x179','372x413','181x226','353x200','158x153','375x628','176x271','374x364','320x492','374x247','414x833','353x393','335x218','560x399','412x264','293x164','56x56','177x204','248x382','181x181','118x118','260x346','374x497','260x202','393x251','158x158','372x200','373x414','320x229','177x177','312x175','374x312','84x84','320x329','177x194','353x350','335x503','335x446','335x326','374x200','158x182','320x237','335x221','176x196','150x229','320x224','248x276','360x299','260x289','196x216','335x279','177x272','320x426','260x172','155x194','320x369','372x350','360x302','360x402','169x186','158x242','173x199','167x185','360x238','220x123','320x308','414x265','374x350','300x333','177x170','320x222','320x311','260x169','150x173','320x246','353x265','192x222','158x151','372x414','150x144','760x502','314x176','320x208','182x182','320x211','163x163','372x279','360x202','360x252','260x252','260x286','353x392','160x104','374x281','353x353','150x231','320x267','372x372','177x197','275x154','158x175','374x374','150x167','260x146'].indexOf(width+'x'+height) > -1){
				//add maybe latter chrome dev resolutions '375x667','414x736','375x812','414x823','411x731','360x640'
				//ok
			}else if($this.hasClass('tn-atom') || $this.hasClass('tn-atom__img')){
				//ok
			}else{
				//skip=true;
				//t_lazyload_sendstat(width,height);
				if($this.hasClass('t-cover__carrier')){
					//keep cover
				}else{
					comm='resize';
				}
				var foo=t_lazyload_round(comm,width,height,100);
				width=foo[0];
				height=foo[1];
			}
		}

		//fix case then empy img not loading, and img has width of browser icon broken image
		if(comm=="resize" && width<30){
			skip=true;
		}

		if(doo===true){
			if(skip===true || width>1000 || height>1000 || width==0 || (source.tagName!='IMG'&&height==0)){
				src=t_lazyload_getWebPUrl(src);
			}else{
				//if(src.charAt(63)<5){
					src=t_lazyload_getResizeUrl(source.tagName,comm,src,width,height,x,y,bgsize);
				//}
            }
		}

        //var srcSet = source.getAttribute('data-' + srcsetDataAttribute);
        if (target.tagName === "IMG") {
            //if (srcSet) target.setAttribute("srcset", srcSet);
            if (src) target.setAttribute("src", src);
            return;
        }
        if (target.tagName === "IFRAME") {
            if (src) target.setAttribute("src", src);
            return;
        }
        target.style.backgroundImage = "url(" + src + ")";
    }

    function _bind(fn, obj) {
        return function() {
            return fn.apply(obj, arguments);
        };
    }


    /*
     * INITIALIZER
     * -----------
     */

    function LazyLoad(instanceSettings) {
        _init();

        this._settings = _merge_objects(_defaultSettings, instanceSettings);
        this._queryOriginNode = this._settings.container === window ? document : this._settings.container;

        this._previousLoopTime = 0;
        this._loopTimeout = null;

        this._handleScrollFn = _bind(this.handleScroll, this);

        _addEventListener(window, "resize", this._handleScrollFn);

        this.update();

        this.loadAnimatedImages();
    }


    /*
     * PRIVATE FUNCTIONS *RELATED* TO A SPECIFIC INSTANCE OF LAZY LOAD
     * ---------------------------------------------------------------
     */

    // We use _showOnLoad for covers
    // Show img when fake img element was loaded
    LazyLoad.prototype._showOnLoad = function(element) {
        var fakeImg, startTime,
            settings = this._settings;

        /* If no src attribute given use data:uri. */
        if (!element.getAttribute("src")) {
            element.setAttribute("src", settings.placeholder);
        }
        /* Creating a new `img` in a DOM fragment. */
        fakeImg = document.createElement('img');
        /* Listening to the load event */
        function loadCallback() {
            /* As this method is asynchronous, it must be protected against external destroy() calls */
            if (settings === null) {
                return;
            }

            /* Calling LOAD callback */
            if (settings.callback_load) {
                settings.callback_load(element);
            }
            _setSources(element, element, settings.data_srcset, settings.data_src);
            /* Calling SET callback */
            if (settings.callback_set) {
                settings.callback_set(element);
            }
            _removeClass(element, settings.class_loading);
            _addClass(element, settings.class_loaded);
            _removeEventListener(fakeImg, "load", loadCallback);
        }

        _addEventListener(fakeImg, "load", loadCallback);
        _addEventListener(fakeImg, "error", function (ev) {
            _removeClass(element, settings.class_loading);
            if (settings.callback_error) {
                settings.callback_error(element);
            }
            window.lazy_err='y';
            console.log('lazy loading err');
            if (ev.path !== undefined) {
                t_lazyload_reloadonError(element, ev.path[0].currentSrc, startTime);
            } else  if (ev.target !== undefined) {
                t_lazyload_reloadonError(element, ev.target.currentSrc, startTime);
            }
        });
        _addClass(element, settings.class_loading);
        startTime = Date.now();
        _setSources(fakeImg, element, settings.data_srcset, settings.data_src);
    };

    // We use _showOnAppear for all cases exept covers
    LazyLoad.prototype._showOnAppear = function(element) {
        var settings = this._settings;

        function loadCallback() {
            /* As this method is asynchronous, it must be protected against external destroy() calls */
            if (settings === null) {
                return;
            }

            /* Calling LOAD callback */
            if (settings.callback_load) {
                settings.callback_load(element);
            }
            _removeClass(element, settings.class_loading);
            _addClass(element, settings.class_loaded);
            _removeEventListener(element, "load", loadCallback);
        }

        if (element.tagName === "IMG" || element.tagName === "IFRAME") {
            _addEventListener(element, "load", loadCallback);
            _addEventListener(element, "error", function (ev) {
                _removeEventListener(element, "load", loadCallback);
                _removeClass(element, settings.class_loading);
                if (settings.callback_error) {
                    settings.callback_error(element);
                }
                window.lazy_err='y';
                console.log('lazy loading err');
                if (ev.path !== undefined) {
                    t_lazyload_reloadonError(element, ev.path[0].currentSrc, startTime);
                } else  if (ev.target !== undefined) {
                    t_lazyload_reloadonError(element, ev.target.currentSrc, startTime);
                }
            });
            _addClass(element, settings.class_loading);
        }
        startTime = Date.now();
        _setSources(element, element, settings.data_srcset, settings.data_src);
        /* Calling SET callback */
        if (settings.callback_set) {
            settings.callback_set(element);
        }
    };

    // Check should we load img and show
    LazyLoad.prototype._loopThroughElements = function() {
        var i, element,
            settings = this._settings,
            elements = this._elements,
            elementsLength = (!elements) ? 0 : elements.length,
            processedIndexes = [];

        for (i = 0; i < elementsLength; i++) {
            element = elements[i];
            /* If must skip_invisible and element is invisible, skip it */
            if (settings.skip_invisible && element.isSkipByPosition) {
                continue;
            }


            if (_isInsideViewport(element, settings.container, settings.threshold)) {
                /* Forking behaviour depending on show_while_loading (true value is ideal for progressive jpeg). */
                if (settings.show_while_loading) {
                    this._showOnAppear(element);
                } else {
                    this._showOnLoad(element);
                }
                /* Marking the element as processed. */
                processedIndexes.push(i);
                element.wasProcessed = true;
            }
        }
        /* Removing processed elements from this._elements. */
        while (processedIndexes.length > 0) {
            elements.splice(processedIndexes.pop(), 1);
            /* Calling the end loop callback */
            if (settings.callback_processed) {
                settings.callback_processed(elements.length);
            }
        }
        /* Stop listening to scroll event when 0 elements remains */
        if (elementsLength === 0) {
            this._stopScrollHandler();
        }
    };

    // Clean already processed imgs
    LazyLoad.prototype._purgeElements = function() {
        var i, element,
            elements = this._elements,
            elementsLength = elements.length,
            elementsToPurge = [];

        for (i = 0; i < elementsLength; i++) {
            element = elements[i];
            /* If the element has already been processed, skip it */
            if (element.wasProcessed) {
                elementsToPurge.push(i);
            }
        }
        /* Removing elements to purge from this._elements. */
        while (elementsToPurge.length > 0) {
            elements.splice(elementsToPurge.pop(), 1);
        }
    };

    LazyLoad.prototype._startScrollHandler = function() {
        if (!this._isHandlingScroll) {
            this._isHandlingScroll = true;
            _addEventListener(this._settings.container, "scroll", this._handleScrollFn);
        }
    };

    LazyLoad.prototype._stopScrollHandler = function() {
        if (this._isHandlingScroll) {
            this._isHandlingScroll = false;
            _removeEventListener(this._settings.container, "scroll", this._handleScrollFn);
        }
    };


    /*
     * PUBLIC FUNCTIONS
     * ----------------
     */
    // Force load for imgs with sbs bacause this imgs change their coords
    LazyLoad.prototype.loadAnimatedImages = function () {
        var i, element,
            settings = this._settings,
            elements = this._elements,
            elementsLength = (!elements) ? 0 : elements.length,
            processedIndexes = [];

        function getTriggerElementOffset($el, type) {
            var trgEl;
            if (type === 'trigger') {
                var tgrId = $el.attr('data-animate-sbs-trgels');
                trgEl = $('[data-elem-id="'+tgrId+'"]');
            } else if (type === 'viewport') {
                trgEl = $el.parents('.t396');
            }

            return trgEl ? trgEl.offset() : null;
        }

        function isFarAway($el, type) {
            var trgOffset = getTriggerElementOffset($el, type);
            if (!trgOffset) return false;

            var distanceTopBottomBetween = Math.abs(trgOffset.top - $el.offset().top);
            var distanceRightLeftBetween = Math.abs(trgOffset.left - $el.offset().left);

            return distanceTopBottomBetween > settings.threshold || distanceRightLeftBetween > settings.threshold;
        }

        for (i = 0; i < elementsLength; i++) {
            element = elements[i];
            var $elContainer = $(element).parents('.tn-elem');
            var isAnimated = $elContainer.attr('data-animate-sbs-opts');
            var animEvent = $elContainer.attr('data-animate-sbs-event');
            var animType;

            if (animEvent === 'intoview' || animEvent === 'blockintoview') animType = 'viewport';
            if ($elContainer.attr('data-animate-sbs-trgels')) animType = 'trigger';

            /* If must skip_invisible and element is invisible, skip it or not animated */
            if (settings.skip_invisible && (element.offsetParent === null) || !isAnimated) {
                continue;
            }

            if (isFarAway($elContainer, animType)) {
                /* Forking behaviour depending on show_while_loading (true value is ideal for progressive jpeg). */
                if (settings.show_while_loading) {
                    this._showOnAppear(element);
                } else {
                    this._showOnLoad(element);
                }
                /* Marking the element as processed. */
                processedIndexes.push(i);
                element.wasProcessed = true;
            }
        }
        /* Removing processed elements from this._elements. */
        while (processedIndexes.length > 0) {
            elements.splice(processedIndexes.pop(), 1);
            /* Calling the end loop callback */
            if (settings.callback_processed) {
                settings.callback_processed(elements.length);
            }
        }
    }

    LazyLoad.prototype.handleScroll = function() {
        var remainingTime,
            now,
            throttle;

        // IE8 fix for destroy() malfunctioning
        if (!this._settings) {
            return;
        }

        now = _now();
        throttle = this._settings.throttle;

        if (throttle !== 0) {
            remainingTime = throttle - (now - this._previousLoopTime);
            if (remainingTime <= 0 || remainingTime > throttle) {
                if (this._loopTimeout) {
                    clearTimeout(this._loopTimeout);
                    this._loopTimeout = null;
                }
                this._previousLoopTime = now;
                this._loopThroughElements();
            } else if (!this._loopTimeout) {
                this._loopTimeout = setTimeout(_bind(function() {
                    this._previousLoopTime = _now();
                    this._loopTimeout = null;
                    this._loopThroughElements();
                }, this), remainingTime);
            }
        } else {
            this._loopThroughElements();
        }
    };

    LazyLoad.prototype.update = function() {
        this._elements = _convertToArray(this._queryOriginNode.querySelectorAll(this._settings.elements_selector));
        this._purgeElements();
        this._loopThroughElements();
        this._startScrollHandler();
    };

    LazyLoad.prototype.destroy = function() {
        _removeEventListener(window, "resize", this._handleScrollFn);
        if (this._loopTimeout) {
            clearTimeout(this._loopTimeout);
            this._loopTimeout = null;
        }
        this._stopScrollHandler();
        this._elements = null;
        this._queryOriginNode = null;
        this._settings = null;
    };


    return LazyLoad;


}));



window.lazy='y';
$(document).ready(function(){
    // Check WebP Support
	t_lazyload_detectwebp();

    // Check optimization for window size
	if($('#allrecords').length && $('#allrecords').attr('data-tilda-imgoptimoff')=='yes'){window.lazy_imgoptimoff='yes';}else{window.lazy_imgoptimoff='';}

	$('.t156').find('.t-img').attr('data-lazy-rule','skip');
	$('.t492,.t552,.t251,.t603,.t660,.t661,.t662,.t680,.t827,.t909,.t218,.t740,.t132,.t694,.t762,.t786,.t546').find('.t-bgimg').attr('data-lazy-rule','comm:resize,round:100');

    // init lazyload for covers
	setTimeout(function(){
		lazyload_cover = new LazyLoad({
			elements_selector: ".t-cover__carrier",
			show_while_loading:false,
			data_src: "content-cover-bg",
			placeholder:'',
			threshold: 700
		});
    }, 100);
	setTimeout(function(){
		lazyload_img = new LazyLoad({
			elements_selector: ".t-img",
			threshold: 800,
        });
		lazyload_bgimg = new LazyLoad({
			elements_selector: ".t-bgimg",
			show_while_loading:false,
			placeholder:'',
			threshold: 800,
        });
		lazyload_iframe = new LazyLoad({
			elements_selector: ".t-iframe"
        });

		$(document).bind('slide.bs.carousel', function () {
            setTimeout(function() {
                lazyload_cover.update();
                lazyload_img.update();
                lazyload_bgimg.update();
            }, 500);
        });

		if (window.isMobile){
			$('body').append("<div class='t-mbfix'></div>");
			setTimeout(function(){
				$('.t-mbfix').addClass('t-mbfix_hide');
			}, 50);
			setTimeout(function(){
				$('.t-mbfix').remove();
			}, 1000);
		}

	}, 500);

	if(window.lazy_imgoptimoff!='yes'){
		$(window).bind('resize', t_throttle(function() {
			clearTimeout(window.t_lazyload_resize_timerid);
			window.t_lazyload_resize_timerid=setTimeout(t_lazyload_onWindowResize, 1000);
		}, 500));
	}

	setTimeout(function() {
        if (window.performance !== undefined) {
            window.t_lazyload_domloaded = window.performance.timing.domContentLoadedEventEnd*1 - window.performance.timing.navigationStart*1;
        }
	}, 0);
});

function t_lazyload_update(){
    if(typeof lazyload_cover!=="undefined"){lazyload_cover.update();}
    if(typeof lazyload_img!=="undefined"){lazyload_img.update();}
    if(typeof lazyload_bgimg!=="undefined"){lazyload_bgimg.update();}
    if(typeof lazyload_iframe!=="undefined"){lazyload_iframe.update();}
}

function t_lazyload_getResizeUrl(tagName,comm,str,width,height,x,y,bgsize){
	// console.log('str: ' + str);
	// console.log('tagName: ' + tagName);
	// console.log('comm: ' + comm);
	// console.log('width: ' + width);
	// console.log('height: ' + height);
	// console.log('x: ' + x);
	// console.log('y: ' + y);
    // console.log('bgsize: ' + bgsize);

    console.log(2);
	if(str=='undefined' || str==null)return str;
	if(str.indexOf('.svg')>0 || str.indexOf('.gif')>0 || str.indexOf('.ico')>0 || str.indexOf('static.tildacdn.com') === -1 || str.indexOf('-/empty/') > 0 || str.indexOf('-/resizeb/') > 0 ) {
        return str;
    }
	if(str.indexOf('/-/')>-1)return str;
	if(width==0 && height==0)return str;
	if(window.lazy_err=='y')return str;
	if(str.indexOf('lib')>-1)return str;
	if(tagName=='IMG' || tagName=='DIV' || tagName=='TD' || tagName=='A'){}else{return str;}

	if(window.devicePixelRatio>1 && window.t_lazyload_domloaded<2500){
		if(width>0)width=parseInt(width*2);
		if(height>0)height=parseInt(height*2);
	}

	if(width>1000 || height>1800){
		var newstr=t_lazyload_getWebPUrl(str);
		return newstr;
	}

	if(comm=='resize'){
        console.log('Resize y');
		var arrr = str.split('/');
		arrr.splice(str.split('/').length - 1, 0, '-/resize/' + width + 'x' + (tagName=='DIV'&&height>0?height:'') + '/' + (window.lazy_webp=='y'?'-/format/webp':''));
		var newstr = arrr.join('/').replace('/static.tildacdn.com','/thumb.tildacdn.com');
	}else{
        console.log('Resize n');
		if(width>0 && height>0){}else{return str;}
		if(x=='left' || x=='right'){}else{x='center';}
		if(y=='top' || y=='bottom'){}else{y='center';}

		var arrr = str.split('/');
		arrr.splice(str.split('/').length - 1, 0, '-/'+comm+'/' + width + 'x' + height + '/'+x+'/'+y+'/' + (window.lazy_webp=='y'?'-/format/webp':''));
		var newstr = arrr.join('/').replace('/static.tildacdn.com','/thumb.tildacdn.com');
	}
	return newstr;
}

function t_lazyload_round(comm,width,height,round){
	if(comm=="cover" && width>0 && height>0){
		var rr=width/height;
		var ratio=1;

		//h > w
		if(rr<=1){
			if(rr<=0.800)ratio=0.800;
			if(rr<=0.751)ratio=0.750;
			if(rr<=0.667)ratio=0.667;
			if(rr<=0.563)ratio=0.562;
			if(rr<=0.501)ratio=0.500;
			height=Math.ceil(height/round)*round;
			width=Math.ceil(height*ratio);
			width=Math.ceil(width/10)*10;
		}else{
			if(rr>=1.250)ratio=1.250;
			if(rr>=1.332)ratio=1.333;
			if(rr>=1.500)ratio=1.500;
			if(rr>=1.777)ratio=1.777;
			if(rr>=2.000)ratio=2.000;
			width=Math.ceil(width/round)*round;
			height=Math.ceil(width/ratio);
			height=Math.ceil(height/10)*10;
		}
	}else{
		if(width>0){
			width=Math.ceil(width/round)*round;
		}
		if(height>0){
			height=Math.ceil(height/round)*round;
		}
	}

	//console.log('ratio:'+ratio);
	//console.log('round:'+round);
	//console.log('img width:'+width);
	//console.log('img height:'+height);

	return [width,height];
}

function t_lazyload_reloadonError(element, str, startTime){
	if(typeof str=='undefined' || str==null || str=='' || str.indexOf('https://thumb.tildacdn.com') === -1 || str.indexOf('/-/')===-1)return;
	
	//calc request time from try to load img to error time
	var qTime=(startTime>1 ? Date.now()-startTime : '');

	var arrr = str.split('/');
	var uid='';
	var name='';
	if(arrr.length>3){
		for(var i=0;i<arrr.length;i++){
			if(arrr[i]!=''){
				if(arrr[i].substring(0,3)=='til' && arrr[i].length==36 && (arrr[i].match(/-/g) || []).length == 4){
					uid=arrr[i];
				}
				if(i==(arrr.length-1)){
					name=arrr[i];
				}
			}
		}
	}

	if(uid!='' && name!=''){
		var src='https://static3.tildacdn.com/'+uid+'/'+name;
		console.log('try reload:'+src);
        if (element.tagName === "IMG") {
            if(src)element.setAttribute("src", src);
        }else{
            if(src)element.style.backgroundImage = "url(" + src + ")";
        }
	}

	//send stat
	try {
	    $.ajax({
			method: "POST",
			url: "https://sysstat.tildacdn.com/api/img/error/",
			data: {url:str, time:qTime, details:'{domloaded:"'+window.t_lazyload_domloaded+'"}'}
		});
	
		//try get HEAD and send more stat
		var ts=Date.now();
	    $.ajax({
			method: "HEAD",
			url: str,
	        error: function(jqXHR, textStatus, errorThrown){
	            var ts_delta=Date.now()-ts;
	            
				//send stat
				var details='{ts:'+ts_delta+',status:"'+jqXHR.status+'",textstatus:"'+textStatus+'",responsetext:"'+jqXHR.responseText+'",domloaded:"'+window.t_lazyload_domloaded+'",readystate:"'+jqXHR.readyState+'"}';
				//console.log(details);
			    $.ajax({
					method: "POST",
					url: "https://sysstat.tildacdn.com/api/img/detailederror/",
					data: {url:str, time:qTime, details:details}
				});            
	        },
	        timeout: 1000*10
		});
	}catch (e) {
		console.log(e);
	}

	return;
}

function t_lazyload_getWebPUrl(str){
	if(str=='undefined' || str==null)return str;
    console.log(3);
	if(str.indexOf('.svg')>0 || str.indexOf('.gif')>0 || str.indexOf('.ico')>0 || str.indexOf('static.tildacdn.com') === -1 || str.indexOf('-/empty/') > 0 || str.indexOf('-/resizeb/') > 0 ){
        return str;
    }
	if(str.indexOf('/-/')>-1)return str;
	if(str.indexOf('lib')>-1)return str;
	if(!(window.lazy_webp=='y')){return str;}
	if(window.lazy_err=='y')return str;

	var arrr = str.split('/');
	arrr.splice(str.split('/').length - 1, 0, '-/format/webp');
	var newstr = arrr.join('/').replace('/static.tildacdn.com','/thumb.tildacdn.com');

	return newstr;
}

function t_lazyload_onWindowResize() {
	//console.log('lz onwinres');
    $('.t-cover__carrier, .t-bgimg, .t-img').each(function() {
        console.log($(this));
		window.t_lazyload_updateResize_elem($(this));
    });
}

window.t_lazyload_updateResize_elem = function(el){
	//console.log('update resize elem');
	if(el.length==0){
		return;
	}

	var el_this=el.get(0);
	var tagName=el_this.tagName;

	if(tagName=='IMG'){
		var str=el.attr('src');
		var prefix='-/resize/';
	}else{
		var str=el.css('background-image').replace('url(','').replace(')','').replace(/\"/gi, "");
		var bs=el.css('background-size');
		if(bs=='contain'){
			var prefix='-/contain/';
		}else{
			var prefix='-/cover/';
		}
	}

    console.log(1);
    src=t_lazyload_getResizeUrl(source.tagName,comm,src,width,height,x,y,bgsize);
    
	if(typeof str=='undefined' || str.indexOf(prefix)===-1 || str.indexOf('.svg')>0 || str.indexOf('.gif')>0 || str.indexOf('.ico')>0 || str.indexOf('thumb.tildacdn.com') === -1 || str.indexOf('-/empty/') > 0 && str.indexOf('-/resizeb/') > 0){
		return;
	}

	var pos=str.indexOf(prefix) + prefix.length;
	var pos2=str.indexOf('/',pos);
	if(pos>0 && pos2>0){
		var foo=str.slice(pos, pos2);
		var arr=foo.split('x');
        var width = el_this.clientWidth;
        var height = el_this.clientHeight;
        if(width>0 && height>0){
        		if(arr[0]>0 || arr[1]>0){
				if((arr[0]>0 && width>arr[0]) || (arr[1]>0 && height>arr[1])){
					if((arr[0]>0 && (width-arr[0])>100) || (arr[1]>0 && (height-arr[1])>100)){
						var newstr=str.slice(0,pos)+(arr[0]>0?width:'')+'x'+(arr[1]>0?height:'')+''+str.substring(pos2);
						if(tagName=='IMG'){
							el.attr('src', newstr);
						}else{
							el.css('background-image', 'url(' + newstr + ')');
						}

					}
				}
			}
		}
	}

}

function t_lazyload_detectwebp(){
	var WebP=new Image();
		WebP.onload=WebP.onerror=function(){
		if(WebP.height!=2){
			console.log('no webp support');
		}else{
			window.lazy_webp='y';
		}
	};
	WebP.src='data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}

/*
function t_lazyload_sendstat(width,height){
	if(typeof window.t_lazy_sizes=='undefined')window.t_lazy_sizes='';
	window.t_lazy_sizes+=width+'x'+height+'z';

    if(typeof window.t_lazy_statimeout!='undefined')clearTimeout(window.t_lazy_statimeout);
    window.t_lazy_statimeout = setTimeout(function () {
	    if(window.t_lazy_sizes!=''){
		    $.ajax({
				method: "GET",
				url: "https://stat.tildacdn.com/imgstat/",
				data: { d:(window.isMobile?'m':'d'), s: window.t_lazy_sizes }
			});
	        window.t_lazy_sizes='';
	    }
    }, 2000);
}
*/

//track js errors
!function(x,n){x.uuid4=function(){var t=x.crypto||x.msCrypto;if(void 0!==t&&t.getRandomValues){var e=new Uint16Array(8);t.getRandomValues(e),e[3]=4095&e[3]|16384,e[4]=16383&e[4]|32768;t=function(t){for(var e=t.toString(16);e.length<4;)e="0"+e;return e};return t(e[0])+t(e[1])+t(e[2])+t(e[3])+t(e[4])+t(e[5])+t(e[6])+t(e[7])}return"xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=16*n.random()|0;return("x"===t?e:3&e|8).toString(16)})},x.capture_js_errors=function(t,e,n,r,a){var o=new XMLHttpRequest;o.open("POST","https://sysstat.tildacdn.com/api/js/error/",!0),o.setRequestHeader("Content-Type","application/json"),o.send(JSON.stringify({account_id:"ws",event_id:x.uuid4(),request:{url:x.location.href},exception:{values:[{type:a.name,value:t,stacktrace:{frames:[{filename:e,colno:r,lineno:n}]}}]},stacktrace:void 0!==a.stack?a.stack:""}))},x.onerror=function(t,e,n,r,a){x.capture_js_errors(t,e,n,r,a)}}(window,Math);