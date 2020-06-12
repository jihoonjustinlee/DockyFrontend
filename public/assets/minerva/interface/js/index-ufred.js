// variable to collect ids of all individual pages for this course
var idArray = [];
// variables to track currrent and previous pages
var currPage;
var oldPage = "#p0";
// Variables to track if side menus are on screen or not
var helpMenuInBool = false;
var mainMenuInBool = false;
var resourceMenuInBool = false;
// Variables to track amount the side menus need to translate in and out of screen
var tweenOutAmount = "nothing";
var tweenInAmount = "nothing";
// stoptext variable will be a string populated by individual pages that need to stop the students progress with the stop bar and get their attention
var stopText = "nothing";

var pageSliced = []
const progressBar = true
const audioControl = true

const devMode = false
$(document).ready(function() {
    //devtool
//    const devMode = false


    if(devMode){
        for (let i=0; i<pages.length; i++){
            pageSliced.push(pages[i].slice(16))
        }
        console.log(pageSliced)
        $.each(pageSliced, (key, val)=>{
			$('#search')
				.append($('<option></option>')
				.attr("value", key)
				.text(val))
        })
        let index = getPid().substring(2)
		let $select = $('#search').selectize()
		let selectize = $select[0].selectize;
		selectize.setValue(index)
		$('#devMode').css({
            display: 'flex',
		})
    }


	//check if local
	//isLocal();	
	//addes the first page to the index
	addPage(getPid());
	//addPages();
	
	
	// turn on fader to hide current page
    $('.fader').addClass('on');
    $('.fader').css('opacity', 1);

	// fill idArray with ids from all individual pages
    /*var totalIframes = $("#iframe-container > iframe").length;
    for (var f = 0; f < totalIframes; f++) {
        idArray.push('#p' + f);
    }*/
	
    for (var f = 0; f < pages.length; f++) {
        idArray.push('#p' + f);
    }
	
	// nav button to go to previous page
    $('#back').click(function() {
		toggleAudioPlayPause();
		
		// halt mouse interactivity and set fader to display: block
        blockerOn();
        $('.fader').addClass('on').removeClass('off');
		// have any active side menus animated out
        closeAllMenus();
		// fade in fader to hide current active page
        TweenMax.to('.fader', 0.5, {
            opacity: 1,
            onComplete: function() {
				// function to set new page destination
                currPage = goBack();
				
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
				$('.hidingIt').addClass('hidden').removeClass('hidingIt');
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
    });

	// nav button to go to next page
    $('#forward').click(function() {
		
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
                currPage = goForward();				
				
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
                    opacity: 0,
                    onComplete: function() {
						// at the end of the fade out set fader to display: none and resume mouse interactivity 
                        $('.fader').addClass('off').removeClass('on');
                        blockerOff();
                    }
                });
            }
        });
    });

    $('#main').click(function() {
		// halt all mouse interactions
        blockerOn();
		// check if menu is currently on screen
        if (mainMenuInBool === false) {
			document.getElementById('mainMenuIframe').src = document.getElementById('mainMenuIframe').src;
			// animate the menu onscreen
            TweenMax.to($('#mainMenu'), 1, {
				delay: 0.4,
                right: tweenInAmount,
                ease: Power2.easeOut,
                onComplete: function() {
					// restore mouse interactions and update boolean tracking menus on/off screen status
                    blockerOff();
                    mainMenuInBool = !mainMenuInBool;
                }
            });
        }
		// function to have any menus currently on screen to animate out. This does NOT affect the menu that was just clicked on
		// as its boolean value does not update until its animation completes, and that will happen after closeAllMenus() fires
        closeAllMenus();
    });

    $('#mainMenuClicker').click(function() {
		
        mainMenuInBool = !mainMenuInBool;
        TweenMax.to('#mainMenu', 1, {
            right: tweenInAmount,
            ease: Power2.easeIn
        });
    });
	
	 $('#ccButton').click(function() {
		// halt all mouse interactions
        $( '#closedCaption' ).toggleClass( "open" )
    });

    $('#resource').click(function() {
		// halt all mouse interactions
        blockerOn();
		// check if menu is currently on screen
        if (resourceMenuInBool === false) {
			// animate the menu onscreen
            TweenMax.to($('#resourceMenu'), 1, {
                right: tweenInAmount,
                ease: Power2.easeOut,
                onComplete: function() {
					// restore mouse interactions and update boolean tracking menus on/off screen status
                    blockerOff();
                    resourceMenuInBool = !resourceMenuInBool;
                }
            });
        }
		// function to have any menus currently on screen to animate out. This does NOT affect the menu that was just clicked on
		// as its boolean value does not update until its animation completes, and that will happen after closeAllMenus() fires
        closeAllMenus();
    });

    $('#resourceMenuClicker').click(function() {
        resourceMenuInBool = !resourceMenuInBool;
        TweenMax.to('#resourceMenu', 1, {
            right: '-35%',
            ease: Power2.easeIn
        });
    });

    $('#help').click(function() {
		// halt all mouse interactions
        blockerOn();
		// check if menu is currently on screen
        if (helpMenuInBool === false) {
			// animate the menu onscreen
            TweenMax.to($('#helpMenu'), 1, {
                right: tweenInAmount,
                ease: Power2.easeOut,
                onComplete: function() {
					// restore mouse interactions and update boolean tracking menus on/off screen status
                    blockerOff();
                    helpMenuInBool = !helpMenuInBool;
                }
            });
        }
		// function to have any menus currently on screen to animate out. This does NOT affect the menu that was just clicked on
		// as its boolean value does not update until its animation completes, and that will happen after closeAllMenus() fires
        closeAllMenus();
    });

    $('#helpMenuClicker').click(function() {
        helpMenuInBool = !helpMenuInBool;
        TweenMax.to('#helpMenu', 1, {
            right: tweenOutAmount,
            ease: Power2.easeIn
        });
    });
	// sets starting page to the very first page
    //currPage = idArray[0];
	currPage = getPid();
	// checks current page for location in the idArray and locks down forward or back navigation buttons 
	// to prevent user from going outside of the numbered pages
    pageChecker(currPage);
	reload(currPage);
	$(currPage).addClass('unhidden').removeClass('hidden');
	// fade out fader to reveal current page
    TweenMax.to('.fader', 0.5, {
        opacity: 0,
        onComplete: function() {
			// at the end of the fade out set fader to display: none
            $('.fader').addClass('off').removeClass('on');
        }
    });

    $("#extraMenus").click(function() {
		// halt mouse interactions
        blockerOn();
		// animate in/animate out small extra menu bar from/to behind footer
        $('.extraMenu').slideToggle("slow", "swing", function() {
            // on complete resume mouse interactions
			blockerOff();
        });
		// rotate extra menus arrow icon
        $('#extraMenus').toggleClass('flip');

    });
    $("#extraMain").click(function() {
        $('.extraMenu').slideToggle("slow", "swing");
        $('#extraMenus').toggleClass('flip');
		// halt all mouse interactions
        blockerOn();
		// check if menu is currently on screen
        if (mainMenuInBool === false) {
			// animate the menu onscreen
			document.getElementById('mainMenuIframe').src = document.getElementById('mainMenuIframe').src;
			
            TweenMax.to($('#mainMenu'), 1, {
                right: tweenInAmount,
                ease: Power2.easeOut,
                onComplete: function() {
					// restore mouse interactions and update boolean tracking menus on/off screen status
                    blockerOff();
                    mainMenuInBool = !mainMenuInBool;
                }
            });
        }
		// function to have any menus currently on screen to animate out. This does NOT affect the menu that was just clicked on
		// as its boolean value does not update until its animation completes, and that will happen after closeAllMenus() fires
        closeAllMenus();
    });
	
    $("#extraHelp").click(function() {
        $('.extraMenu').slideToggle("slow", "swing");
        $('#extraMenus').toggleClass('flip');
		// halt all mouse interactions
        blockerOn();
		// check if menu is currently on screen
        if (helpMenuInBool === false) {
			// animate the menu onscreen
            TweenMax.to($('#helpMenu'), 1, {
                right: tweenInAmount,
                ease: Power2.easeOut,
                onComplete: function() {
					// restore mouse interactions and update boolean tracking menus on/off screen status
                    blockerOff();
                    helpMenuInBool = !helpMenuInBool;
                }
            });
        }
		// function to have any menus currently on screen to animate out. This does NOT affect the menu that was just clicked on
		// as its boolean value does not update until its animation completes, and that will happen after closeAllMenus() fires
        closeAllMenus();
    });

    $("#extraResource").click(function() {
        $('.extraMenu').slideToggle("slow", "swing");
        $('#extraMenus').toggleClass('flip');
		// halt all mouse interactions
        blockerOn();
		// check if menu is currently on screen
        if (resourceMenuInBool === false) {
			// animate the menu onscreen
            TweenMax.to($('#resourceMenu'), 1, {
                right: tweenInAmount,
                ease: Power2.easeOut,
                onComplete: function() {
					// restore mouse interactions and update boolean tracking menus on/off screen status
                    blockerOff();
                    resourceMenuInBool = !resourceMenuInBool;
                }
            });
        }
		// function to have any menus currently on screen to animate out. This does NOT affect the menu that was just clicked on
		// as its boolean value does not update until its animation completes, and that will happen after closeAllMenus() fires
        closeAllMenus();
    });
	// this sets the amounts to tween in and tween out for the side menus
	determinTween();
	
	let resizing;
	
	$(window).resize(function(){
		
		//halt all mouse interactions
        //blockerOn();
		// check if menu is currently on screen
        if (mainMenuInBool === true ) {
			
			// animate the menu onscreen
            TweenMax.to($('#mainMenu'), 1, {
                right: tweenInAmount,
                ease: Power2.easeOut,
                onComplete: function() {
					// restore mouse interactions and update boolean tracking menus on/off screen status
                    blockerOff();
                    // mainMenuInBool = !mainMenuInBool;
                }
            });
			
			// triggered = true;
        } else if (resourceMenuInBool === true ) {
			
			// animate the menu onscreen
            TweenMax.to($('#resourceMenu'), 1, {
                right: tweenInAmount,
                ease: Power2.easeOut,
                onComplete: function() {
					// restore mouse interactions and update boolean tracking menus on/off screen status
                    blockerOff();
                    // mainMenuInBool = !mainMenuInBool;
                }
            });
			
			// triggered = true;
        } else if (helpMenuInBool === true ) {
			
			// animate the menu onscreen
            TweenMax.to($('#helpMenu'), 1, {
                right: tweenInAmount,
                ease: Power2.easeOut,
                onComplete: function() {
					// restore mouse interactions and update boolean tracking menus on/off screen status
                    blockerOff();
                    // mainMenuInBool = !mainMenuInBool;
                }
            });
			
			// triggered = true;
        }
		
		determinTween();
	});
	
});


//devMode - copy to clipboard
const copyToClipboard = ()=>{
	if(devMode){
		const temp = $('<input>')
		$('body').append(temp)
		temp.val($('.item').text()).select()
		document.execCommand('copy')
		temp.remove()
		console.log($('.item').text())
	}
}


// side menus are different screen widths based on screen size(i.e. 35% width at desktop screen sizes, and 100% width at mobile sizes)
function determinTween() {
	
	// this sets the amounts to tween in and tween out for the side menus
    if ($(window).width() < 481) {
        tweenOutAmount = "-100%";
        tweenInAmount = "0%";
    } else if ($(window).width() > 480 && $(window).width() < 1025) {
        tweenOutAmount = "-100%";
        tweenInAmount = "-50%";
    } else {
        tweenOutAmount = "-100%";
        tweenInAmount = "-65%";
    }
}

function checkFeatureState(id, bool){
    if(!bool){
        $(id).css({
            display: 'none'
        })
    }
}

// checks current page for location in the idArray and locks down forward or back navigation buttons 
// to prevent user from going outside of the numbered pages
function pageChecker(pageToCheck) {
    var finalPageNum = idArray.length - 1;
    var finalPage = '#p' + finalPageNum;
    var currPageNum = idArray.indexOf(pageToCheck);
	// Check if this page requires a stop to force user to read a specific bit of information before continuing
    stopChecker(pageToCheck);
	// if this is the very first page, lock down the back button to prevent user from going outside numbered pages
    if (pageToCheck === '#p0') {
		// fade out the back nav button to 30% opacity and halt functionality
        TweenMax.to($('#back'), 0.3, {
            opacity: 0.3,
            onComplete: function() {
                $('#back').addClass('off');
            }
        });
        $('#back').prop('disabled', true);
	// if this is NOT the very first page make sure the back nav button has an opacity of 100% and is fully functional	
    } else if (pageToCheck !== '#p0') {
        $('#back').removeClass('off');
        TweenMax.to($('#back'), 0.3, {
            opacity: 1
        });
        $('#back').prop('disabled', false);
    }
	// if this is the very last page(or the user has somehow gone outside the numbered pages), 
	// lock down the forward button to prevent user from going outside numbered pages
    if (currPageNum == finalPageNum) {
		// fade out the forward nav button to 30% opacity and halt functionality
        TweenMax.to($('#forward'), 0.3, {
            opacity: 0.3,
            onComplete: function() {
                $('#forward').addClass('off');
            }
        });
        $('#forward').prop('disabled', true);
	// if this is NOT the very last page or a page outside the numbered pages make sure the forward nav button has an opacity of 100% and is fully functional		
    } else {
        $('#forward').removeClass('off');
        TweenMax.to($('#forward'), 0.3, {
            opacity: 1
        });
        $('#forward').prop('disabled', false);
    }
}

function goForward() {
    var currPageId = "#" + $('.unhidden').attr('id');
    var currPageIndex = idArray.indexOf(currPageId);
	// if current page is the second page (t0_p2) then stop and rest the video to the beginning
    if (currPageId == "#p0") {
        $('iframe').contents().find('video').each(function()
            {
                this.currentTime = 0;
                this.pause();
            });
    }
    currPage = idArray[currPageIndex + 1];
	// checks current page for location in the idArray and locks down forward or back navigation buttons 
	// to rpevent user from going outside of the numbered pages
    pageChecker(currPage);
    return currPage;
}

function goBack() {
    var currPageId = "#" + $('.unhidden').attr('id');
    var currPageIndex = idArray.indexOf(currPageId);
	// if current page is the second page (t0_p2) then stop and rest the video to the beginning
	if (currPageId == "#p0") {
        $('iframe').contents().find('video').each(function()
            {
                this.currentTime = 0;
                this.pause();
            });
    }
    if (currPageIndex >= idArray.length) {
        currPage = oldPage;
		// checks current page for location in the idArray and locks down forward or back navigation buttons 
		// to rpevent user from going outside of the numbered pages
        pageChecker(currPage);
        return currPage;
    } else {
        currPage = idArray[currPageIndex - 1];
		// checks current page for location in the idArray and locks down forward or back navigation buttons 
		// to rpevent user from going outside of the numbered pages
        pageChecker(currPage);
        return currPage;
    }
}

function goToPage(pageToGoTo) {
	// halt mouse functionality
    blockerOn();
	// close all currently opened menus
    closeAllMenus();
	// set fader to display: block
    $('.fader').addClass('on').removeClass('off');
	// fade in fader to hide currently active page
    TweenMax.to('.fader', 0.5, {
        opacity: 1.1,
        onComplete: function() {
			// set current page to new page
            currPage = pageToGoTo;
			
			setPid();
			//console.log('currpage: ' + currPage + " pages: " + pages.length + '| pid:' +  window.localStorage.pid);
			//remove the previous page from index and add the next page
			updateIframe(currPage);			
			reload(currPage);
			
			//console.log('index pid: ' + window.localStorage.pid);
			// checks current page for location in the idArray and locks down forward or back navigation buttons 
			// to prevent user from going outside of the numbered pages
            pageChecker(currPage);
			// juggle classes setting old active page to transition to inactive, and new page from inactive to active
            $('.unhidden').addClass('hidingIt').removeClass('unhidden');
            $(currPage).addClass('unhidden').removeClass('hidden');
			// reset oldPage variable to current active page
            var currPageIndex = idArray.indexOf(currPage);
            oldPage = idArray[currPageIndex];
			// set old active page to fully inactive if current page and old page are not the same
			if( $('.hidingIt').attr('id')!= $('.unhidden').attr('id'))
            	$('.hidingIt').addClass('hidden').removeClass('hidingIt');
			else
				$('.hidingIt').removeClass('hidingIt');
			// fade out fader to reveal new page
            TweenMax.to('.fader', 0.5, {
                opacity: 0,
                onComplete: function() {
					// at the end of the fade out set fader to display: none and resume mouse interactivity 
                    $('.fader').addClass('off').removeClass('on');
					// resume mouse interactivity	
                    blockerOff();
                }
            });
        }
    });
}

// halt mouse functionality
function blockerOn() {
    $('.blocker').addClass('onBlocker').removeClass('offBlocker');
}
// resume mouse functionality
function blockerOff() {
    $('.blocker').addClass('offBlocker').removeClass('onBlocker');
}

function closeAllMenus() {
	// check if resource menu is open
    if (resourceMenuInBool === true) {
		// animate menu out
        TweenMax.to($('#resourceMenu'), 0.75, {
            right: tweenOutAmount,
            ease: Power2.easeIn,
            onComplete: function() {
				// resume mouse functionality
                blockerOff();
            }
        });
        resourceMenuInBool = !resourceMenuInBool;
    }
	// check if main menu is open
    if (mainMenuInBool === true) {
        TweenMax.to($('#mainMenu'), 0.75, {
			// animate menu out
            right: tweenOutAmount,
            ease: Power2.easeIn,
            onComplete: function() {
				// reload main menu to reset all open accrodion buttons
                document.getElementById('mainMenuIframe').src = document.getElementById('mainMenuIframe').src;
				// resume mouse functionality
                blockerOff();
            }
        });
        mainMenuInBool = !mainMenuInBool;
    }
	// check if help menu is open
    if (helpMenuInBool === true) {
        TweenMax.to($('#helpMenu'), 0.75, {
			// animate menu out
            right: tweenOutAmount,
            ease: Power2.easeIn,
            onComplete: function() {
				// resume mouse functionality
                blockerOff();
            }
        });
        helpMenuInBool = !helpMenuInBool;
    }
	// check if extra menu is open
    if ($('#extraMenus').hasClass('flip')) {
        $('.extraMenu').slideToggle("slow", "swing");
        $('#extraMenus').toggleClass('flip');
    }
}

function stopChecker(pageToCheck) {
	// check page if stop related data is present
    if ($(pageToCheck).contents().find("html").data("stop")) {
		// set variable to text data
        var stopData = $(pageToCheck).contents().find("html").data("stop");
        stopText = $(pageToCheck).contents().find("html").data("text");
		// run function to show stop bar and display the text required on this page
        stopIt(stopText);
    }
}

function stopIt(textToDisplay) {
	console.log("Stopit running");
	// block all mouse functionality outside of the stop bar
    $('.blockAndFade').css('display', 'block');
    $('.footerBlocker').css('display', 'block');
	// get footer height to help define tween amount for stop bar to come in
    var tweenHeight = parseInt($('.footer').css('height'));
	// set height of flash bar to double the footer height(this element has a CSS transition on height)
    $('.flashyBit').css('height', tweenHeight * 2);
	// fade in blocker over top of the current page and nav buttons
    TweenMax.to($('.footerBlocker'), 0.8, {
        delay: 0.6,
        opacity: 0.5
    });
	// fade in blocker over top of buttons in footer
    TweenMax.to($('.blockAndFade'), 0.8, {
        delay: 0.6,
        opacity: 1,
        onComplete: function() {
            $('#stopIt').addClass('stopUp');
            $('#stopItText').text(textToDisplay);
        }
    });
    // on click get rid of stop bar
    $('#stopIt').click(function() {
        $('#stopIt').removeClass('stopUp');
		// fade out blocker over top of current page and nav buttons
        TweenMax.to($('.footerBlocker'), 0.8, {
            opacity: 0
        });
		// fade out blocker over top of buttons in footer
        TweenMax.to($('.blockAndFade'), 0.8, {
            opacity: 0,
            onComplete: function() {

                $('.blockAndFade').css('display', 'none');
                $('.footerBlocker').css('display', 'none');
				// set stop bar height to 0px (this element has a CSS transition on height)
                $('.flashyBit').css('height', '0px');

            }
        });
    });
}

function navBlockOn() {
    //$('.footerBlocker').css('display', 'block');
	$('.blockable').css('pointerEvents', 'none');
    TweenMax.to($('.blockable'), 0.8, {
        delay: 0.6,
        opacity: 0.5
    });
	
   
	
}

function navBlockOff() {
	$('.blockable').css('pointerEvents', 'all');
	 TweenMax.to($('.blockable'), 0.8, {
            opacity: 1
        });
		// fade out blocker over top of buttons in footer
        TweenMax.to($('.blockAndFade'), 0.8, {
            opacity: 0,
            onComplete: function() {

                $('.footerBlocker').css('display', 'none');
            }
        });
	
}

function reload(pageToReload) {
	pageToReload = pageToReload.substring(1);
	var page = document.getElementById(pageToReload);
	//console.log(pageToReload, page, page.src);
	page.src = page.src;	
	updateCCText(pageToReload);
}



/*----------------added by ismail-----------------*/

/*this function adds iframe with 'pid' ID to the index page. pid has the pxx format such as '#p0' , '#p1', etc*/
function addPage(pid){
	var pNo = parseInt(pid.substring(2));
	var ifrm ="";
	
	//ifrm = "<iframe class='unhidden' id = 'p0' frameborder='0' src='" + pages[0] + "' allowfullscreen='allowfullscreen' ></iframe>" ;
	ifrm = "<iframe class='unhidden' id = '" + pid.substring(1) + "' frameborder='0' src='" + pages[pNo] + "' allowfullscreen='allowfullscreen' ></iframe>" ;
	$('#iframe-container').append(ifrm);
    
    if(devMode){
		$.each(pageSliced, (key, val)=>{
			$('#search')
				.append($('<option></option>')
				.attr("value", key)
				.text(val))
		})
		let $select = $('#search').selectize()
		let selectize = $select[0].selectize;
		selectize.setValue(pNo)
	}
	//enable the forward button. it is assumed that the course has more than one page.
	//$("#forward").removeClass("off");
	//$("#forward").css("opacity" , "1");
	
}		
//devMode - render page
const renderPage = (obj)=>{
    console.log(obj.value)
    if(obj.value != ''){
		currPage = "#p"+obj.value
		if(isLocal()){
			//window.sessionStorage.pid = currPage;
			window.localStorage.pid = currPage		
		}
		else{
			//using SCORM
			//bookmark current page in SCORM
			var isset = scorm.set("cmi.core.lesson_location", currPage);
			var saved = scorm.save();
			console.log('set saved: ' + saved);
		}
		//console.log("setPid: " + currPage);
		
		// update the page tracker (progress)
		$('#pageTrack').html('[' + currPage + ' of ' + (pages.length -1) + ']');
		//update progress
		var prog = (Number(currPage.substr(2))+1) / pages.length ;
		//console.log('progress: ' + prog.toFixed(2)) ;
		prog *= 100 ; //to percent
		prog = prog.toFixed(0) + '%';
		$('#progPercent').html(prog);		
		//update progress bar
		$('#pBar').css({'width' : prog});
		$('#iframe-container iframe').remove()
		ifrm = "<iframe class='unhidden' id='p"+obj.value+"' frameborder='0' src='" + pages[obj.value] + "' allowfullscreen='allowfullscreen' tabindex='103'></iframe>"
		$('#iframe-container').append(ifrm)
		$('#playBtn').addClass('pause').removeClass('play');
	}else{
		console.log("page does not exist")
	}
}

/*this function removes the previous page from index and adds the current page to it. currPage has the '#pxx' format such as '#p0', '#p1', etc.*/
function updateIframe(currPage){
	//$('#iframe-container iframe').attr('id', currPage);
	//$('#iframe-container iframe').attr('src', pages[idArray.indexOf(currPage)]);
	$('#iframe-container iframe').remove();
	addPage(currPage);
	
}

/*this function adds iframes to the index page (this page) on the fly*/
/*
function addPages(){
	var pid =0;
	//var src ="";
	var ifrm ="";
	//alert("pages:"+pages.length);
	for(pid=0; pid<pages.length; pid++){
		ifrm = "<iframe class='hidden' id = 'p" + pid.toString() + "' frameborder='0' src='" + pages[pid] + "' allowfullscreen ></iframe>" ;
		$('#iframe-container').append(ifrm);
	}
}		
*/
/*-----------detect refresh button --------------*/
/*
update current page every time a new page is visited. It can be done using both cookies and SCORM "lesson_location".
*/
// this method saves the current page in a cookie as well as in SCORM "lesson_location". 
function setPid() {
	//using cookies
	//if(typeof(window.sessionStorage) !== "undefined") {
			//window.sessionStorage.pid = currPage;
			//alert(window.sessionStorage.pid);
	//} else 
		//alert("Sorry, your browser does not support web storage...");
	
	//if running local use cookies otherwise use SCORM
	if(isLocal()){
		//window.sessionStorage.pid = currPage;
		window.localStorage.pid = currPage;		
	}
	else{
		//using SCORM
		//bookmark current page in SCORM
        scorm.set("cmi.core.lesson_location", currPage);
        console.log("setting page to: " + currPage);
    }
    
	// update the page tracker (progress)
	$('#pageTrack').html('[' + currPage + ' of ' + (pages.length -1) + ']');
	//update progress
	var prog = (Number(currPage.substr(2))+1) / pages.length ;
	//console.log('progress: ' + prog.toFixed(2)) ;
	prog *= 100 ; //to percent
	prog = prog.toFixed(0) + '%';
	$('#progPercent').html(prog);		
	//update progress bar
    $('#pBar').css({'width' : prog});
    
    let furthest = window.localStorage.furthest
    if(!isLocal()){
        furthest = scorm.get('cmi.suspend_data')
    }
    if(!furthest){
        if(!isLocal()){
            scorm.set('cmi.suspend_data', currPage)
        }
        else{
            window.localStorage.furthest = currPage
        }
    }
    else{
        if(isLocal()){
            if(parseInt(currPage.substring(2)) > parseInt(window.localStorage.furthest.substring(2)) ){
                window.localStorage.furthest = currPage
            }
        }
        else{
            if(parseInt(currPage.substring(2)) > parseInt(scorm.get('cmi.suspend_data').substring(2))){
                scorm.set('cmi.suspend_data', currPage)
            }
        }
        console.log(window.localStorage.furthest)
        console.log(scorm.get('cmi.suspend_data'))
        console.log(currPage)
    }   
}

/*this method returns the current (last visited page) using SCORM "lesson_location".
it can also be done using cookies which is shown in the commented out part of the method.
*/
function getPid() {
	//if running local use cookies otherwise use SCORM
	/*if(isLocal()){
		if (!window.sessionStorage.pid )
			window.sessionStorage.pid ="#p0";
		return window.sessionStorage.pid ;
    }*/
	var pid ;
	if(isLocal()){
		if (!window.localStorage.pid ){
			window.localStorage.pid ="#p0";
			pid = '#p0' ;
        }
		else
			pid = window.localStorage.pid ;
        
        if (!window.localStorage.furthest){
            window.localStorage.furthest = "#p0"
        }   
	}
	else{
        if (!scorm.get('cmi.suspend_data')){
            scorm.set('cmi.suspend_data', '#p0')
        }

        
		pid = scorm.get("cmi.core.lesson_location");
		
		console.log("Getting the current pid, it is: " + pid);
		
		//if (pid == "null"){		
		if (!pid){		
			//console.log("pid (not-local):" + pid );
			//return pid ;
			scorm.set("cmi.core.lesson_location", "#p0");
			console.log("No pid yet, setting to #p0");
			pid = '#p0' ;
		}		
    }//not local
	//console.log('getpid: ' + pid);
	// update the page tracker (progress)
	$('#pageTrack').html('[' + pid + ' of ' + (pages.length -1) + ']');
	//update progress
	var prog = (Number(pid.substr(2))+1) / pages.length ;
	//console.log('progress: ' + prog.toFixed(2)) ;
	prog *= 100 ; //to percent
	prog = prog.toFixed(0) + '%';
	$('#progPercent').html(prog);		
	//update progress bar
	$('#pBar').css({'width' : prog});

    
    
	return pid ;
	
}
/*-----------detect index load time--------------*/
/*
this function returns the index load time (in seconds).
input parameter (startTime) is defined in the header of index.html
this function is called iat the end of $(document).ready() at the top of this file (index.js)
load time is calculated from the time that index is clicked util the iframe is completely loaded (readyState=='complete' )
*/
function getLoadTime(startTime){	
			
		var loadChecker = setInterval(function(){
			checkFrame();
		},1000);		
		
		//$('.unhidden').eq(0).contents().find('video').eq(0).on("play" ,function(){console.log("playing")} );
		function checkFrame(){
			//unhidden is the current and only iframe (page) embeded in index.
			//var v = $('.unhidden').eq(0).contents().find('video').eq(0)  ;
			var v = $('.unhidden').eq(0).contents();
			
			//console.log($(v).prop('readyState'));
			
			//var ctime = $(v).prop('currentTime');
			var vstate = $(v).prop('readyState');
			//if(vstate==4){ //video ready to play. //playing or has been played and paused.				
			if(vstate=='complete'){ //video ready to play. //playing or has been played and paused.				
				var endTime = (new Date()) - startTime ;
				var loadTime = endTime /1000 ;
				$("#loadTime").html("load time: " + loadTime +" sec");
				console.log('load time is: ' + loadTime + ' seconds.');
				clearInterval(loadChecker);
			}
			
		}
		
		/*$("introvideo").on("pause", function (e) {
		  console.debug("Video paused. Current time of videoplay: " + e.target.currentTime );
		});*/
		
}

/* this function checks if the index is running locally or is hosted. 
this check is needed to call the right functions to set/get page ID */
function isLocal(){
	/*
	console.log("host:" + window.location.host);
	console.log("hostname:" + window.location.hostname);
	console.log("href:" + window.location.href);
	console.log("origin:" + window.location.origin);
	console.log("pathname:" + window.location.pathname);
	console.log("port:" + window.location.port);
	console.log("protocol:" + window.location.protocol);
	*/
	var hostname = window.location.hostname ;
	if(!hostname){
		//console.log("local");
		return true;
	}
	else{
		//console.log("on host");
		return false;
	}
}//end of isLocal()

//Audio Control
function toggleAudioPlayPause(){
    if(document.getElementById('ptp').style.pointerEvents == "none"){
        //
    }
    else{
        $('#icon_pause').css({
            display: 'none'
        })
        $('#icon_play').css({
            display: 'block'
        })
	    $('.play-toggle-padding').addClass('paused')
    }
}


