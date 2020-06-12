/*
// this whole set of functions is built to check if the page is visible or not, 
//and from there choose if the audio should start playing or not. 
// It also watches to see if the page changes so it will shut down if you navigate elsewhere 
// pages are set to reload whenever you navigate to them so this will fire new every time. 
//parameter : page ID (pid) that audio is playing in. page ID has the format of '#pXX', for example #p0, #p1, #p23, etc.
//type can be "audio" or "video"
//index: is the ith audio/video in the page (i equals to index). starts from 1.
//currentTime: start audio/video from this time
//example call: mediaCheck2("#p1" , "audio", 1) ;
*/
function mediaCheck2(pid, type, index, currentTime) {
	//console.log('pid: ' + pid);
	var avOn = false, //audio video on
		hiddenChecker;
	setTimeout(avStart, 500); // This is to counteract the issue where the screen loads very quickly and still sees the iframe as having the class of Hidden

	function avStart() { //start audio/video
		//console.log('av start:' + pid);
		//var pid = getPageID();
		if (window.parent.$(pid).hasClass('unhidden')|| window.parent.$(pid).hasClass('hidingIt')) {  // only thing here to edit would be $("#p1") to the current page number(check index or speak to Dave for different numbering than course's page numbering)			
			$(type)[index-1].currentTime = (currentTime || 0) ;
			setTimeout(function() {
			   $(type)[index-1].play();
			}, 100);
			//$(type)[index-1].play();
			//console.log('A/V is playing.');
			avOn = true;
			//hiddenChecker = setInterval(hiddenCheck, 100);
		}
	}
	
}// end of mediaCheck2

/* this is the simlified version of the above mediaCheck2 function. 
	it plays the first audio/video in the page.
*/
function mediaCheck(pid, type) {
	mediaCheck2(pid, type, 1, 0);
}

/* mute or unmute all audio and video in the page (embedded iframe) */
function muteMedia(mute){ //mute can be true/fasle
	/*$("audio").each(function(){
		$(this).muted = mute;
	});*/
	
	var i=0 ;
	var audios = $("#iframe-container iframe").eq(0).contents().find('audio');
	var videos = $("#iframe-container iframe").eq(0).contents().find('video');
	for(i=0; i<audios.length; i++)
		audios[i].muted = mute;
	for(i=0; i<videos.length; i++)
		videos[i].muted = mute;
}

/* play audio/video on the page */
function playMedia(){ 
	
	var i=0 ;
	var audios = $("#iframe-container iframe").eq(0).contents().find('audio');
	var videos = $("#iframe-container iframe").eq(0).contents().find('video');
	for(i=0; i<audios.length; i++)
		audios[i].play();
	for(i=0; i<videos.length; i++)
		videos[i].play();
}

/* pause audio/video on the page */
function pauseMedia(){ 
	
	var i=0 ;
	var audios = $("#iframe-container iframe").eq(0).contents().find('audio');
	var videos = $("#iframe-container iframe").eq(0).contents().find('video');
	for(i=0; i<audios.length; i++)
		audios[i].pause();
	for(i=0; i<videos.length; i++)
		videos[i].pause();
}

/* replay audio/video on the page */
function replayMedia(){ 
	
	var i=0 ;
	var audios = $("#iframe-container iframe").eq(0).contents().find('audio');
	var videos = $("#iframe-container iframe").eq(0).contents().find('video');
	for(i=0; i<audios.length; i++){
		audios[i].currentTime = 0;
		audios[i].play();
	}
		
	for(i=0; i<videos.length; i++){
		videos[i].currentTime = 0;
		videos[i].play();
	}
		
}



	
/* set volume */
//volume level
//var volLevel = document.getElementById('volSlider').value / 100;
function setVolume(value){
	console.log("hmm?");

	/* set the volume variable. this var is defined in index-v1.1.js */
	
	var volLevel = value / 100;	
	console.log('setvolume - vol:' + volLevel) ;
	var i=0 ;
	var audios = $("#iframe-container iframe").eq(0).contents().find('audio');
	var videos = $("#iframe-container iframe").eq(0).contents().find('video');
	for(i=0; i<audios.length; i++){
		//audios[i].muted = false ;
		audios[i].volume = volLevel;
	}

	for(i=0; i<videos.length; i++){
		//videos[i].muted = false ;
		videos[i].volume = volLevel;
	}

	//change mute/unmute icons accroding to the volume level
	if(value <=1){
		//muteMedia(true);
		$('#audioBtn').addClass('mute').removeClass('unmute');
	}
		
	else{
		//muteMedia(false);
		$('#audioBtn').addClass('unmute').removeClass('mute');
	}
		

}


/*toggle #playBtn icon to play or pause */
$(document).ready(function(){
		
	//on play
	$('video, audio').on('play', function(){
		//console.log('on play');
		window.parent.$('#playBtn').removeClass('play').addClass('pause'); //in iframe
		$('#playBtn').removeClass('play').addClass('pause');//in index
	});

	//on pause
	$('video, audio').on('pause', function(){
		//console.log('on pause');
		window.parent.$('#playBtn').removeClass('pause').addClass('play');//in iframe
		$('#playBtn').removeClass('pause').addClass('play');//in index
	});
	
	
	
});











