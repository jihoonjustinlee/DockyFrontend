var audio1 = $('.narration')[0];

var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

// The id of the dragWords will be a match to to the answer with the same index in the following array. 
// bass ackwards? Maybe a bit. if you find this confusing feel free to shake your head at Dave for doing this. 

//checks if draggables were in or out of droppable scope
//outside = 1 : draggable is outside of droppable
//outside = 0 : draggable is inside of droppable
let outside = 1

$(document).ready(function () {
	populateMarkup(numItems, answerContent, type);
	carryVolumeOnLoad()
	/* Allow markup population to complete */
	$('body').delay(500).fadeIn(500);


	$('.modal-title').html(modalContent[0]);
	$('.replaceble').html(modalContent[1]);




});


/* Generate markup */
function populateMarkup(numItems, answerContent, type) {


	// Based on number of items to determine the responsiveClass, a class used to deal with responsiveness for different number of items
	let responsiveClass = '';

	switch (numItems) {
		case 2:
			responsiveClass = 'twoItems'
			break;
		case 3:
			responsiveClass = 'threeItems'
			break;
		case 4:
			responsiveClass = 'fourItems'
			break;
		case 5:
			responsiveClass = 'fiveItems'
			break;
		case 6:
			responsiveClass = 'sixItems'
			break;
	}

	// Loops through number of items
	for (let i = 0; i < numItems; i++) {
		console.log(i);
		// Populates draggables with interaction audios
		$(".draggableContainer").append('<div id="' + i + '" class="dragWords" tabindex="1" data-key="' + i + '"><strong style="pointer-events:none">' + answerContent[i] + '</strong></div>' +
			`<audio class="interaction" src=assets/audio/${audioFilename}${i+numAudios+1}.mp3></audio>`);


		// Convert "1,2,3..." into "a,b,c..."
		let letterId = String.fromCharCode(97 + i);

		// ResourceID starts at 1, index starts at 0, thus i + 1;
		let resourceId = i + 1;

		// Populate droppable contents based on the screen type.
		if (type === 'image') {
			$(".droppableContainer").append('<div class= "dropContainer imgContainer landscapeImages ' + responsiveClass + '" id="' + letterId + '" tabindex="2" data-val="' + letterId + '"><img class="dragAndDropImage" src="assets/images/' + imageFilename + resourceId + '.jpg" alt="" style="pointer-events:none"><div class="dropAnswer" style="bottom:13px;"></div></div>');
			$(`#${letterId}`).attr('data-after', imageTitle[i])

		} else if (type === 'text') {
			$(".droppableContainer").append('<div class= "dropContainer landscapeText ' + responsiveClass + '" id="' + letterId + '" tabindex="1" data-val="' + letterId + '"><p class="customScroll" style="overflow-y:auto;" data-val="' + letterId + '"><span class="content" data-val="' + letterId + '">' + dropContent[i] + '</span></p><div class="dropAnswer"></div></div>');
		}
	}

	checkFiveItemTabletLayout();

	init();

	// add one last audio file for final feedback
	$(".draggableContainer").append(`<audio class="interaction" src=assets/audio/${audioFilename}${numItems+numAudios+1}.mp3></audio>`);

	let iosDragKey
	let iosDropVal
	let iosIndex
	let answersToGo = numItems

	if (iOS) {
		$('.dragWords').bind('touchstart', function (e) {
			iosDragKey = answerArray[parseInt($(e.target).data('key'))]

			iosIndex = iosDragKey.charCodeAt(0) - 97;
			$('.interaction')[iosIndex].load()

		})
		$('.dragWords').bind('touchend', function (e) {
			iosDropVal = $(e.target).data('val')
			
			if (iosDragKey == iosDropVal) {
				answersToGo--
				parent.currentAudio = $('.interaction')[iosIndex]
				$('.interaction')[iosIndex].play()
			}

			if(answersToGo == 0){
				alert('finished')
			}
		})
	}

}

// On window resize check for a particular layout need when we have five items
$(window).resize(function () {
	checkFiveItemTabletLayout();
});

function checkFiveItemTabletLayout() {

	//	console.log(numItems);
	//	console.log(window.innerWidth);
	if (numItems === 5 && $(".droppableContainer").height() >= 2 * $(".dropContainer").height()) {

		$(`.droppableContainer.flexContainer`).css(`justify-content`, `center`);
	} else if ($(`.droppableContainer.flexContainer`).css(`justify-content`) === 'center') {

		$(`.droppableContainer.flexContainer`).css(`justify-content`, `space-evenly`);
	}
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

function init() {
	$('.dropContainer').droppable({
		//out and over is real time check to see if any draggable object was hovered
		out: () => {
			outside = 1
		},
		over: () => {
			outside = 0
		},
		drop: function (event, ui) {
			checkAnswer($(this).attr('id'), ui.draggable.attr('id'));
			// $(this).css('overflowY', 'hidden');			
		}
	});


	for (var i = 0; i < 6; i++) {
		$('#' + i).draggable({
			revert: "valid",
			//stop tracks when a draggable is released from the mouse
			stop: (event, ui) => {
				//if draggable was dropped outside
				if (!checkInside(outside)) {
					$('#' + ui.helper.attr('id')).animate({
						left: 0,
						top: 0
					}, 500)
				}
				//it is inside
				else {
					console.log("it is inside")
				}
				
				allCorrect();
				outside = 1
			},
			scroll: false,
			containment: '.halfHorizontal'
		});
	}
}

//check if draggable is inside or outsisde
const checkInside = (outside) => {
	return (outside == 0) ? true : false
}

function hiddenCheck() {
	audio1.pause();
	audio1.currentTime = 0;
	clearInterval(hiddenChecker);
}


function checkAnswer(dropID, dragID) {
	// answer is coorect
	if (answerArray[parseInt(dragID)] == dropID) {

		stopAllAudio();

		// handles audio logic for drag and drop
		const index = dropID.charCodeAt(0) - 97;

		//$('.interaction')[index].play(); // [issue]Why is this not working on IOS?

		let audios = document.getElementsByTagName('audio');
		parent.currentAudio = audios[index + numAudios]
		audios[index + numAudios].play();
		
		$('#playBtn', parent.document).removeClass('play').addClass('pause');

		audios[index + numAudios].onended = function () {
			$('#playBtn', parent.document).removeClass('pause').addClass('play');
		}


		//		let audios = document.getElementsByTagName('audio')
		//		if (button.hasClass("active")) {
		//			playAudio(index);
		//		} else {
		//			stopAllAudio();
		//		}
		//		audios[index].onended = function(){
		//			$('#playBtn', parent.document).removeClass('pause').addClass('play')
		//		}




		$('#' + dragID).css("opacity", "0")

		//TweenMax.to($('#'+dragID), 0.5, { opacity: 0, ease: Power1.easeInOut });
		$('#' + dropID).scrollTop(0)
		$('#' + dropID).children('.dropAnswer').html('<p style="padding-left:0;"><strong>' + $('#' + dragID).text() + '</strong></p>');
		$('#' + dropID).addClass('correct');

		TweenMax.to($('#' + dropID + '> img'), 0.35, {
			border: '10px solid green',
			yoyo: true,
			repeat: 1,
			ease: Power1.easeInOut
		});

		TweenMax.to($('#' + dropID + '> p'), 0.35, {
			border: '10px solid green',
			yoyo: true,
			repeat: 1,
			ease: Power1.easeInOut
		});

		//
		//		if($('#'+dropID+'>.dropAnswer').css('display')=="none"){
		//				console.log("Nice!");
		//		   }   
		//		   else {
		//			   console.log($('#'+dropID+'>.dropAnswer').css('display'));
		//		   }
		TweenMax.to($('#' + dropID + '>.dropAnswer'), 0.5, {
			opacity: 1,
			ease: Power1.easeInOut
		});

		$('#' + dropID + '>.dropAnswer').fadeIn();
		$('#' + dropID + '>.dropAnswer').css('display', 'flex');

		let id = dropID.charCodeAt(0) - 97;

		$('span.content:eq(' + id + ')').css({
			"height": "65%",
			"overflow-y": "auto"
		});
		allCorrect();
	} else {
		TweenMax.to($('#' + dropID + '> img'), 0.35, {
			border: '10px solid #A91E23',
			yoyo: true,
			repeat: 1,
			ease: Power1.easeInOut
		});

		TweenMax.to($('#' + dropID + '> p'), 0.35, {
			border: '10px solid #A91E23',
			yoyo: true,
			repeat: 1,
			ease: Power1.easeInOut
		});
	}
}

function allCorrect() {
	if ($('.correct').length == $('.dropAnswer').length) {
		// If user got everything right
		$('.dragWords').css('visibility', 'hidden');

		// loop through audios
		$(".interaction").map(function (index, audio) {
			// detect the last playing feedback audio
			if (audio.duration > 0 && !audio.paused) {
				// On last feedback audio end
				// audio.onended = function () {
				// 	$("#myModal").fadeIn();
				// 	$('.interaction')[numItems].play();
				// 	$('.interaction')[numItems].onended = function () {
				// 		$('#playBtn', parent.document).removeClass('pause').addClass('play');
				// 	}
				// }


				audio.onpause = function(){
          console.log(audio.currentTime)
          console.log(audio.duration)
          if(audio.currentTime == audio.duration){
            $("#myModal").fadeIn();
            parent.currentAudio = $('.interaction')[numItems]
            
            if (iOS) {
              $('#playBtn', parent.document).removeClass('pause').addClass('play')
              $('#playBtn', parent.document).focus()
              $('#playBtn', parent.document).css({
                'box-shadow': '0 0 0 2px red inset'
              })

              setTimeout(() => {
                $('#playBtn', parent.document).css({
                  'box-shadow': 'none'
                })
              }, 1000);

              // $('#playBtn', parent.document).click(function () {


              //   $('.interaction')[numItems].onended = function () {
              //     $('#playBtn', parent.document).removeClass('pause').addClass('play');
              //     $('#playBtn', parent.document).blur()
              //   }
              // })
           } else {
             parent.currentAudio.play()

             parent.currentAudio.onpause = function(){
               console.log("Testing")
             }

             parent.currentAudio.onplay = function(){
              $('#playBtn', parent.document).removeClass('play').addClass('pause')
             }
            // $('.interaction')[numItems].play();
            $('.interaction')[numItems].onended = function () {
              $('#playBtn', parent.document).removeClass('pause').addClass('play');
            }
          }
          }
        }
			}
		});


	}
}

function removeTabIndex(dropID, dragID, draggable, droppable) {
	if (answerArray[parseInt(dragID)] == dropID) {
		$(draggable).removeAttr('tabindex')
		$(droppable).removeAttr('tabindex')
	}
}

const draggablesDOM = document.getElementsByClassName('dragWords')
const droppablesDOM = document.getElementsByClassName('dropContainer')
let isDraggableSelected = false
let isDroppableSelected = false
let draggableIndex = null
let droppableIndex = null

window.addEventListener('keyup', function (e) {

	if (e.keyCode == 9) {
		console.log(document.activeElement)
		// reset all focuses on tab if draggable hasn't been selected
		if (!isDraggableSelected) {
			for (let i = 0; i < draggablesDOM.length; i++) {
				$(draggablesDOM[i]).removeClass('focused')
			}
		}

		// reset focus on droppables on tab
		for (let i = 0; i < droppablesDOM.length; i++) {
			$(droppablesDOM[i]).removeClass('focused')
		}

		// select draggable
		if ($(document.activeElement).hasClass('dragWords')) {
			if (!isDraggableSelected) {
				$(document.activeElement).addClass('focused')
			}
		}

		// select droppable
		else if ($(document.activeElement).hasClass('dropContainer')) {
			$(document.activeElement).addClass('focused')
		}

	}

	if (e.keyCode == 13) {

		// if any of the draggable is selected
		for (let i = 0; i < draggablesDOM.length; i++) {
			if ($(draggablesDOM[i]).hasClass('focused')) {

				// remember the index of the selected draggable, and set flag to true
				isDraggableSelected = true
				draggableIndex = i
				break
			}
		}

		// if draggable is selected
		if (isDraggableSelected) {

			for (let i = 0; i < droppablesDOM.length; i++) {

				//check if droppable is also selected
				if ($(droppablesDOM[i]).hasClass('focused')) {

					// remember the index of the focus of the droppable, and set flag to true
					isDroppableSelected = true
					droppableIndex = i
					break;
				}
			}

			// if droppable not selected, find the first not selected
			if (!isDroppableSelected) {
				for (let i = 0; i < droppablesDOM.length; i++) {
					if (!$(droppablesDOM[i]).hasClass('correct')) {
						$(droppablesDOM[i]).focus()
						$(droppablesDOM[i]).addClass('focused')
						break
					}
				}
			}
		}

		// if draggable and droppable is selected
		if (isDraggableSelected && isDroppableSelected) {

			let focusedDraggable = $(draggablesDOM[draggableIndex])
			let focusedDroppable = $(droppablesDOM[droppableIndex])

			let key = $(draggablesDOM[draggableIndex]).attr('id')
			let val = $(droppablesDOM[droppableIndex]).attr('id')

			checkAnswer(val, key)
			removeTabIndex(val, key, focusedDraggable, focusedDroppable)
			$(focusedDraggable).removeClass('focused')
			$(focusedDroppable).removeClass('focused')
			isDraggableSelected = false
			isDroppableSelected = false
			draggableIndex = null
			droppableIndex = null
			$('html').focus()


		}
	}
})