;(function($, window, document){
	/**
	 * Demo View
	 */
	window.DemoView = Me.view.extend({
		options: {
		},
		initialize: function() {
			console.log('DemoView initiated');

			this.addEvents();
		},
		terminate: function(){
			console.log('DemoView terminated');

			this.removeEvents();
		},
		addEvents: function() {
			console.log('addEvents');
		},
		removeEvents: function(){
			console.log('removeEvents');
		}
	});
}(jQuery, window, document));
