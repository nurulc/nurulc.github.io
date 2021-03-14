(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.tryit$ = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toArray(arr) {
    return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function asHTML(x) {
    return x.replace(/&/g, '~AMP~').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/~AMP~/g, '&amp;');
  }
  function H(s) {
    return {
      _toHtml: function _toHtml() {
        return '<br/><p><b>' + asHTML(s) + '</b></p>';
      }
    };
  }

  var WINDOW_LOCATION = window.location.pathname;
  var EMPTY_ELEMENT = {
    innerText: ''
  };

  function Identity(x) {
    return x;
  }
  /**
  		 * very basic is empty test
  		 * @param  {[type]}  obj [description]
  		 * @return {Boolean}     [description]
  		 */

  function isEmpty(obj) {
    if (obj === undefined) return true;
    if (Array.isArray(obj) && obj.length === 0) return true;
    if (typeof obj === 'string') return !!obj;
    if (_typeof(obj) === 'object' && obj.toString() === '[object Object]') return Object.keys(obj).length === 0;
    return false;
  }
  function $e(name) {
    if (typeof name !== 'string') return name;
    var e = document.getElementById(name);
    if (!e) return EMPTY_ELEMENT;
    return e;
  }
  function qs(sel, base) {
    return typeof sel === 'string' ? (base || document).querySelector(sel) : sel;
  }
  function qsA(arg, base) {
    return (base || document).querySelectorAll(arg);
  }
  function json(x) {
    return JSON.stringify(x, null, ' ');
  }
  function isTag(elem, tagName) {
    if (!elem || !elem.tagName) return false;
    return elem.tagName.toLowerCase() === tagName.toLowerCase();
  }
  function dataset(elem) {
    if (!elem || !elem.dataset) return {};
    return elem.dataset;
  }
  function objInfo(c) {
    var instanceMethods = Object.getOwnPropertyNames(c.prototype).filter(function (prop) {
      return prop != 'constructor';
    }); //console.log(instanceOnly);

    var staticMethods = Object.getOwnPropertyNames(c).filter(function (prop) {
      return typeof c[prop] === 'function';
    }); //console.log(staticOnly);

    return {
      instanceMethods: instanceMethods,
      staticMethods: staticMethods
    };
  }

  /**
   * Convert and array-like into an Array, if it
   * @param  {any} arrayLike An array like ojject or an array
   * @return {[any]}           an array
   */
  function asArray(arrayLike) {
    if (arrayLike === undefined || arrayLike === null) return [];
    if (typeof arrayLike === 'string') return [arrayLike];
    if (Array.isArray(arrayLike)) return arrayLike;

    if (arrayLike instanceof NodeList) {
      return Array.prototype.slice.call(arrayLike, 0);
    } else if (arrayLike instanceof Map) {
      return Array.from(arrayLike.entries());
    } else if (arrayLike instanceof Set) {
      return Array.from(arrayLike);
    } else if (typeof arrayLike.forEach === 'function') {
      var _res = [];
      arrayLike.forEach(function (n) {
        return _res.push(n);
      });
      return _res;
    }

    if (!arrayLike || arrayLike.length === undefined) {
      return [arrayLike];
    }

    var res = [];

    for (var i = 0; i < arrayLike.length; i++) {
      res.push(arrayLike[i]);
    }

    return res;
  }

  function _addRemoveCSSclass(next_button, classToRemove, classToAdd) {
    if (next_button) {
      var b = $e(next_button);

      if (!isEmpty(b)) {
        if (classToRemove) asArray(classToRemove).forEach(function (cls) {
          return b.classList.remove(cls);
        });
        if (classToAdd) asArray(classToAdd).forEach(function (cls) {
          return b.classList.add(cls);
        });
        return b;
      }
    }

    return {
      dataset: null
    };
  }
  function addRemoveCSSclass(next_button, classToAdd, classToRemove) {
    return _addRemoveCSSclass(next_button + '-run', classToAdd, classToRemove);
  }

  var editorFor = {}; //export let allEditors;

  var __editorsPending = [];
  function getPendingEditors() {
    return __editorsPending.slice();
  }
  function setPendingEditors(list) {
    __editorsPending = list || [];
    return list;
  }

  /**
   * [getTocLookup description]
   * @return {[type]} [description]
   */

  function getTocLookup() {
    var lookup = {};

    var m = function () {
      return pages().map(function (e) {
        return {
          page: e.id,
          children: flatten(asArray(e.children).flatMap(hFlatten)).filter(Identity)
        };
      });
    }();

    var pageList = m.map(function (_ref) {
      var page = _ref.page,
          children = _ref.children;
      return [page, children[0]];
    });
    var values = flatten(m.map(function (_ref2) {
      var children = _ref2.children;
      return children;
    }));
    var current = ''; //return pages;

    values.forEach(function (v) {
      if (v[0] == '*') {
        current = v.substr(1);
        lookup[current] = current;
      } else {
        var _v$split = v.split(':'),
            _v$split2 = _slicedToArray(_v$split, 2),
            id = _v$split2[1];

        lookup[id] = current;
      }
    });
    pageList.forEach(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          p = _ref4[0],
          h1 = _ref4[1];

      return lookup[p] = h1.substr(1);
    });
    return lookup; // =============================

    function asArray(arr) {
      return Array.prototype.slice.call(arr);
    }

    function pages() {
      return asArray(qsA('.try-page'));
    }

    function hFlatten(e) {
      if (e.children && e.children.length === 0) return type(e);else return [type(e)].concat(_toConsumableArray(asArray(e.children).map(hFlatten)));
    }

    function type(e) {
      if (!e) return undefined; //console.log(e.tagName);

      if (!e.id) return '';
      var ty = e.tagName;
      if (ty.match(/^h\d/i)) return '*' + e.id;
      if (ty === 'A') return ty + ':' + e.id;
      return '';
    }

    function flatten(arr) {
      var _ref5;

      if (!Array.isArray(arr)) return arr;
      if (!arr.some(Array.isArray)) return arr;
      return (_ref5 = []).concat.apply(_ref5, _toConsumableArray(arr.map(flatten)));
    }
  }

  function findSegment(elem) {
    if (elem === undefined) {
      var _segment = qs('div[data-pagevisible="true"]');

      return _segment || {};
    }

    if (dataset(elem).pagevisible) return elem;
    var segment = elem.closest('div[data-pagevisible]');
    return segment || {};
  }

  /**
   *  Proxy for CodeMirror as a place-holder until the CodeMirror editor has
   *  been created
   */
  var EditorProxy = /*#__PURE__*/function () {
    /**
     * [constructor description]
     * @param  {[type]} name [description]
     * @return {[type]}      [description]
     */
    function EditorProxy(name) {
      _classCallCheck(this, EditorProxy);

      this.name = name;
      this._editor = undefined;
      this.requiredContent = undefined;
      this.reqOptions = new Map();
    }
    /**
     * [hasEditor description]
     * @return {Boolean} [description]
     */


    _createClass(EditorProxy, [{
      key: "hasEditor",
      value: function hasEditor() {
        return this._editor !== undefined;
      }
    }, {
      key: "getOption",

      /**
       * [getOption description]
       * @param  {[type]} key [description]
       * @return {[type]}     [description]
       */
      value: function getOption(key) {
        if (this.editor) return this.editor.getOption(key);
        return this.reqOptions.get(key);
      }
      /**
       * [setOption description]
       * @param {[type]} key   [description]
       * @param {[type]} value [description]
       */

    }, {
      key: "setOption",
      value: function setOption(key, value) {
        if (this.editor) return this.editor.setOption(key, value);
        return this.reqOptions.set(key, value);
      }
      /**
       * [getValue description]
       * @return {[type]} [description]
       */

    }, {
      key: "getValue",
      value: function getValue() {
        if (this._editor) return this._editor.getValue('\n');
        return document.getElementById(this.name).value;
      }
      /**
       * [setValue description]
       * @param {[type]} content [description]
       */

    }, {
      key: "setValue",
      value: function setValue(content) {
        if (this._editor) this._editor.setValue(content);else this.requiredContent = content;
      }
      /**
       * [isClean description]
       * @param  {[type]}  val [description]
       * @return {Boolean}     [description]
       */

    }, {
      key: "isClean",
      value: function isClean(val) {
        return this._editor === undefined || this._editor.isClean(val);
      }
      /**
       * [toString description]
       * @return {[type]} [description]
       */

    }, {
      key: "toString",
      value: function toString() {
        return "Editor(".concat(this.name, ")");
      }
    }, {
      key: "editor",
      get: function get() {
        return this._editor;
      },
      set: function set(anEditor) {
        this._editor = anEditor;

        if (this.requiredContent) {
          anEditor.setValue(this.requiredContent);
          this.requiredContent = undefined;
        }

        if (this.reqOptions.length) {
          this.reqOptions.forEach(function (key, value) {
            return anEditor.setOption(key, value);
          });
          this.reqOptions = {};
        }
      }
    }]);

    return EditorProxy;
  }();

  var editorData;
  function getEditorData() {
    return editorData;
  }
  function setEditorData(v) {
    editorData = v;
    return editorData;
  }
  setEditorData(function () {
    // done
    var data = window.localStorage[WINDOW_LOCATION];

    if (data) {
      try {
        var obj = JSON.parse(data);
        var keys = Object.keys(obj);
        keys.forEach(function (k) {
          var v = obj[k];

          if (typeof v === 'string') {
            obj[k] = {
              key: k,
              hash: sha1(v),
              content: v
            };
          }
        });
        return obj;
      } catch (e) {
        return {};
      }
    }

    return {};
  }());

  function getSavedContent(id) {
    var editorData = getEditorData();
    var saved = editorData[id];
    var originalContents = $e(id).value;
    var hash = window.sha1(originalContents);

    if (saved && saved.key === id && saved.hash === hash) {
      return saved.content;
    } else {
      var res = Object.keys(editorData).map(function (k) {
        return editorData[k];
      }).find(function (saved) {
        return saved.hash === hash;
      });
      return res ? res.content : originalContents;
    }
  }

  function setEditorHeight(editor, lines) {
    var height = '';
    if (lines < 5) height = '5rem';else if (lines > 20) height = '40rem';else height = lines * 1.8 + 'rem';
    editor.setSize('inherit', height);
    return editor;
  }

  var tryIt; // greak circular reference

  function setupMakeEditor(doTryIt) {
    tryIt = doTryIt;
  }
  function _makeEditor(id) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Identity;

    try {
      // let originalContents = textarea.value;
      // let contents = originalContents;
      // if(editorData[id]) {
      //   contents = editorData[id].content;
      // } else {
      //   editorData[id] = contents;
      // }
      var textarea = document.querySelector("#".concat(id));
      var contents = getSavedContent(id);
      var lines = contents.split('\n').length;
      var original = textarea.value;
      var theme = original === contents ? tryit$colors.original : tryit$colors.saved;
      var editor = CodeMirror.fromTextArea(textarea, {
        lineNumbers: true,
        // mode: "javascript",
        //mode: "jsx",
        theme: theme,
        //"cobalt",
        matchBrackets: true,
        autoCloseBrackets: '()[]{}\'\'""``',
        continueComments: 'Enter',
        extraKeys: {
          'Ctrl-Enter': execCode,
          'Cmd-Enter': execCode,
          'Ctrl-/': 'toggleComment',
          'Ctrl-F': 'search',
          'Ctrl-Space': 'autocomplete'
        },
        tabSize: 2,
        keyMap: 'sublime',
        lineWrapping: true,
        lint: {
          bitwise: true,
          esversion: 10,
          notypeof: true,
          expr: true,
          asi: true
        },
        foldGutter: true,
        gutters: ['CodeMirror-lint-markers', 'CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        indentUnit: 2,
        mode: {
          name: 'javascript',
          globalVars: true
        }
      });

      if (original !== contents) {
        editor.setValue(contents);
        editor.markClean();
      }

      editor.tryitState = theme;
      editor.on('change', function () {
        return editorChanged(editor);
      }); // getPendingEditors().push(id);
      // __editors.push(id);
      // editorFor[id] = editor;

      setEditorHeight(editor, lines);
      callback(id, editor);

      function execCode() {
        return tryIt(id, editor);
      } // qs(`#${id}-run`).onclick = execCode;
      // function execCode() { return tryIt(id,editor);}

    } catch (err) {
      alert('Error creating editor ' + id + ' ' + err.toString());
    }
  }

  function editorChanged(editor) {
    var theme = editor.getOption('theme');
    if (editor.isClean()) editor.setOption('theme', editor.tryitState);else if (theme !== tryit$colors.edited) {
      editor.setOption('theme', tryit$colors.edited);
    }
  }

  var PageInfo = /*#__PURE__*/function () {
    function PageInfo(pageList) {
      _classCallCheck(this, PageInfo);

      this.pageMap = new Map(asArray(pageList).map(function (e, ix) {
        return [e.id, ix];
      }));
      this.contents = new Map();
    }

    _createClass(PageInfo, [{
      key: "set",
      value: function set(pageId, anEditorList) {
        this.contents.set(pageId, anEditorList);
      }
    }, {
      key: "pageIx",
      value: function pageIx(aPageName) {
        var ix = this.pageMap.get(aPageName);
        return ix === undefined ? -1 : ix;
      }
    }, {
      key: "compare",
      value: function compare(page1, page2) {
        return this.pageIx(page1) - this.pageIx(page2);
      }
    }, {
      key: "showPage",
      value: function showPage(pageId) {
        var editorList = this.contents.get(pageId);
        console.log('_makeEditor', _makeEditor);
        editorList.forEach(function (anEditor) {
          if (!anEditor.hasEditor()) {
            _makeEditor(anEditor.name, function (id, editor) {
              editorFor[id] = editor;
              anEditor.editor = editor;
            });
          }
        });
      }
    }]);

    return PageInfo;
  }();

  var _pageInfo;

  var tryIt$1 = function () {
    return false;
  };
  /**
   * If the number of 'pages' in the HTML gets large and there lots of tryit scripts
   * the loading of the page can get very slow. So instead we Create the code mirror
   * editors for only the visible pages.
   *
   * Although the html file has all the pages, each page is in its own &lt;div&gt:
   * only one page is visible at a time. The first time a page becomes visible, we use
   * the EditorProxy to actually render the editor. Using an editor proxy, the rest of the
   * code can be completely unaware that the CodeMirror editors do not exist on the hidden pages
   * (div)
   *
   * 
   * @return {object} - {pageInfo, allEditors}
   */


  function getPageInfo() {
    if (_pageInfo) return _pageInfo;
    var list = qsA('.try-page');
    var pageInfo = new PageInfo(list),
        allEditors = [];
    var pendingEd = getPendingEditors();
    list.forEach(function (p) {
      //console.log("Page", p.id);
      var editorsOnPage = [];

      pageInfo.set(p.id, editorsOnPage); // editorsOnPage is a little later in this function

      var editors = qsA('.tryit', p);
      editors.forEach(function (e) {
        var id = e.id;

        if (id) {
          var anEditorProxy = new EditorProxy(id);
          editorsOnPage.push(anEditorProxy);
          allEditors.push(anEditorProxy);
          pendingEd.push(id);
          setPendingEditors(pendingEd);

          editorFor[id] = anEditorProxy;

          qs("#".concat(id, "-run")).onclick = function () {
            return tryIt$1(id, anEditorProxy);
          };
        }
      });
    });
    return _pageInfo = {
      pageInfo: pageInfo,
      allEditors: allEditors
    };
  }
  function setupPageInfo(doTryit) {
    tryIt$1 = doTryit;
  }

  /**
   * [setDisplay description]
   * @param {[type]} elem      [description]
   * @param {[type]} type      [description]
   * @param {[type]} otherElem [description]
   */
  function setDisplay(elem, type, otherElem) {
    if (!elem || !elem.dataset) return;

    if (otherElem && type == 'false') {
      delete otherElem.style.height;

      if (otherElem.offsetTop > elem.offsetTop) {
        var pos = window.scrollY || window.screenTop;
        window.scrollTo(0, pos - elem.offsetHeight);
      }
    }

    elem.dataset.pagevisible = type; //	 elem.style.display = (type==='false')?'none':'block'; // may nood to enable this
  }

  function makeSegmentVisible(elem) {
    var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
    return new Promise(function (resolve) {
      return window.requestAnimationFrame(function () {
        return doit(resolve);
      });
    });

    function doit(resolve) {
      var _map = [undefined, elem].map(findSegment),
          _map2 = _slicedToArray(_map, 2),
          curSeg = _map2[0],
          segment = _map2[1]; // find


      if (curSeg !== segment) {
        var pos = window.scrollY || window.screenTop;
        setDisplay(segment, 'true');

        var _getPageInfo = getPageInfo(),
            pageInfo = _getPageInfo.pageInfo;

        pageInfo.showPage(segment.id);

        if (pageInfo.compare(segment.id, curSeg.id) < 0) {
          var height = segment.offsetHeight;
          window.scrollTo(0, pos + height);
        } else if (segment.offsetHeight < window.innerHeight - 5) {
          segment.style.height = Math.round(window.innerHeight + 5) + 'px';
        }
      }

      return setTimeout(function () {
        return resolve([segment, curSeg]);
      }, timeout);
    }
  }

  function easeIn(start, pos, end) {
    var abs = Math.abs;
    if (abs(start - pos) < 100 || abs(end - pos) < 100) return 2;
    var diff = abs(start - end);
    if (diff > 5000) return 100;
    if (diff > 1000) return 30;
    if (diff > 500) return 10;
    return 5;
  }

  function scrollToSmoothly(posFn, time, callback) {
    /*Time is only applicable for scrolling upwards*/

    /*Code written by hev1*/

    /*pos is the y-position to scroll to (in pixels)*/
    var v = posFn;
    if (typeof posFn !== 'function') posFn = function () {
      return v;
    };
    var pos = posFn();

    if (isNaN(pos)) {
      throw 'Position must be a number';
    }

    if (pos < 0) {
      //throw "Position can not be negative";
      pos = 0;
    }

    var start = window.scrollY || window.screenTop;
    console.log('scrollToSmoothly', start, pos);
    var currentPos = start;

    if (currentPos < pos) {
      var t = 10;

      var _loop = function (i) {
        t += 10;
        setTimeout(function () {
          window.scrollTo(0, i);
          pos = posFn();
        }, t / 2);
      };

      for (var i = currentPos; i <= pos + 15; i += 10) {
        _loop(i);
      }

      if (callback) {
        setTimeout(function () {
          return callback();
        }, t / 2 + 50);
      }
    } else {
      time = time || 2;
      var _i = currentPos;
      var x = setInterval(function () {
        window.scrollTo(0, _i);
        pos = posFn();
        var delta = easeIn(start, _i, pos);
        if (delta < 0) delta = -delta;
        _i -= delta;

        if (_i <= pos) {
          clearInterval(x);
          if (callback) callback();
        }
      }, time);
    }
  }

  function _jumpTag(aTag) {
    var toToggle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    jumpTag(aTag);
    var toggle = window.toggle || Identity;
    toToggle && toggle();
  }
  function jumpback() {
    if (getPendingEditors().length) jump(getPendingEditors()[0]);
  }
  function jump(h) {
    jumpTag('_' + h, 70);
  }
  function jumpBack() {
    jumpback();
    var toggle = window.toggle || Identity;
    toggle();
  }
  var LAST_TARGET;
  var tocLookup;
  function jumpTag(h, OFFSET, callback, noPush) {
    if (!tocLookup) tocLookup = getTocLookup();
    OFFSET = +(OFFSET || 30);
    callback = callback || Identity;
    var elem = $e(h);
    if (LAST_TARGET === elem.id) return; //let [targetSeg, curSeg] = makeSegmentVisible(elem);

    var displayPromise = makeSegmentVisible(elem, OFFSET); //pageInfo.showPage(targetSeg.id);
    //if(targetSeg !== curSeg) setDisplay(curSeg, 'false');

    displayPromise.then(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          targetSeg = _ref2[0],
          curSeg = _ref2[1];

      //const lastsScoll = () => elem.scrollIntoView({behavior: "smooth", block: "start"});
      var lastsScoll = function () {
        return scrollToSmoothly(toHeader(elem).offsetTop - OFFSET, 10);
      };

      scrollToSmoothly(elem.offsetTop - OFFSET, 10, function () {
        try {
          callback();
          if (targetSeg !== curSeg) setDisplay(curSeg, 'false', targetSeg);
          lastsScoll();
          LAST_TARGET = elem.id;
          if (!noPush) history.pushState(null, null, '#' + elem.id);
          var tocSel = tocLookup[elem.id];

          if (tocSel) {
            var tocElem = $e('toc_' + tocSel);
            var prev = qs('.toc.select');
            if (prev) _addRemoveCSSclass(prev, ['select'], []);
            if (tocElem) _addRemoveCSSclass(tocElem, [], ['select']);
          } // location.hash = elem.id;

        } catch (e) {
          alert('error jumping to: ' + h + 'location');
        }
      });
    }, 300);
  }
  function toHeader(elem) {
    if (dataset(elem).pagevisible) {
      return elem.querySelector('h1');
    }

    return elem;
  }

  var NO_DISPLAY = false;
  function setNoDisplay(flag) {
    NO_DISPLAY = !!flag;
  }
  function getNoDisplay() {
    return NO_DISPLAY;
  }

  var _lastlyStack = [];
  function _lastly(onDisplay, fn) {
    //console.log("lastly", onDisplay,fn, NO_DISPLAY)
    if (typeof onDisplay === 'boolean' && typeof fn === 'function') {
      if (onDisplay && !getNoDisplay()) {
        _lastlyStack.push(fn); // only add the function if we are displaying

      }
    } else if (typeof onDisplay === 'function') {
      fn = onDisplay;

      _lastlyStack.push(onDisplay);
    }
  }
  function runLastly() {
    var list = _lastlyStack.slice();

    _lastlyStack = [];
    return Promise.all(list.map(valOrFunc)).then(valOrFunc).catch(function (err) {
      return alert('Error in  ' + err.toString());
    });
  }
  function clearLastly() {
    _lastlyStack = [];
  }

  function valOrFunc(v) {
    try {
      return typeof v === 'function' ? v(getNoDisplay()) : v;
    } catch (err) {
      if (!getNoDisplay()) alert(err);
    }
  }

  var _displayStack = [];
  function clearDisplay() {
    _displayStack = [];
  }
  function getDisplayStack() {
    return _displayStack;
  }
  function pushDisplay(s) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'h';
    //if(NO_DISPLAY) return;
    if (!(s instanceof Promise) && s !== undefined) s = Promise.resolve(s);

    _displayStack.push([s, type]);
  }
  function _show() {
    var pd = pushDisplay;

    for (var _len = arguments.length, list = new Array(_len), _key = 0; _key < _len; _key++) {
      list[_key] = arguments[_key];
    }

    if (list.length > 1) {
      pd('<div class="display-container">'); //pushDisplay(list.map(v => `<div>${display(v)}</div>\n`),'h');

      list.forEach(function (v) {
        pd('<div>');
        pd(v, 'd');
        pd('</div>');
      });
      pd('</div>');
    } else {
      list.forEach(function (v) {
        return pd(v, 'd');
      });
    }
  }

  var prettyPrint = (function () {
    /* These "util" functions are not part of the core
       functionality but are  all necessary - mostly DOM helpers */
    var util = {
      el: function (type, attrs) {
        /* Create new element */
        var el = document.createElement(type),
            attr;
        /*Copy to single object */

        attrs = util.merge({}, attrs);
        /* Add attributes to el */

        if (attrs && attrs.style) {
          //var styles = attrs.style;
          util.applyCSS(el, attrs.style);
          delete attrs.style;
        }

        for (attr in attrs) {
          if (attrs.hasOwnProperty(attr)) {
            el[attr] = attrs[attr];
          }
        }

        return el;
      },
      applyCSS: function applyCSS(el, styles) {
        /* Applies CSS to a single element */
        for (var prop in styles) {
          if (styles.hasOwnProperty(prop)) {
            try {
              /* Yes, IE6 SUCKS! */
              el.style[prop] = styles[prop];
            } catch (e) {
              console.log('*');
            }
          }
        }
      },
      txt: function txt(t) {
        /* Create text node */
        return document.createTextNode(t);
      },
      row: function row(cells, type, cellType) {
        /* Creates new <tr> */
        cellType = cellType || 'td';
        /* colSpan is calculated by length of null items in array */

        var colSpan = util.count(cells, null) + 1,
            tr = util.el('tr'),
            td,
            attrs = {
          style: util.getStyles(cellType, type),
          colSpan: colSpan,
          onmouseover: function onmouseover() {
            var tds = this.parentNode.childNodes;
            util.forEach(tds, function (cell) {
              if (cell.nodeName.toLowerCase() !== 'td') {
                return;
              }

              util.applyCSS(cell, util.getStyles('td_hover', type));
            });
          },
          onmouseout: function onmouseout() {
            var tds = this.parentNode.childNodes;
            util.forEach(tds, function (cell) {
              if (cell.nodeName.toLowerCase() !== 'td') {
                return;
              }

              util.applyCSS(cell, util.getStyles('td', type));
            });
          }
        };
        util.forEach(cells, function (cell) {
          if (cell === null) {
            return;
          }
          /* Default cell type is <td> */


          td = util.el(cellType, attrs);

          if (cell.nodeType) {
            /* IsDomElement */
            td.appendChild(cell);
          } else {
            /* IsString */
            td.innerHTML = util.shorten(cell.toString());
          }

          tr.appendChild(td);
        });
        return tr;
      },
      hRow: function hRow(cells, type) {
        /* Return new <th> */
        return util.row(cells, type, 'th');
      },
      table: function table(headings, type) {
        headings = headings || [];
        /* Creates new table: */

        var attrs = {
          thead: {
            style: util.getStyles('thead', type)
          },
          tbody: {
            style: util.getStyles('tbody', type)
          },
          table: {
            style: util.getStyles('table', type)
          }
        },
            tbl = util.el('table', attrs.table),
            thead = util.el('thead', attrs.thead),
            //tcolgroup = util.el('colgroup'),
        tbody = util.el('tbody', attrs.tbody);

        if (headings.length) {
          // for(let i=0; i<headings.length; i++) {
          // 	console.log("headings", headings, i);
          // 	let tcolStyle = i=0?({"class":"pp_keycol"}):{};
          // 	tcolgroup.appendChild(util.el('col', tcolStyle))
          // }
          tbl.appendChild(thead); //thead.appendChild(tcolgroup);

          thead.appendChild(util.hRow(headings, type));
        }

        tbl.appendChild(tbody);
        return {
          /* Facade for dealing with table/tbody
             Actual table node is this.node: */
          node: tbl,
          tbody: tbody,
          thead: thead,
          appendChild: function appendChild(node) {
            this.tbody.appendChild(node);
          },
          addRow: function addRow(cells, _type, cellType) {
            this.appendChild(util.row.call(util, cells, _type || type, cellType));
            return this;
          }
        };
      },
      shorten: function shorten(str) {
        var max = 200;
        str = str.replace(/^\s\s*|\s\s*$|\n/g, '');
        return str.length > max ? str.substring(0, max - 1) + '...' : str;
      },
      htmlentities: function htmlentities(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      },
      merge: function merge(target, source) {
        /* Merges two (or more) objects,
           giving the last one precedence */
        if (_typeof(target) !== 'object') {
          target = {};
        }

        for (var property in source) {
          if (source.hasOwnProperty(property)) {
            var sourceProperty = source[property];

            if (_typeof(sourceProperty) === 'object') {
              target[property] = util.merge(target[property], sourceProperty);
              continue;
            }

            target[property] = sourceProperty;
          }
        }

        for (var a = 2, l = arguments.length; a < l; a++) {
          util.merge(target, arguments[a]);
        }

        return target;
      },
      count: function (arr, item) {
        var count = 0;

        for (var i = 0, l = arr.length; i < l; i++) {
          if (arr[i] === item) {
            count++;
          }
        }

        return count;
      },
      thead: function thead(tbl) {
        return tbl.getElementsByTagName('thead')[0];
      },
      forEach: function forEach(arr, max, fn) {
        if (!fn) {
          fn = max;
        }
        /* Helper: iteration */


        var len = arr.length,
            index = -1;

        while (++index < len) {
          if (fn(arr[index], index, arr) === false) {
            break;
          }
        }

        return true;
      },
      type: function type(v) {
        try {
          /* Returns type, e.g. "string", "number", "array" etc.
             Note, this is only used for precise typing. */
          if (v === null) {
            return 'null';
          }

          if (v === undefined) {
            return 'undefined';
          }

          var oType = Object.prototype.toString.call(v).match(/\s(.+?)\]/)[1].toLowerCase();

          if (v.nodeType) {
            if (v.nodeType === 1) {
              return 'domelement';
            }

            return 'domnode';
          }

          if (/^(string|number|array|regexp|function|date|boolean)$/.test(oType)) {
            return oType;
          }

          if (_typeof(v) === 'object') {
            return v.jquery && typeof v.jquery === 'string' ? 'jquery' : 'object';
          }

          if (v === window || v === document) {
            return 'object';
          }

          return 'default';
        } catch (e) {
          return 'default';
        }
      },
      within: function within(ref) {
        /* Check existence of a val within an object
           RETURNS KEY */
        return {
          is: function is(o) {
            for (var i in ref) {
              if (ref[i] === o) {
                return i;
              }
            }

            return '';
          }
        };
      },
      common: {
        circRef: function circRef(obj, key) {
          return util.expander('[POINTS BACK TO <strong>' + key + '</strong>]', 'Click to show this item anyway', function () {
            this.parentNode.appendChild(prettyPrintThis(obj, {
              maxDepth: 1
            }));
          });
        },
        depthReached: function depthReached(obj) {
          return util.expander('[DEPTH REACHED]', 'Click to show this item anyway', function () {
            try {
              this.parentNode.appendChild(prettyPrintThis(obj, {
                maxDepth: 1
              }));
            } catch (e) {
              this.parentNode.appendChild(util.table(['ERROR OCCURED DURING OBJECT RETRIEVAL'], 'error').addRow([e.message]).node);
            }
          });
        }
      },
      getStyles: function getStyles(el, type) {
        type = prettyPrintThis.settings.styles[type] || {};
        return util.merge({}, prettyPrintThis.settings.styles['default'][el], type[el]);
      },
      expander: function expander(text, title, clickFn) {
        return util.el('a', {
          innerHTML: util.shorten(text) + ' <b style="visibility:hidden;">[+]</b>',
          title: title,
          onmouseover: function onmouseover() {
            this.getElementsByTagName('b')[0].style.visibility = 'visible';
          },
          onmouseout: function onmouseout() {
            this.getElementsByTagName('b')[0].style.visibility = 'hidden';
          },
          onclick: function onclick() {
            this.style.display = 'none';
            clickFn.call(this);
            return false;
          },
          style: {
            cursor: 'pointer'
          }
        });
      },
      stringify: function stringify(obj) {
        return JSON.stringify(obj);
      },
      _stringify: function _stringify(obj) {
        /* Bit of an ugly duckling!
           - This fn returns an ATTEMPT at converting an object/array/anyType
        	 into a string, kinda like a JSON-deParser
           - This is used for when |settings.expanded === false| */
        var type = util.type(obj),
            str,
            first = true;

        if (type === 'array') {
          str = '[';
          util.forEach(obj, function (item, i) {
            str += (i === 0 ? '' : ', ') + util.stringify(item);
          });
          return str + ']';
        }

        if (_typeof(obj) === 'object') {
          str = '{';

          for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
              str += (first ? '' : ', ') + i + ':' + util.stringify(obj[i]);
              first = false;
            }
          }

          return str + '}';
        }

        if (type === 'regexp') {
          return '/' + obj.source + '/';
        }

        if (type === 'string') {
          return '"' + obj.replace(/"/g, '\\"') + '"';
        }

        return obj.toString();
      },
      headerGradient: function () {
        var canvas = document.createElement('canvas');

        if (!canvas.getContext) {
          return '';
        }

        var cx = canvas.getContext('2d');
        canvas.height = 30;
        canvas.width = 1;
        var linearGrad = cx.createLinearGradient(0, 0, 0, 30);
        linearGrad.addColorStop(0, 'rgba(0,0,0,0)');
        linearGrad.addColorStop(1, 'rgba(0,0,0,0.25)');
        cx.fillStyle = linearGrad;
        cx.fillRect(0, 0, 1, 30);
        var dataURL = canvas.toDataURL && canvas.toDataURL();
        return 'url(' + (dataURL || '') + ')';
      }()
    }; // Main..

    var prettyPrintThis = function (obj, options) {
      /*
       *	  obj :: Object to be printed					
       *  options :: Options (merged with config)
       */
      options = options || {};
      var settings = util.merge({}, prettyPrintThis.config, options),
          container = util.el('div'),
          stack = {},
          hasRunOnce = false;
      /* Expose per-call settings.
         Note: "config" is overwritten (where necessary) by options/"settings"
         So, if you need to access/change *DEFAULT* settings then go via ".config" */

      prettyPrintThis.settings = settings;
      var typeDealer = {
        string: function string(item) {
          return util.txt('"' + util.shorten(item.replace(/"/g, '\\"')) + '"');
        },
        number: function number(item) {
          return util.txt(item);
        },
        regexp: function regexp(item) {
          var miniTable = util.table(['RegExp', null], 'regexp');
          var flags = util.table();
          var span = util.expander('/' + item.source + '/', 'Click to show more', function () {
            this.parentNode.appendChild(miniTable.node);
          });
          flags.addRow(['g', item.global]).addRow(['i', item.ignoreCase]).addRow(['m', item.multiline]);
          miniTable.addRow(['source', '/' + item.source + '/']).addRow(['flags', flags.node]).addRow(['lastIndex', item.lastIndex]);
          return settings.expanded ? miniTable.node : span;
        },
        domelement: function domelement(element) {
          var miniTable = util.table(['DOMElement', null], 'domelement'),
              elname = element.nodeName || '';
          miniTable.addRow(['tag', '&lt;' + elname.toLowerCase() + '&gt;']);
          util.forEach(['id', 'className', 'innerHTML', 'src', 'href'], function (prop) {
            if (element[prop]) {
              miniTable.addRow([prop, util.htmlentities(element[prop])]);
            }
          });
          return settings.expanded ? miniTable.node : util.expander('DOMElement (' + elname.toLowerCase() + ')', 'Click to show more', function () {
            this.parentNode.appendChild(miniTable.node);
          });
        },
        domnode: function domnode(node) {
          /* Deals with all DOMNodes that aren't elements (nodeType !== 1) */
          var miniTable = util.table(['DOMNode', null], 'domelement'),
              data = util.htmlentities((node.data || 'UNDEFINED').replace(/\n/g, '\\n'));
          miniTable.addRow(['nodeType', node.nodeType + ' (' + node.nodeName + ')']).addRow(['data', data]);
          return settings.expanded ? miniTable.node : util.expander('DOMNode', 'Click to show more', function () {
            this.parentNode.appendChild(miniTable.node);
          });
        },
        jquery: function jquery(obj, depth, key) {
          return typeDealer['array'](obj, depth, key, true);
        },
        object: function object(obj, depth, key) {
          /* Checking depth + circular refs */

          /* Note, check for circular refs before depth; just makes more sense */
          var stackKey = util.within(stack).is(obj);

          if (stackKey) {
            return util.common.circRef(obj, stackKey, settings);
          }

          stack[key || 'TOP'] = obj;

          if (depth === settings.maxDepth) {
            return util.common.depthReached(obj, settings);
          }

          var table = util.table(['Object', null], 'object'),
              isEmpty = true;

          for (var i in obj) {
            if (!obj.hasOwnProperty || obj.hasOwnProperty(i)) {
              var item = obj[i],
                  type = util.type(item);
              isEmpty = false;

              try {
                table.addRow([i, typeDealer[type](item, depth + 1, i)], type);
              } catch (e) {
                /* Security errors are thrown on certain Window/DOM properties */
                if (window.console && window.console.log) {
                  console.log(e.message);
                }
              }
            }
          }

          if (isEmpty) {
            table.addRow(['<small>[empty]</small>']);
          } else {
            table.thead.appendChild(util.hRow(['key', 'value'], 'colHeader'));
          }

          var ret = settings.expanded || hasRunOnce ? table.node : util.expander(util.stringify(obj), 'Click to show more', function () {
            this.parentNode.appendChild(table.node);
          });
          hasRunOnce = true;
          return ret;
        },
        array: function array(arr, depth, key, jquery) {
          /* Checking depth + circular refs */

          /* Note, check for circular refs before depth; just makes more sense */
          var stackKey = util.within(stack).is(arr);

          if (stackKey) {
            return util.common.circRef(arr, stackKey);
          }

          stack[key || 'TOP'] = arr;

          if (depth === settings.maxDepth) {
            return util.common.depthReached(arr);
          }
          /* Accepts a table and modifies it */


          var me = jquery ? 'jQuery' : 'Array',
              table = util.table([me + '(' + arr.length + ')', null], jquery ? 'jquery' : me.toLowerCase()),
              isEmpty = true,
              count = 0;

          if (jquery) {
            table.addRow(['selector', arr.selector]);
          }

          var LEN = arr.length;
          var LOW = LEN,
              HIGH = LEN;

          if (LEN >= 30) {
            LOW = 15;
            HIGH = LEN - 15;
          }

          util.forEach(arr, function (item, i) {
            if (settings.maxArray >= 0 && ++count > settings.maxArray) {
              table.addRow([i + '..' + (arr.length - 1), typeDealer[util.type(item)]('...', depth + 1, i)]);
              return false;
            }

            isEmpty = false;
            if (i < LOW || i >= HIGH) table.addRow([i, typeDealer[util.type(item)](item, depth + 1, i)]);else if (i === LOW) {
              table.addRow([i + '..' + (HIGH - 1), typeDealer[util.type(item)]('...', depth + 1, i)]);
            }
          });

          if (!jquery) {
            if (isEmpty) {
              table.addRow(['<small>[empty]</small>']);
            } else {
              table.thead.appendChild(util.hRow(['index', 'value'], 'colHeader'));
            }
          }

          return settings.expanded ? table.node : util.expander(util.stringify(arr), 'Click to show more', function () {
            this.parentNode.appendChild(table.node);
          });
        },
        'function': function _function(fn, depth, key) {
          /* Checking JUST circular refs */
          var stackKey = util.within(stack).is(fn);

          if (stackKey) {
            return util.common.circRef(fn, stackKey);
          }

          stack[key || 'TOP'] = fn;
          var miniTable = util.table(['Function', null], 'function');
              util.table(['Arguments']);
              var args = fn.toString().match(/\((.+?)\)/),
              body = fn.toString().match(/\(.*?\)\s+?\{?([\S\s]+)/)[1].replace(/\}?$/, '');
          miniTable.addRow(['arguments', args ? args[1].replace(/[^\w_,\s]/g, '') : '<small>[none/native]</small>']).addRow(['body', body]);
          return settings.expanded ? miniTable.node : util.expander('function(){...}', 'Click to see more about this function.', function () {
            this.parentNode.appendChild(miniTable.node);
          });
        },
        'date': function date(_date) {
          var miniTable = util.table(['Date', null], 'date'),
              sDate = _date.toString().split(/\s/);
          /* TODO: Make this work well in IE! */


          miniTable.addRow(['Time', sDate[4]]).addRow(['Date', sDate.slice(0, 4).join('-')]);
          return settings.expanded ? miniTable.node : util.expander('Date (timestamp): ' + +_date, 'Click to see a little more info about this date', function () {
            this.parentNode.appendChild(miniTable.node);
          });
        },
        'boolean': function boolean(bool) {
          return util.txt(bool.toString().toUpperCase());
        },
        'undefined': function undefined$1() {
          return util.txt('UNDEFINED');
        },
        'null': function _null() {
          return util.txt('NULL');
        },
        'default': function _default() {
          /* When a type cannot be found */
          return util.txt('prettyPrint: TypeNotFound Error');
        }
      };
      container.appendChild(typeDealer[settings.forceObject ? 'object' : util.type(obj)](obj, 0));
      return container;
    };
    /* Configuration */

    /* All items can be overwridden by passing an
       "options" object when calling prettyPrint */


    prettyPrintThis.config = {
      /* Try setting this to false to save space */
      expanded: true,
      forceObject: false,
      maxDepth: 3,
      maxArray: -1,
      // default is unlimited
      styles: {
        array: {
          th: {
            backgroundColor: '#6DBD2A',
            color: 'white'
          }
        },
        'function': {
          th: {
            backgroundColor: '#D82525'
          }
        },
        regexp: {
          th: {
            backgroundColor: '#E2F3FB',
            color: '#000'
          }
        },
        object: {
          th: {
            backgroundColor: '#1F96CF'
          }
        },
        jquery: {
          th: {
            backgroundColor: '#FBF315'
          }
        },
        error: {
          th: {
            backgroundColor: 'red',
            color: 'yellow'
          }
        },
        domelement: {
          th: {
            backgroundColor: '#F3801E'
          }
        },
        date: {
          th: {
            backgroundColor: '#A725D8'
          }
        },
        colHeader: {
          th: {
            backgroundColor: '#EEE',
            color: '#000',
            textTransform: 'uppercase'
          }
        },
        'default': {
          table: {
            borderCollapse: 'collapse',
            width: '100%'
          },
          td: {
            padding: '5px',
            fontSize: '12px',
            backgroundColor: '#FFF',
            color: '#222',
            border: '1px solid #000',
            verticalAlign: 'top',
            fontFamily: '"Consolas","Lucida Console",Courier,mono',
            whiteSpace: 'nowrap'
          },
          td_hover: {
            /* Styles defined here will apply to all tr:hover > td,
            	- Be aware that "inheritable" properties (e.g. fontWeight) WILL BE INHERITED */
          },
          th: {
            padding: '5px',
            fontSize: '12px',
            backgroundColor: '#222',
            color: '#EEE',
            textAlign: 'left',
            border: '1px solid #000',
            verticalAlign: 'top',
            fontFamily: '"Consolas","Lucida Console",Courier,mono',
            backgroundImage: util.headerGradient,
            backgroundRepeat: 'repeat-x'
          }
        }
      }
    };
    return prettyPrintThis;
  })();

  function display(d) {
    if (d && d._toHtml) {
      return d._toHtml();
    } else if (isReactNode(d)) {
      var genID = 'RX' + Math.trunc(Math.random() * 10000);

      _lastly(function () {
        return window.ReactDOM.render(d, document.getElementById(genID));
      });

      return "<div id=\"".concat(genID, "\">ReactNode</div>");
    } else if (d instanceof Set) {
      var setArrStr = Array.from(d).join(', ');
      return "<pre>Set{".concat(asHTML(setArrStr), "}</pre>");
    } else if (typeof d === 'string') {
      if (d && d.length > 20000) {
        d = d.substr(0, 20000) + '... MORE';
        return '<pre>' + asHTML(d) + '</pre>';
      } //       if( d.length < 100) return  asHTML(d) + "<br/>"
      else if (d.indexOf('\n') === -1) return '<pre>' + JSON.stringify(asHTML(d)) + '</pre>';else return '<pre>' + asHTML(d) + '</pre>';
    } else if (isPrimitive(d)) return '<pre>' + d.toString() + '</pre>';else if (smallArray(d)) {
      var v = JSON.stringify(d, null, ' ');
      if (v.length < 150) v = JSON.stringify(d);
      if (v && v.length > 20000) v = v.substr(0, 20000) + '... MORE';
      return '<pre>' + (v || (d !== undefined ? asHTML(d.toString()) : undefined)) + '</pre>';
    } else if (d) {
      return prettyPrint(d).outerHTML;
    }
  }

  function smallArray(a) {
    var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var len = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 40;
    if (depth > 1) return false;

    if (Array.isArray(a) && a.length <= len) {
      if (a.every(isPrimitive)) return true;
      return a.every(function (v) {
        return smallArray(v, depth + 1, 3);
      });
    }

    return false;
  }

  function isReactNode(d) {
    if (_typeof(d) !== 'object' || _typeof(window.React) === undefined || _typeof(window.ReactUI) === undefined) return false;
    return d.$$typeof && d.$$typeof.toString() === 'Symbol(react.element)' && !!d.type;
  }

  function isPrimitive(v) {
    switch (_typeof(v)) {
      case 'symbol':
      case 'boolean':
      case 'number':
        return true;

      case 'string':
        return v.length < 8000;
    }

    return false;
  }

  function __2ToDisplay(title, val) {
    return "\n\t\t\t<div class=\"ui container grid\">\n\t\t\t\t<div class=\"three wide column expression\" title=\"Expression\">".concat(title, "</div>\n\t\t\t\t<div class=\"thirteen wide column expression-value\">").concat(display(val), "</div>\n\t\t\t</div>");
  }

  function pagePrev() {
    pagePrevNext(this, false);
  }
  function pageNext() {
    pagePrevNext(this, true);
  }

  function pagePrevNext(elem, forward) {
    var curPage = findSegment(elem);
    var targetPage = forward ? curPage.nextElementSibling : curPage.previousElementSibling;
    jumpTag(targetPage, 60);
    return [targetPage, curPage];
  }

  function _displayEval(string) {
    if (typeof string === 'string') {
      var title = asHTML(string);
      var val;

      try {
        val = (1, eval)(string);
        if (!(val instanceof Promise)) pushDisplay(__2ToDisplay(title, val));else val.then(function (val) {
          pushDisplay(__2ToDisplay(title, val));
        });
      } catch (err) {
        pushDisplay('<span class="red">Expression error</span>');
      } // end try

    } else _show(string);
  }

  /**
   * [codeHighlight description]
   * @param  {[type]} _lines [description]
   * @return {[type]}        [description]
   */
  function codeHighlight(_lines) {
    //var HL = escapeHTML;
    var HL = function (s, type) {
      return hljs.highlightAuto(s, hljsLang(type)).value;
    };

    var _lines$reduce = _lines.reduce(function (_ref, line) {
      var _ref2 = _slicedToArray(_ref, 3),
          list = _ref2[0],
          type = _ref2[1],
          content = _ref2[2];

      var mat = line.match(/^\s*(![a-z_-]+|!--)/);

      if (mat) {
        if (content || type.match(/!render-(start|end)|!head|!end/)) list.push([type, content]);
        return [list, mat[1], ''];
      }

      line = (content ? '\n' : '') + _indent(line, function (s) {
        return HL(s, type);
      });
      return [list, type, content + line];
    }, [[], '', '']),
        _lines$reduce2 = _slicedToArray(_lines$reduce, 3),
        list = _lines$reduce2[0],
        type = _lines$reduce2[1],
        content = _lines$reduce2[2];

    if (content || type === '!end') {
      list.push([type, content]);
    }

    if (list.length > 0 && list[0][0] === '!html' && emptyContent(list[0][1])) list = list.slice(1);
    return list.flatMap(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          type = _ref4[0],
          body = _ref4[1];

      return genTryitSection(type) + "<pre class=\"".concat(codeBackground(type), "\">").concat(body, "</pre>");
    }).join('<br/>\n') + '<code>&nbsp;<br><br></code>\n';
  }

  function genTryitSection(type) {
    if (!type) return '';
    return "<div class=\"tryit-section\">".concat(type, "</div>");
  }

  function _indent(s, fn) {
    var i = 0;

    while (s[i] === ' ' || s[i] === '\t') {
      i++;
    }

    return s.substr(0, i) + fn(s.substr(i));
  }

  function codeBackground(type) {
    switch (type) {
      case '!md':
        return 'code-md';

      case '!tryit':
        return 'code-tryit';

      case '!html':
        return 'code-html';

      case '!head':
        return 'code-head';

      case '!end':
        return 'code-end';
    }

    return '';
  }

  function emptyContent(str) {
    if (str === undefined) return true;

    for (var i = 0; i < str.length; i++) {
      var c = str[i];
      if (c !== ' ' && c != '\t' && c !== '\n' && c !== '\r') return false;
    }

    return true;
  }

  function hljsLang(name) {
    switch (name) {
      case '!md':
        return ['markdown', 'html'];

      case '!head':
      case '!tail':
      case '!html':
        return ['html', 'javascript', 'css'];

      case '!js':
        return ['javascript', 'xml'];

      default:
        return undefined;
    }
  }

  function beforeExecute(divName) {
    var $$ = window.$$ || {};
    $$.executeDiv = divName;

    if (typeof $$.beforeExecute === 'function') {
      try {
        $$.beforeExecute(divName);
      } catch (err) {
        console.log(err);
      }
    }
  }

  // import { runLastly } from '../display/lastly';
  // import { setNoDisplay } from '../display/getSetNoDisplay';
  // import _runAll from './_runAll';
  // import execute from './execute';
  // import showPopup from '../display/showPopup';
  // export default function tryIt(divName,editor, toDelay=200) {
  // 	if(!canExecute(divName)) {
  // 		setTimeout(() => _runAll(getPendingEditors(), divName, true), 300);
  // 		return;
  // 	}
  // 	var _err = $e(divName + '-error');
  // 	var _disp = $e(divName + '-display');
  // 	_err.style.display = 'none';
  // 	_err.innerHTML = '';
  // 	//_disp.style.display = "none";
  // 	_disp.innerHTML = '';
  // 	_disp.style['max-height'] = '100rem';
  // 	setNoDisplay(false);
  // 	setTimeout( () => execute(divName, editor, true, true, runLastly),toDelay);
  // }

  function canExecute(tag) {
    var ix = getPendingEditors().indexOf(tag);
    if (ix <= 0) return true;
    showPopup(3, 'Executing all preceeding code snippet, this may take some time'); //showPopup(3,() => jump(getPendingEditors()[0]));
    //jump(getPendingEditors()[0]);

    return false;
  }

  function createCommonjsModule(fn) {
    var module = { exports: {} };
  	return fn(module, module.exports), module.exports;
  }

  const compile = (cst, options = {}) => {
    const keepProtected = options.safe === true || options.keepProtected === true;
    let firstSeen = false;

    const walk = (node, parent) => {
      let output = '';
      let inner;
      let lines;

      for (const child of node.nodes) {
        switch (child.type) {
          case 'block':
            if (options.first && firstSeen === true) {
              output += walk(child);
              break;
            }

            if (options.preserveNewlines === true) {
              inner = walk(child);
              lines = inner.split('\n');
              output += '\n'.repeat(lines.length - 1);
              break;
            }

            if (keepProtected === true && child.protected === true) {
              output += walk(child);
              break;
            }

            firstSeen = true;
            break;

          case 'line':
            if (options.first && firstSeen === true) {
              output += child.value;
              break;
            }

            if (keepProtected === true && child.protected === true) {
              output += child.value;
            }

            firstSeen = true;
            break;

          case 'open':
          case 'close':
          case 'text':
          case 'newline':
          default:
            {
              output += child.value || '';
              break;
            }
        }
      }

      return output;
    };

    return walk(cst);
  };

  var compile_1 = compile;

  class Node {
    constructor(node) {
      this.type = node.type;
      if (node.value) this.value = node.value;
      if (node.match) this.match = node.match;
      this.newline = node.newline || '';
    }

    get protected() {
      return Boolean(this.match) && this.match[1] === '!';
    }

  }

  class Block extends Node {
    constructor(node) {
      super(node);
      this.nodes = node.nodes || [];
    }

    push(node) {
      this.nodes.push(node);
    }

    get protected() {
      return this.nodes.length > 0 && this.nodes[0].protected === true;
    }

  }

  var Node_1 = {
    Node,
    Block
  };

  var languages = createCommonjsModule(function (module, exports) {

    exports.ada = {
      LINE_REGEX: /^--.*/
    };
    exports.apl = {
      LINE_REGEX: /^⍝.*/
    };
    exports.applescript = {
      BLOCK_OPEN_REGEX: /^\(\*/,
      BLOCK_CLOSE_REGEX: /^\*\)/
    };
    exports.csharp = {
      LINE_REGEX: /^\/\/.*/
    };
    exports.haskell = {
      BLOCK_OPEN_REGEX: /^\{-/,
      BLOCK_CLOSE_REGEX: /^-\}/,
      LINE_REGEX: /^--.*/
    };
    exports.html = {
      BLOCK_OPEN_REGEX: /^\n*<!--(?!-?>)/,
      BLOCK_CLOSE_REGEX: /^(?<!(?:<!-))-->/,
      BLOCK_CLOSE_LOOSE_REGEX: /^(?<!(?:<!-))--\s*>/,
      BLOCK_CLOSE_STRICT_NEWLINE_REGEX: /^(?<!(?:<!-))-->(\s*\n+|\n*)/,
      BLOCK_CLOSE_STRICT_LOOSE_REGEX: /^(?<!(?:<!-))--\s*>(\s*\n+|\n*)/
    };
    exports.javascript = {
      BLOCK_OPEN_REGEX: /^\/\*\*?(!?)/,
      BLOCK_CLOSE_REGEX: /^\*\/(\n?)/,
      LINE_REGEX: /^\/\/(!?).*/
    };
    exports.lua = {
      BLOCK_OPEN_REGEX: /^--\[\[/,
      BLOCK_CLOSE_REGEX: /^\]\]/,
      LINE_REGEX: /^--.*/
    };
    exports.matlab = {
      BLOCK_OPEN_REGEX: /^%{/,
      BLOCK_CLOSE_REGEX: /^%}/,
      LINE_REGEX: /^%.*/
    };
    exports.perl = {
      LINE_REGEX: /^#.*/
    };
    exports.php = { ...exports.javascript,
      LINE_REGEX: /^(#|\/\/).*?(?=\?>|\n)/
    };
    exports.python = {
      BLOCK_OPEN_REGEX: /^"""/,
      BLOCK_CLOSE_REGEX: /^"""/,
      LINE_REGEX: /^#.*/
    };
    exports.ruby = {
      BLOCK_OPEN_REGEX: /^=begin/,
      BLOCK_CLOSE_REGEX: /^=end/,
      LINE_REGEX: /^#.*/
    };
    exports.shebang = exports.hashbang = {
      LINE_REGEX: /^#!.*/
    };
    exports.c = exports.javascript;
    exports.csharp = exports.javascript;
    exports.css = exports.javascript;
    exports.java = exports.javascript;
    exports.js = exports.javascript;
    exports.less = exports.javascript;
    exports.pascal = exports.applescript;
    exports.ocaml = exports.applescript;
    exports.sass = exports.javascript;
    exports.sql = exports.ada;
    exports.swift = exports.javascript;
    exports.ts = exports.javascript;
    exports.typscript = exports.javascript;
    exports.xml = exports.html;
  });

  const {
    Node: Node$1,
    Block: Block$1
  } = Node_1;
  const constants = {
    ESCAPED_CHAR_REGEX: /^\\./,
    QUOTED_STRING_REGEX: /^(['"`])((?:\\.|[^\1])+?)(\1)/,
    NEWLINE_REGEX: /^\r*\n/
  };

  const parse = (input, options = {}) => {
    if (typeof input !== 'string') {
      throw new TypeError('Expected input to be a string');
    }

    const cst = new Block$1({
      type: 'root',
      nodes: []
    });
    const stack = [cst];
    const name = (options.language || 'javascript').toLowerCase();
    const lang = languages[name];

    if (typeof lang === 'undefined') {
      throw new Error(`Language "${name}" is not supported by strip-comments`);
    }

    const {
      LINE_REGEX,
      BLOCK_OPEN_REGEX,
      BLOCK_CLOSE_REGEX
    } = lang;
    let block = cst;
    let remaining = input;
    let token;
    let prev;
    const source = [BLOCK_OPEN_REGEX, BLOCK_CLOSE_REGEX].filter(Boolean);
    let tripleQuotes = false;

    if (source.every(regex => regex.source === '^"""')) {
      tripleQuotes = true;
    }
    /**
     * Helpers
     */


    const consume = (value = remaining[0] || '') => {
      remaining = remaining.slice(value.length);
      return value;
    };

    const scan = (regex, type = 'text') => {
      const match = regex.exec(remaining);

      if (match) {
        consume(match[0]);
        return {
          type,
          value: match[0],
          match
        };
      }
    };

    const push = node => {
      if (prev && prev.type === 'text' && node.type === 'text') {
        prev.value += node.value;
        return;
      }

      block.push(node);

      if (node.nodes) {
        stack.push(node);
        block = node;
      }

      prev = node;
    };

    const pop = () => {
      if (block.type === 'root') {
        throw new SyntaxError('Unclosed block comment');
      }

      stack.pop();
      block = stack[stack.length - 1];
    };
    /**
     * Parse input string
     */


    while (remaining !== '') {
      // escaped characters
      if (token = scan(constants.ESCAPED_CHAR_REGEX, 'text')) {
        push(new Node$1(token));
        continue;
      } // quoted strings


      if (block.type !== 'block' && (!prev || !/\w$/.test(prev.value)) && !(tripleQuotes && remaining.startsWith('"""'))) {
        if (token = scan(constants.QUOTED_STRING_REGEX, 'text')) {
          push(new Node$1(token));
          continue;
        }
      } // newlines


      if (token = scan(constants.NEWLINE_REGEX, 'newline')) {
        push(new Node$1(token));
        continue;
      } // block comment open


      if (BLOCK_OPEN_REGEX && options.block && !(tripleQuotes && block.type === 'block')) {
        if (token = scan(BLOCK_OPEN_REGEX, 'open')) {
          push(new Block$1({
            type: 'block'
          }));
          push(new Node$1(token));
          continue;
        }
      } // block comment close


      if (BLOCK_CLOSE_REGEX && block.type === 'block' && options.block) {
        if (token = scan(BLOCK_CLOSE_REGEX, 'close')) {
          token.newline = token.match[1] || '';
          push(new Node$1(token));
          pop();
          continue;
        }
      } // line comment


      if (LINE_REGEX && block.type !== 'block' && options.line) {
        if (token = scan(LINE_REGEX, 'line')) {
          push(new Node$1(token));
          continue;
        }
      } // Plain text (skip "C" since some languages use "C" to start comments)


      if (token = scan(/^[a-zABD-Z0-9\t ]+/, 'text')) {
        push(new Node$1(token));
        continue;
      }

      push(new Node$1({
        type: 'text',
        value: consume(remaining[0])
      }));
    }

    return cst;
  };

  var parse_1 = parse;

  /*!
   * strip-comments <https://github.com/jonschlinkert/strip-comments>
   * Copyright (c) 2014-present, Jon Schlinkert.
   * Released under the MIT License.
   */
  var stripComments = createCommonjsModule(function (module) {
    /**
     * Strip all code comments from the given `input`, including protected
     * comments that start with `!`, unless disabled by setting `options.keepProtected`
     * to true.
     *
     * ```js
     * const str = strip('const foo = "bar";// this is a comment\n /* me too *\/');
     * console.log(str);
     * // => 'const foo = "bar";'
     * ```
     * @name  strip
     * @param  {String} `input` string from which to strip comments
     * @param  {Object} `options` optional options, passed to [extract-comments][extract-comments]
     * @option {Boolean} [options] `line` if `false` strip only block comments, default `true`
     * @option {Boolean} [options] `block` if `false` strip only line comments, default `true`
     * @option {Boolean} [options] `keepProtected` Keep ignored comments (e.g. `/*!` and `//!`)
     * @option {Boolean} [options] `preserveNewlines` Preserve newlines after comments are stripped
     * @return {String} modified input
     * @api public
     */

    const strip = module.exports = (input, options) => {
      const opts = { ...options,
        block: true,
        line: true
      };
      return compile_1(parse_1(input, opts), opts);
    };
    /**
     * Strip only block comments.
     *
     * ```js
     * const strip = require('..');
     * const str = strip.block('const foo = "bar";// this is a comment\n /* me too *\/');
     * console.log(str);
     * // => 'const foo = "bar";// this is a comment'
     * ```
     * @name  .block
     * @param  {String} `input` string from which to strip comments
     * @param  {Object} `options` pass `opts.keepProtected: true` to keep ignored comments (e.g. `/*!`)
     * @return {String} modified string
     * @api public
     */


    strip.block = (input, options) => {
      const opts = { ...options,
        block: true
      };
      return compile_1(parse_1(input, opts), opts);
    };
    /**
     * Strip only line comments.
     *
     * ```js
     * const str = strip.line('const foo = "bar";// this is a comment\n /* me too *\/');
     * console.log(str);
     * // => 'const foo = "bar";\n/* me too *\/'
     * ```
     * @name  .line
     * @param  {String} `input` string from which to strip comments
     * @param  {Object} `options` pass `opts.keepProtected: true` to keep ignored comments (e.g. `//!`)
     * @return {String} modified string
     * @api public
     */


    strip.line = (input, options) => {
      const opts = { ...options,
        line: true
      };
      return compile_1(parse_1(input, opts), opts);
    };
    /**
     * Strip the first comment from the given `input`. Or, if `opts.keepProtected` is true,
     * the first non-protected comment will be stripped.
     *
     * ```js
     * const output = strip.first(input, { keepProtected: true });
     * console.log(output);
     * // => '//! first comment\nfoo; '
     * ```
     * @name .first
     * @param {String} `input`
     * @param {Object} `options` pass `opts.keepProtected: true` to keep comments with `!`
     * @return {String}
     * @api public
     */


    strip.first = (input, options) => {
      const opts = { ...options,
        block: true,
        line: true,
        first: true
      };
      return compile_1(parse_1(input, opts), opts);
    };
    /**
     * Parses a string and returns a basic CST (Concrete Syntax Tree).
     *
     * ```js
     * const strip = require('..');
     * const str = strip.block('const foo = "bar";// this is a comment\n /* me too *\/');
     * console.log(str);
     * // => 'const foo = "bar";// this is a comment'
     * ```
     * @name  .block
     * @param  {String} `input` string from which to strip comments
     * @param  {Object} `options` pass `opts.keepProtected: true` to keep ignored comments (e.g. `/*!`)
     * @return {String} modified string
     * @api public
     */


    strip.parse = parse_1;
  });

  /**
   * Transforms to perform on the source before executing code
   *
   * This is to support the fact that TryITjs uses eval to do its magic
   * and certain code patterns do not work correctly
   */
  function stripComments$1(source) {
    return stripComments(source);
  }
  function transformClass(source) {
    return source.replace(/^\s*class\s+([A-Za-z_$][A-Za-z0-9_$]*)(\s|\n)*\{/mg, 'var $1 = class {');
  }
  var transforms = [];
  function initTransform() {
    transforms = [];
  }
  function applyTransform(source) {
    return transforms.reduce(function (src, fn) {
      return fn(src, source);
    }, source);
  }
  function addTransform(fn) {
    transforms.push(fn);
    return fn;
  } // {stripComments, transformClass, initTransform, applyTransform, addTransform}

  var codeTransform = {
    comment: stripComments$1,
    class: transformClass,
    init: initTransform,
    applyTransform: applyTransform,
    add: addTransform
  };

  function jsxCompiler(s) {
    if (!s) return '';
    if (s.match(/<\/|\/>/)) return jsxLoader.compiler.compile(applyTransform(s));else return applyTransform(s);
  }

  function render(val) {
    var lastExecTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    if (arguments.length > 0) _show(val);

    var _displayStack = getDisplayStack();

    var promises = _displayStack.map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          p = _ref2[0];

      return p;
    });

    var types = _displayStack.map(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          type = _ref4[1];

      return type;
    });

    var resPromise = Promise.all(promises).then(function (list) {
      if (!getNoDisplay()) {
        var res = list.map(function (v, i) {
          return [v, types[i]];
        });
        return Promise.resolve('<div class="ui accordion">' + '<div class="active title"><i class="dropdown icon"></i>Results ( ' + round2(lastExecTime) + ' ms)</div>' + '<div class="active content">' + res.map(function (_ref5) {
          var _ref6 = _slicedToArray(_ref5, 2),
              v = _ref6[0],
              type = _ref6[1];

          return type === 'h' ? v : display(v);
        }).join('\n') + '</div></div>');
      } else return Promise.resolve(undefined);
    });
    clearDisplay();
    return resPromise;
  }

  function round2(time) {
    return Math.round(time * 100.0) / 100.0;
  }

  function replaceCSSClass(tag) {
    var __editorsPending = getPendingEditors();

    var ix = getPendingEditors().indexOf(tag);
    if (ix !== 0) return false;
    __editorsPending = __editorsPending.slice(1); // 

    setPendingEditors(__editorsPending);
    var divName = __editorsPending[0];

    if (divName) {
      var elm = addRemoveCSSclass(divName, 'yellow', 'green');
      if (!isEmpty(elm)) elm.dataset.tooltip = 'Execute Script (Ctrl+Enter)';
    }

    return true;
  }

  var jmp = function (divName) {
    var loc = divName + '-display';
    console.log('jump', loc);
    var elem = $e(loc);

    if (elem) {
      console.log('elem.offsetTop-30', window.scrollY, elem.offsetTop);
      window.scrollTo({
        top: window.scrollY + elem.offsetTop + 40,
        left: 0,
        behavior: 'smooth'
      });
    } else console.log('jmp: loc', loc, 'not found');
  };

  function updateUI(divName) {
    var toJump = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    replaceCSSClass(divName);

    var elm = _addRemoveCSSclass(divName + '-run', ['green', 'yellow'], 'blue');

    if (!isEmpty(elm)) elm.dataset.tooltip = 'Re-Execute Script (Ctrl+Enter)';
    if (toJump) setTimeout(function () {
      return jmp(divName);
    }, 0);
  }

  function execute(divName, editor, toUpdateUI, toJump, callback) {
    try {
      //CHANGED = true;
      var t0 = performance.now();
      beforeExecute(divName);
      var displaySeg = $e(divName + '-display');
      var output = $e(divName + '-output');
      var boundingSeg = output.closest('.tryit-inner');
      boundingSeg.closest('.tryit-inner').style.setProperty('margin-bottom', '-1.9rem');
      output.style.display = 'block';
      jsxLoader.compiler.addUseStrict = false;
      var val = (1, eval)(jsxCompiler(editor.getValue('\n'))); // execute script in global context

      var lastExecTime = performance.now() - t0;

      var show = function (val) {
        return displaySeg.innerHTML = val;
      };

      displaySeg.style.display = 'block';
      render(val, lastExecTime).then(function (res) {
        if (res !== undefined) show(res);
        if (toUpdateUI) updateUI(divName);
        if (callback) callback();
        $('.ui.accordion').accordion();
      });
    } catch (e) {
      var err = $e(divName + '-error');
      err.innerText = e.toString() + e.stack.toString();
      err.style.display = 'block';
      console.log(e.stack);
      clearDisplay();
      setTimeout(function () {
        return jump(divName);
      }, 0);
    }
  }

  function progress(action, maxV) {
    var $progress = $('.execution.progress .ui.progress');

    switch (action) {
      case 'init':
        {
          //alert('init '+maxV);
          $progress.progress({
            total: maxV,
            text: {
              active: '{value} of {total} done'
            }
          });
          $progress.progress('reset');
          $progress.data('value', 1);
          $progress.data('total', maxV);
          $progress.data('tryitdelay', maxV > 5 ? 1500 : 500);
          $('.execution.progress').css('display', 'block');
          break;
        }

      case 'step':
        {
          //alert('step');
          $progress.progress('increment');
          break;
        }

      case 'done':
        {
          var delay = $progress.data('tryitdelay');
          setTimeout(function () {
            return $('.execution.progress').css('display', 'none');
          }, delay);
        }
    }
  }

  function tryIt$2(divName, editor) {
    var toDelay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;

    var __editorsPending = getPendingEditors();

    if (!canExecute(divName)) {
      setTimeout(function () {
        return _runAll(__editorsPending, divName, true);
      }, 300);
      return;
    }

    var _err = $e(divName + '-error');

    var _disp = $e(divName + '-display');

    _err.style.display = 'none';
    _err.innerHTML = ''; //_disp.style.display = "none";

    _disp.innerHTML = '';
    _disp.style['max-height'] = '100rem';
    setNoDisplay(false);
    setTimeout(function () {
      return execute(divName, editor, true, true, runLastly);
    }, toDelay);
  }
  function _runAll(list, item, toInit) {
    var _list = _toArray(list),
        divName = _list[0],
        newList = _list.slice(1);

    if (toInit) {
      var ix = list.indexOf(item);
      if (ix === -1) ix = list.length - 1;
      progress('init', ix);
    }

    if (item === divName) {
      var editor = editorFor[divName];
      progress('done');
      setTimeout(function () {
        return tryIt$2(divName, editor);
      }, 200);
      return;
    }

    var _code;

    try {
      console.log('run all ' + divName);
      setNoDisplay(true);
      var _editor = editorFor[divName];

      if (!item) {
        console.log('item ' + divName + 'not found');
        progress('done');
        return;
      }

      beforeExecute(divName);
      jsxLoader.compiler.addUseStrict = false;
      _code = _editor.getValue('\n');
      var val = (1, eval)(jsxCompiler(_code)); // execute script in global context(_code);

      render(val).then(function () {
        //replaceCSSClass(divName, false);
        updateUI(divName, false);
        progress('step');
        setTimeout(function () {
          return _runAll(newList, item);
        }, 1);
      }).catch(function (e) {
        return clearLastly(), progress('done'), alert(e);
      });
    } catch (e) {
      var err = $e(divName + '-error');
      err.innerText = e.toString() + e.stack.toString() + '\n\ndiv:' + divName + '\n-------------------------\n' + asHTML(_code);
      err.style.display = 'block';
      progress('done');
      console.log(e.stack);
      clearDisplay();
      clearLastly();
      setTimeout(function () {
        return jump(divName);
      }, 0);
    }
  }

  /**
   * Revert all user changes to scripts to the original script data
   * @return {void} returns nothing
   */

  function revertChanges() {
    Object.keys(editorFor).forEach(function (id) {
      var originalText = $e(id).value;
      var editor = editorFor[id];
      editor.setValue(originalText);
      var theme = tryit$colors.original;
      editor.setOption('theme', theme);
      editor.tryitState = theme;
    });
  }

  function clearStorage() {
    if (confirm('Are you sure you want to clear saved edits')) {
      delete window.localStorage[WINDOW_LOCATION];
      revertChanges();
      console.log('All saved edits removed');
    }
  }

  function setEditorValue(id) {
    var editor = editorFor[id];
    var v = editor.getValue('\n');
    var editorData = getEditorData();
    var originalContents = $e(id).value;

    if (v !== originalContents) {
      editorData[id] = {
        key: id,
        hash: sha1(originalContents),
        content: v
      };
      var theme = tryit$colors.saved;
      editor.setOption('theme', theme);
      editor.tryitState = theme;
    }

    return editorData;
  }

  /**
   * Save content of editor named
   * @param  {[type]} id [description]
   * @return {[type]}    [description]
   */

  function save(id) {
    window.localStorage[WINDOW_LOCATION] = JSON.stringify(setEditorValue(id));
  }

  /**
   * Save data from all the editors
   * @return {undefined} no return vales
   */

  function saveAll() {
    setEditorData({}); // clear out 

    Object.keys(editorFor).forEach(function (id) {
      setEditorValue(id);
    });
    var editorData = getEditorData();
    window.localStorage[WINDOW_LOCATION] = JSON.stringify(editorData);
    alert('Save All');
  }

  function gMakeEditor() {
    getPageInfo(); // let pageInfo = pi.pageInfo;
    // let allEditors = pi.allEditors;

    qsA('div[data-pagevisible="true"]').forEach(function (e) {
      return setDisplay(e, 'false');
    }); //			setDisplay(qs('div[data-pagevisible]'),'true');

    (qs('.save_all') || {}).onclick = saveAll;
    (qs('.clear_storage') || {}).onclick = clearStorage;
    (qs('.revert_changes') || {}).onclick = revertChanges;
    qsA('.jump_next').forEach(function (n) {
      var id = n.id.substr(5);

      n.onclick = function () {
        return jump(id);
      };

      n.dataset.tooltip = 'Jump to next script';
    });
    qsA('.jump_back').forEach(function (n) {
      n.onclick = jumpback;
      n.dataset.tooltip = 'Jump to ready to execute script';
    });
    qsA('.run_all').forEach(function (n) {
      var id = n.id.substr(3);

      n.onclick = function () {
        return _runAll(getPendingEditors(), 'tryit' + id, true);
      };
    });
    qsA('.save_data').forEach(function (n) {
      var id = n.id.substr(5);

      n.onclick = function () {
        return save('tryit' + id);
      };

      n.dataset.tooltip = 'Save this script';
    }); //_addRemoveCSSclass('ra_1',"green", "grey").style ="display: none";
  }

  /*
     Perform custom highlighting for TryitJS code
   */
  function highlightCodeBlock(block) {
    if (!window.$$) throw new Error('$$ not set up');
    var $$ = window.$$;
    if (!block || !hljs || !window.$$) return;

    if (block.classList.contains('language-tryit')) {
      var _lines = (unescape(block.innerText) || '').split('\n');

      block.innerHTML = $$.codeHighlight(_lines);
    } else hljs.highlightBlock(block);
  }

  function unescape(s) {
    return s.replace(/~~lt%%|~~gt%%|~~amp%%|"~~code%%"/g, function (c) {
      switch (c) {
        case '~~lt%%':
          return '<';

        case '~~gt%%':
          return '>';

        case '~~amp%%':
          return '&';

        case '~~code%%':
          return '```';
      }
    });
  }

  /**
   * [showPopup description]
   * @param  {[type]} timeout [description]
   * @param  {[type]} msg     [description]
   * @param  {[type]} type    [description]
   * @param  {[type]} action  [description]
   * @return {[type]}         [description]
   */

  function showPopup$1(timeout, msg, type, action) {
    action = action || Identity;
    alertify.notify(msg || 'Executing all preceeding code snippet, this may take some time', type || 'error', timeout, action);
  }

  function getAllEditors() {
    return getPageInfo().allEditors;
  }

  /**
   * Check if any editor has unsaved changes
   * 
   * @return {boolean} `true` - unsaved changes, `false` otherwise
   */

  function unsavedChanges() {
    try {
      return getAllEditors().some(function (e) {
        return !e.isClean();
      });
    } catch (e) {
      return true;
    }
  }

  setupPageInfo(tryIt$2); // break circular reference

  setupMakeEditor(tryIt$2); // break circular reference

  window.onbeforeunload = function () {
    if (unsavedChanges()) return 'You have made changes on this page that you have not yet confirmed. If you navigate away from this page you will lose your unsaved changes';
  };

  document.addEventListener('DOMContentLoaded', function () {
    // check if we have highlightings then highlight TryitJS code snippets	
    if (hljs) {
      qsA('pre code.language-tryit').forEach(highlightCodeBlock);
      qsA('pre code.language-js').forEach(highlightCodeBlock);
      qsA('pre code.language-javascript').forEach(highlightCodeBlock);
    }

    gMakeEditor();
    var allPages = qsA('div[data-pagevisible]'); // show only the first page

    allPages.forEach(function (elem, i) {
      return i !== 0 ? setDisplay(elem, 'false') : '';
    });
    qsA('.page_prev').forEach(function (e) {
      e.onclick = pagePrev;
      e.dataset.tooltip = 'Go to previous page (Key: 🡄)';
    });
    qsA('.page_next').forEach(function (e) {
      e.onclick = pageNext;
      e.dataset.tooltip = 'Go to next page (Key: 🡆)';
    });
    $('pre:has(code.language-tryit)').addClass('language-tryit');

    if (location.hash) {
      setTimeout(function () {
        return jumpTag(location.hash.substr(1), false);
      }, 0);
    } else {
      setTimeout(function () {
        return jumpTag('page-1', false);
      }, 0);
    }
  });
  document.addEventListener('keydown', keydown);
  qsA('button').forEach(function (el) {
    return el.addEventListener('keydown', keydown);
  });

  function keydown(event) {
    var LeftArrow = 37,
        RightArrow = 39;
    var activeElement = document.activeElement;

    if (navigator.platform === 'MacIntel' ? event.metaKey : event.ctrlKey && event.key === 's') {
      event.preventDefault();
      saveAll(); // ... your code here ...
    } else if ((activeElement === document.body || isTag(activeElement, 'button')) && (event.keyCode === LeftArrow
    /*KeyLeft */
    || event.keyCode === RightArrow
    /*key right */
    )) {
      var keyCode = event.keyCode;
      var p = qs('div.try-page[data-pagevisible=true]');
      var elem = p && p.querySelector(keyCode == LeftArrow ? '.page_prev' : '.page_next');

      if (!elem) {
        showPopup$1(1, keyCode == RightArrow ? 'Last Page' : 'First Page', 'success');
      }

      elem && (event.preventDefault(), elem.onclick());
    }
  }

  window.addEventListener('popstate', function (e) {
    var _hash = e.target.location.hash.substr(1);

    console.log(e);

    if (_hash && LAST_TARGET !== _hash) {
      jumpTag(_hash, 20, undefined, true);
    }
  });
  var init = {
    LAST_TARGET: LAST_TARGET
  };

  var $$ = {
    codeHighlight: codeHighlight,
    D: _show,
    D2: _displayEval,
    HTML: pushDisplay,
    show: _show,
    clear: clearDisplay,
    render: render,
    objInfo: objInfo,
    executeDiv: '',
    // the tryit div being executed
    beforeExecute: function beforeExecute() {
      return init;
    },
    // placeholder 
    H: H,
    lastly: _lastly,
    // pass a function after all items have been displayed, this call be called several
    // times, the actions are performed in the order they are posted
    json: function json$1() {
      for (var _len = arguments.length, v = new Array(_len), _key = 0; _key < _len; _key++) {
        v[_key] = arguments[_key];
      }

      return _show.apply(void 0, _toConsumableArray(v.map(json)));
    },
    prettyPrint: prettyPrint,
    codeTransform: codeTransform //: {comment: stripComments, class: transformClass, init: initTransform, applyTransform, add: addTransform} 

  };
  window.$$ = $$;
  var toExport = {
    gMakeEditor: gMakeEditor,
    $$: $$,
    //display interface
    jumpTag: _jumpTag,
    jumpBack: jumpBack,
    _display: display,
    getPendingEditors: getPendingEditors,
    pagePrev: pagePrev,
    pageNext: pageNext,
    asArray: asArray,
    saveAll: saveAll,
    qs: qs,
    qsA: qsA,
    //pageVisibleBefore,
    showPopup: showPopup$1,
    unsavedChanges: unsavedChanges,
    H: H,
    escapeHTML: asHTML
  };
  Object.keys(toExport).forEach(function (k) {
    return window[k] = toExport[k];
  });

  return toExport;

})));
