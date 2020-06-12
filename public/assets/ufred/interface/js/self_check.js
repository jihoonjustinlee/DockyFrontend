let slideIndex = 0;
const _C = document.querySelector('.swipe-container');
let firstTime = true;

$(document).ready(function() {

	// Generate markup based on parameter given at the top on page load.
	populateMarkup(numItems, questionArray, modalContentArray);

	$(".nextSlide, .prevSlide, .checkmark, .answer-composer").click(function(){
		$(".feedback").animate({opacity: "0",});
	});

	$(".submit").click(function(){
		// index of the corresponding answer array to the current question
		const index = $(".mySlides.vertical-container").index($(this).parent().parent());

		// Submit current button and its corresponding index in the answer array
		submit(this, index);

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
			if (answerArray[$(this).parent().parent().index()].length === 1) {
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
});


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
							</label>`;
		}

		secondPart += `<button class="cndButton basic submit">Submit</button>
					</div>`;

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
									<h2 class="question-header">Congratulations! You have completed this module.</h2>
									<p class="question"><strong>Click the ‘Next’ arrow to continue.</strong></p>
								</div>`);

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

		setTimeout(function() {
			$(`.mySlides:eq(${slideIndex-n})`).removeClass(prevAni).css("display","none");
			$(`.mySlides:eq(${slideIndex})`).css("display","flex").addClass(nextAni).animate({opacity:"1"});
			$(".nextSlide, .prevSlide").css("pointer-events","auto").animate({opacity:"1"},100);
			boundaryCheck();
		}, 1000);

		slideIndex+=n;
	} else {
		$(`.mySlides:eq(${slideIndex})`).css({"display":"flex","opacity":"1"});
		firstTime = false;
		setLowerBoundary();
	}
}

// Check if index is at the boundary (first or last page)
function boundaryCheck() {

	let atLowerBoundary = false;
	let atUpperBoundary = false;
	//console.log(slideIndex);
	//console.log($(".mySlides").length - 1);
	if (slideIndex === $(".mySlides").length - 2) {
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
function submit(scope, index) {

	if (type === "extended") {

		$(scope).parent().siblings($(".modal")).fadeIn().css("display", "flex");

		// If user is not correct, 
		if (!checkAnswer(scope, index)){
			$(".modal-correct").css("display", "none");
			$(".modal-incorrect ").css("display", "block");
			$(".directive:eq(1)").html("Click the 'X' to close the feedback box.");
			$(".modal-title").html("Incorrect");// This is so bad, it is changing all the titles which is a waste of resources. I'm in a rush and this is a patchy solution, please fix this in the future. - Bill  
		} else {
			$(".modal-correct").css("display", "block");
			$(".modal-incorrect ").css("display", "none");
			$(".directive:eq(1)").html("Please proceed to the next question.");
			$(".modal-title").html("Correct");// Same as the above comment - Bill 
		}

	} else {

		let feedbackHTML = "<p><strong>Well done!</strong> That is the correct response.</p>";
		$(".feedback").css("background-color","#00a651");

		// If user is not correct, 
		if (!checkAnswer(scope, index)){

			feedbackHTML = "<p><strong>Sorry.</strong> This is not the correct response.</p>";
			$(".feedback").css("background-color","#ed1b24");
		}

		$(`.feedback:eq(${index})`).html(feedbackHTML);

		$(".feedback").stop(true);
		$(".feedback").animate({opacity: '1',});

		// Could add callback here, 
		scrollToBottom();

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