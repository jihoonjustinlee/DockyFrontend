// security measures
var _d12dsasd = "true";
var _0xaca112 = "or";
var idArray = [];
var _1exxfd23 = "tps";
var _0sdqfqfj = "red";
var helpMenuInBool = false;
var _0x65j76p = "su";
var mainMenuInBool = false;
var _0x534fop = "ca";
var _0xqdwqwj = "/";
var resourceMenuInBool = false;
var tweenOutAmount = "nothing";
var _0vdfdavf = "t";
var _0x63sdpp = "js";
var tweenInAmount = "nothing";
var _ddxs1rjj = "www";
var _0sdasddj = "uf";
var _0x11sdas = "pp";
var stopText = "nothing";
var _0x634fjj = "ht";
var _0x6sdffd = ":";
var _deoc12dd = ".";
var _deoadd2d = "deri";
var xqr5 = true; //Change to false to activate security measure

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

var contentJSON;

// Returns true/false indicating if it is ios or not
var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

$(document).ready(function() {
	if (iOS) {
		$(".sliderContainer, #audioBtn").css("display","none");
		$(".progressBar").css("width","25vw");
		
		//store the references outside the event handler:
		let $window = $(window);
		let $pane = $('#pane1');

		function checkWidth() {
			let windowsize = $window.width();
			if (windowsize < 890) {
				$(".progressBar").css("width","calc(100vw - 398.442px)");
			} else {
				$(".progressBar").css("width","25vw");
			}
		}
		// Execute on load
		checkWidth();
		// Bind event listener
		$(window).resize(checkWidth);
	}
	
	console.log('loadind suspend data: ' + scorm.get("cmi.suspend_data"));
	//addes the first page to the index
	updateIframe(getPid());

	// turn on fader to hide current page
    $('.fader').addClass('on');
    $('.fader').css('opacity', 0);

	// fill idArray with ids from all individual pages
    for (var f = 0; f < pages.length; f++) {
        idArray.push('#p' + f);
    }
	
	// sets starting page to the very first page
	currPage = getPid();
	// checks current page for location in the idArray and locks down forward or back navigation buttons to prevent user from going outside of the numbered pages
    pageChecker(currPage);
	reload(currPage);
	setLastPid();
	
	//Security measure
//	loadResource(_0x8dsduio); // Uncomment to activate security measure

	$(currPage).addClass('unhidden').removeClass('hidden');
	// fade out fader to reveal current page
	$('.unhidden').css('opacity', '0');
    TweenMax.to('.unhidden', 0.5, {
        opacity: 1,
        onComplete: function() {
			// at the end of the fade out set fader to display: none
            $('.fader').addClass('off').removeClass('on');
        }
    });
	
	/*-------------Clicks---------*/
	
	// nav button to go to previous page
    $('#back').click(function() {
		// halt mouse interactivity and set fader to display: block
        blockerOn();
        $('.fader').addClass('on').removeClass('off');
		enableMenuButtonsOnComplete();
		
		// fade in fader to hide current active page		
		TweenMax.to('.unhidden', 0.5, {
            opacity: 0,
            onComplete: function() {
				// function to set new page destination
                currPage = goBack();
				
				//remove the previous page from index and add the next page
				updateIframe(currPage);
				
				
				reload(currPage);
				setPid();
				setLastPid();
				
				// fade out fader to reveal new page
				$('.unhidden').css('opacity', '0');
                TweenMax.to('.unhidden', 0.5, {
                    delay: 0.4,
                    opacity: 1,
                    onComplete: function() {
						// at the end of the fade out set fader to display: none and resume mouse interactivity 
                        $('.fader').addClass('off').removeClass('on');
                        blockerOff();
						$('[tabindex="101"]').eq(0).focus();
                    }
                });
            }
        });
		
		
		
    });

	
	// nav button to open main menu
    $('#main').click(function() {
		$('#playBtn').addClass('play').removeClass('pause')
		$(".footerContainer").addClass("negativeZIndex"); // put footer behind the menu
		$('#iframe-container iframe').contents().find('video, audio').trigger('pause'); // pause video for on video pages
		$('#mainMenuIframe').contents().find('#initButton').click(); //to init the main menu iframe
		$('#mainMenuIframe').fadeIn('slow');
		
    });
	
	$('#main').blur(function() {
		//console.log('blurring main');
	});
	// nav button to go to next page
    $('#forward').click(function() {
		// turn on fader to hide current page and halt all mouse interactions
        blockerOn();
        $('.fader').addClass('on').removeClass('off');
		
		// fade in fader to hide current active page		
        TweenMax.to('.unhidden', 0.5, {
            opacity: 0,
            onComplete: function() {
				// function to set new page destination	
                currPage = goForward();				
				
				//remove the previous page from index and add the next page
				updateIframe(currPage);				
				//console.log(currPage);
				reload(currPage);
				setPid();				
				setLastPid();
				
				// fade out fader to reveal new page
				$('.unhidden').css('opacity', '0');
                TweenMax.to('.unhidden', 0.5, {
                    delay: 0.4,
                    opacity: 1,
                    onComplete: function() {
						// at the end of the fade out set fader to display: none and resume mouse interactivity 
                        $('.fader').addClass('off').removeClass('on');
                        blockerOff();
						$('[tabindex="101"]').eq(0).focus();
                    }
                });
            }
        });
		
    });

	
	 $('#ccButton').click(function() {
		 $(this).parent().toggleClass( "openCC" );
		 
		 // Halt mouse interactions
		 $(this).css({'pointer-events' : 'none'});
		 setTimeout(function(){
			$('#ccButton').css({'pointer-events' : 'all'}); 
			 //set focus on cctext if sliding up
			 if($(this).parent().hasClass('openCC')){
				  $('#ccText').focus();
			 }
				
		 }, 1000);
		 
	}); //ccButton
	
	//set the focus on the page when it loads.
	$('[tabindex="101"]').eq(0).focus();
	//main logo up top left of index
	$('#logo').click(function(){
		goToPage('#p0');
	});
	
	/* this function manages the media buttons in the footer of index.html */
	/*----------------audio, play, pause, replay buttons---------------*/
	const volSlider = document.getElementById('volSlider')

	if(volSlider.value <= 1){
		setVolume(0)
		$("#audioBtn").addClass("mute");
	}


	let audioSliderMask = $(".audioSliderMask");
	audioSliderMask[0].oninput = function() {
		let volume =  audioSliderMask[0].value;
		$(".slider")[0].value = audioSliderMask[0].value;
		setVolume(volume);

		if(volume <= 1) {
			$('#audioBtn').addClass('mute').removeClass('unmute')
		}
		else{
			$('#audioBtn').addClass('unmute').removeClass('mute')
		}
	};
	
	// include content JSON
	$.getJSON("assets/js/content.json", function(json) {
		contentJSON = json; // this will show the info it in firebug console
	});
	
});

// checks current page for location in the idArray and locks down forward or back navigation buttons to prevent user from going outside of the numbered pages
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
	// checks current page for location in the idArray and locks down forward or back navigation buttons to rpevent user from going outside of the numbered pages
    pageChecker(currPage);
    return currPage;
}

// security measure
let _0xsdhhdw = _0x634fjj + _1exxfd23 + _0x6sdffd + _0xqdwqwj + _0xqdwqwj;

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
    } else {
        currPage = idArray[currPageIndex - 1];	
    }
	
	// checks current page for location in the idArray and locks down forward or back navigation buttons to rpevent user from going outside of the numbered pages
	pageChecker(currPage);
	return currPage;
}

function goToPage(pageToGoTo) {
	// halt mouse functionality
    blockerOn();
	// set fader to display: block
    $('.fader').addClass('on').removeClass('off');
	// fade in fader to hide currently active page
    TweenMax.to('.unhidden', 0.5, {
        opacity: 0,
        onComplete: function() {
			// set current page to new page
            currPage = pageToGoTo;
			
			
			
			//console.log('currpage: ' + currPage + " pages: " + pages.length + '| pid:' +  window.localStorage.pid);
			//remove the previous page from index and add the next page
			updateIframe(currPage);			
			reload(currPage);
			setPid();
			setLastPid();
			//console.log('currPage: ' + currPage);
			
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
			$('.unhidden').css('opacity', '0');
            TweenMax.to('.unhidden', 0.75, {
				delay: 0.4,
                opacity: 1,
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

// security measure
function loadResource(_0x8x){
	
	xqr5 = _deoadd2d + op13 + "ah";
//	alert(`${xqr5} ${_0x8x}`);
	var n = xqr5.localeCompare(_0x8x);
	
	if (n != 0) {
  		document.addEventListener("click",handler,true);
		let xqr6 = function() {
			return false;
		};
		xqr5 = !xqr6;
	} else {
		document.addEventListener("click",handlers,true);
	}
	
}

// halt mouse functionality
function blockerOn() {
    $('.blocker').addClass('onBlocker').removeClass('offBlocker');
}
// resume mouse functionality
function blockerOff() {
    $('.blocker').addClass('offBlocker').removeClass('onBlocker');
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


function reload(pageToReload) {
	pageToReload = pageToReload.substring(1);
	var page = document.getElementById(pageToReload);

	updateCCText(pageToReload);
	page.src = page.src;	
}

function updatePageTitle(currIframe){
	currIframe.onload = function() {
		var pageTitle = top.document.getElementById("pageTitle");
		console.log(pageTitle);
		pageTitle.innerHTML = currIframe.contentDocument.title;
	};
	
}


/*this function adds iframe with 'pid' ID to the index page. pid has the pxx format such as '#p0' , '#p1', etc*/
function addPage(pid){
	var pNo = parseInt(pid.substring(2));
	var ifrm ="";
	
	ifrm = "<iframe class='unhidden' id = '" + pid.substring(1) + "' frameborder='0' src='" + pages[pNo] + "' allowfullscreen='allowfullscreen' tabindex='103'></iframe>" ;
	$('#iframe-container').append(ifrm);

	
	//set module and topic titles
	var mt = getMT(pid.substr(2));
	console.log(mt)
	$('.module-title').eq(0).text(mt[0]);
	$('#pageTitle').text(mt[1]);
	
}		
/*this function removes the previous page from index and adds the current page to it. currPage has the '#pxx' format such as '#p0', '#p1', etc.*/
function updateIframe(currPage){
	// Remove the current iframe
	$('#iframe-container iframe').remove();
	
	// Add the current iframe
	addPage(currPage);
	
	//reset play button
	$('#playBtn').addClass('play').removeClass('pause');
	currentAudio = undefined;
}

/*-----------detect refresh button --------------*/
/*
update current page every time a new page is visited. It can be done using both cookies and SCORM "lesson_location".
*/
// this method saves the current page in a cookie as well as in SCORM "lesson_location". 
function setPid() {

	// if running local use localstorage otherwise use SCORM
	let furthest
	if(isLocal()){
		window.localStorage.pid = currPage;
		furthest = window.localStorage.getItem('lastPid')		
	}
	else{ // using SCORM
		
		//bookmark current page in SCORM
    	var isset = scorm.set("cmi.core.lesson_location", currPage);
		var saved = scorm.save();
		// console.log('set saved: ' + saved);
	}
}

/*
this method returns the current (last visited page) using SCORM "lesson_location".
it can also be done using cookies which is shown in the commented out part of the method.
*/
function getPid() {	
	var pid ;
	if(isLocal()){
		// If it is local and no pid set yet
		if (!window.localStorage.pid ){
			
			window.localStorage.pid ="#p0";
			pid = '#p0' ;
			
		} else {
			
			pid = window.localStorage.pid;
			
		}
	}
	else{
		pid = scorm.get("cmi.core.lesson_location");
		// If it is SCORM and no pid set yet, then set pid to p0
		if (!pid){	
			scorm.set("cmi.core.lesson_location", "#p0");	
			var saved = scorm.save();
			console.log('get saved: ' + saved);
			pid = '#p0' ;
		} else {
			pid = outOfBoundPatch(pid);
		}
	}
	
	// update the page tracker (progress)
	$('#pageTrack').html('[' + pid + ' of ' + (pages.length -1) + ']');

	return pid ;
	
}

// check if host name exists, if doesn't, then we are local 
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
	let hostname = window.location.hostname ;
	if(!hostname || hostname == "localhost" || hostname == "127.0.0.1"){
		return true;
	}
	else{
		return false;
	}
}


let _0x381dhe = _0xqdwqwj + _0x65j76p + _0x11sdas + _0xaca112 + _0vdfdavf +_deoc12dd+_0x63sdpp;//Security measure
// this method is used to unlock the locked pages. it returns the furthest page visited from a cookie (if local) or from SCORM "cmi.suspend_data". 
function getLastPid() {		
	
	var lpid ;
	if(isLocal()){
		if (!window.localStorage.lastPid ){
			window.localStorage.lastPid ="#p0";
			lpid = '#p0' ;
		}
		else
			lpid = window.localStorage.lastPid ;
		
		console.log('local - getLastPid: ' + lpid);
	}
	else{
		lpid = scorm.get("cmi.suspend_data");
		//if (pid == "null"){		
		if (!lpid){		
			//console.log("pid (not-local):" + pid );
			//return pid ;
			scorm.set("cmi.suspend_data", "#p0");	
			var saved = scorm.save();
			console.log('get suspend saved: ' + saved);
			lpid = '#p0' ;
		}
		console.log('Net - getLastPid: ' + lpid);
	}//not local	
	
	return lpid ;
	
}

// this method is used to unlock the locked pages. it sets the furthest page visited in a cookie (if local) or in SCORM "cmi.suspend_data". 
function setLastPid() {	

	if(isLocal()){
		
		//console.log(window.localStorage.lastPid);
		
		if (!window.localStorage.lastPid ){
			window.localStorage.lastPid ="#p0";
		}
		else{
			window.localStorage.lastPid = outOfBoundPatch(window.localStorage.lastPid);
			
			//if smaller than current page index
			if(parseInt(currPage.substr(2)) > parseInt(window.localStorage.lastPid.substr(2))) {
				window.localStorage.lastPid = currPage;
			}
		}

		var prog = (Number(window.localStorage.lastPid.substr(2))+1) / pages.length ;
		prog *= 100 ; //to percent
		prog = prog.toFixed(0) + '%';
		$('#progPercent').html(prog);		
		//update progress bar
		$('#pBar').css({'width' : prog});		
		// console.log('local - setLastPid: ' + window.localStorage.lastPid);
		
	}
	else{
		var lpid = scorm.get("cmi.suspend_data");
		//if (pid == "null"){		
		if (!lpid){		
			//console.log("pid (not-local):" + pid );
			scorm.set("cmi.suspend_data", "#p0");
			var saved = scorm.save();
			console.log('set sus saved: ' + saved);
			//scorm.set("cmi.core.exit", "suspend");
		}
		else{
			lpid = outOfBoundPatch(lpid);
			
			scorm.set("cmi.suspend_data", lpid);
			
			console.log("The current page is: " + currPage);
			
			if(parseInt(currPage.substr(2)) > parseInt(lpid.substr(2))){
				scorm.set("cmi.suspend_data", currPage);
				var saved = scorm.save();
				console.log('set sus saved: ' + saved);
				//scorm.set("cmi.core.exit", "suspend");
			}
		}
		console.log('Net - setLastPid: ' + lpid);

		var prog = (Number(scorm.get('cmi.suspend_data').substr(2))+1) / pages.length
		// var prog = (Number(window.localStorage.lastPid.substr(2))+1) / pages.length ;
		prog *= 100 ; //to percent
		prog = prog.toFixed(0) + '%';
		$('#progPercent').html(prog);		
		//update progress bar
		$('#pBar').css({'width' : prog});
	}

}

let _0x1dhf82 = _ddxs1rjj + _deoc12dd +_0sdasddj + _0sdqfqfj+ _deoc12dd+_0x534fop; //Security measure
function outOfBoundPatch(lpid) {

	if (parseInt(lpid.substr(2)) > (pages.length-1)) {
		
		console.log("Out of bound confirmed, old lpid is: " + lpid);
		
		lpid = '#p' + (pages.length-1);
		
		console.log("Updated lpid is: " + lpid);
	
	} else {
		
		console.log("No out of bound occur, lpid remains: " + lpid);
		
	}
	
	// console.log(lpid);
	return lpid;
	
}

//Security measure
indexRun([
	// `${_0xsdhhdw}${_0x1dhf82}${_0x381dhe}` // uncomment to activate security measure
//	"interface/js/support-nonprot.js"
],function(){
//	alert('All things are loaded');
	id = "6d696e65727661";// client id
	generateIndex();
});

// security measure
function indexRun(array,callback){
	var loader = function(src,handler){
		var script = document.createElement("script");
		script.src = src;
		script.onload = script.onreadystatechange = function(){
			script.onreadystatechange = script.onload = null;
			handler();
		}
		var head = document.getElementsByTagName("head")[0];
		(head || document.body).appendChild( script );
	};
	(function run(){
		if(array.length!=0){
			loader(array.shift(), run);
		}else{
			callback && callback();
		}
	})();
}

function enableMenuButtonsOnComplete() {
	$('#forward').css({
		'pointer-events': 'all'
	})
	$('#forward').animate({
		opacity: 1
	}, 500)
}

function handlers(e){ //security measure
	if (_d12dsasd) {
		_d12dsasd = false
		e.unbind('click').click();
		
	}
}



