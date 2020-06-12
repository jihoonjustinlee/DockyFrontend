// Initiating the 'currentIndex' storage variable to determine if the button is already selected.
let currentIndex = -1;

$(document).ready(function() {

	// Generate markup based on parameter given at the top on page load.
	populateMarkup(numItems, headerArray, contentArray);


	// Call display function to Show the first option on load. 
	displayContent($('.cndButton').index(0));

	// Each time a clickable button is triggered, display the corresponding content.
	$(".cndButton").click(function() {
		displayContent($('.cndButton').index(this));
	});

	$(".cndButton").hover(function() {

		colorChange($('.cndButton').index(this));

	}, function(){

		if(!$(this).hasClass("activated")) {

			colorRemove($('.cndButton').index(this));

		}

	});

				// Deals with scroll bar overlaping content issue
	$(window).resize(function(){

		let scrollBar = $(document).height() > $(window).height();

		// Checks if vertical scrollbar has appeared on resize
		if (scrollBar && $(window).width() < 350) {

			$(".vertical-container, .textarea").css("width", "97.5vw");

		} else if (scrollBar) {

			$(".vertical-container, .textarea").css("width", "99vw");

		} else {
			$(".vertical-container, .textarea").css("width", "100vw");
		}
	});


	// Checks if vertical scrollbar has appeared
	let scrollBar = $(document).height() > $(window).height();

	if (scrollBar && $(window).width() < 350) {

		$(".vertical-container, .textarea").css("width", "97.5vw");

	} else if (scrollBar) {

		$(".vertical-container, .textarea").css("width", "99vw");

	}
});

function populateMarkup(numItems, headerArray, contentArray) {

	for(let i = 0; i < numItems; i++) {

		$(".container:eq(0)").append('<div class="cndButton">' + headerArray[i] + '</div>');

	}

}

function displayContent(int) {

	// Check if the button is triggering a new page, if not, does nothing.
	if (currentIndex != int) {

		// .activated class mimics the active state of CSS for button, remove when a button is clicked.
		$(".activated").removeClass("activated");

		// Adding .activated class to button.
		$(".cndButton:eq("+int+")").addClass("activated");

		// Index to determine image path.
		let index = int + 1;

		// Show text content with fadeIn effect.
		$(".textContainer").css("display","none").html(contentArray[int]).fadeIn();

		// Update current page's index.
		currentIndex = int;
	}
}