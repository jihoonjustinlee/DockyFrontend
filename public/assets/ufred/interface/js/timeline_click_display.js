// Initiating the 'currentIndex' storage variable to determine if the button is already selected.
let currentIndex = -1;

$(document).ready(function() {

	// Generate markup based on parameter given at the top on page load.
	populateMarkup(numItems, headerArray, contentArray);

	$(".buttonComposer .cndButtonAfter").last().css("background-color", "transparent");

	// Call display function to Show the first option on load. 
	displayContent($('.cndButton').index(0));
	colorChange(0);

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

		// Bill is not proud of this at all, because he literally just ball-parked a linear equation, which he totally know how to do it properly, but he choose not to, because he is not feeling mathy today.
		//let height = 7 - $(window).height()*0.005;

		 let height = $('.buttonComposer').height() / 2;

		$(".cndButtonAfter").css("border-top", `${height}px solid transparent`);
		$(".cndButtonAfter").css("border-bottom", `${height}px solid transparent`);

		console.log(height);

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

		// Bill is not proud of this at all, because he literally just copy pasted the above awful code down here.
		//let height = 7 - $(window).height()*0.005;
		 let height = $('.buttonComposer').height() / 2;

		$(".cndButtonAfter").css("border-top", `${height}px solid transparent`);
		$(".cndButtonAfter").css("border-bottom", `${height}px solid transparent`);
	}
});

function populateMarkup(numItems, headerArray, contentArray) {

	for(let i = 0; i < numItems; i++) {

		$(".container:eq(0)").append('<div class="buttonComposer"><div class="cndButton">' + headerArray[i] + '</div><div class="cndButtonAfter"></div></div>');
		//$(".container:eq(0)").append('<div class="cndButton">' + headerArray[i] + '</div>');

	}

}

function displayContent(int) {

	// Check if the button is triggering a new page, if not, does nothing.
	if (currentIndex != int) {

		// .activated class mimics the active state of CSS for button, remove when a button is clicked.
		$(".activated").removeClass("activated");
		colorRemove(currentIndex);

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
	$(".buttonComposer .cndButtonAfter").last().css("background-color", "transparent");
}

function colorChange(index) {

	if (index > 0) {

		$(".cndButtonAfter:eq(" + (index -1) + ")").css("background-color","var(--primaryHLGradBottom)");

	}

	$(".cndButtonAfter:eq(" + (index) + ")").css("border-left","2vw solid var(--primaryHLGradTop)");
}

function colorRemove(index) {

	$(".cndButtonAfter:eq(" + (index -1) + ")").css("background-color","black");

	$(".cndButtonAfter:eq(" + (index) + ")").css("border-left","2vw solid var(--grey)");
}