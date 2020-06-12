$(document).ready(function() {

	// Generates markup based on parameter given at the top on page load.
	populateMarkup(numItems, headerArray, contentArray);

	// Deals with scroll bar overlaping content issue
	$(window).resize(function(){

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

		$(" .textarea").css("width", "97.5vw");

	} else if (scrollBar) {

		$(" .textarea").css("width", "98vw");

	}

	// Generate markup based on parameter given at the top on page load. This is not a very efficient way of doing this, if you have any better idea, please let the team lead know.
	function populateMarkup(numItems, headerArray, contentArray) {

		// Static first item, always appear on screen.
		$(".vertical-container:eq(0)").append('\
				<div class="vertical-container greyGrad" style="height:auto; opacity:1">\
					<div class="cndButton">' + headerArray[0] + '</div>\
					<div class="textContainer ">' + contentArray[0] + '</div>\
				</div>\
				<img src="interface/images/arrow.svg">');

		// Skipping the first item.
		for(let i = 1; i < numItems; i++) {

			// This is the last item, which should be adtivated by default
			if (i === numItems - 1) {

				$(".vertical-container:eq(0)").append('\
					<div class="vertical-container greyGrad">\
						<div class="cndButton activated">' + headerArray[i] + '</div>\
						<div class="textContainer ">' + contentArray[i] + '</div>\
					</div>\
					<img src="interface/images/arrow.svg">');

			} else {
				$(".vertical-container:eq(0)").append('\
					<div class="vertical-container greyGrad">\
						<div class="cndButton unclickable">' + headerArray[i] + '</div>\
						<div class="textContainer ">' + contentArray[i] + '</div>\
					</div>\
					<img src="interface/images/arrow.svg">');
			}
		}

	}


	// Each time a clickable button is triggered, flow down the arrow image, then fade in the text content.
	$(".cndButton").click(function() {
		if (!$(this).hasClass("unclickable")) {
			index = $('.cndButton').index(this);

			$(this).addClass("activated");

			// If not the last container
			if (index < numItems - 1) {

				let nextContainer = $(".greyGrad:eq("+(index+1)+")");

				// Flow down the image with CSS transition.
				$("img:eq("+index+")").css({
					"bottom"  : "0px",
					"opacity" : "1"
				});

				// Function inside will be triggered after the image flow transition.
				$("img:eq("+index+")").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function() {

					//Fade in the next container with CSS transitions
					nextContainer.css({"height":"auto", "opacity":"1"});

					$(".greyGrad:eq("+(index+1)+") > .cndButton").removeClass("unclickable");

					// Determine the amount of height to scroll.
					let scrollHeight = $(document).height() - nextContainer.height();

					// Auto scroll down to appoporiate position.
					$("html, body").animate({ scrollTop: scrollHeight }, "slow");
				});



			}
		}
	});

});