$(document).ready(function(){
	
	// Generate markup based on parameter given at the top on page load.
	populateMarkup(numItems, headerArray, contentArray);

	// When an accordion button is clicked, calls the accordionClicked function inside accodion.js
	$("button.accordion").click(function() {	
		accordionClicked($(this));
	});
	
	computedPanelHeight();
	
	$(window).resize(function(){
		computedPanelHeight();
	});
});

// The computed panel height of accordions
function computedPanelHeight() {
	// Loop through all accordions and adjust panel width based on the height of the accordion header
	$("button.accordion").map((index, obj)=>{	
		const panelWidth = $(obj).width() - $(obj).height();
		$(obj).next().css("width", panelWidth);
	});
}



function accordionClicked(button) {
	
	// Deal with the scrollbar flick appear issue, 50% effective, not solving the whole problem - Bill UPDATE: [issue]this function might not be needed anymore. -Bill
	if (!($(document).height() > $(window).height())) {
		$(".customScroll").css("overflow-y","hidden");
		setTimeout(function() {
			$(".customScroll").css("overflow-y","auto");
		}, 500);
	}
	
	
	// Handles accordion transition logics
	if( button.hasClass('active') ){ // Close accordion
		button.removeClass('active').next().removeClass('show');
		$('#playBtn', parent.document).removeClass('pause').addClass('play');
		
	
	}else{ // Open accordion	
		$('.accordion').removeClass('active');
		$('.panel').removeClass('show');
		button.addClass('active').next().addClass('show');
		$('#playBtn', parent.document).removeClass('play').addClass('pause');
	}

	// Handles coorsponding audio play;   [issue]We should take advantage of "interaction" class here - Bill
	const index = $(".accordion").index(button) + numAudios - 1;
	let audios = document.getElementsByTagName('audio')
	if (button.hasClass("active")) {
		playAudio(index);
	} else {
		parent.currentAudio = audios[0]
		stopAllAudio();
	}
	audios[index].onended = function(){
		$('#playBtn', parent.document).removeClass('pause')
		$('#playBtn', parent.document).addClass('play')
	}
	
}

// Populates markup based on rapid variables up top
function populateMarkup(numItems, headerArray, contentArray) {

	// Loop through each accordion item
	for(let i = 0; i < numItems; i++) {

		// Generate accordion items
		$(".psurvey").append(`<button class="accordion" tabindex="1"><div class="acc-container"><div class="acc-content">${headerArray[i]}</div><div class="plus"></div></div></button>
									<div class="panel customScroll" tabindex="2">
									   	<div class="psurveyInner">${contentArray[i]}</div>
										<div class="psurveyInner image">
											<img class="accordionImage" src="assets/images/${imageFilename}${i+1}.jpg" alt="Accordion Image"/>
										</div>
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