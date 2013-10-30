$(document).ready(function () {


    // Display default text within input fields (default search text)
	// Default text in "rel" field is removed on focus, and restored if field is left empty after losing focus
	$("#top-block-left .inputs input").live("blur", function(){
            var default_value = $(this).attr("rel");
            if ($(this).val() == ""){ $(this).val(default_value); }
    }).live("focus", function(){
            var default_value = $(this).attr("rel");
            if ($(this).val() == default_value){ $(this).val(""); }
    });
	
	

// ----------------------------------------------------------------------------
// Initialize/setup main slide/grid
// ----------------------------------------------------------------------------

	// initiate slider code
	$('#main-slider').slides({
		container: 'slide-container', // container for main slide
		paginationClass: 'main-slider-pagi',
		slideSpeed: 450,
		preload: true,
		generateNextPrev: true, // css hides these but they must exists so that they can be "clicked" via script
		animationComplete: function(current) {
			// highly the appropriate slider pagination element after a slide changes
			$('#main-slider-select a').removeClass('active');
			$('#main-slider-select a:nth-child(' + current + ')').addClass('active');
		}
	});
	// Internal slide 1
	$('#sub-slider1').slides({
		container: 'internal-slide', // container for main slide 
		paginationClass: 'sub-slider1-pagi',
		slideSpeed: 450,
		preload: true,
		generateNextPrev: true, // css hides these but they must exists so that they can be "clicked" via script
		animationComplete: function(current) {
			// highly the appropriate slider pagination element after a slide changes
			$('#sub-slider1 .internal-slide-nav a').removeClass('active');
			$('#sub-slider1 .internal-slide-nav a:nth-child(' + current + ')').addClass('active');
		}
	});
	
	// Highlight first slide selector radio button
	$('#main-slider-select a:nth-child(1)').addClass('active');
	// Internal slide 1
	$('#sub-slider1 .internal-slide-nav a:nth-child(1)').addClass('active');
	
	// Dynamically insert the correct amount of radio buttons (based on how many slide pages exist in HTML)
	for (var i=1;i < $('#main-slider .slide-page').length;i++) {
		$('#main-slider-select').append('<a href="#"></a>');
	}
	// Internal slide 1
	for (var i=1;i < $('#sub-slider1 .internal-page').length;i++) {
		$('#sub-slider1 .internal-slide-nav').append('<a href="#"></a>');
	}
	
	// Allow the left/right arrows to control the slide containers
	$('#main-slider-left').click(function(e){
		e.preventDefault();
		$('#main-slider').children('a.slider-prev').click();
	});
	$('#main-slider-right').click(function(e){
		e.preventDefault();
		$('#main-slider').children('a.slider-next').click();
	});
	
	// Allow the individual pagination buttons to control the slide containers
	$('#main-slider-select a').each(function(index) {
		$('#main-slider-select a:eq(' + index + ')').click(function(e){
			e.preventDefault();
			if (!$(this).hasClass('active')) {
				$('#main-slider-select a').removeClass('active');
				$('#main-slider-pagi li:eq(' + index + ') a').click();
			}
		});
	});
	// Internal slide 1
	$('#sub-slider1 .internal-slide-nav a').each(function(index) {
		$('#sub-slider1 .internal-slide-nav a:eq(' + index + ')').click(function(e){
			e.preventDefault();
			if (!$(this).hasClass('active')) {
				$('#sub-slider1 .internal-slide-nav a').removeClass('active');
				$('#sub-slider1-pagi li:eq(' + index + ') a').click();
			}
		});
	});
	
	// Dynamically attach Expand/Close buttons to grid blocks that have the "expanded" class found
	$('#main-slider .grid').has('.expanded').append('<div class="expand"><a href="#"></a></div>');
	$('#main-slider .grid .expanded').append('<div class="expand-close"><a href="#"></a></div><div class="close"><a href="#"></a></div>');
	
	// Adjust position for expanded grid layouts (3rd and 6th block extend left instead of right)
	$('#main-slider .slide-page div:nth-child(3) .expanded').css({"margin-left": "-275px"});
	$('#main-slider .slide-page div:nth-child(6) .expanded').css({"margin-left": "-275px"});
	
	
	
	// Setup expand grid button
	$('#main-slider .expand').each(function(index) {
		$(this).click(function(e){
			e.preventDefault();
			$(this).parent().children('.expanded').show();
			$(this).parent().find('.expand-close').show();
			$(this).parent().find('.close').show();
		});
	});
	
	// Allow user to click on entire grid box to "expand" it
	$('#main-slider .grid .hover').click(function(e){$(this).parent().find('.expand').click();});
	// If a user clicks a link, don't expand the box
	$('#main-slider .grid .hover a').click(function(e){e.stopPropagation();});
	
	// Setup expand-close grid button
	$('#main-slider .expand-close').each(function(index) {
		$(this).click(function(e){
			e.preventDefault();
			$(this).parent().parent().children('.expanded').hide();
			$(this).parent().find('.expand-close').hide();
			$(this).parent().find('.close').hide();
		});
	});
	
	// Setup close grid button
	$('#main-slider .close').each(function(index) {
		$(this).click(function(e){
			e.preventDefault();
			$(this).parent().parent().children('.expanded').hide();
			$(this).parent().find('.expand-close').hide();
			$(this).parent().find('.close').hide();
		});
	});
	
	// Execute change onHover for grid blocks
	$('#main-slider .grid').hover(
	    function() { // On hover in
			if ($(this).children('.hover').length>0) { // Does it have a hover element?
				$(this).children('.normal').stop().animate({ 
	        		opacity: "0"
	      		}, 500 );
				$(this).children('.bg').stop().animate({ 
	        		left: "135px",
					width: "0px",
	      		}, 500 );
				$(this).children('.hover').stop().delay(250).fadeIn(250);
			}
			if ($(this).children('.expanded').length>0) { // Does it have an expanded element?
				$(this).children('.expand').stop().fadeIn(500);
			}
	    },
	    function () { // On hover out
			if ($(this).children('.hover').length>0) { // Does it have a hover element?
				$(this).children('.hover').stop().hide();
				$(this).children('.bg').stop().animate({ 
	        		left: "0px",
					width: "273px",
	      		}, 500 );
				$(this).children('.normal').stop().animate({ 
					opacity: "100"
	      		}, 500 );
			}
			if ($(this).children('.expanded').length>0) { // Does it have an expanded element?
				$(this).children('.expand').stop().hide();
			}
	    }
	);
	
	

});