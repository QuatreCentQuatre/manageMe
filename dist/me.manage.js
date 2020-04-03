"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * ManageMe 2.0.0 (https://github.com/QuatreCentQuatre/manageMe/)
 * Make view system usage easy
 *
 * Licence :
 *  - GNU v2
 *
 * Methods:
 * 	- setOptions(options)
 * 	- getOptions()
 * 	- initViews($rootElement = $('html'))
 * 	- clearViews()
 * 	- toString()
 *
 */
var ViewManager = /*#__PURE__*/function () {
  function ViewManager(options) {
    _classCallCheck(this, ViewManager);

    this.name = "ViewManager";
    this.defaults = {};
    this.views = [];
    this.options = {};
    this.setOptions(options);
  }

  _createClass(ViewManager, [{
    key: "setOptions",
    value: function setOptions(options) {
      this.options = Object.assign(this.options, this.defaults, options);
    }
  }, {
    key: "getOptions",
    value: function getOptions() {
      return this.options;
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

  }, {
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
        viewParams.params.data = viewData ? JSON.parse(viewData) : {};
        /* Create instance of the view */

        var view = new Me.views[viewName](viewParams);
        /* Keep reference of the global view in this class */

        this.views.push(view);
        /* Assign the view in an array to initialize them later */

        newViews.push(view);
      }
      /* Initialize all new views*/


      for (var j = 0; j < newViews.length; j++) {
        newViews[j].initialize();
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