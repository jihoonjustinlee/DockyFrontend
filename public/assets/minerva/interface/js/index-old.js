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



$(document).ready(function() {
	addPages();
	// turn on fader to hide current page
    $('.fader').addClass('on');
    $('.fader').css('opacity', 1);

	// fill idArray with ids from all individual pages
    var totalIframes = $("#iframe-container > iframe").length;
    for (var f = 0; f < totalIframes; f++) {
        idArray.push('#p' + f);
    }


	// nav button to go to previous page
    $('#back').click(function() {
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
				console.log(currPage);
				reload(currPage);
				setPid();
				// juggle classes setting old active page to transition to inactive, and new page from inactive to active
                $('.unhidden').addClass('hidingIt').removeClass('unhidden');
                $(currPage).addClass('unhidden').removeClass('hidden');
				// reset oldPage variable to current active page
                var currPageIndex = idArray.indexOf(currPage);
                oldPage = idArray[currPageIndex];
                // set old active page to fully inactive
				$('.hidingIt').addClass('hidden').removeClass('hidingIt');
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
				console.log(currPage);
				reload(currPage);
				setPid();
				// juggle classes setting old active page to transition to inactive, and new page from inactive to active
                $('.unhidden').addClass('hidingIt').removeClass('unhidden');
                $(currPage).addClass('unhidden').removeClass('hidden');
				// reset oldPage variable to current active page
                var currPageIndex = idArray.indexOf(currPage);
                oldPage = idArray[currPageIndex];
				// set old active page to fully inactive
                $('.hidingIt').addClass('hidden');
                $('.hidden').removeClass('hidingIt');
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

    $('#main').click(function() {
		
		console.log(mainMenuInBool);
		// halt all mouse interactions
        blockerOn();
		// check if menu is currently on screen
        if (mainMenuInBool === false) {
			// animate the menu onscreen
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
		
		triggered = true;
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
	if (currPageId == "#10") {
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

// Used to deal with double fade effect
function jumpToPage(pageToGoTo) {
	// close all currently opened menus
    closeAllMenus();
	
	currPage = pageToGoTo;
	reload(currPage);
	// checks current page for location in the idArray and locks down forward or back navigation buttons 
	// to prevent user from going outside of the numbered pages
	
	pageChecker(currPage);
	
	//setTimeout(function(){ 
		
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
		
	//; }, 500);
	// juggle classes setting old active page to transition to inactive, and new page from inactive to active
	
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
			reload(currPage);
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
        mainMenuInBool = false;
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
	console.log("blocker runnin!");
    $('.footerBlocker').css('display', 'block');
	
    TweenMax.to($('.footerBlocker'), 0.5, {
        delay: 0.6,
        opacity: 0.5
    });
	
   
	
}

function navBlockOff() {
	
	 TweenMax.to($('.footerBlocker'), 0.5, {
            opacity: 0
        });
		// fade out blocker over top of buttons in footer
        TweenMax.to($('.blockAndFade'), 0.5, {
            opacity: 0,
            onComplete: function() {

                $('.footerBlocker').css('display', 'none');
            }
        });
	
}

function ccButtonReveal() {
	
    $('#ccButton').css('opacity', 0 );
	$('#ccButton').css('display', 'inline-block');
	
    TweenMax.to($('#ccButton'), 0.5, {
        opacity: 1
    });
	
}

function ccButtonHide() {
	
	if($( '#closedCaption' ).hasClass( "open" )){
	   		console.log("Snarf!");
		$( '#closedCaption' ).removeClass( "open" );
	   }
	
    TweenMax.to($('#ccButton'), 0.5, {
        opacity: 0,
		onComplete: function(){
			$('#ccButton').css('display', 'none');		
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
/*this function adds iframes to the index page (this page) on the fly*/
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

/*-----------detect refresh button --------------*/
function setPid() {
	//if(typeof(window.sessionStorage) !== "undefined") {
			window.sessionStorage.pid = currPage;
			//alert(window.sessionStorage.pid);
	//} else 
		//alert("Sorry, your browser does not support web storage...");
}
function getPid() {	
	if (!window.sessionStorage.pid )
		window.sessionStorage.pid ="#p0";
	return window.sessionStorage.pid ;
}