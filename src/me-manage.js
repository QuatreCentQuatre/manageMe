/*
 * ManageMe 3.2.0 (https://github.com/QuatreCentQuatre/manageMe/)
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

class ViewManager {
	constructor() {
		this.name     = "ViewManager";
		this.views    = [];
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

	initViews($rootElement = document.querySelector('html')){
		this.clearViews();

		let views = $rootElement.querySelectorAll('[me\\:view]');
		let newViews = [];

		for (let i = 0; i < views.length; i++) {
			let $view = views[i];

			let viewName = $view.getAttribute('me:view');

			let viewParams = {el: $view, name: viewName, params: {}};

			/* Look if the view is valid */
			if (typeof Me.views[viewName] !== "function") {
				console.warn("You need to have view that exist.", viewName);
				continue;
			}

			/* Look if the view has already been rendered */
			if ($view.hasAttribute('me:view:render')) {continue;}
			$view.setAttribute('me:view:render', "true");

			/* Add data to view */
			let viewData = $view.getAttribute('me:view:data');
			viewParams.params = (viewData) ? JSON.parse(viewData) : {};

			/* Create instance of the view */
			let view = new Me.views[viewName](viewParams);

			/* Keep reference of the global view in this class */
			this.views.push(view);

			/* Assign the view in an array to initialize them later */
			newViews.push(view);
		}

		/* Initialize all new views*/
		for(const i in newViews) {
			newViews[i].initialize();
		}
		
		for(const i in newViews){
			var view = newViews[i];
			
			if(!view.afterAllViewInitialized){
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

	clearViews(){
		let activeViews  = [];

		for (let i in this.views) {
			let view = this.views[i];

			if(typeof view == "object"){
				if (document.body.contains(view.el)) {
					activeViews.push(view);
				} else {
					view.terminate();
				}
			}
		}

		this.views = activeViews;
	}

	toString () {
		return this.name;
	}
}

if(!window.Me){window.Me = {};}

Me.manage = new ViewManager();
Me.views = [];

document.addEventListener('DOMContentLoaded', (event) => {
	Me.manage.initViews();
})
