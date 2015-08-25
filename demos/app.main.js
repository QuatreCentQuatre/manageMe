//Create html clone to be able to test the initialization later
var $demoClone = $('#demo').clone();

$(document).ready(function(){
	setTimeout(function(){
		//Remove demo html associated to the JS DemoView
		$('#demo').remove();

		//Recreate demo html
		$('body').append($demoClone);

		//Reinit demo view on dupplicated html
		Me.manage.initViews();
	}, 2000)
});