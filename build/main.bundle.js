/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/App.js":
/*!***************************!*\
  !*** ./js/modules/App.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _carousel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./carousel */ "./js/modules/carousel.js");


class App {
  constructor() {
    //track state of application like current width ...
    this.state = {
      is_mobile: false,
      screen: {
        width: 0,
        height: 0
      },
      carousel: null
    };
    this.UI = {
      //SELECTORS
      //navbar
      mobile_nav: document.getElementById("menu-mobile") ?? null,
      open_nav_btn: document.querySelector('#nav-bg-small-menu span') ?? null,
      close_nav_btn: document.querySelector('#menu-mobile a.closebtn') ?? null,
      //carousel
      carousel_container: document.querySelector('.carousel-container') ?? null,
      //virtual visit 
      l_map_container: document.querySelector('.labouiche-map-container') ?? null,
      //labouiche_custom_post_type_element
      l_cpt_visit: document.querySelector('.cpt_visit') ?? null,
      points: document.querySelectorAll('img.point') ?? null,
      items_to_show: document.querySelectorAll('.visit_cpt_item_container') ?? null
    };
    this.open_navbar = this.open_navbar.bind(this);
    this.close_navbar = this.close_navbar.bind(this);
  }

  init() {
    this.update();
    const {
      open_nav_btn,
      close_nav_btn,
      l_map_container,
      l_cpt_visit,
      points,
      items_to_show,
      carousel_container
    } = this.UI;
    const {
      is_mobile
    } = this.state;

    if (open_nav_btn !== null) {
      open_nav_btn.addEventListener('click', this.open_navbar);
    }

    if (close_nav_btn !== null) {
      close_nav_btn.addEventListener('click', this.close_navbar);
    } //VIRTUAL VISIT


    if (l_map_container !== null && l_cpt_visit.childElementCount > 0) {
      this.virtual_visit_show_location(points, items_to_show);
    }

    if (carousel_container !== null) {
      if (!is_mobile) {
        this.setCarousel(carousel_container);
      }
    }
  }
  /**
   * Update app current state
   * 
   * @returns Object
   */


  update() {
    let {
      is_mobile,
      screen
    } = this.state;
    screen.width = window.innerWidth;
    screen.height = window.innerHeight;
    is_mobile = screen.width < 1024 ? true : false;
    return Object.assign(this.state, {
      screen,
      is_mobile
    });
  }

  close_navbar() {
    const {
      mobile_nav
    } = this.UI;
    mobile_nav.style.width = "0";
  }

  open_navbar() {
    const {
      mobile_nav
    } = this.UI;
    mobile_nav.style.width = "250px";
  }

  virtual_visit_show_location(points = NodeList, itemsToShow = NodeList) {
    points.forEach(point => {
      point.addEventListener('click', e => {
        const id = e.target.dataset.id;
        Array.from(itemsToShow).find(el => {
          if (el.dataset.id == id) {
            el.style.opacity = 1;
          } else {
            el.style.opacity = 0;
          }
        });
      });
    });
  }

  setCarousel(element) {
    if (this.state.carousel === null) {
      this.state.carousel = new _carousel__WEBPACK_IMPORTED_MODULE_0__["default"](element);
    }
  }

  destroyCarousel() {
    if (this.state.carousel !== null) {
      this.state.carousel.destroy();
      this.state.carousel = null;
    }
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

/***/ }),

/***/ "./js/modules/carousel.js":
/*!********************************!*\
  !*** ./js/modules/carousel.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Carousel)
/* harmony export */ });
/* harmony import */ var _createHTML__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createHTML */ "./js/modules/createHTML.js");

class Carousel {
  /**
   * 
   * @param {HTMLElement} container 
   * @param {Object} options
   * @param {Object} options.slidesToScroll number of elements to scroll
   * @param {Object} options.slidesToShow number of elements to show into a slide
   * @param {Boolean} options.loop loop on carousel
   * @param {Boolean} options.navigation set nvigation
   * @param {Boolean} options.pagination set pagination
   * @param {Boolean} options.infinite set infinite slide
   */
  constructor(container, options = {}) {
    this.container = container;
    console.log(this.container); //assing defaul value to options object

    this.options = Object.assign({}, {
      slidesToScroll: 1,
      slidesToShow: 1,
      navigation: true,
      loop: false,
      pagination: false,
      infinite: false
    }, options);
    if (this.options.loop && this.options.infinite) throw new Error("Cannot set to true loop and infinite at the same time"); //keep track of container children at the time 

    this.childrens = [].slice.call(this.container.children);
    this.current = 0;
    this.index = 0;
    this.isMobile = false;
    this.offset = 0; //keep context

    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.arrowControl = this.arrowControl.bind(this); //create a root container for the slider

    this.root = (0,_createHTML__WEBPACK_IMPORTED_MODULE_0__.createHTML)({
      el: "div",
      attributes: {
        className: ["carousel"]
      },
      listener: ["keyup"]
    }, this.arrowControl); //create the slider for slideItems 

    this.slider = (0,_createHTML__WEBPACK_IMPORTED_MODULE_0__.createHTML)({
      el: "div",
      attributes: {
        className: ["carousel-slider"]
      }
    }, false);
    this.root.appendChild(this.slider);
    this.root.setAttribute('tabindex', '0');
    this.container.appendChild(this.root);
    this.eventCallback = []; //replace slide item into the slider container

    this.originalNodes = [];
    this.items = this.childrens.map(item => {
      //keep a copy of original node;
      this.originalNodes.push(item);
      let carouselItemContainer = (0,_createHTML__WEBPACK_IMPORTED_MODULE_0__.createHTML)({
        el: "div",
        attributes: {
          className: ["carousel-item-container"]
        }
      }, false);
      carouselItemContainer.appendChild(item);
      return carouselItemContainer;
    });

    if (this.options.infinite === true) {
      this.offset = this.options.slidesToShow + this.options.slidesToScroll;
      if (this.offset > this.childrens.length) throw new Error("il n\ya pas assez de slide dans le carousel");
      this.items = [...this.items.slice(this.items.length - this.offset).map(item => item.cloneNode(true)), ...this.items, ...this.items.slice(0, this.offset).map(item => item.cloneNode(true))];
      this.goTo(this.offset);
    }

    this.items.forEach(item => {
      this.slider.appendChild(item);
    });
    this.setSlideRatio();

    if (this.options.navigation) {
      this.createControls();
    }

    if (this.options.pagination) {
      this.createPagination();
    } //events


    this.eventCallback.forEach(cb => cb(this.current));
    this.onResize();
    window.addEventListener('resize', this.onResize.bind(this));
  }
  /**
   * gives right dimensions of the carousel elements 
   */


  setSlideRatio() {
    let ratio = this.items.length / this.slidesToShow;
    this.slider.style.width = ratio * 100 + "%";
    this.items.forEach(el => {
      el.style.width = 100 / this.slidesToShow / ratio + "%";
    });
  }

  createControls() {
    let nextBtn = (0,_createHTML__WEBPACK_IMPORTED_MODULE_0__.createHTML)({
      el: "div",
      attributes: {
        className: ["carousel-next"]
      },
      innerHTML: (0,_createHTML__WEBPACK_IMPORTED_MODULE_0__.createHTML)({
        el: "i",
        attributes: {
          className: ["fa", "fa-chevron-right"]
        }
      }, false),
      listener: ["click"]
    }, this.next);
    let prevBtn = (0,_createHTML__WEBPACK_IMPORTED_MODULE_0__.createHTML)({
      el: "div",
      attributes: {
        className: ["carousel-prev"]
      },
      innerHTML: (0,_createHTML__WEBPACK_IMPORTED_MODULE_0__.createHTML)({
        el: "i",
        attributes: {
          className: ["fa", "fa-chevron-left"]
        }
      }, false),
      listener: ["click"]
    }, this.previous);
    this.root.appendChild(nextBtn);
    this.root.appendChild(prevBtn);
    this.onAddEvent(index => {
      if (this.options.loop) return;

      if (index === 0) {
        prevBtn.classList.add("item-hidden");
      } else {
        prevBtn.classList.remove("item-hidden");
      }

      if (this.items[this.current + this.slidesToShow] === undefined) {
        nextBtn.classList.add("item-hidden");
      } else {
        nextBtn.classList.remove("item-hidden");
      }
    });
  }

  createPagination() {
    let pagination = (0,_createHTML__WEBPACK_IMPORTED_MODULE_0__.createHTML)({
      el: "div",
      attributes: {
        className: ["carousel-pagination"]
      }
    }, false);
    let buttons = [];
    this.root.appendChild(pagination);

    for (let i = 0; i < this.items.length - 2 * this.offset; i = i + this.options.slidesToScroll) {
      let btn = (0,_createHTML__WEBPACK_IMPORTED_MODULE_0__.createHTML)({
        el: "div",
        attributes: {
          className: ["carousel-pagination-btn"]
        }
      });
      btn.addEventListener('click', e => {
        this.goTo(i + this.offset);
      });
      pagination.appendChild(btn);
      buttons.push(btn);
    }

    this.onAddEvent(index => {
      let count = this.items.length - 2 * this.offset;
      let btnActive = buttons[Math.floor((index - this.offset) % count / this.options.slidesToScroll)];

      if (btnActive) {
        buttons.forEach(btn => {
          btn.classList.remove('c-p-btn-active');
        });
        btnActive.classList.add('c-p-btn-active');
      }
    });
  }

  next(e) {
    this.goTo(this.current + this.slidesToScroll);
  }

  previous(e) {
    this.goTo(this.current - this.slidesToScroll);
  }

  goTo(index, animation = true) {
    if (index < 0) {
      if (this.options.loop) {
        index = this.items.length - this.slidesToShow;
      } else {
        return;
      }
    } else if (index >= this.items.length || this.items[this.current + this.slidesToShow] === undefined && index > this.current) {
      if (this.options.loop) {
        index = 0;
      } else {
        return;
      }
    }

    if (animation === false) {
      this.slider.style.transition = "none";
    }

    let translateX = index * -100 / this.items.length;
    this.slider.style.transform = `translate3d(${translateX}%,0,0)`;
    this.slider.offsetHeight; // this is hack to force navigator cancelling animation (just get any property)

    if (animation === false) {
      this.slider.style.transition = "";
    }

    this.current = index;
    this.eventCallback.forEach(cb => cb(index));

    if (this.options.infinite) {
      this.slider.addEventListener("transitionend", this.moveContainer.bind(this));
    }
  }
  /**
   * move the slides container to give impressio of infinite slide
   */


  moveContainer() {
    if (this.current <= this.options.slidesToScroll) {
      /**
       * 1234567
       * 34567|1234567|12345
       */
      this.goTo(this.current + this.items.length - 2 * this.offset, false);
    } else if (this.current >= this.items.length - this.offset) {
      this.goTo(this.current - (this.items.length - 2 * this.offset), false);
    }
  }

  destroy() {
    const nodes = this.originalNodes;
    this.container.innerHTML = '';
    nodes.forEach(node => {
      this.container.appendChild(node);
    });
  }

  onAddEvent(cb) {
    this.eventCallback.push(cb);
  }

  arrowControl(e) {
    if (e.key === "ArrowRight" || e.key === "Right") this.next();
    if (e.key === "ArrowLeft" || e.key === "Left") this.previous();
  }

  onResize() {
    let mobile = window.innerWidth < 900;

    if (mobile !== this.isMobile) {
      this.isMobile = mobile;
      this.setSlideRatio();
      this.eventCallback.forEach(cb => cb(0));
    }
  }
  /**
   * @returns {number}
   */


  get slidesToScroll() {
    return this.isMobile ? 1 : this.options.slidesToScroll;
  }
  /**
   * @returns {number}
   */


  get slidesToShow() {
    return this.isMobile ? 1 : this.options.slidesToShow;
  }

}

/***/ }),

/***/ "./js/modules/createHTML.js":
/*!**********************************!*\
  !*** ./js/modules/createHTML.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createHTML": () => (/* binding */ createHTML)
/* harmony export */ });
/**
 * 
 * @param {Object} params 
 * @param {Object} params.el element to create
 * @param {Object} params.attributes classname or id
 * @param {Object} params.innerHTML innerHTML of the element
 * @param {Mixed} params.listener add a listener or not
 * @param {Callback} cb a callback function
 */
function createHTML(params = {}, cb) {
  let _params = Object.assign({}, {
    el: "div",
    parent: null,
    attributes: {},
    innerHTML: null,
    listener: false
  }, params);

  const DOMListener = ["CssRuleViewChanged", "CssRuleViewCssLinkClicked", "CssRuleViewRefreshed", "cached", "error", "abort", "load", "beforeunload", "unload", "online", "offline", "focus", "blur", "open", "message", "error", "close", "pagehide", "pageshow", "popstate", "animationstart", "animationend", "animationiteration", "transitionstart", "transitioncancel", "transitionend", "transitionrun", "reset", "submit", "beforeprint", "afterprint", "compositionstart", "compositionupdate", "compositionend", "fullscreenchange", "fullscreenerror", "resize", "scroll", "cut", "copy", "paste", "keydown", "keypress", "keyup", "auxclick", "click", "contextmenu", "dblclick", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseover", "mouseout", "mouseup", "pointerlockchange", "pointerlockerror", "select", "wheel", "drag", "dragend", "dragenter", "dragstart", "dragleave", "dragover", "drop", "audioprocess", "canplay", "canplaythrough", "complete", "durationchange", "emptied", "ended", "loadeddata", "loadedmetadata", "pause", "play", "playing", "ratechange", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting", "change", "storage"];

  function checkListener(array = [], value) {
    let front = 0;
    let back = array.length - 1;

    while (back > front) {
      while (array[front] != value) {
        front++;
        continue;
      }

      while (array[back] != value) {
        back--;
        continue;
      }

      if (array[front] != value || array[back] != value) return false;
      front++;
      back--;
    }

    return true;
  }

  let element = document.createElement(_params.el);

  if (_params.attributes) {
    let keys = Object.keys(_params.attributes);

    let _key;

    keys.forEach(key => {
      if (key === "className") {
        _key = key.replace("Name", "");
        _params.attributes[key] = _params.attributes[key].join(" ");
      } else {
        _key = key;
      }

      element.setAttribute(_key, _params.attributes[key]);
    });
  }

  if (_params.innerHTML) {
    if (typeof _params.innerHTML == "object") {
      element.appendChild(_params.innerHTML);
    } else {
      element.innerHTML = _params.innerHTML;
    }
  }

  if (_params.listener && _params.listener.length > 0) {
    _params.listener.forEach(item => {
      if (checkListener(DOMListener, item)) {
        element.addEventListener(item, e => {
          cb(e);
        });
      }
    });
  } //append element
  //console.log(_params.parent);


  if (_params.parent != null || _params.parent != undefined) {
    if (_params.parent === "") {
      return;
    }

    if (document.querySelector(_params.parent)) {
      return document.querySelector(_params.parent).appendChild(element);
    }

    throw new Error("Cannot appendChild !!! It seems the parent element does not exist.. Maby check up your parent property... or your html code ");
  }

  return element;
}

/***/ }),

/***/ "./sass/index.scss":
/*!*************************!*\
  !*** ./sass/index.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sass_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sass/index.scss */ "./sass/index.scss");
/* harmony import */ var _modules_App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/App */ "./js/modules/App.js");
/* harmony import */ var _modules_carousel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/carousel */ "./js/modules/carousel.js");



const app = new _modules_App__WEBPACK_IMPORTED_MODULE_1__["default"]();
app.init();
window.addEventListener('resize', () => {
  let state = app.update(); //history carousel

  if (app.UI.carousel_container !== null) {
    if (state.is_mobile) {
      app.destroyCarousel();
    } else {
      app.setCarousel(app.UI.carousel_container);
    }
  } //code

});
})();

/******/ })()
;
//# sourceMappingURL=main.bundle.js.map