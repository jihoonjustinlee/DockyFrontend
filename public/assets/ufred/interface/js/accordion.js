$(document).ready(function() {
	// Generate markup based on parameter given at the top on page load.
	populateMarkup(numItems, headerArray, contentArray);

	// When an accordion button is clicked, calls the accordionClicked function inside accodion.js
	$("button.accordion").click(function() {	
		accordionClicked($(this));
	});
});

// Populates markup based on rapid variables up top
function populateMarkup(numItems, headerArray, contentArray) {

	// Loop through each accordion item
	for(let i = 0; i < numItems; i++) {

		// Generate accordion items
		$(".psurvey").append(`<button class="accordion"><div class="acc-container"><div class="acc-content">${headerArray[i]}</div><div class="plus">&#43;</div></div></button>
									<div class="panel">
									   <p class="psurveyInner">${contentArray[i]}</p>
									</div>`
								);

		// Generate INTERACTIVE audio markups
		switch (i) {

			// If narration exists, put first interative audio after it, otherwise, prepend inside body.
			case 0:
				if ($(".narration").length) {
					$(".narration").last().after(`<audio class="interaction" src="assets/audio/${audioFilename}${i+numAudios+1}.mp3"></audio>`);

				} else {
					$("body").prepend(`<audio class="interaction" src="assets/audio/${audioFilename}${i+numAudios+1}.mp3"></audio>`);
				}
				break;

			// For second interactive audio and on, put them behind the last interactive audio.
			default:
				$(".interaction").last().after(`<audio class="interaction" src="assets/audio/${audioFilename}${i+numAudios+1}.mp3"></audio>`);

		}

	}

}

let accordions = document.getElementsByClassName('accordion')
function accordionClicked(button) {
	$('.accordion.active .plus').html("&#43;")
	// for (let i=0; i<accordions.length; i++){
	// 	// $('.accordion .active .after').html('&#43;')
	// 	$('.accordion.active .after').html("&#43;")
	// }
	// Handles accordion transition logics (not Bill's code)
	if( button.hasClass('active') ){
		button.removeClass('active');
		button.next().removeClass('show');
		showPlayIcon()
	}else{
		$('.accordion').removeClass('active');
		$('.panel').removeClass('show');
		button.addClass('active');
		button.next().addClass('show');
		$('.accordion.active .plus').html('&#8722;')
		showPauseIcon()
	}

	// Handles coorsponding audio play
	const index = $(".accordion").index(button) + numAudios - 1;
	let audios = document.getElementsByTagName('audio')
	if (button.hasClass("active")) {
		playAudio(index);
	} else {
		stopAllAudio();
	}
	audios[index].onended = function(){
//		$('#icon_pause', parent.document).css({
//			display: 'none'
//		})
//		$('#icon_play', parent.document).css({
//			display: 'block'
//		})
//		$('.play-toggle-padding', parent.document).addClass('paused')
	}
}
