"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * ViewBasic 1.0.0 (https://github.com/QuatreCentQuatre/manageMe/)
 * Basic view for your view system of manageMe
 *
 * Licence :
 *  - GNU v2
 *
 * Methods:
 * 	- initialize()
 * 	- addEvents()
 * 	- removeEvents()
 * 	- terminate()
 * 	- $(selector)
 * 	- toString()
 *
 */
var ViewBasic = /*#__PURE__*/function () {
  /*
  *
  * When manage me create an instance of a view, it will pass in this constructor first.
  *
  * If you add any data in me.manage.js in initView, make sure to add the data in the constructor.
  *
  * */
  function ViewBasic(options) {
    _classCallCheck(this, ViewBasic);

    this.name = options.name ? options.name : 'ViewBasic';
    this.options = {
      debug: SETTINGS.DEBUG_MODE ? SETTINGS.DEBUG_MODE : false
    };
    this.el = options.el;
    this.$el = $(options.el);
    this.params = options.params ? options.params : {};
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