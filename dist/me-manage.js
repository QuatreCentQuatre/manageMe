"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * ManageMe 3.1.0 (https://github.com/QuatreCentQuatre/manageMe/)
 * Make view system usage easy
 *
 * Licence :
 *  - GNU v2
 *
 * Methods:
 * 	- initViews($rootElement = $('html'))
 * 	- clearViews()
 * 	- toString()
 *
 */
var ViewManager = /*#__PURE__*/function () {
  function ViewManager() {
    _classCallCheck(this, ViewManager);

    this.name = "ViewManager";
    this.views = [];
  }
  /*
  *
  * initViews($rootElement)
  * - Will init all views
  *
  * Params:
  * - $rootElement : Accept one parameter to define where the search of views will start in the DOM
  *
  * Output:
  * No output
  *
  * Results:
  * It will instantiate all views in DOM and trigger their init once they are all created.
  *
  * */


  _createClass(ViewManager, [{
    key: "initViews",
    value: function initViews() {
      var $rootElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $('html');
      this.clearViews();
      var views = $rootElement.find('[me\\:view]');
      var newViews = [];

      for (var i = 0; i < views.length; i++) {
        var $view = $(views[i]);
        var viewName = $view.attr('me:view');
        var viewParams = {
          el: $view[0],
          name: viewName,
          params: {}
        };
        /* Look if the view is valid */

        if (typeof Me.views[viewName] !== "function") {
          console.warn("You need to have view that exist.", viewName);
          continue;
        }
        /* Look if the view has already been rendered */


        if ($view.attr('me:view:render')) {
          continue;
        }

        $view.attr('me:view:render', "true");
        /* Add data to view */

        var viewData = $view.attr('me:view:data');
        viewParams.params = viewData ? JSON.parse(viewData) : {};
        /* Create instance of the view */

        var _view = new Me.views[viewName](viewParams);
        /* Keep reference of the global view in this class */


        this.views.push(_view);
        /* Assign the view in an array to initialize them later */

        newViews.push(_view);
      }
      /* Initialize all new views*/


      for (var _i in newViews) {
        newViews[_i].initialize();
      }

      for (var _i2 in newViews) {
        var view = newViews[_i2];

        if (!view.afterAllViewInitialized) {
          view.afterAllViewInitialize();
          view.afterAllViewInitialized = true;
        }
      }
    }
    /*
    *
    * clearViews()
    * - To clear unused views
    *
    * Params:
    * None
    *
    * Output:
    * None
    *
    * Results:
    * It will delete all unused views and refresh the current views array
    *
    * */

  }, {
    key: "clearViews",
    value: function clearViews() {
      var activeViews = [];

      for (var i in this.views) {
        var view = this.views[i];

        if (_typeof(view.$el) == "object") {
          var selector = $('html').find(view.$el[0]);

          if (selector.length > 0) {
            activeViews.push(view);
          } else {
            view.terminate();
          }
        }
      }

      this.views = activeViews;
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.name;
    }
  }]);

  return ViewManager;
}();

if (!window.Me) {
  window.Me = {};
}

Me.manage = new ViewManager();
Me.views = [];
$(document).ready(function () {
  Me.manage.initViews();
});
/*
 * ViewBasic 3.1.0 (https://github.com/QuatreCentQuatre/manageMe/)
 * Basic view for your view system of manageMe
 *
 * Licence :
 *  - GNU v2
 *
 * Methods:
 * 	- default()
 * 	- initialize()
 *  - afterAllViewInitialize()
 * 	- addEvents()
 * 	- removeEvents()
 * 	- terminate()
 * 	- $(selector)
 * 	- toString()
 *
 */

var ViewBasic = /*#__PURE__*/function () {
  _createClass(ViewBasic, [{
    key: "defaults",

    /*
    *
    * When manage me create an instance of a view, it will pass in this constructor first.
    *
    * If you add any data in me.manage.js in initView, make sure to add the data in the constructor.
    *
    * */

    /*
    *
    * defaults()
    * - Can be overwrite. This method will be called in the constructor of the base view. You need to set default object
    *
    * Params:
    * None
    *
    * Output:
    * None
    *
    * Results:
    * The returned object, will be merge with the params value;
    *
    * */
    value: function defaults() {
      return {};
    }
  }]);

  function ViewBasic(options) {
    _classCallCheck(this, ViewBasic);

    this.name = options.name ? options.name : 'ViewBasic';
    this.options = {
      debug: SETTINGS.DEBUG_MODE ? SETTINGS.DEBUG_MODE : false
    };
    this.el = options.el;
    this.$el = $(options.el);
    this.params = Object.assign(this.defaults(), options.params);
  }
  /*
  *
  * initialize()
  * - Can be overwrite. This method will be called once all views are created
  *
  * Params:
  * None
  *
  * Output:
  * None
  *
  * Results:
  * You're view will be initialize .
  *
  * */


  _createClass(ViewBasic, [{
    key: "initialize",
    value: function initialize() {
      this.addEvents();
    }
  }, {
    key: "afterAllViewInitialize",

    /*
    *
    * afterAllViewInitialize()
    * - Can be overwrite. This method will be called once all views are initialized
    *
    * Params:
    * None
    *
    * Output:
    * None
    *
    * Results:
    * Code inside will be run after all view in DOM are initialized
    *
    * */
    value: function afterAllViewInitialize() {}
  }, {
    key: "addEvents",

    /*
    *
    * addEvents
    * - Where you should add your events
    *
    * Params:
    * None
    *
    * Output:
    * None
    *
    * Results:
    * All your events will be ready
    *
    * */
    value: function addEvents() {}
  }, {
    key: "removeEvents",

    /*
    *
    * removeEvents
    * - Where you need to remove all events;
    *
    * Params:
    * None
    *
    * Output:
    * None
    *
    * Results:
    * No more event exist
    *
    * */
    value: function removeEvents() {}
  }, {
    key: "terminate",

    /*
    *
    * terminate
    * - When you call clearViews in manageMe, views that don't exist anymore will trigger this function.
    *
    * Params:
    * None
    *
    * Output:
    * None
    *
    * Results:
    * Clear everything that's in the view. Don't forget to remove all events!
    *
    * */
    value: function terminate() {
      this.removeEvents();
    }
  }, {
    key: "$",

    /*
    *
    * $(selector)
    * - Let you search in your view DOM like in jquery but only in your view not in all DOM.
    *
    * Params:
    * - selector : What selector to look for
    *
    * Output:
    * The selector you were looking for
    *
    * */
    value: function $(selector) {
      return this.$el.find(selector);
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.name;
    }
  }]);

  return ViewBasic;
}();

Me.views['ViewBasic'] = ViewBasic;