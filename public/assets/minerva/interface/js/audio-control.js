var currentAudio


$(document).ready(()=>{
    $('#playBtn').click(function(){
        togglePlay()
    })
    $('#replayBtn').click(function(){
        replayPage()
    })
	$('#audioBtn').click(function(){
		toggleMute(this);
	})
})

//browser doesnt allow autoplay by default, icon to pause by default
function checkUndefinity(){
	if(typeof currentAudio == 'undefined'){
		$('#icon_play').css({
			display: 'block'
		})
		$('#icon_pause').css({
			display: 'none'
		})
		$('.play-toggle-padding').addClass('paused')
	}
}

//resize audio panel on window reload
function findOriginOnReload(){
    if($(window).width() >= 1024){
        $('.audio-control').css({
            right: '-282px'
        })
    }
    else if ($(window).width() < 1024 && $(window).width() > 480){
        $('.audio-control').css({
            right: '-235px'
        })
    }
    else{
        $('.audio-control').css({
            right: '-195px'
        })
    }
    if(audioControl){
        $('.audio-control').css({
            display: 'flex'
        })
        setTimeout(() => {
            $('.audio-control').animate({
                opacity: 1
            },500)
        }, 800);
    }
}

//hide in and out audio panel
function toggleAudioPanel(){
    let offset
    //1024 ++
    if($(window).width() >= 1024){
        offset = '-282px'
    }
    //1034 -- 481
    else if ($(window).width() < 1024 && $(window).width() > 480){
        offset = '-235px'
    }
    else{
        offset = '-195px'
    }
    if($('.audio-control').hasClass('audio-hidden')){
        $('.mute-toggle-padding, .play-toggle-padding, .replay-padding').css({
            display: 'block'
        })
        $('.audio-control').animate({
            right: '0px'
        },{
            duration: 800
        },{
            easing: 'swing'
        })
        $('.audio-control').removeClass('audio-hidden')
    }
    else{
        $('.mute-toggle-padding, .play-toggle-padding, .replay-padding').css({
            display: 'none'
        })
        $('.audio-control').animate({
            right: offset
        },{
            duration: 800
        },{
            easing: 'swing'
        })
        $('.audio-control').addClass('audio-hidden')
    }
}

//resize audio panel on window resize
function findOriginOnResize(width){
    if($('.audio-control').hasClass('audio-hidden')){
        if(width >= 1024){
            $('.audio-control').css({
                right: '-282px'
            }, 500)
        }
        else if (width < 1024 && width > 480){
            $('.audio-control').css({
                right: '-235px'
            },500)
        }
        else{
            $('.audio-control').css({
                right: '-195px'
            })
        }
    }
}

//toggle mute icons and functionality
let prevState;
function toggleMute(source){
	let audios = $("#iframe-container iframe").eq(0).contents().find('audio');
	let videos = $("#iframe-container iframe").eq(0).contents().find('video');
	
	if($(source).hasClass("mute")){
		
//		console.log('in mute');

		volSlider.value = prevState

		setVolume(prevState)
		
		for (let i=0; i<audios.length; i++){
            audios[i].muted = false;
        }
		for (let i=0; i<videos.length; i++){
            videos[i].muted = false;
        }

	}			
	else if($(source).hasClass("unmute")){
		prevState = volSlider.value

//		console.log('in unmute');			
		volSlider.value = 0
		// document.getElementById('volSlider').value = 0;
		setVolume(0);
		
		for (let i=0; i<audios.length; i++){
            audios[i].muted = true;
        }
		for (let i=0; i<videos.length; i++){
            videos[i].muted = true;
        }
	}

	$(source).toggleClass("mute").toggleClass("unmute");
}

//toggle play and pause icon and functionality

function togglePlay(){
//    console.log("Test")
	let input = parseInt(document.getElementById('volSlider').value);
	
	// [issue]A patchy fix, we should properly address this issue later - Bill
	if (input === 1) {
		input = 0;
	}
	
	let audios = $("#iframe-container iframe").eq(0).contents().find('audio');
	let videos = $("#iframe-container iframe").eq(0).contents().find('video');
	
	audios.map((i, audio)=>{
		audio.volume = input/100
	})
	videos.map((i, video)=>{
		video.volume = input/100
	})
    if($('#playBtn').hasClass('pause')){
		audios.map((i, audio)=>{
            if(audio.duration > 0 && !audio.paused){
                audio.pause()
                currentAudio = audio
            }
		})
		if (typeof videos[0] != 'undefined'){
			videos[0].pause()
		}
        $('#playBtn').removeClass('pause').addClass('play')
    }
    else{
//		console.log(typeof currentAudio);
        if(typeof currentAudio === 'undefined'){
			currentAudio = audios[0]
		}
		// Incase if the file name is wrong or the file does not exist, we should catch this error - Bill
		if(typeof currentAudio !== 'undefined'){
//			console.log(currentAudio);
            currentAudio.play()
			currentAudio.onended = function(){
                $('#playBtn').removeClass('pause').addClass('play')
                $('#playBtn').blur()
                console.log(currentAudio)
			}
		}
		if(typeof videos[0] !== 'undefined' && audios.length == 0){
			videos[0].play()
			videos[0].onended = function(){
				// window.parent.$('#playBtn').removeClass('pause').addClass('play')
                $('#playBtn').removeClass('pause').addClass('play')
                $('#playBtn').blur()
			}
        } 

        else if (typeof videos[0] !== 'undefined' && audios.length > 0){

            audios[audios.length - 1].onended = function(){
                $('#playBtn').removeClass('pause').addClass('play')
                $('#playBtn').blur()
                currentAudio = videos[0]
            }
        }
        $('#playBtn').removeClass('play').addClass('pause')
    }
}

//replay - update iframe
function replayPage(){
    goToPage(getPid())
    $('.iframe-container').animate({
        opacity: 0
    },600)
    $('.iframe-container').animate({
        opacity: 1
    },600)
}

//volume control
function setVolume(input){
	let audios = $("#iframe-container iframe").eq(0).contents().find('audio');
    let videos = $("#iframe-container iframe").eq(0).contents().find('video');
    
//    console.log("Testing")
	audios.map((i, audio)=>{
        audio.volume = input/100
    })
    videos.map((i, video)=>{
        video.volume = input/100
    })
	if (input <= 1){
		
//		$('.mute-toggle-padding').addClass('mute')
	}
	else{

//		$('.mute-toggle-padding').removeClass('mute')
	}
}


