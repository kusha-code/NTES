$(document).ready(function () {
	
	// Slide down the "Beta" image on page load
	$('#header-beta').slideDown(800);
	
	
// ----------------------------------------------------------------------------
// Header / Login area
// ----------------------------------------------------------------------------

	// Show "fake" password field to display the text "Password" on screen
	// When the fake password field recieves focus, pass focus to the real password field
	$('#password-clear').show();
	$('#login-password').hide();
	$('#password-clear').focus(function() {
	    $('#password-clear').hide();
	    $('#login-password').show();
	    $('#login-password').focus();
	});
	$('#login-password').blur(function() {
	    if($('#login-password').val() == '') {
	        $('#password-clear').show();
	        $('#login-password').hide();
	    }
	});
	
	
	// Handle custom colored Login button (uses anchor instead of input)
	$('#login-form a.submit').click(function(e) {
	    e.preventDefault();
	    $('#login-form').submit();
	});
	$('#login-form').keydown(function(e) {
	    if (e.keyCode != 13) // Enter or Return keystroke
	        return;
	    $(this).submit();
	});
	
	// Handle custom Search button (uses anchor instead of input)
	$('#search-form a.submit').click(function(e) {
	    e.preventDefault();
	    $('#search-form').submit();
	});
	$('#search-form').keydown(function(e) {
	    if (e.keyCode != 13) // Enter or Return keystroke
	        return;
	    $(this).submit();
	});
	
	
    // Display default text within input fields such as "Search", "Username", and "Password"
	// Default text in "rel" field is removed on focus, and restored if field is left empty after losing focus
	$("#header-login input").live("blur", function(){
            var default_value = $(this).attr("rel");
            if ($(this).val() == ""){ $(this).val(default_value); }
    }).live("focus", function(){
            var default_value = $(this).attr("rel");
            if ($(this).val() == default_value){ $(this).val(""); }
    });

	


	
// ----------------------------------------------------------------------------
// Tab nav
// ----------------------------------------------------------------------------

$('#tab-nav li').each(function(index) {
	$('#tab-nav li:eq(' + index + ')').hover(
		function () { // on hover in
			$('#page-nav-container ul').hide();
			$('#page-nav-container ul:eq(' + index + ')').show();
		},
		function () { // on hover out
			// do nothing
		}
	);
});


	
	
	
// ----------------------------------------------------------------------------
//  Inputs type support
// ----------------------------------------------------------------------------
	
	// init Dropdown box styling
	$("select").selectBox();
	
	// Stylized checkboxes
	$(".check-style").each(function() {
    	$(this).hide();
	    var $image = $("<div class='fake-checkbox style-checkbox'></div>").insertAfter(this);
		var $checkbox = $image.prev("input");
	    if ($checkbox.prop("checked")) {
	    	//$image.removeClass("style-checkbox");
			$image.addClass("style-checkbox-checked");
	    }
	    $image.click(function() {
	        $checkbox.prop('checked', !$checkbox.prop('checked'));
	        if ($checkbox.prop("checked")) {
				$image.addClass("style-checkbox-checked");
	        } else {
	            $image.removeClass("style-checkbox-checked");
		    }
			// Toggle all boxes with "checkall" checkbox class
			if ($checkbox.hasClass("checkall")) {
				if ($checkbox.prop("checked")) {
					$(this).parent().parent().find(".fake-checkbox").addClass("style-checkbox-checked");
					$(this).parent().parent().find("input").prop("checked", true);
		        } else {
					$(this).parent().parent().find(".fake-checkbox").removeClass("style-checkbox-checked");
					$(this).parent().parent().find("input").prop("checked", false);
			    }
			}
	    })
	});
	// Allow clicking on text next to checkboxes to toggle
	$(".check-desc").each(function() {
		$(this).click(function() {
			$(this).prev(".fake-checkbox").click();
		});
	});

	// Stylized radio buttons
	$(".radio-style").each(function() {
		$(this).hide();
	    var $image = $("<div class='fake-radio style-radio'></div>").insertAfter(this);
		var $radiobox = $image.prev("input");
	    if ($radiobox.prop("checked")) {
			$image.addClass("style-radio-checked");
	    }
		$image.click(function() {
			$(this).parent().parent().find(".fake-radio").removeClass("style-radio-checked");
	        $radiobox.prop('checked', true);
			$image.addClass("style-radio-checked");
	    })
	});
	// Allow clicking on text next to radio buttons to toggle
	$(".radio-desc").each(function() {
		$(this).click(function() {
			$(this).prev(".fake-radio").click();
		});
	});

	
	
	
// ----------------------------------------------------------------------------
// Social buttons
// ----------------------------------------------------------------------------
	
	// Right-side social hover icons (bumps icons to the right on mouse over)
	$("#right-blocks a").hover(
	    function() { // On hover in
			$(this).find('.bg').css({left: "7px"});
	    },
	    function () { // On hover out
			$(this).find('.bg').css({left: "6px"});
		}
	);

	

});