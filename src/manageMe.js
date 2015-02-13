/*
 * ManageMe 1.0 (https://github.com/QuatreCentQuatre/manageMe/)
 * make view system easily
 *
 * Licence : GLP v2
 *
 * Dependencies :
 * 	- HelpMe (https://github.com/QuatreCentQuatre/helpMe/)
 *
 * Methods :
 *  - Constructor :
 *  	- __construct : inital method
 *  	- __dependencies : check any depency support and send some errors
 *
 * 	- Public :
 * 		-
 *
 * 	- Private :
 *		-
 *
 * Updates Needed :
 *
 * */

(function($, window, document, undefined){
	var ManageMe = function(options){
		this.__construct(options);
	};
	var proto = ManageMe.prototype;

	/* -------- DEFAULTS OPTIONS ------- */
	proto.__name     = "ManageMe";
	proto.__version  = 1.0;

	proto.__defaults = {
	};

	proto.__views = {};

	/* --------- PUBLIC METHODS -------- */
	proto.__construct = function(options) {
		if (!this.__dependencies()) {
			return this;
		}
		this.options = _.extend({}, this.__defaults);
		this.setOptions(options);
		return this;
	};

	proto.__dependencies = function() {
		var isOk = true;
		if (!Me.help) {
			console.warn(proto.__name + " :: " + "required underscore (https://github.com/QuatreCentQuatre/helpMe)");
			isOk = false;
		}
		return isOk;
	};

	proto.setOptions = function(options) {
		if (!this.__dependencies()) {
			return this;
		}
		this.options = _.extend(this.options, options);
		return this;
	};

	proto.getOptions = function() {
		if (!this.__dependencies()) {
			return this;
		}
		return this.options;
	};

	proto.initViews = function($el) {
		var $views = $el.find('[me-view]');
		for (var i = 0; i < $views.length; i++) {
			var $el = $($views[i]);
			if ($el.attr('me-view-render')) {
				continue;
			}
			$el.attr('me-view-render', true);
			var viewName = $el.attr('me-view');
			if (typeof window[viewName] !== "function") {
				console.warn("You need to have view that exist.", viewName);
				continue;
			}

			var viewParams = {
				el:$el[0],
				__name:viewName
			};

			var viewData = $el.attr('me-view-data');
			var realData = false;
			if (viewData) {
				var newData;
				if (viewData.indexOf(',') != -1) {
					newData = {};
					viewData = viewData.replace(/ /g, '');
					viewData = viewData.split(',');
					_.each(viewData, function(item, index){
						item = item.split(':');
						if (item[1].indexOf('[') != -1) {
							newData[item[0]] = [item[1].replace('[', '').replace(']', '')];
						}
						newData[item[0]] = item[1];
					});
					viewData = newData;
					realData = false;
				} else if (viewData.indexOf('.')) {
					viewData = viewData.split('.');
					newData = window;
					_.each(viewData, function(item, index) {
						if (newData[item]) {
							newData = newData[item];
						} else {
							newData = {};
						}
					});

					if (newData) {
						realData = true;
						viewData = _.extend({}, newData);
					}
				}

				if (realData) {
					viewParams.options = _.extend({}, viewData);
				}
			}

			var viewInstance = new window[viewName](viewParams);
			//proto.__views[viewInstance.uid] = viewInstance;
		}
	};

	proto.toString = function() {
		return this.__name;
	};

	var privateMethods = {
	};

	if(!window.Me) {
		window.Me = {};
	}

	Me.manage = new ManageMe();
	$(document).ready(function(){
		Me.manage.initViews($('body'));
	});
}(jQuery, window, document));

(function($, window, document, undefined){
	var View = function(options){
		this.__construct(options);
	};
	var proto = View.prototype;

	/* -------- DEFAULTS OPTIONS ------- */
	proto.__name     = "View";
	proto.__version  = 1.0;

	proto.__defaults = {
		el:'',
		tagName:'div',
		id:'',
		className:'',
		attributes:{},
		events:{},
		debug:false
	};

	proto.options = {};

	var viewProps = ['__name', 'el', 'tagName', 'id', 'className', 'attributes', 'events', 'debug'];
	/* --------- PUBLIC METHODS -------- */
	proto.__construct = function(options) {
		if (!this.__dependencies()) {
			return this;
		}
		this.setOptions(options);
		this.setElement();
		if (!this.el || this.el == "") {
			if (this.debug) {
				console.warn("Your view el doesn't exist.");
			}
			return this;
		}
		//this.addEvents();
		this.initialize.apply(this, arguments);
		return this;
	};

	proto.__dependencies = function() {
		var isOk = true;
		return isOk;
	};

	proto.setOptions = function(opt) {
		this.uid = _.uniqueId('view-');
		var settings = _.extend({}, this.__defaults, this.options, opt);
		var options = {};
		for (var i in settings) {
			var obj = {};
			obj[i] = settings[i];
			if (i == "options") {
				_.each(obj.options, function(item, index) {
					var spec = {};
					spec[index] = item;
					options = _.extend({}, options, spec);
				});
			} else if (viewProps.indexOf(i) != -1) {
				_.extend(this, {}, obj);
			} else {
				options = _.extend({}, options, obj);
			}
		}
		this.options = options;
		return this;
	};

	proto.setElement = function() {
		if (this.$el) {return this;}
		if (!this.el) {
			var attrs = _.extend({}, _.result(this, 'attributes'));
			if (this.id) attrs.id = _.result(this, 'id');
			if (this.className) attrs['class'] = _.result(this, 'className');
			this.$el = $('<' + _.result(this, 'tagName') + '>').attr(attrs);
			this.el = this.$el[0];
		} else {
			this.$el = $(this.el);
		}
		return this;
	};

	proto.toString = function() {
		return this.__name;
	};

	/* Make a jquery request to find element in scope of the view */
	proto.$ = function(selector) {
		return this.$el.find(selector);
	};

	proto.html = function(html) {
		return this.$el.html(html);
	};

	/* Function that need to be overwrite */
	proto.initialize = function() {};
	proto.render = function() {};

	var privateMethods = {
	};

	var extend = function(protoProps, staticProps) {
		var parent = this;
		var child;
		// The constructor function for the new subclass is either defined by you
		// (the "constructor" property in your `extend` definition), or defaulted
		// by us to simply call the parent's constructor.
		if (protoProps && _.has(protoProps, 'constructor')) {
			child = protoProps.constructor;
		} else {
			child = function(){ return parent.apply(this, arguments); };
		}

		// Add static properties to the constructor function, if supplied.
		_.extend(child, parent, staticProps);

		// Set the prototype chain to inherit from `parent`, without calling
		// `parent`'s constructor function.
		var Surrogate = function(){ this.constructor = child; };
		Surrogate.prototype = parent.prototype;
		child.prototype = new Surrogate;

		// Add prototype properties (instance properties) to the subclass,
		// if supplied.
		if (protoProps) _.extend(child.prototype, protoProps);

		// Set a convenience property in case the parent's prototype is needed
		// later.
		child.__super__ = parent.prototype;

		return child;
	};
	View.extend = extend;

	if(!window.Me) {
		window.Me = {};
	}

	Me.view = View;
}(jQuery, window, document));