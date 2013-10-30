$(document).ready(function () {

	// -------------------------------------------------------
	// Custom scrollbars
	// -------------------------------------------------------
	function reInitScroll() {
		$('#table-row-container1').jScrollPane({
			showArrows: true,
			reinitialise: true,
			hideFocus: true
		}).bind('mousewheel', function(e){
            e.preventDefault();
        });
		$('.expanded-table-row-container').jScrollPane({
			showArrows: true,
			reinitialise: true,
			hideFocus: true
		}).bind('mousewheel', function(e){
            e.preventDefault();
        });
	}
	

	// -------------------------------------------------------
	// Search fields
	// -------------------------------------------------------

    // Display default text within input fields (default search text)
	// Default text in "rel" field is removed on focus, and restored if field is left empty after losing focus
	$("#top-block-search .inputs input").live("blur", function(){
            var default_value = $(this).attr("rel");
            if ($(this).val() == ""){ $(this).val(default_value); }
    }).live("focus", function(){
            var default_value = $(this).attr("rel");
            if ($(this).val() == default_value){ $(this).val(""); }
    });
	
	// Handle toggling between Advanced and Basic search filters
	$('#train-adv-search').click(function(e) {
	    e.preventDefault();
		$("#top-block-search .toggleOn").fadeToggle();
		$("#top-block-search .toggleOff").toggle();
		$("#top-block-search .block-row-bottom").height("175");
		$("#top-block-search #train-type-block").toggleClass("blank");
	});
	$('#train-basic-search').click(function(e) {
	    e.preventDefault();
		$("#top-block-search .toggleOn").toggle();
		$("#top-block-search .toggleOff").toggle();
		$("#top-block-search .block-row-bottom").height("85");
		$("#top-block-search #train-type-block").toggleClass("blank");
	});
	
	

	// -------------------------------------------------------
	// Search results
	// -------------------------------------------------------
	function submitSearch() {
		// hide search filters
		$("#top-title-search").hide();
		$("#top-block-search").hide();
		// show results
		$(".filter-container .filter").show();
		$("#top-title-results").fadeIn();
		$("#top-results-box").fadeIn();
		$("#results-block").fadeIn();
		reInitScroll(); // update jQuery scroll
	}
	function alterSearch() {
		// hide results
		$("#top-title-results").hide();
		$("#top-results-box").hide();
		$("#results-block").hide();
		// show search filters
		$("#top-title-search").fadeIn();
		$("#top-block-search").fadeIn();
	}
	// Handle clicking "Go" (search submit)
	$("#search-trains-submit").click(function(e) {
	    e.preventDefault();
		submitSearch();
		//$('#search-trains').submit(); // Submit form?
	});
	// Handle clicking "Change Search"
	$("#search-trains-alter").click(function(e) {
	    e.preventDefault();
		alterSearch();
	});

	
	// Removing a filter
	$(".filter-container .filter .remove-filter").click(function(e) {
		e.preventDefault();
		$(this).parent().fadeOut();
		//$('#search-trains').submit(); // Submit form?
	});
	
	
	// -------------------------------------------------------
	// Serach results tables
	// -------------------------------------------------------
	
	// Expand result row
	$(".table-row .expand-row").click(function(e) {
	    e.preventDefault();
		//$(".table-row").hide(); // hide all the rows
		//$(".table-ad-row").hide(); // hide the ad row(s)
		$(this).parent().parent().parent().parent().removeClass("table-row");
		$(this).parent().parent().parent().parent().addClass("table-row-expanded");
		$(this).parent().parent().parent().parent().find(".expanded-content").fadeIn(); // fade in expanded content
		$(this).hide(); // hide expand button
		$(this).parent().children(".contract-row").show(); // show contract  button
		reInitScroll(); // update jQuery scroll
	});
	// Contract result row
	$(".table-row .contract-row").click(function(e) {
	    e.preventDefault();
		$(this).parent().parent().parent().parent().removeClass("table-row-expanded");
		$(this).parent().parent().parent().parent().addClass("table-row");
		$(this).parent().parent().parent().parent().find(".expanded-content").hide(); // fade in expanded content
		$(this).hide(); // hide contract button
		$(this).parent().children(".expand-row").show(); // show expand button
		$(this).parent().parent().parent().parent().find(".expanded-slide-right:first a").click();
		reInitScroll(); // update jQuery scroll
	});
	
	
	// Alternate row colors in expanded table content
	$(".expanded-table-row-data").each(function() {
		$(this).find("ul:odd").addClass("alt");
	});
	// Set first and last expanded table row graphics (connector icons)
	$(".expanded-table-row-data").each(function() {
		$(this).find("ul:first li:first").addClass("first-row");
	});
	$(".expanded-table-row-data").each(function() {
		$(this).find("ul:last li:first").addClass("last-row");
	});
	
	
	// Expand map
	$(".expanded-slide-left a").click(function(e) {
		e.preventDefault();
		$(this).parent().parent().find(".expanded-slide-right").fadeIn();
		$(this).parent().parent().find(".expanded-map").fadeIn();
		$(this).parent().parent().find(".expanded-table-row-container:first .expanded-table-row-category").css("text-align", "left");
		$(this).parent().parent().find(".jspVerticalBar:first").css("right", "585px");
	});
	// Hide map
	$(".expanded-slide-right a").click(function(e) {
		e.preventDefault();
		$(this).parent().parent().find(".expanded-slide-right").hide();
		$(this).parent().parent().find(".expanded-map").hide();
		$(this).parent().parent().find(".expanded-table-row-container:first .expanded-table-row-category").css("text-align", "center");
		$(this).parent().parent().find(".jspVerticalBar:first").css("right", "0px");
	});
	
	// Dropdown quanity selector
	$("#tableFooterQuantity").selectBox().change( function(){
		var sizeMulti = 46.2;
		var adSize = 96;
		var newHeight = Math.floor(sizeMulti * $(this).val());
		newHeight = newHeight + adSize;
		alert(newHeight);
		$("#table-row-container1").height(newHeight);
		reInitScroll(); // update jQuery scroll
	});
	
	
	
	// -------------------------------------------------------
	// News ticker
	// -------------------------------------------------------
	
	// next button
	$("#news-ticker .next").click(function(e) {
		e.preventDefault();
		if ($("#news-ticker .news .active").is(":last-child")) {
			$("#news-ticker .news .active").toggleClass("active").toggleClass("old");
			$("#news-ticker .news div:first-child").toggleClass("active");
			$("#news-ticker .news .old").toggleClass("old");
		} else {
			$("#news-ticker .news .active").toggleClass("active").toggleClass("old");
			$("#news-ticker .news .old").next().toggleClass("active");
			$("#news-ticker .news .old").toggleClass("old");
		}
	});
	// next button
	$("#news-ticker .prev").click(function(e) {
		e.preventDefault();
		if ($("#news-ticker .news .active").is(":first-child")) {
			$("#news-ticker .news .active").toggleClass("active").toggleClass("old");
			$("#news-ticker .news div:last-child").toggleClass("active");
			$("#news-ticker .news .old").toggleClass("old");
		} else {
			$("#news-ticker .news .active").toggleClass("active").toggleClass("old");
			$("#news-ticker .news .old").prev().toggleClass("active");
			$("#news-ticker .news .old").toggleClass("old");
		}
	});
	// Cycle ticker every 5 seconds
	function cycleTicker() {
		$("#news-ticker .next").click();
		$("#news-ticker").css("background","#FFFFE0");
		$("#news-ticker").animate({
			backgroundColor: "#f6f6f2"
		}, 2500); // add color fade on change
	}
	var newsInterval = setInterval(cycleTicker, 5000);
	$("#news-ticker").hover(function() {
		clearInterval(newsInterval);
	}, function() {
		newsInterval = setInterval(cycleTicker, 5000);
	});
});