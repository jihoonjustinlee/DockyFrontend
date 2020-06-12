$(document).ready(function () {

	populateMarkup();

	function populateMarkup() {
		$('.container').addClass(`col-${numItems}`);
		for (let i = 0; i < numItems; i++) {
			$('.container').append(`
				<div class='img-click wrapper col-${numItems}' tabindex='0'>
					<audio class="interaction" src=assets/audio/${audioFilename}${i+numAudios+1}.mp3></audio>
					<img class="clickableImage" src='assets/images/${imageFilename}${i+1}.jpg' alt='Clickable Image'/>
					<div class="blue-overlay"></div>
					<div class="black-overlay"></div>
					<div class="content customScroll" tabindex='0'>
						<p><strong>${headerArray[i]}</strong></p>
						${contentArray[i]}
					</div>
				</div>
			`)
		}
	}

	function displayContent(i) {
		$('.wrapper:eq(' + i + ')').toggleClass('active');
	}

	$('.wrapper').click(function () {
		displayContent($('.wrapper').index(this));

		// Handles coorsponding audio play
		// console.log($(".wrapper").index(this) + numAudios + 1);
		const index = $(".wrapper").index(this) + numAudios;
		let audios = document.getElementsByTagName('audio')

		if ($(this).hasClass("active")) {

			$(this).siblings().removeClass("active");
			$('#playBtn', parent.document).removeClass('play').addClass('pause');
			playAudio(index);
		} else {
			$('#playBtn', parent.document).removeClass('pause').addClass('play');
			stopAllAudio();
		}
		audios[index].onended = function () {
			$('#playBtn', parent.document).removeClass('pause')
			$('#playBtn', parent.document).addClass('play')
		}
	})
});

const wrappers = document.getElementsByClassName('wrapper')


// window.addEventListener('keydown', function(e){
// 	if(e.keyCode == 9){
// 		console.log(document.activeElement)
// 	}

// 	if(e.keyCode == 13){
// 		console.log(document.activeElement)
// 	}
// })

window.addEventListener('keyup', function(e){
	// if(e.keyCode == 13){

	// 	console.log(document.activeElement)
	// }
	
	if(e.keyCode == 9){
		$(document.activeElement).click()
		console.log(document.activeElement)
	}
})