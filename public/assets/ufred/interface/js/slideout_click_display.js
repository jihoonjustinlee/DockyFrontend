$(document).ready(function() {

	// Generates markup based on parameter given at the top on page load.
	populateMarkup(numItems, headerArray, contentArray);

	// Calls resetHeight function to take max height of height: auto containers (height determined based on invisible content), and apply max height to every container.
	resetHeight();

	// Calls resetAnimation function to make slide animation ready.
	resetAnimation();

	// Object used to detect when resizing is completed. 
	let resizing;

	// Detect window size change and excute functions.
	$(window).resize(function(){

		// Trigger resized function when resize is done.
		clearTimeout(resizing);
		resizing = setTimeout(function() {
			resized();
		}, 100);

		// Revert to original max-width and disable transitioning, for dynamic resizing view.
		$(".textContainer").css({
			"max-width" :"80vw",
			"transition":"none",
			"-webkit-transition": "none",
			"-moz-transition": "none",
		});

		// Revert height to auto, so container size are determined based on content dynamically. 
		$(".container").css("height","auto");

		// Apply max container height to all containers.
		resetHeight();

		let scrollBar = $(document).height() > $(window).height();

		// Checks if vertical scrollbar has appeared on resize
		if (scrollBar && $(window).width() < 350) {

			$(".textarea").css("width", "97.5vw");

		} else if (scrollBar) {

			$(".textarea").css("width", "98vw");

		} else {
			$(".textarea").css("width", "100vw");
		}

	});

	// Checks if vertical scrollbar has appeared
	let scrollBar = $(document).height() > $(window).height();

	if (scrollBar && $(window).width() < 350) {

		$(".textarea").css("width", "97.5vw");

	} else if (scrollBar) {

		$(".textarea").css("width", "98vw");

	}

	// Generate markup based on parameter given at the top on page load.
	function populateMarkup(numItems, headerArray, contentArray) {

		for(let i = 0; i < numItems; i++) {

			$(".vertical-container").append('\
				<div class="container">\
					<div class="cndButton"><span>' + headerArray[i] + '</span></div>\
					<div class="textContainer greyGrad"><span>' + contentArray[i] + '</span></div>\
				</div>');
		}

	}


	// Takes max height of 'height: auto' containers (height determined based on invisible content), and apply max height to every container.
	function resetHeight() {

		// Map through containers and determine the max height.
		let maxHeight = Math.max.apply(null, $(".container").map(function () {
			return $(this).height();
		}).get());

		// Map through containers again and apply max height to each container. 
		$(".container").map(function () {
			$(this).height(maxHeight);
		});
	}

	// Makes slide animation ready.
	function resetAnimation() {

		// Only reduce the invisible containers to 0 to allow slide, and leave the activated ones alone.
		$(".cndButton").map(function () {
			if(!$(this).hasClass("activated")) {
				$(this).siblings().css("max-width","0px");
			}
		});

	}

	function resized(){

		// After reset, make slide animation avilable again by reducing max-width to 0.
		resetAnimation();

		// Activates CSS transition on textContainer.
		$(".textContainer").css({
			"transition": "max-width 0.5s linear, color 1s linear",
			"-webkit-transition": "max-width 0.5s linear, color 1s linear",
			"-moz-transition": "max-width 0.5s linear, color 1s linear"
		});
	}



	// Each time a clickable button is triggered, slideout textContainer then fadein corresponding content.
	$(".cndButton").click(function() {

		index = $('.cndButton').index(this);

		$(".textContainer:eq("+index+")").css("visibility","visible");

		// A patchy solution, bullet not really fading in.

		setTimeout(function(){ 
			$(`.textContainer:eq(${index})`).addClass("clicked");
		}, 500);

		if (!$(".cndButton:eq("+index+")").hasClass("activated")) {
			displayContent(index);
		}
	});

});



function displayContent(int) {

	// Adding .activated class to button.
	$(".cndButton:eq("+int+")").addClass("activated");

	// slideout the textContainer.
	$(".textContainer:eq("+int+")").css("max-width","80vw");

	// Show text content with fadeIn effect. after the sliding transition is done.
	$(".textContainer:eq("+int+")").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function() {
		$(".textContainer:eq("+int+")").css("color","black");
	});
}