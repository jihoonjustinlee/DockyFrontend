$(document).ready(function () {
	//  disableMenuButtonsOnload()

	// Generate markup based on parameter given at the top on page load.
	populateMarkup(numItems, questionArray, modalContentArray);
	// carryVolumeOnLoad()
	computedPanelHeight();
	
	$(window).resize(function(){
		computedPanelHeight();
	});
	// When an accordion button is clicked, calls the accordionClicked function inside accodion.js
	$("button.accordion").click(function () {
		accordionClicked($(this));

	});

	$(".submit").click(function () {
		// index of the corresponding answer array to the current question
		const index = $(".panel").index($(this).parent().parent());

		// Submit current button and its corresponding index in the answer array
		submit(this, index);

	});

	$(".modal-close").click(() => {
		clearFeedback();
	});

	// When an answer is selected
	$(".answer-composer").on('click', function (event) {
		//console.log( event.target.tagName);


		// Only trigger once (.answer-composer would trigger input and one of the inner elements)
		if (event.target.tagName === "INPUT") {

			// This is kept as comment as a quick way if we ever need to seperate T/F question from single select ones. -Bill

			//			If the question is a true/false question;
			//			if ($("p", this).text().toLowerCase() === "true" || $("p", this).text().toLowerCase() === "false") { 

			// If the question is single select
			if (answerArray[($(this).parent().parent().index() - 1) / 2].length === 1) {
				let otherInput = $("input", $(this).siblings());
				let thisInput = $("input", this);
				let otherInputCheckState = otherInput.prop("checked");
				let thisInputCheckState = thisInput.prop("checked");

				// This semi-exclusive-or logic gives the wanted outcome, please console.log to understand the logic
				// I came back to this and I have no idea how this logic works - Bill
				//				if (thisInputCheckState && otherInputCheckState === thisInputCheckState) {
				//					otherInput.prop("checked", !otherInput.prop("checked"));
				//				}

				// Clicked on a selected single answer
				if (!thisInputCheckState) {
					// uncheck this input
					thisInput.prop("checked", false);

					// Clicked on a unselected single answer
				} else {
					// uncheck other inputs and check this input
					otherInput.prop("checked", false);
					thisInput.prop("checked", true);
				}
			}

			let disable = true;
			// Enable/disable submit button
			$("input", $(this).parent().parent()).map((index, input) => {
				if ($(input).prop("checked")) {
					disable = false;
				}
			});


			if (disable) {
				$(".submit", $(this).parent()).css({
					"pointer-events": "none",
					"background": "lightGray",
					"color": "darkGray"
				});
			} else {
				$(".submit", $(this).parent()).css({
					"pointer-events": "auto",
					"background": "linear-gradient(#f3743a, #d95b20)",
					"color": "white"
				});
			}
		}
	});
});

let answers = []
for (let i = 0; i < numItems; i++) {
	answers[i] = false
}
function carryVolumeOnLoad(){
  let volSliderInput = parseInt(parent.document.getElementById('volSlider').value)
  const audios = document.getElementsByTagName('audio')
  if(volSliderInput == 1){
    volSliderInput = 0
  }

  for(let i=0; i<audios.length; i++){
    audios[i].volume = volSliderInput/100
  }
}

// The computed panel height of accordions
function computedPanelHeight() {
	// Loop through all accordions and adjust panel width based on the height of the accordion header
	$("button.accordion").map((index, obj)=>{	
		const panelWidth = $(obj).width() - $(obj).height();
		$(obj).next().css("width", `${panelWidth}px`);
	});
}

// Populates markup based on rapid variables up top
function populateMarkup(numItems, questionArray, modalContentArray) {

	// Outter loop for each accordion question
	for (let i = 0; i < numItems; i++) {

		let firstPart = `<button class="accordion" tabindex='1'>
							<div class="acc-container">
								<div class="acc-content">Question ${i+1}</div>
								<div class="plus"></div>
							</div>
						</button>
						<div class="panel customScroll" tabindex='-1'>
							<p class="psurveyInner">${questionArray[i][0]}</p>
							<div class="answer">`;

		let secondPart = "",
			thirdPart = "";

		// Inner loop for each answer of that question					
		for (let j = 1; j < questionArray[i].length; j++) {

			secondPart += `<label class="answer-composer">
								<input type="checkbox" tabindex='-1'>
								<span class="checkmark"></span>
								<p>${questionArray[i][j]}</p>
							</label>`;
		}

		secondPart += `<button class="submit" tabindex='-1'>Submit</button>
					</div>`;


		// I realized afterwards that, unlike the basic version, in advanced selfcheck the modal doesn't have to be generated everysingle time. We should optimize this in the future - Bill
		thirdPart = `<div class="modal">
						<div class="modal-content">
							<div class="modal-header">
								<h3 class="modal-title">${modalContentArray[i][0]}</h3>
								<span class="modal-close" tabindex="1">&times</span>
							</div>
							<div class="modal-body customScroll">
								<p class="modal-correct">${modalContentArray[i][1]}</p>
								<p class="modal-incorrect">${modalContentArray[i][2]}</p>
								<p class="directive">Click the 'X' to exit the feedback box.</p>
							</div>
						</div>
					</div>`;

		$(".psurvey").append(firstPart + secondPart + thirdPart);

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

// Remove feedback box
function clearFeedback() {
	$(".modal").fadeOut();
	parent.currentAudio = previousAudio
}

let previousAudio

function submit(scope, index) {
	$(scope).parent().siblings($(".modal")).fadeIn().css("display", "flex");
	stopAllAudio();
	let audio;

	// If user is not correct, 
	if (!checkAnswer(scope, index)) {
		$(".modal-correct").css("display", "none");
		$(".modal-incorrect ").css("display", "block");
		$(".directive:eq(1)").html("Click the 'X' to close the feedback box.");
		$(".modal-title").html("Incorrect"); // Again, this is changing all the titles which is a waste of resources. I'm in a rush and this is a patchy solution, please fix this in the future. Same as UFred. - Bill  

		audio = $(".incorrectFeedback");

		// User is correct
	} else {
		$(".modal-correct").css("display", "block");
		$(".modal-incorrect ").css("display", "none");
		$(".directive:eq(1)").html("Please proceed to the next question.");
		$(".modal-title").html("Correct"); // Same as above - Bill  
		answers[index] = true

		audio = $(".correctFeedback");

		if (answersAllCorrect()) {
			enableMenuButtonsOnComplete();
		}
	}
	previousAudio = parent.currentAudio
	parent.currentAudio = audio[index]

	audio[index].play();
	$('#playBtn', parent.document).removeClass('play').addClass('pause');

	audio[index].onended = function () {
		$('#playBtn', parent.document).removeClass('pause').addClass('play');
	}
}

// Determine if the user has the correct answer 
function checkAnswer(scope, index) {
	let correct = false;
	let checkAnswerArray = [];

	// Determine the user selection and form an user answer array
	$("input", $(scope).siblings()).map((index, input) => {
		if ($(input).prop("checked")) {
			checkAnswerArray.push(index);
		}
	});

	// Comparing the two answer arrays, if they are the same, user is correct
	if (answerArray[index].toString() === checkAnswerArray.toString()) {
		correct = true;
	}
	return correct;
}



function accordionClicked(button) {

	// Handles accordion transition logics
	if (button.hasClass('active')) {
		button.removeClass('active').next().removeClass('show');
		$('#playBtn', parent.document).removeClass('pause').addClass('play');

	} else {
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
	audios[index].onended = function () {
		$('#playBtn', parent.document).removeClass('pause')
		$('#playBtn', parent.document).addClass('play')
	}
}

function answersAllCorrect() {
	return answers.includes(false) ? false : true
}

// Make sure this function only exists in self_check
function disableMenuButtonsOnload() {
	$('#forward', parent.document).css({
		'pointer-events': 'none'
	})
	$('#forward', parent.document).animate({
		opacity: 0.5
	}, 500)
}

function enableMenuButtonsOnComplete() {
	$('#forward', parent.document).css({
		'pointer-events': 'all'
	})
	$('#forward', parent.document).animate({
		opacity: 1
	}, 500)
}

const checkboxes = document.getElementsByClassName('checkmark')
const customScrolls = document.getElementsByClassName('customScroll')
const submitButtons = document.getElementsByClassName('submit')
const answersDiv = document.getElementsByClassName('answer')

window.addEventListener('keyup', function (e) {

	const allCheckBoxes = document.querySelectorAll('input[type="checkbox"]')
	if (e.keyCode == 13) {

		if ($(document.activeElement).hasClass('accordion')) {

			let customPanel = $(document.activeElement).next()
			let checkboxes = $(customPanel).find('input[type="checkbox"]')
			let submitButton = $(customPanel).find('button.submit')

			if ($(document.activeElement).hasClass('active')) {

				$(allCheckBoxes).attr('tabindex', '-1')
				$(submitButtons).attr('tabindex', '-1')
				$(customScrolls).attr('tabindex', '-1')

				$(customPanel).attr('tabindex', '1')
				$(checkboxes).attr('tabindex', '1')
				$(submitButton).attr('tabindex', '1')


			} else {

				$(customPanel).attr('tabindex', '-1')
				$(checkboxes).attr('tabindex', '-1')
				$(submitButton).attr('tabindex', '-1')
			}
		}

		if ($(document.activeElement).is(':checkbox') || $(document.activeElement).hasClass('modal-close')) {
			$(document.activeElement).click()
		}
		if ($(document.activeElement).hasClass('submit')) {
			$('.modal-close').focus()
		}
	}

	if (e.keyCode == 9) {
		console.log(document.activeElement)

		for (let i = 0; i < checkboxes.length; i++) {
			$(checkboxes[i]).removeClass('focused')
		}

		for (let i = 0; i < customScrolls.length; i++) {
			$(customScrolls[i]).removeClass('focused')
		}

		if ($(document.activeElement).is(':checkbox')) {
			$(document.activeElement).next().addClass('focused')
		} else if ($(document.activeElement).hasClass('customScroll')) {
			$(document.activeElement).addClass('focused')
		}
	}
})