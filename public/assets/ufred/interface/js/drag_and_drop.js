// JavaScript Document<script>

$(document).ready(function(){

	populateMarkup(numItems, answerContent, type);

	/* Allow markup population to complete */
	$('body').delay(500).fadeIn(500);

	$('.close').click(function(){
		$('.modal-container').fadeOut()
	})

});

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
	for(let i = 0; i < numItems; i++) {
		console.log(i);
		// Populates draggables
		$(".draggableContainer").append('<div id="'+i+'" class="dragWords"><strong>'+ answerContent[i]+'</strong></div>');

		// Convert "1,2,3..." into "a,b,c..."
		let letterId = String.fromCharCode(97+i);

		// ResourceID starts at 1, index starts at 0, thus i + 1;
		let resourceId = i + 1;

		let imageFilename = "drag_and_drop_i";

		// Populate droppable contents based on the screen type.
		if (type === 'image') {
			$(".droppableContainer").append('<div class= "dropContainer landscapeImages '+ responsiveClass +'" id="'+ letterId+'" ><img src="assets/images/' + imageFilename + resourceId + '.jpg" alt=""><div class="dropAnswer" style="bottom:13px;"></div></div>');
		} else if (type === 'text') {
			$(".droppableContainer").append('<div class= "dropContainer landscapeText '+ responsiveClass +'" id="'+ letterId+'" ><p><span class="content">'+ dropContent[i] +'</span></p><div class="dropAnswer"></div></div>');
		} 
	}

	checkFiveItemTabletLayout();

	init();

}

$(window).resize(function(){
  checkFiveItemTabletLayout();
});

function checkFiveItemTabletLayout() {

	console.log(numItems);
	console.log(window.innerWidth);
	if (numItems === 5 && $(".droppableContainer").height() >= 2* $(".dropContainer").height()) {


		$(`.droppableContainer.flexContainer`).css(`justify-content`,`center`);
	} else if ($(`.droppableContainer.flexContainer`).css(`justify-content`) === 'center') {

		$(`.droppableContainer.flexContainer`).css(`justify-content`,`space-evenly`);
	}
}



	var audio1 = $('.narration')[0];
	// The id of the dragWords will be a match to to the answer with the same index in the following array. 
	// bass ackwards? Maybe a bit. if you find this confusing feel free to shake your head at Dave for doing this. 
	
	//checks if draggables were in or out of droppable scope
	//outside = 1 : draggable is outside of droppable
	//outside = 0 : draggable is inside of droppable
	let outside = 1

	
	function init() {
		$('.dropContainer').droppable({
			//out and over is real time check to see if any draggable object was hovered
			out: ()=>{
				outside = 1
			},
			over: ()=>{
				outside = 0
			},
			drop: function(event, ui) { 
				checkAnswer($(this).attr('id'), ui.draggable.attr('id'));
				$(this).css('overflowY', 'hidden');			
			}  
		});
		
		
		//could probably make a class draggable instead of making a for loop :P
		for (var i = 0; i < 6; i++) { 
			$('#'+i).draggable({ 
				revert: "valid",
				//stop tracks when a draggable is released from the mouse
				stop: (event, ui)=>{
					//if draggable was dropped outside
					if(!checkInside(outside)){
						$('#'+ui.helper.attr('id')).animate({
							left: 0,
							top: 0
						},500)
					}
					//it is inside
					else{
						console.log("it is inside")
					}
					outside = 1
				}
			});
		}
	}

	//check if draggable is inside or outsisde
	const checkInside = (outside)=>{
		return (outside == 0) ? true : false
	}

	function hiddenCheck () {
		audio1.pause();
		audio1.currentTime=0;
		clearInterval(hiddenChecker);
	}
	function checkAnswer(dropID, dragID){
		// answer is coorect
		if (answerArray[parseInt(dragID)] == dropID) {
			
			$('#'+dragID).css("opacity","0")

			//TweenMax.to($('#'+dragID), 0.5, { opacity: 0, ease: Power1.easeInOut });
			$('#'+dropID).scrollTop(0)
			$('#'+dropID).children('.dropAnswer').html('<p style="padding-left:0;"><strong>'+$('#'+dragID).text()+'</strong></p>');
			$('#'+dropID).addClass('correct');
			
			TweenMax.to($('#'+dropID + '> img'), 0.35, { border: '10px solid #228B22',  yoyo: true, repeat: 1, ease: Power1.easeInOut  });
			
			TweenMax.to($('#'+dropID + '> p'), 0.35, { border: '10px solid #228B22',  yoyo: true, repeat: 1, ease: Power1.easeInOut  });
			
			
			if($('#'+dropID+'>.dropAnswer').css('display')=="none"){
			   		console.log("Nice!");
			   }   
			   else {
				   console.log($('#'+dropID+'>.dropAnswer').css('display'));
			   }
			TweenMax.to($('#'+dropID+'>.dropAnswer'), 0.5, { opacity: 1, ease: Power1.easeInOut });
			
			$('#'+dropID+'>.dropAnswer').fadeIn();
			$('#'+dropID+'>.dropAnswer').css('display','flex');

			let id = dropID.charCodeAt(0) - 97;
			
			$('span.content:eq('+id+')').css({
				"height" : "65%",
				"overflow-y" :"auto" 
			});
			allCorrect();
		} 
		
		
		else { 
			TweenMax.to($('#'+dropID + '> img'), 0.35, { border: '10px solid #A91E23',  yoyo: true, repeat: 1, ease: Power1.easeInOut  });
			
			TweenMax.to($('#'+dropID + '> p'), 0.35, { border: '10px solid #A91E23',  yoyo: true, repeat: 1, ease: Power1.easeInOut  });
		}
	}		
	function allCorrect(){
		if($('.correct').length == $('.dropAnswer').length){
			stopAllAudio();
			$('.modal-container').fadeIn().css('display','flex')
			$('.dragWords').css('visibility','hidden');
			$('#dndCorrect')[0].play();			
		}
	}
	function removeAnswer(){
		
	}
	function stopAllAudio() { 
		for (i = 0; i < $('audio').length; i++) { 
			$('audio')[i].pause();
			$('audio')[i].currentTime = 0;
		}	
	}
