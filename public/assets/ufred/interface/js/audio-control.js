let currentAudio
let prevState

$(document).ready(()=>{
    setVolumeOnLoad()
	checkUndefinity()
    findOriginOnReload()
    checkVolumeOnLoad()
    $(window).resize(()=>{
        findOriginOnResize($(window).width())
    })
    $('.audio-hide').click(()=>{
        toggleAudioPanel()
	})
	$('.play-toggle-padding').click(()=>{
		togglePlay()
	})
	$('.mute-toggle-padding').click(()=>{
		toggleMute()
	})
	$('.replay-padding').click(()=>{
		replayPage()
    })
})


function setVolumeOnLoad(){
    const volumeControl = document.getElementById('vol-control')
    volumeControl.value = 100
}

function checkVolumeOnLoad(){
    prevState = document.getElementById('vol-control').value
}

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


function toggleMute(){
    const volumeControl = document.getElementById('vol-control')
	let audios = $("#iframe-container iframe").eq(0).contents().find('audio');
	let videos = $("#iframe-container iframe").eq(0).contents().find('video');
    if($('.mute-toggle-padding').hasClass('muted')){
		if(prevState == 0){
            setVolume(50)
            volumeControl.value = 50
		}
		else{
            setVolume(prevState)

            if(videos.length > 0){
                console.log(videos[0].volume)
            console.log(volumeControl.value)
                console.log("not muted")
            }

            volumeControl.value = prevState
        }
		for (let i=0; i<audios.length; i++){
            audios[i].muted = false
        }
        $('#icon_mute').css({
            display: 'none'
        })
        $('#icon_audio').css({
            display: 'block'
        })
        $('.mute-toggle-padding').removeClass('muted')
        if(typeof videos[0] != 'undefined'){
            videos[0].muted = false
        }
    }
    else{

        if(videos.length > 0){

            console.log(videos[0].volume)
            console.log(volumeControl.value)
            console.log("video greater than 1")
        }
        prevState = volumeControl.value
        setVolume(0)
        volumeControl.value = 0
        $('.mute-toggle-padding').addClass('muted')
        for (let i=0; i<audios.length; i++){
            audios[i].muted = true
        }
        // for (let i=0; i<videos.length; i++){
        //     videos[i].muted = true
        // }
        $('#icon_audio').css({
            display: 'none'
        })
        $('#icon_mute').css({
            display: 'block'
        })
    }
}

//toggle play and pause icon and functionality
function togglePlay(){
    let audios = $("#iframe-container iframe").eq(0).contents().find('audio');
	let videos = $("#iframe-container iframe").eq(0).contents().find('video');
	let input = document.getElementById('vol-control').value
	audios.map((i, audio)=>{
		audio.volume = input/100
	})
	videos.map((i, video)=>{
		video.volume = input/100
	})
    if($('.play-toggle-padding').hasClass('paused')){
		if(typeof currentAudio == 'undefined'){
			currentAudio = audios[0]
		}
		if(typeof currentAudio != 'undefined'){
			currentAudio.play()
		}
		if(typeof videos[0] != 'undefined'){
			videos[0].play()
		}
		
        $('#icon_pause').css({
            display: 'block'
        })
        $('#icon_play').css({
            display: 'none'
        })
        $('.play-toggle-padding').removeClass('paused')
    }
    else{
        audios.map((i, audio)=>{
            if(audio.duration > 0 && !audio.paused){
                audio.pause()
                currentAudio = audio
            }
		})
		if (typeof videos[0] != 'undefined'){
			videos[0].pause()
		}
        $('#icon_pause').css({
            display: 'none'
        })
        $('#icon_play').css({
            display: 'block'
        })
        $('.play-toggle-padding').addClass('paused')
    }
}

//replay - update iframe
function replayPage(){
    // $('#icon_play').css({
    //     "display":"block"
    // })
    // $('#icon_pause').css({
    //     "display":"none"
    // })
    // $('#rp').css({
    //     "pointer-events":"none"
    // })
   
    // goToPage(getPid())
    
    // $('.iframe-container').animate({
    //     opacity: 0
    // },600)
    // $('.iframe-container').animate({
    //     opacity: 1
    // },600)
    // setTimeout(() => {
    //     $('#rp').css({
    //         "pointer-events":"auto"
    //     })
    // }, 2000);

    toggleAudioPlayPause();
		// turn on fader to hide current page and halt all mouse interactions
        blockerOn();
        $('.fader').addClass('on').removeClass('off');
       // have any active side menus animated out
        closeAllMenus();
		// fade in fader to hide current active page
        TweenMax.to('.fader', 0.5, {
            opacity: 1,
            onComplete: function() {
				// function to set new page destination	
                currPage = getPid();				
				
				//remove the previous page from index and add the next page
				updateIframe(currPage);				
				reload(currPage);
                setPid();
				/*
				// juggle classes setting old active page to transition to inactive, and new page from inactive to active
                $('.unhidden').addClass('hidingIt').removeClass('unhidden');
                $(currPage).addClass('unhidden').removeClass('hidden');
				// reset oldPage variable to current active page
                var currPageIndex = idArray.indexOf(currPage);
                oldPage = idArray[currPageIndex];
				// set old active page to fully inactive
                $('.hidingIt').addClass('hidden');
                $('.hidden').removeClass('hidingIt');
				*/
				// fade out fader to reveal new page
                TweenMax.to('.fader', 0.5, {
                    delay: 0.4,
                    opacity: 0,
                    onComplete: function() {
						// at the end of the fade out set fader to display: none and resume mouse interactivity 
                        $('.fader').addClass('off').removeClass('on');
                        blockerOff();
                    }
                });
            }
        });
    
}

//volume control
function setVolume(input){
    let audios = $("#iframe-container iframe").eq(0).contents().find('audio');
    let videos = $("#iframe-container iframe").eq(0).contents().find('video');
    // const volumeControl = document.getElementById('vol-control')
    

    // prevState = volumeControl.value

	audios.map((i, audio)=>{
		audio.volume = input/100
    })
    videos.map((i, video)=>{
        video.volume = input/100
    })

	if (input == 0){
		$('#icon_mute').css({
            display: 'block'
        })
        $('#icon_audio').css({
            display: 'none'
		})
		$('.mute-toggle-padding').addClass('muted')
	}
	else{
		$('#icon_mute').css({
            display: 'none'
        })
        $('#icon_audio').css({
            display: 'block'
		})
		$('.mute-toggle-padding').removeClass('muted')
    }
}
