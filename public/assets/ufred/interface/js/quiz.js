let slideIndex = 0;
const _C = document.querySelector('.swipe-container');
let firstTime = true;


let submitAnswerArr = [];

let myInterval;

$(document).ready(function() {
	/* SCORM handling */
	myInterval = setInterval(startQuiz, 500);

});

function startQuiz() {
	let quizDataReady = true//parent.quizDataReady; // The purpose of this is if user left on the quiz window and next time they open scorm will land right on quiz page. 
											//We need to ensure that the scorm data is ready before processing anything, to prevent user submit regardless number of attempts.
	if(quizDataReady) {
		clearInterval(myInterval);

		const scorm = pipwerks.SCORM;
		console.log(scorm.get('cmi.core.score.raw'))
		// Check if learner has submitted this quiz before
		// scorm.get("cmi.interactions._count") > 0 ? alert("User has no more attempts, do something here to make this quiz read only."): alert("Quiz is ready, go ahead.");
		alert("Quiz is ready. Press the OK button to continue.")
		populateMarkup(numItems, questionArray, modalContentArray);

		// if (parent.isLocal() || scorm.get('cmi.interactions._count') === "0"){
		// } else{
		// 	alert("You have already completed the quiz.")
		// }


		// Generate markup based on parameter given at the top on page load.

		$(".nextSlide, .prevSlide, .checkmark, .answer-composer").click(function(){
			$(".feedback").animate({opacity: "0",});
		});

		$(".submit").click(function(){
			// index of the corresponding answer array to the current question
			const index = $(".mySlides.vertical-container").index($(this).parent().parent());
			
			// Submit current button and its corresponding index in the answer array
			submit(this, index);

		});

		$(".submitToMoodle").click(function() {
			submitToMoodle();
		});

		$(".modal-close").click(()=>{
			clearFeedback();
		});

		// When an answer is selected
		$(".answer-composer").on('click', function (event) {
			//console.log( event.target.tagName);

			clearFeedback();

			// Only trigger once (.answer-composer would trigger input and one of the inner elements)
			if( event.target.tagName === "INPUT") {

				// If the question is single select
				if (answerArray[$(this).parent().parent().index()-1].length === 1) {

					let otherInput = $("input", $(this).siblings());
					let thisInput  = $("input", this);
					let otherInputCheckState = otherInput.prop("checked");
					let thisInputCheckState  = thisInput.prop("checked");

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
				$("input", $(this).parent().parent()).map((index, input)=>{
					if ($(input).prop("checked")) {
						disable = false;
					}
				});


				if (disable) {
					$(".submit",$(this).parent()).css({
						"pointer-events"   : "none",
						"background-color" : "lightGray",
						"color"			   : "darkGray"
					});
				} else {
					$(".submit",$(this).parent()).css({
						"pointer-events"   : "auto",
						"background-color" : "var(--black)",
						"color"			   : "var(--white)"
					});
				}
			}
		});

		// Fail safe check for chrome and edge, when cursor leaves viewport and move() is not triggered.
		$(document).on({
				mouseleave:function(){ 

					if (locked){

						_C.classList.toggle('smooth', !(locked = false));
						// Reset transform state
						//_C.style.setProperty('--tx', '0px');
						$(".swipe-container").css("transform", `translate(0px)`); 
						x0 = null;
					}
				},
			}, 
		".swipe-container"
		);

		_C.style.setProperty('--n', N);

		// When touched/mousedown, trigger lock function
		_C.addEventListener('mousedown', lock, false);
		_C.addEventListener('touchstart', lock, false);

		// When touched/mousedown, trigger drag function
		_C.addEventListener('mousemove', drag, false);
		_C.addEventListener('touchmove', drag, false);

		// When touched/mousedown, trigger move function
		_C.addEventListener('mouseup', move, false);
		_C.addEventListener('touchend', move, false);

		function updateDirective() {
			const windowsize = $(window).width();
			let directiveText;
			// This is inefficient, seperate check from update -Bill
			// bill, i've slightly changed the value of the window size so that the directive is also picked up at screen size 1024. windowSize only had <, so i just did <=
			
			windowsize <= 1024 ? directiveText = "Select the correct answer from the options provided.  To proceed to the next question, swipe left.  Then, click the ‘Next’ arrow to continue." : directiveText = "Select the correct answer from the options provided. To proceed to the next question, click the right-facing arrow. Then, click the ‘Next’ arrow to continue."; 
			$(".directive").html(directiveText);
		}
		updateDirective();
		$(window).resize(updateDirective);
	}
}

function populateMarkup(numItems, questionArray, modalContentArray) {

	for(let i = 0; i < numItems; i++) {

		let firstPart = `<div class="mySlides vertical-container">
							<h2 class="question-header">Question ${i+1}:</h2>
							<p class="question">${questionArray[i][0]}</p>
							<div class="answer">`;

		let secondPart = "", thirdPart = "";

		for (let j = 1; j < questionArray[i].length; j++) {

			secondPart += `<label class="answer-composer container">
								<input type="checkbox" >
								<span class="checkmark"></span>

								<p>${questionArray[i][j]}</p>
							</label>
							`;
		}

		// secondPart += `<button class="cndButton basic submit">Submit</button>
		// 			</div>`;

		if (type === "extended") {

			thirdPart = `<div class="modal">
							<div class="modal-content">
								<div class="modal-header">
									<h3 class="modal-title">${modalContentArray[i][0]}</h3>
									<span class="modal-close">&times</span>
								</div>
								<div class="modal-body">
									<p class="modal-correct">${modalContentArray[i][1]}</p>
									<p class="modal-incorrect">${modalContentArray[i][2]}</p>
									<p class="directive">Click the 'X' to exit the feedback box.</p>
								</div>
							</div>
						</div>`;

		} else {

			thirdPart = `<div class="feedback">
							<p>replacable content!</p>
						</div>`;
		}


		$(".swipe-container").append(firstPart + secondPart + thirdPart);

	}

	$(".swipe-container").append(`<div class="mySlides vertical-container">
									<h2 class="question-header">Preview</h2>
									<p class="question"><strong>Once everything looks good, click the 'submit' button.</strong></p>
									<div>

									</div>
									<button class="cndButton basic submitToMoodle">Submit</button>
								</div>`);

	for(let i = 0; i < numItems+1; i++) { 
		$(".carousel-indicators").append(`<li onclick="goToSlide(${i})"></li>`);
	}
	plusSlides(slideIndex);
}


// This will ensure the animations excute correctly, regardless how fast user click.	
function animationLock() {

	_C.removeEventListener("mousedown", lock, false);
	_C.removeEventListener("touchstart", lock, false);

	//console.log("yes?");
	$(".mySlides").one("webkitAnimationEnd oanimationend msAnimationEnd animationend",   
	function(e) {
		//console.log("half done");
		$(".mySlides").one("webkitAnimationEnd oanimationend msAnimationEnd animationend",   
		function(e) {
			//console.log("done");
			$(".mySlides").unbind("webkitAnimationEnd oanimationend msAnimationEnd animationend");

			// When touched/mousedown, trigger lock function
			_C.addEventListener('mousedown', lock, false);
			_C.addEventListener('touchstart', lock, false);

			// When touched/mousedown, trigger drag function
			_C.addEventListener('mousemove', drag, false);
			_C.addEventListener('touchmove', drag, false);

			// When touched/mousedown, trigger move function
			_C.addEventListener('mouseup', move, false);
			_C.addEventListener('touchend', move, false);
		});
	});
}

function goToSlide(n) {
	$(`.mySlides`).removeClass("slideToRight, slideFromLeft, slideToLeft, slideFromRight");
	$(`.container`).animate({opacity:"0"});

	setTimeout(function() {
		$(`.mySlides, .vertical-align`).css("display","none");
		$(`.mySlides:eq(${slideIndex}), .vertical-align`).css({"display":"flex", "opacity":"1"})
		$(`.container`).animate({opacity:"1"});	
		$(".nextSlide, .prevSlide").css("pointer-events","auto").animate({opacity:"1"},100);
	}, 1000);

	slideIndex = n;
	boundaryCheck();
	setCarouselIndicator();
}


// Next/previous controls
function plusSlides(n) {
	boundaryCheck();
	clearFeedback();
	animationLock();
	// Going next slide animations
	let prevAni = "slideToLeft";
	let nextAni = "slideFromRight";

	// Going previous slide animations
	if(n<0) {
		prevAni = "slideToRight";
		nextAni = "slideFromLeft";
	} 

	if (!firstTime) {
		$(`.mySlides`).removeClass("slideToRight, slideFromLeft, slideToLeft, slideFromRight");
		$(`.mySlides:eq(${slideIndex})`).addClass(prevAni).animate({opacity:"0"});
		$(".nextSlide, .prevSlide").css("pointer-events","none").animate({opacity:"0"},100);
		$(".carousel-indicators").animate({opacity:"0"}, 100)


		setTimeout(function() {
			$(`.mySlides:eq(${slideIndex-n})`).removeClass(prevAni).css("display","none");
			$(`.mySlides:eq(${slideIndex})`).css("display","flex").addClass(nextAni).animate({opacity:"1"});

			$(".carousel-indicators").animate({opacity:"1"}, 500)

			$(".nextSlide, .prevSlide").css("pointer-events","auto").animate({opacity:"1"},100);
			boundaryCheck();
		}, 1000);

		slideIndex+=n;
	} else {
		$(`.mySlides:eq(${slideIndex})`).css({"display":"flex","opacity":"1"});
		firstTime = false;
		setLowerBoundary();
	}

	setCarouselIndicator();
}

function setCarouselIndicator() {
	$(`.carousel-indicators li`).removeClass('active');
	$(`.carousel-indicators li:eq(${slideIndex})`).addClass('active');
	// If at summary slide, style of the indicators are slightly different

	if(slideIndex === numItems) {
		$(`.carousel-indicators li`).css("border", "1.5px solid white");
		$(`.carousel-indicators .active`).css("background-color", "white");
	} else {
		$(".carousel-indicators li").removeAttr("style");
	}
}


// Check if index is at the boundary (first or last page)
function boundaryCheck() {

	let atLowerBoundary = false;
	let atUpperBoundary = false;
	//console.log(slideIndex);
	//console.log($(".mySlides").length - 1);
	if (slideIndex === $(".mySlides").length - 1) { // Change the 1 back to 2 if we want to ditch the last page
		setUpperBoundary();
		atUpperBoundary = true;
	} else if (slideIndex === 0){
		setLowerBoundary();
		atLowerBoundary = true;
	} else {
		resetBoundary();
	}

	return [atLowerBoundary, atUpperBoundary];
}

function setUpperBoundary() {
	$(".nextSlide").css({
		"pointer-events":"none",
		"border-left": "3vh solid #828282"
	});
}

function setLowerBoundary() {
	$(".prevSlide").css({
		"pointer-events":"none",
		"border-right": "3vh solid #828282"
	});
}

function resetBoundary() {
	$(".prevSlide").css("border-right", "3vh solid var(--darkGradTop)").mouseenter(function() {
		$(this).css("border-right", "3vh solid var(--primary)");
	}).mouseleave(function() {
		$(this).css("border-right", "3vh solid var(--darkGradTop)");
	});
	$(".nextSlide").css("border-left", "3vh solid var(--darkGradTop)").mouseenter(function() {
		$(this).css("border-left", "3vh solid var(--primary)");
	}).mouseleave(function() {
		$(this).css("border-left", "3vh solid var(--darkGradTop)");
	});
}

// This is to show feedback for each question, if needed; For the function that submit results to moodle look for submitToMoodle()
function submit(scope, index) {

	if (type === "extended") {

		$(scope).parent().siblings($(".modal")).fadeIn().css("display", "flex");

		// If user is not correct, 
		if (!checkAnswer(scope, index)){
			$(".modal-correct").css("display", "none");
			$(".modal-incorrect ").css("display", "block");
			$(".directive:eq(1)").html("Click the 'X' to close the feedback box.");
			$(".modal-title").html("Incorrect");// This is so bad, it is changing all the titles which is a waste of resources. I'm in a rush and this is a patchy solution, please fix this in the future. - Bill  
		
			// record wrong answer attempt
			submitAnswerArr[index] === undefined ? submitAnswerArr.push(false) : null;

		} else {
			$(".modal-correct").css("display", "block");
			$(".modal-incorrect ").css("display", "none");
			$(".directive:eq(1)").html("Please proceed to the next question.");
			$(".modal-title").html("Correct");// Same as the above comment - Bill 

			submitAnswerArr[index] === undefined ? submitAnswerArr.push(true) : null;
		}

	} else {

		let feedbackHTML = "<p><strong>Well done!</strong> That is the correct response.</p>";
		$(".feedback").css("background-color","#00a651");

		// If user is not correct, 
		if (!checkAnswer(scope, index)){

			feedbackHTML = "<p><strong>Sorry.</strong> This is not the correct response.</p>";
			$(".feedback").css("background-color","#ed1b24");

			// record wrong answer attempt
			submitAnswerArr[index] === undefined ? submitAnswerArr.push(false) : null;
		} else {

			submitAnswerArr[index] === undefined ? submitAnswerArr.push(true) : null;
		}

		$(`.feedback:eq(${index})`).html(feedbackHTML);

		$(".feedback").stop(true);
		$(".feedback").animate({opacity: '1',});

		// Could add callback here, 
		scrollToBottom();

	}

	// All first attempts have been recorded, ready to send off to moodle and generate UI feedback
	if (submitAnswerArr.length === numItems) {
		$('.question').html(`${submitAnswerArr}`);
	}
}

// Remove feedback box
function clearFeedback() {
	if (type === "basic") {
		$(".feedback").animate({opacity: '0',});
	} else if (type === "extended") {
		$(".modal").fadeOut();
	}
}

// Auto scorll to bottom of the page
function scrollToBottom() {
	$('body').animate({
		scrollTop: $('body').get(0).scrollHeight
	}, 2000);
}

// Determine if the user has the correct answer 
function checkAnswer(scope, index) {
	let correct = false;
	let checkAnswerArray = [];

	// Determine the user selection and form an user answer array
	$("input", $(scope).siblings()).map((index,input)=>{
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

// Swipe control
const N = _C.children.length;

let i = 0,x0 = null, y0 = null, locked = false;

function unify(e) {return e.changedTouches ? e.changedTouches[0] : e;};

function lock(e) {
	x0 = unify(e).clientX;
	y0 = unify(e).clientY;
	_C.classList.toggle('smooth', !(locked = true));

};


let block = false;
function drag(e) {
	if (locked) {

		// Logic for resolving the vertical scroll
		let dy = Math.abs(unify(e).clientY - y0);
		let dx = Math.abs(unify(e).clientX - x0);

		let dvw = dx/window.innerWidth*100;
		let dvh = dy/window.innerHeight*100;

		if ((dx > dy && dvh < 30) ) {

			// drag
			e.preventDefault();
			$(".swipe-container").css("transform", `translate(${Math.round(unify(e).clientX - x0)}px)`); 

		} else if(dx < dy) {
			// reset
			$(".swipe-container").css("transform", `translate(0px)`); 
			_C.classList.toggle('smooth');
			block = true;
		}
	}
};

// If dragged distance is smaller than X viewwidth, snap the container back, otherwise, trigger forward or backward function accordingly
function move(e) {
	let dx = unify(e).clientX - x0,s = Math.sign(dx),  dy = Math.abs(unify(e).clientY - y0); ;

	// Makes sure the locked state is reset, since mouse has been released. Or, if mouse left the question box.
	if (locked &&  (Math.abs(dx)>=0)){

		_C.classList.toggle('smooth', !(locked = false));

		// Changed viewwidth percent
		let dvw = dx/window.innerWidth*100;
		let dvh = dy/window.innerHeight*100;

		// If not at lower boundary, go to previous slide
		if (dvw > 20 && !boundaryCheck()[0] && Math.abs(dx)>Math.abs(dy) && !block) {
			plusSlides(-1);

		//  If not at upper boundary, go to next slide
		} else if (dvw < -20 && !boundaryCheck()[1]  && Math.abs(dx)>Math.abs(dy) && !block) {
			plusSlides(1);
		}
		// Reset transform state
		//_C.style.setProperty('--tx', '0px');
		$(".swipe-container").css("transform", `translate(0px)`); 
		x0 = null;
		y0 = null;
		block = false;
	}
};


function submitToMoodle() {
	const scorm = pipwerks.SCORM;
	let numCorrectAnswers = 0;

	// Find an array index to use for the new interaction by getting number of total interactions
	// let index = scorm.get("cmi.interactions._count"); // This is for multiple quizes

	for (let i = 0; i < numItems; i++) {

		let index = 0;

		index = index + i;
		console.log(index)
		/* Set new question ID */
		const quizID = `quiz-question-${index}`;


		/* 
			Set the type of interaction. The options include:
			true-false, choice, fill-in, long-fill-in, likert, matching,
			performance sequencing, numeric, other (see RTE table 4.2.9a)
		*/
		let type;
		if (answerArray[i].length === 1 ) {
			questionArray[i].map((obj)=>{
				// I put T/F question type check inside single selection check as a fail safe, 
				// in the case of the extreme case where true/false text is involved but it is not a single selection. - Bill
				(obj.toLowerCase() === "true" || obj.toLowerCase() === "false") ? type = "true-false": type = "choice";
			});
		} else {
			// [TODO]Here would be multiple selections, Justin you will have to find out what to do with this question type, as there doesnt seem to be a straightforward input type in scorm doc for multi-selection.
			type = "multi-selection" // [ISSUE]This is not a valid term that moodle reconizes.
		}


		/* 
			Description is typically the question asked or task
		*/
		let description = questionArray[i][0];

		/*
			Passing the expected answer here. correct_response is an array of expected answers.
			I have not yet found documentation on how to pass advanced pattern.
			For multiple selections, simply increment the n position before '.pattern'
			I do not fully understand correct_response.n.pattern. Please proceed with caution and read up the doc to see if I missed anything. - Bill
		*/
		let correct_response = [];
		switch (type) {
			case "choice":
				correct_response.push(questionArray[i][parseInt(answerArray[i]) + 1]); // The corresponding correct answer from answer array
				break;
			case "true-false":
				correct_response.push(questionArray[i][parseInt(answerArray[i]) + 1]);
				break;
			case "multi-selection":
				answerArray[i].map((obj)=>{
					correct_response.push(questionArray[i][parseInt(obj) + 1])
				});
				break;
		}


		/*
			Collect student responses
		*/
		let student_response = [];
		let checkAnswerArray = []; // This is for the result section right after this
		$("input",$(".answer")[i]).map((index, input)=>{

			// Push all the checked answer text to learner_responses array
			input.checked ? student_response.push($("p", $(input).parent()).html()): null;

			// Push index to checkAnswerArray for checking answers 
			input.checked ? checkAnswerArray.push(index): null; // I seperated those to lines to make it slightly less confusing.

		});    
		
		/*
			Stores the interaction result. The values may be:
			correct, incorrect, unanticipated, neutral, or a real number.
			Determined by checking if the student is correct or not on each question.

			We are not taking advantage of the checkAnswer(scope, index) function here, 
			because checkAnswer(...arg) was designed to be triggered via submit button in the same level as the question itself.
			If we need to checkAnswer to provide instant feedback on user action, then we should use checkAnswer(...arg) to check answer. 
		*/
		let result = "unanticipated"; // Check with Alicia if we want to take advantage of 'unanticipated' for things like learner left a question blank

		// Comparing the two answer arrays, if they are the same, user is correct
		if (answerArray[i].toString() === checkAnswerArray.toString()) {
			result = "correct";
			numCorrectAnswers++;
		}  else {
			result = "wrong";
		}


		// [TODO] Push in an array and loop it through
		scorm.set(`cmi.interactions.${index}.id`, quizID);
		scorm.set(`cmi.interactions.${index}.type`, type);
		scorm.set(`cmi.interactions.${index}.description`, description);
		correct_response.map((obj, i)=> {
			scorm.set(`cmi.interactions.${index}.correct_responses.${i}.pattern`, obj);
		});
		// [TODO]May have an issue here, student_response are supposed to just be a string literal, we need to figure out if it is OK to pass in an array for muti-selection.
		student_response.map((obj, i)=> {
			scorm.set(`cmi.interactions.${index}.correct_responses.${i}.pattern`, obj);
		});
		scorm.set(`cmi.interactions.${index}.result`, result);

		scorm.set(`cmi.interactions.${index}.weighting`, 20);

		console.log(`Question: ${index}`);
		console.log(`QuizID: ${quizID}`);
		console.log(`Type: ${type}`);
		console.log(`Description: ${description}`);
		console.log(`Correct_response: ${correct_response}`);
		console.log(`Student_response: ${student_response}`);	
		console.log(`Result: ${result}`);
		console.log(`---------------------------------------`);

		
	}
	
	score = Math.round(numCorrectAnswers/numItems * 100);
	scorm.set(`cmi.core.score.raw`, score);
	scorm.set(`cmi.core.score.max`, 100);
	scorm.set(`cmi.core.score.min`, 0);
	// scorm.set("cmi.core.lesson_status", "passed")

	console.log(`Here is your raw score for this quiz: ${score}`);

	let res = scorm.save();
	let resText;
	res ? resText = "submission sucessful." : resText = "submission failed";
	alert(`By pressing the submit button, your quiz score will be graded on LMS.`)

	// parent.complete();

}