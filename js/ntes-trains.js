$(document).ready(function () {



	// Setup and create tooltip elements
	$('#trains-bottom .row-tooltip').each(function(index) {$(this).addClass('rt'+index);}); // adds class to tooltips to distinguish them (rt0, rt15)
	$('#trains-bottom .row-info a').each(function(index) {$(this).addClass('t'+index);}); // adds class to rows so they can trigger correct tooltip
	$('#trains-bottom .row-tooltip').appendTo('#tooltip-container'); // Dynamically move tooltip elements out of scroll elements so they can display properly
	
	
	// Display tooltips on hover
	$("#trains-bottom .row-info a").each(function(index) {
		// Display tooltips
		$('#trains-bottom .t'+index).hover(
		    function() { // On hover in
				var posY = $(this).parent().parent().position().top + 142; // position vertically (specific to trains page)
				var posX = "475px" // position tooltip horizontally
				var targetTable = $(this).parent().parent().parent().parent().find('.table');
				if (targetTable.prop('scrollHeight') > targetTable.height()) {
					posX = "460px";
				}
				$('#tooltip-container .rt'+index).show(); // show tooltip
				$('#tooltip-container .rt'+index).css({ // align tooltip
					top: posY,
					left: posX
				});				
		    },
		    function () { // On hover out
				// do nothing
				$('#tooltip-container .rt'+index).hide();
		    }
		);
	});
	
	// Function to be used for specific IDs to be passed to buttons for functions/URLs
	function activateExtraButtons(id) {
		$('#trains-top-extra a').each(function(index) {
			$('#trains-top-extra .b' + index + ' a').attr("href", "#"+index); // replace index with id -- can be used to pass custom URLs from buttons
		});
	}
	
		
	
	// Handle clicking "GO" button
	$('#train-search-submit').click(function(e) {
	    e.preventDefault();
	  	$('#train-input').submit();
		
		// Reset form first
		$('#select-train').hide();
		$('#select-date').hide();
				
		// Show correct form
		$('#select-train').fadeIn("fast");
		$('#search-train-wrapper .search-results-text').fadeIn("fast");
		$('#search-nav li').removeClass("active");
		$('#search-nav li.step2').addClass("active");
		
		activateExtraButtons(); // Activate "extra" function buttons on top right -- add argument to be passed as an ID for custom URLs
		$('#trains-top-extra .extra-block').addClass("active"); // activate "extra" buttons in CSS
	});
	$('#train-input').keydown(function(e) {
	    if (e.keyCode != 13) // Enter or Return keystroke
	        return;
	    $(this).submit();
	});
	
	// Handle selecting train (clicking arrow button)
	$('#select-train .row').click(function(e) {
		e.preventDefault();
		
		// Hide previous form
		$('#select-train').hide();
		$('#search-train-wrapper').hide();
		
		// Show correct form
		$('#select-date').fadeIn("fast");
		$('#result-train-wrapper').fadeIn("fast");
		$('#search-nav li').removeClass("active");
		$('#search-nav li.step3').addClass("active");
	});
	
	// Handle "return to search" link
	$('#result-train-wrapper .output-footer a').click(function(e) {
		e.preventDefault();
		
		// Hide previous form
		$('#select-date').hide();
		$('#result-train-wrapper').hide();
		
		// Show correct form
		$('#select-train').fadeIn("fast");
		$('#search-train-wrapper').fadeIn("fast");
		$('#search-nav li').removeClass("active");
		$('#search-nav li.step2').addClass("active");
	});
	
	$('#search-nav .step1').click(function() { $(location).attr('href','./trains.html'); });
	$('#search-nav .step2').click(function() { $('#result-train-wrapper .output-footer a').click(); });
	$('#search-nav .step3').click(function() { $('#select-train .row').click(); });
	
});