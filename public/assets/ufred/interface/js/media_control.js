let audios = document.getElementsByTagName('audio')
let videos = document.getElementsByTagName('video')
let audioVolumeControl


window.onload = function() {
	$('.vjs-mute-control').click(function(){
		if($('.vjs-mute-control').attr('title') == 'Mute'){
			// audioVolumeControl = parent.document.getElementById('vol-control').value
			audioVolumeControl = videos[0].volume*100
			parent.setVolume(0)
		}else{
			videos[0].muted = false
			parent.setVolume(audioVolumeControl)
			console.log(audioVolumeControl)
		}
	})
	updateProgressBar()	//update progress bar
	keepVolumeState()	//keep previous volume on different iframe load
	audioControlAllMediaHandler()	//manipulate appearance of audio control based on the number of medias
	audioControlAudioHandler()	//handle appearance of audio control based on the state of the current audio
	audioControlVideoHandler()	//handle appearance of audio control based on the state of the video
	
	if (typeof numAudios == "undefined" || !(numAudios < 0)) {


		var pid = getPageID();
		// this whole set of functions is built to check if the page is visible or not, 
		//and from there choose if the video should start playing or not. 
		// It also watches to see if the page changes so it will shut down if you navigate elsewhere 
		// pages are set to reload whenever you navigate to them so this will fire new every time.

		var hiddenChecker;
		var mediaType = "";

		// invoke media start function
		if($('body').find('.intro').length !== 0) {

			var videoOn = false;
			mediaType = "video";

		} else {

			var audioOn = false;
			mediaType = "audio";
			
		}
		setTimeout(mediaStart, 500); // This is to counteract the issue where the screen loads very quickly and still sees the iframe as having the class of Hidden //Bill: this can be controlled from parent with something like frame.onload, we should take care of this when rebuild the page control system
		hiddenCheck();
	}
	
	
	function mediaStart() { 

		// console.log(pid);
		if (window.parent.$(pid).hasClass('unhidden')||window.parent.$(pid).hasClass('hidingIt')) {

			if (mediaType === "audio") {
				
				/*// loops through the narration audios, set delay to the sum of previous audio durations. Thus the audios will play one by one.
				$('.narration').map(function(index, audio) {
					setTimeout(function(){audio.play();}, determineDuration(index));
				});*/
				if ($(".narration").length) {
					$('.narration')[0].play();
				}
				audioOn = true;

			} else if (mediaType === "video") {
				
				$('video')[0].play();
				videoOn = true;
				
			}
		
			hiddenChecker = setInterval(hiddenCheck, 100);
		}
	}


	function hiddenCheck () {
		if(window.parent.$(pid).hasClass('hidden')) { // only thing here to edit would be $("#p1") to the current page number								

			if (mediaType === "audio") {
				
				$('.narration')[0].pause();
				$('.narration')[0].currentTime=0;
				audioOn = false;
				
			} else if (mediaType === "video") {
				 $('video')[0].pause();
				 $('video')[0].currentTime=0;
				 videoOn = false;
			}
			
			 clearInterval(hiddenChecker);
		}
	}

	const volControl = parent.document.getElementById('vol-control')
	const muteToggle = parent.document.getElementById('mtp')


	muteToggle.addEventListener('click', function(){
		if($(videos[0]).attr('muted') != 1){
			$(videos[0]).removeAttr('muted')

		}
	})

	volControl.addEventListener('input', function(){


		if($(videos[0]).attr('muted') == 1){

			$(videos[0]).removeAttr('muted')
		} else{
			console.log(videos[0].volume)
			console.log("not muted")
		}

		
	})

	var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

	if(iOS){
		$('#icon_audio', parent.document).css({
			"display":"none"
		})

		$('.mute-toggle-padding', parent.document).css({
			"pointer-events":"none"
		})
	}
};// end of onload

//should probably catch this?
async function playAudio(index) {
	stopAllAudio();
	try{		
		await $("audio:eq(" + index + ")")[0].play();
	}
	catch(e){
		console.log("it doens't allow autoplay on refresh or fresh restart due to security reason")
	}
	//check if all audio finished playing	
	checkIfAllAudioStoppedPlaying()
	//checkIfInteractiveAudioPausedOrEneded(index)
}

function stopAllAudio() {
	$("audio").map((index, audio)=> {
		audio.pause(); // Stop playing
    	audio.currentTime = 0;	//reset time
	});
}

function checkVolumeOnLoad(){
	prevState = parent.document.getElementById('vol-control').value
}
function checkIfInteractiveAudioPausedOrEneded(index){
	audios[index].onended = function(){
		console.log("Test")
	}
}

function checkIfAllAudioStoppedPlaying(){
	let audios = document.getElementsByTagName('audio')
	let allPlayed = true
	for(i=0; i<audios.length; i++){
		//console.log(`audio ${i} : ${audios[i].paused}`)
		if(!audios[i].paused){
			allPlayed = false
		}
	}
	//console.log("is all played? "+allPlayed)
	if(allPlayed){
		// console.log("Test")
		showPlayIcon()
	}
}

function keepVolumeState(){ //save volume on new iframe load
	let volume = parent.document.getElementById('vol-control').value
	let audios = document.getElementsByTagName('audio')
	let videos = document.getElementsByTagName('video')
	for (let i=0; i<audios.length; i++){
		audios[i].volume = volume/100
	}
	for (let i=0; i<videos.length; i++){
		videos[i].volume = volume/100
	}
}

function pageHasMedia(){
	return (videos.length == 0 && audios.length == 0) ? false : true
}

function pageHasTagButCorruptedFiles(){
	let hasNoMedia = true
	for(let i=0; i<audios.length; i++){

		if (audios[i].duration > 0){
			console.log("audio Test")
			hasNoMedia = false
			break
		} 
	}
	//quick fix
	if(videos.length > 0){
		hasNoMedia = false
	}

	// for(let i=0; i<videos.length; i++){

	// 	if(videos[i].duration > 0){
	// 		console.log("video Test")
	// 		hasNoMedia = false
	// 		break
	// 	} 
	// }

	return hasNoMedia
}

function numberOfVideos(){
	return videos.length
}

function numberOfAudios(){
	return audios.length
}

function testing(){
	console.log("Test")
}

function setPlayPointerEvent(param){
	parent.document.getElementsByClassName('play-toggle-padding')[0].style.pointerEvents = param
	parent.document.getElementsByClassName('mute-toggle-padding')[0].style.pointerEvents = param
}

function showIconNoAnimation(param){
	$(param, parent.document).css({
		display: 'block'
	})
}

function hideIconNoAnimation(param){
	$(param, parent.document).css({
		display: 'none'
	})
}
function fadeInIcon(param){
	$(param, parent.document).fadeIn()
}

function fadeOutIcon(param){
	$(param, parent.document).fadeOut()
}

function showPauseIcon(){
	showIconNoAnimation('#icon_pause')
	hideIconNoAnimation('#icon_play')
	$('.play-toggle-padding', parent.document).removeClass('paused')
}

function showPlayIcon(){
	if(!pageHasTagButCorruptedFiles()){
		
		showIconNoAnimation('#icon_play')
	}
	hideIconNoAnimation('#icon_pause')
	$('.play-toggle-padding', parent.document).addClass('paused')
}

function showMuteIcon(){
	showIconNoAnimation('#icon_mute')
	hideIconNoAnimation('#icon_audio')
	$('.mute-toggle-padding', parent.document).addClass('muted')
}

function showAudioIcon(){
	showIconNoAnimation('#icon_audio')
	hideIconNoAnimation('#icon_mute')
	$('.mute-toggle-padding', parent.document).removeClass('muted')
}

function showVolumeControlBar(){
	showIconNoAnimation('#vol-control')
}
function hideVolumeControlBar(){
	hideIconNoAnimation('#vol-control')
}

function addTimeoutToAnimation(time, callback){
	setTimeout(function(){
		callback()
	}, time);
}

function isCurrentVolumeMuted(){
	return (parent.document.getElementById('vol-control').value == 0) ? true : false
}

function disableAllAudioControls(){
	hideIconNoAnimation('#icon_audio')
	hideIconNoAnimation('#icon_mute')
	hideIconNoAnimation('#vol-control')
	hideIconNoAnimation('#icon_play')
	hideIconNoAnimation('#icon_pause')
	showIconNoAnimation('#no-audio-text')

	// addTimeoutToAnimation(300, function(){fadeOutIcon('#icon_audio')})
	// addTimeoutToAnimation(300, function(){fadeOutIcon('#icon_mute')})
	// addTimeoutToAnimation(500, function(){fadeOutIcon('#vol-control')})
	// addTimeoutToAnimation(700, function(){fadeOutIcon('#icon_play')})
	// addTimeoutToAnimation(700, function(){fadeOutIcon('#icon_pause')})
	// addTimeoutToAnimation(1000, function(){fadeInIcon('#no-audio-text')})
}

function enableAllAudioControls(){
	hideIconNoAnimation('#no-audio-text')
	// fadeOutIcon('#no-audio-text')
	if(isCurrentVolumeMuted()){
		// addTimeoutToAnimation(0, function(){fadeInIcon('#icon_mute')})
		showIconNoAnimation('#icon_mute')
		hideIconNoAnimation('#icon_audio')
	}
	else{
		// addTimeoutToAnimation(0, function(){fadeInIcon('#icon_audio')})
		showIconNoAnimation('#icon_audio')
		hideIconNoAnimation('#icon_mute')
	}
	showIconNoAnimation('#vol-control')
	showIconNoAnimation('#icon_play')
	// addTimeoutToAnimation(200, function(){fadeInIcon('#vol-control')})
	// addTimeoutToAnimation(400, function(){fadeInIcon('#icon_play')})
}

function autoPlayNotAllowedDueToDeniedPermission(){
	return (typeof videos[0] != 'undefined') && videos[0].paused || (typeof audios[0] != 'undefined') && audios[0].paused
}

function syncVideoVolumeWithAudioControlVolume(volume){
	$('#vol-control', parent.document).val(volume * 100)
}


function syncVideoMuteButtonWithAudioControl(){
	let prevState = parent.document.getElementById('vol-control').value
	
	if($('.vjs-mute-control').attr('title') == 'Mute'){
		parent.setVolume(0)
	}
}

function updateProgressBar(){
	const percentage = parent.getPercentage(window.location.pathname)
	parent.updatePercentage(percentage) //update percent string and progressbar width
	parent.updateMeter(percentage)
	parent.updatePercentString(percentage)
	//parent.getFurthestPage()
}

function audioControlAllMediaHandler(){
	if (!pageHasMedia() || pageHasTagButCorruptedFiles()){ //if page has no media
		setPlayPointerEvent("none")
		disableAllAudioControls()
	} 

	else{ //if page has either video or audio or both	
		setPlayPointerEvent("auto")
		enableAllAudioControls()
		if(autoPlayNotAllowedDueToDeniedPermission()){
			//not sure what to do
		}
	}
}

function audioControlAudioHandler(){
	if(numberOfAudios() == 1){ //if only one audio found
		audios[0].onplay = function(){
			showPauseIcon()
		}
		audios[0].onended = function(){
			showPlayIcon()
		}
	}
	else if(numberOfAudios() > 1){ //more than one audios found
		audios[0].onplay = function(){
			showPauseIcon()
		}
		setTimeout(function(){
			playAudio(0)
		}, 500);
	}
}


function audioControlVideoHandler(){
	if(numberOfVideos() == 1){	//let hope there's only one video per page for now lol
		videos[0].onplay = function(){
			showPauseIcon()
		}
		videos[0].onended = function(){
			showPlayIcon()
		}
		videos[0].onpause = function(){
			showPlayIcon()
		}
		videos[0].onvolumechange = function(){
			syncVideoVolumeWithAudioControlVolume(videos[0].volume)
			if(videos[0].volume == 0){
				showMuteIcon()
			}
			else{
				showAudioIcon()
			}

		}

		// $('.vjs-mute-control').click(function(){
		// 	if($('.vjs-mute-control').attr('title') == 'Mute'){
		// 		audioVolumeControl = parent.document.getElementById('vol-control').value
		// 		console.log(audioVolumeControl)
		// 		parent.setVolume(0)
		// 	} else{
		// 		parent.setVolume(audioVolumeControl)
		// 	}
		// })
	}
}
// let audioVolumeControl

// $(document).ready(function(){
// 	$('.vjs-mute-control').click(function(){
// 		if($('.vjs-mute-control').attr('title') == 'Mute'){
// 			audioVolumeControl = parent.document.getElementById('vol-control').value
// 			parent.setVolume(0)

// 			console.log("Test1")
// 		}else{
// 			parent.setVolume(audioVolumeControl)
// 			console.log(audioVolumeControl)
// 		}
// 	})
// })
