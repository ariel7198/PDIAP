(function($) {
	$(function() {

		$('.dropdown-button').dropdown({
			inDuration: 300,
			outDuration: 225,
	      	hover: true, // Activate on hover
	      	belowOrigin: true, // Displays dropdown below the button
	      	alignment: 'right' // Displays dropdown with edge aligned to the left of button
  			}
  		);
  		$('textarea#textarea1').characterCounter();

	}); // End Document Ready
})(jQuery); // End of jQuery name space