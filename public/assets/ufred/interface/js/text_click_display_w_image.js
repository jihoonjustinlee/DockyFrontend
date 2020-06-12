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

	// Deals with scroll bar overlaping content issue
	$(window).resize(function(){

		// Checks if vertical scrollbar has appeared on resize
		if ($(document).height() > $(window).height()) {
			$(".textarea").css("width", "97.5vw");
		} else {
			$(".textarea").css("width", "100vw");
		}
	});

	// Checks if vertical scrollbar has appeared
	if ($(document).height() > $(window).height()) {
		$(".textarea").css("width", "97.5vw");
	}
});

function populateMarkup(numItems, headerArray, contentArray) {

	for(let i = 0; i < numItems; i++) {

		$(".vertical-container").append('<div class="cndButton">' + headerArray[i] + '</div>');

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

		// Show image content with fadeIn effect.
		$(".imageContainer").css({ "display":"none", 
							   "background-image":`url(assets/images/${imageFilename}${index}.jpg)`
							 }).fadeIn();

		// Update current page's index.
		currentIndex = int;
	} 
}