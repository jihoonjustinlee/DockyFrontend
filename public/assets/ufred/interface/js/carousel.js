// $(".fade-wrapper").hide().fadeIn();
		
var pid = getPageID();
//var pid = '#p0';

$(document).ready(function() {

	// Generate markup based on parameter given at the top on page load.
	populateMarkup(numItems, headerArray, contentArray);	

	$( '.siema' ).load(function() {
		  console.log(" .siema is now loaded!");
		  TweenMax.to($('.siema'), .5, {autoAlpha: 1, ease: Power1.easeOut });
	});	

	var currentSlideTextbox = $('.storytellerTextbox');		
	var audio = $('.narration');	
	const mySiema = new Siema({ 
		onInit: firstSlideFirstTime,
		onChange: printSlideIndex,
		draggable: false
	});		
	var currentSlide = mySiema		

	//this is for handling a tween on gradient colours
	//create an object to store initial color values
	var nextColors = {top:"rgb(45,45,45)", bottom:"rgb(00,00,00)"};
	var prevColors = {top:"rgb(45,45,45)", bottom:"rgb(00,00,00)"};

	//create a paused tween
	//use ColorPropsPlugin to tween the top and bottom colors
	//one variable for each button to properly track their current colours	
	var hoverNextTween = TweenMax.to(nextColors, 0.25, {
	  colorProps:{
		top:"rgb(169,27,27)", 
		bottom:"rgb(139,22,22)"
	  }, 
	  onUpdate:colorizeNext, 
	  onUpdateParams:[".next"], 
	  paused:true, 
	  ease: Power1.easeInOut	
	});	

	var hoverPrevTween = TweenMax.to(prevColors, 0.25, {
	  colorProps:{
		top:"rgb(169,27,27)", 
		bottom:"rgb(139,22,22)"
	  }, 
	  onUpdate:colorizePrev, 
	  onUpdateParams:[".prev"], 
	  paused:true, 
	  ease: Power1.easeInOut,
	});		


	const prev = document.querySelector('.prev');
	const next = document.querySelector('.next');

	prev.addEventListener('click', () => mySiema.prev(1, () => playCurrentSlide()));
	next.addEventListener('click', () => mySiema.next(1, () => playCurrentSlide()));

	// setting Prev/Next button hover related functions	
	$(".prev").hover(overPrev, outPrev);
	$(".next").hover(overNext, outNext);

	$(window).resize(function(){

		let scrollBar = $(document).height() > $(window).height();

		// Checks if vertical scrollbar has appeared on resize
		if (scrollBar && $(window).width() < 500) {

			$(".storytellerContainer, .textarea").css("width", "97.5vw");

		} else if (scrollBar) {

			$(".storytellerContainer, .textarea").css("width", "99.5vw");

		} else {
			$(".storytellerContainer, .textarea").css("width", "100vw");
		}
	});


	// Checks if vertical scrollbar has appeared
	let scrollBar = $(document).height() > $(window).height();

	if (scrollBar && $(window).width() < 500) {

		$(".storytellerContainer, .textarea").css("width", "97.5vw");

	} else if (scrollBar) {

		$(".storytellerContainer, .textarea").css("width", "99.5vw");

	}

	function populateMarkup(numItems, headerArray, contentArray) {

		for(let i = 0; i < numItems; i++) {

			let position = headerArray[i].toLocaleLowerCase().replace(/ /g,'');

			if (position !== "bottom" && position !== "right" && position !== "left") {
				position = "bottom";
			}

			$(".siema").append(`<div class="displayContainer storyteller">
								<div class="storytellerTextbox ${position}" >${contentArray[i]}</div>
								<div class="storytellerImage"></div>
							</div>`);

			let index = i + 1;

			$('.storytellerImage:eq('+ i +')').css("background-image", `url(assets/images/${imageFilename}${index}.jpg)`);

		}

	}


	function printSlideIndex() {

		for (var i = 0; i < currentSlideTextbox.length; i++) { 
			// currentSlideTextbox[0].style.opacity = "0"; 
		}

		if (this.currentSlide == 0) {
				firstSlide();
			} else if (this.currentSlide == mySiema.innerElements.length-1) {
				lastSlide();
			} else {
				inbetweenSlide();
		}
	}

	function firstSlideFirstTime( ) { 
		$('.prev').addClass("nopointer");
		// currentSlideTextbox[0].style.opacity = "0"; 
		//console.log(" .siema is now loaded!");
		// TweenMax.to($('.storytellerContainer'), .5, {autoAlpha: 1, ease: Power1.easeOut });
		TweenMax.to($('.prev'), .25, {autoAlpha: .25, ease: Power1.easeOut, /*onStart: function() { deactivatePrevTween.play();  }*/ });
		//TweenMax.to(currentSlideTextbox[0], 0.75, {autoAlpha: 1, delay: 2, ease: Power1.easeOut, onStart: playCurrentSlideAudio });
		TweenMax.to($('.next'), .25, {autoAlpha: 1, ease: Power1.easeOut});
		hiddenChecker = setInterval(hiddenCheck, 100);

		$(`.storytellerTextbox:eq(0)`).fadeIn(2000).css('opacity', '1');
		// audio[0].play();
	}	

	function firstSlide( ) { 
		$('.prev').addClass("nopointer");
		//currentSlideTextbox[0].style.opacity = "0"; 
		playCurrentSlide();
		hoverPrevTween.reverse();
		TweenMax.to($('.prev'), .25, {autoAlpha: .25, ease: Power1.easeOut, /*onStart: function() { deactivatePrevTween.play();  }*/ });
		hiddenChecker = setInterval(hiddenCheck, 100);	
	}

	function inbetweenSlide( ) { 		
		//currentSlideTextbox[mySiema.currentSlide].style.opacity = "0"; 
		playCurrentSlide();
		var prevOpac = $(".prev").css("opacity");
		var nextOpac = $(".next").css("opacity");
		if (prevOpac < 1) {
			TweenMax.to($('.prev'), .25, {autoAlpha: 1, ease: Power1.easeOut, onComplete: function() { prev.classList.remove('nopointer'); }});
			}
		if (nextOpac < 1) {
			TweenMax.to($('.next'), .25, {autoAlpha: 1, ease: Power1.easeOut, onComplete: function() { next.classList.remove('nopointer'); }});
			}
		hiddenChecker = setInterval(hiddenCheck, 100);	
	}

	function lastSlide( ) { 
		//currentSlideTextbox[mySiema.currentSlide].style.opacity = "0"; 
		playCurrentSlide();
		$('.next').addClass("nopointer");
		hoverNextTween.reverse();
		TweenMax.to($('.next'), .25, {autoAlpha: .25, ease: Power1.easeOut, /*onStart: function() { deactivateNextTween.play(); }*/ });
		hiddenChecker = setInterval(hiddenCheck, 100);	
	}

	function playCurrentSlide() {
		stopAllAudio();
		//TweenMax.to(currentSlideTextbox[mySiema.currentSlide], .75, {autoAlpha: 1, ease: Power1.easeOut,  delay: 1, onStart: playCurrentSlideAudio });
		// $(`.storytellerTextbox:eq(${mySiema.currentSlide})`).fadeIn(3000);
		$(`.storytellerTextbox:eq(${mySiema.currentSlide})`).css('opacity', '1');
		playCurrentSlideAudio();

	}	

	function playCurrentSlideAudio() {
		if (audio[mySiema.currentSlide]&&window.parent.$(pid).hasClass('unhidden')) {
			console.log(mySiema.currentSlide);
			audio[mySiema.currentSlide].play();
		}
	}	

	function stopAllAudio() {
		for (i = 0; i < audio.length; i++) { 
			audio[i].pause();
			audio[i].currentTime=0;
		}
	}	

	function overPrev() {
	  hoverPrevTween.play();
	};

	function outPrev() {
		if (mySiema.currentSlide != 0) {
			hoverPrevTween.reverse();
		}
	}

	function overNext() {
	  hoverNextTween.play();
	};

	function outNext() {
		if (mySiema.currentSlide != mySiema.innerElements.length-1) {
			hoverNextTween.reverse();
		}
	}

	function colorizePrev(element) {
		TweenLite.set(element, {background:"-webkit-linear-gradient(to bottom," + prevColors.top + ", " + prevColors.bottom + ")",background:"linear-gradient(to bottom," + prevColors.top + ", " + prevColors.bottom + ")"});
	}

	function colorizeNext(element) {
		TweenLite.set(element, {background:"-webkit-linear-gradient(to bottom," + nextColors.top + ", " + nextColors.bottom + ")",background:"linear-gradient(to bottom," + nextColors.top + ", " + nextColors.bottom + ")"});
	}

	// function to check if audio is running when page is not active
	function hiddenCheck () {
		if(window.parent.$(pid).hasClass('hidden')||window.parent.$(pid).hasClass('hidingIt')) { // only thing here to edit would be $("#p14") to the current page number
			stopAllAudio();
			clearInterval(hiddenChecker);
		}
	}	



}); // closing bracket for windows.onload	