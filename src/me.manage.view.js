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

 */

class ViewBasic{
	/*
	*
	* When manage me create an instance of a view, it will pass in this constructor first.
	*
	* If you add any data in me.manage.js in initView, make sure to add the data in the constructor.
	*
	* */

	constructor(options) {
		this.name = (options.name) ? options.name : 'ViewBasic';
		this.options = {
			debug: (SETTINGS.DEBUG_MODE) ? SETTINGS.DEBUG_MODE : false
		};

		this.el = options.el;
		this.$el = $(options.el);
		this.params = (options.params) ? options.params : {};
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
	initialize(){
		this.addEvents();
	};

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
	addEvents(){};

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
	removeEvents(){};

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
	terminate(){
		this.removeEvents();
	};

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

	$(selector) {
		return this.$el.find(selector);
	};

	toString(){
		return this.name;
	}
}

Me.views['ViewBasic'] = ViewBasic;