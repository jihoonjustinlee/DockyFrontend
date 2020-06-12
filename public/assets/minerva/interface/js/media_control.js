let audios = document.getElementsByTagName('audio')
let videos = document.getElementsByTagName('video')

window.onload = function() {
	// keepVolumeState()	//keep previous volume on different iframe load
//	audioControlAllMediaHandler()	//manipulate appearance of audio control based on the number of medias
//	audioControlAudioHandler()	//handle appearance of audio control based on the state of the current audio
//	audioControlVideoHandler()	//handle appearance of audio control based on the state of the video

	
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
					// $('.narration')[0].play();
				}
				// audioOn = true;

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
	
	// modifies image src and alt
	initiateImages();
	
};// end of onload

// [issue] the catch here is inaccurate - Bill
async function playAudio(index) {

	stopAllAudio();
	// [issue]This is a very patchy solution for index unable to target interactive audio properly from parent frame - Bill
	let audios = $(".interaction, .narration");
	let videos = $("#iframe-container iframe").eq(0).contents().find('video');
	// let input = parseInt(parent.document.getElementById('volSlider').value);
	
	// [issue]A patchy fix, we should properly address this issue later - Bill
	if (input === 1) {
		input = 0;
	}
	
	audios.map((i, audio)=>{
		audio.volume = input/100
	})
	videos.map((i, video)=>{
		video.volume = input/100
	})
	try{	
		parent.currentAudio = $("audio:eq(" + index + ")")[0]
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
		console.log("Testing")
		showPlayIcon()
	}
}

function keepVolumeState(){ //save volume on new iframe load
	console.log("Testing")
	let volume = parent.document.getElementById('volSlider').value
	console.log(volume)
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

function numberOfVideos(){
	return videos.length
}

function numberOfAudios(){
	return audios.length
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
	$('#playBtn').removeClass('play').addClass('pause')
}

function showPlayIcon(){
	$('#playBtn').removeClass('pause').addClass('play')
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
	addTimeoutToAnimation(300, function(){fadeOutIcon('#icon_audio')})
	addTimeoutToAnimation(300, function(){fadeOutIcon('#icon_mute')})
	addTimeoutToAnimation(500, function(){fadeOutIcon('#vol-control')})
	addTimeoutToAnimation(700, function(){fadeOutIcon('#icon_play')})
	addTimeoutToAnimation(700, function(){fadeOutIcon('#icon_pause')})
	addTimeoutToAnimation(1000, function(){fadeInIcon('#no-audio-text')})
}

function enableAllAudioControls(){
	fadeOutIcon('#no-audio-text')
	if(isCurrentVolumeMuted()){
		addTimeoutToAnimation(0, function(){fadeInIcon('#icon_mute')})
		hideIconNoAnimation('#icon_audio')
	}
	else{
		addTimeoutToAnimation(0, function(){fadeInIcon('#icon_audio')})
		hideIconNoAnimation('#icon_mute')
	}
	addTimeoutToAnimation(200, function(){fadeInIcon('#vol-control')})
	addTimeoutToAnimation(400, function(){fadeInIcon('#icon_play')})
}

function autoPlayNotAllowedDueToDeniedPermission(){
	return (typeof videos[0] != 'undefined') && videos[0].paused || (typeof audios[0] != 'undefined') && audios[0].paused
}

function syncVideoVolumeWithAudioControlVolume(volume){
	$('#vol-control', parent.document).val(volume * 100)
}

function syncVideoMuteButtonWithAudioControl(){
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
	if (!pageHasMedia()){ //if page has no media
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
//			console.log("Test")
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
	if(numberOfVideos() == 1){
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
		$('.vjs-mute-control').click(function(){
			syncVideoMuteButtonWithAudioControl()
		})
	}
}


//[TODO]the altTag will be set to undefined if the tagText couldnt be find in content.json. We can catch this issue if have time - Bill
function initiateImages() {
	
	// add alttagimage to whatever classes we want to. Avoiding modifying HTML directly, so we have better control over the templates
	$(".half-vertical-image, .accordionImage, .dragAndDropImage, .half-horizontal-image, .clickableImage").attr("alttagimage", "true");
	
	let alt_tags = getAltTags();
	
	// mapping through the alt_tag array and find images with 'altagimage' attribute
	$("img[alttagimage='true']").map(function(index, obj) {
		// modify the image
		$(obj).attr({
			"src": `assets/images/${imageFilename}${index+1}.jpg`,
			"alt": `${alt_tags[index]}`
		});
	});
}



function getAltTags() {

	
	// Getting file_name in content JSON file from parent
	let files = parent.contentJSON.file_name;
	// [TODO]loop through each file name. The search method here is expansive, use a more efficient search method when we have time. -Bill
	for (let key in files) {
		// loop and check if the key matches current file name
		if (files.hasOwnProperty(key) && key === filename) { // filename is extracted from audio_markup_generator.js, make sure file_name is determined before trying to get it.
			
			let alt_tags = [];
			
			// here we have access to the content for the current file from content.json. Here we map through alt_tags array.
			files[key].alt_tag.map(function(alt_tag){ 
				
				// push non empty entries on to alt_tags array
				(alt_tag !== "") ? alt_tags.push(alt_tag) : null;
				
			});
			
			return alt_tags;
	  	}
		
	}
}