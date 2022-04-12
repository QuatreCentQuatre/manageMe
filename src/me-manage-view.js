/*
 * ViewBasic 3.2.0 (https://github.com/QuatreCentQuatre/manageMe/)
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

class ViewBasic{
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
	
	defaults(){
		return {};
	}

	constructor(options) {
		this.name = (options.name) ? options.name : 'ViewBasic';
		this.options = {
			debug: (SETTINGS.DEBUG_MODE) ? SETTINGS.DEBUG_MODE : false
		};

		this.el = options.el;
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
	initialize(){
		this.addEvents();
	};

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
	afterAllViewInitialize(){};

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

	toString(){
		return this.name;
	}
}

Me.views['ViewBasic'] = ViewBasic;