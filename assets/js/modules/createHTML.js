/**
 * 
 * @param {Object} params 
 * @param {Object} params.el element to create
 * @param {Object} params.attributes classname or id
 * @param {Object} params.innerHTML innerHTML of the element
 * @param {Mixed} params.listener add a listener or not
 * @param {Callback} cb a callback function
 */
 export function createHTML(params = {}, cb) {
    let _params = Object.assign(
      {},
      {
        el: "div",
        parent: null,
        attributes: {},
        innerHTML: null,
        listener: false
      },
      params
    );
    const DOMListener = [
      "CssRuleViewChanged",
      "CssRuleViewCssLinkClicked",
      "CssRuleViewRefreshed",
      "cached",
      "error",
      "abort",
      "load",
      "beforeunload",
      "unload",
      "online",
      "offline",
      "focus",
      "blur",
      "open",
      "message",
      "error",
      "close",
      "pagehide",
      "pageshow",
      "popstate",
      "animationstart",
      "animationend",
      "animationiteration",
      "transitionstart",
      "transitioncancel",
      "transitionend",
      "transitionrun",
      "reset",
      "submit",
      "beforeprint",
      "afterprint",
      "compositionstart",
      "compositionupdate",
      "compositionend",
      "fullscreenchange",
      "fullscreenerror",
      "resize",
      "scroll",
      "cut",
      "copy",
      "paste",
      "keydown",
      "keypress",
      "keyup",
      "auxclick",
      "click",
      "contextmenu",
      "dblclick",
      "mousedown",
      "mouseenter",
      "mouseleave",
      "mousemove",
      "mouseover",
      "mouseout",
      "mouseup",
      "pointerlockchange",
      "pointerlockerror",
      "select",
      "wheel",
      "drag",
      "dragend",
      "dragenter",
      "dragstart",
      "dragleave",
      "dragover",
      "drop",
      "audioprocess",
      "canplay",
      "canplaythrough",
      "complete",
      "durationchange",
      "emptied",
      "ended",
      "loadeddata",
      "loadedmetadata",
      "pause",
      "play",
      "playing",
      "ratechange",
      "seeked",
      "seeking",
      "stalled",
      "suspend",
      "timeupdate",
      "volumechange",
      "waiting",
      "change",
      "storage"
    ];
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
    }
  
    //append element
    //console.log(_params.parent);
    if (_params.parent != null || _params.parent != undefined) {
      if (_params.parent === "") {
        return;
      }
      if (document.querySelector(_params.parent)) {
        return document.querySelector(_params.parent).appendChild(element);
      }
      throw new Error(
        "Cannot appendChild !!! It seems the parent element does not exist.. Maby check up your parent property... or your html code "
      );
    }
    return element;
  }