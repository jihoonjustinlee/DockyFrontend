//save the current page's title
let courseTitle="";

$(document).ready(function() {	
	
	
	
	//this is a not an actual button. it's used to init the main menu.
	$('#initButton').click(function(){
	
		
		//save the course title
		courseTitle = window.parent.$('#pageTitle').html();	
				
		//set focus to navigation		
		//$('#navigation').focus();
		
		//change the header title from course title to 'Main Menu'
		let pageTitle = window.parent.$('#pageTitle');
		pageTitle.html('Main Menu');
//		pageTitle.fadeOut('fast', function(){
//			pageTitle.html('Main Menu').fadeIn('fast');
//		});
		
		
		//initialize the main menu
		initNav();	
			
		
	});
	
	
	$('#navigation').click(function(){
		hideMenu(); //hide all menu items
		$('.navigationContainer').fadeIn('slow');
		
		//set outter scrollbar to top
		//el.getScrollElement().scrollTop = 0;
		//el.recalculate();
		
		//set inner scrollbar to top
//		var tc = $('.accordionContainer').find('.topicContainer').has('.topicTitle.active')[0];
		//el.getScrollElement().scrollTop = 0;
		//el.recalculate();
	});
	
	$('#resources').click(function(){
		hideMenu(); //hide all menu items
		$('.resourcesContainer').fadeIn('slow');
	});
	
	$('#glossary').click(function(){
		
		$('.gEntry').removeClass('linkActive')
		//grey out the glossary non-existance items
		disableEntry();
		
		hideMenu(); //hide all menu items
		$('.glossaryContainer').fadeIn('slow');
		
		//set outter scrollbar to top
		// var el = new SimpleBar($('.gDefinitionContainer')[0], { autoHide: false });
//		el.getScrollElement().scrollTop = 0;
		//el.recalculate();
		
		
		
	});
	
	$('#help').click(function(){
		hideMenu(); //hide all menu items
		$('.helpContainer').fadeIn('slow');
		
		//set outter scrollbar to top
		//el.getScrollElement().scrollTop = 0;
		//el.recalculate();
	});
	
	//left menu items and glossary entries
	$('.menuItem').click(function(){
	
		//reset menu items color
		$('.menuItem').removeClass('linkActive').addClass('link');
		//$(this).addClass('linkActive');
		$(this).addClass('linkActive').removeClass('link');		
		
		
	
	});
	
	//glossary entries
	$('.gEntry:not(.menuDisabled)').click(function(){
	
		//reset glossary entries
		$('.gEntry:not(.menuDisabled)').removeClass('linkActive').addClass('link');
		//$(this).addClass('linkActive');
		$(this).addClass('linkActive').removeClass('link');	
		
		//show glossary entry definitions
		setgDefinition($(this).html().toUpperCase());
	
	});
	
	
	//view resource 
	/* ih has bben assumed that the local resources are just pdf and web resources dont have the http prefix at their title in the links menu */
//	$('.resBtn').click(function(){
//		var title = $(this).parent().siblings('.resTitle').eq(0).text();
//		var win;		
//		
//		// a local resource 
//		if(title.indexOf('pdf')>=0)
//			win = window.open('resources/' + title , title , '_blank');
//		else
//			win = window.open('http://' + title , '_blank');
//		if (win) {
//			//Browser has allowed it to be opened
//			win.focus();
//		} else {
//			//Browser has blocked it
//			alert('Please allow popups for this website');
//		}
//	});
	
	//print resource
//	$('.resPrint').click(function(){
//		//var objFra = this.getElementsByTagName('iframe')[0].contentWindow.print();
//		//console.log('#iframe :' + objFra);
//        //$(objFra).focus();
//        //$(objFra).print();
//		var title = $(this).parent().siblings('.resTitle').eq(0).text();
//		var win;		
//		
//		//console.log('print title: ' + 'resources/' + title);
//		// a local resource 
//		if(title.indexOf('pdf')>=0)
//			win = window.open('resources/' + title , title , '_blank');
//		if (win) {
//			//Browser has allowed it to be opened
//			win.focus();
//			//win.addEventListener('load', myFunc);
//			win.print();
//			//win.close();
//		} else {
//			//Browser has blocked it
//			alert('Please allow popups for this website');
//		}
//	});
	
	//function myFunc(){console.log('loaded');}
	
	//menu close button
	$('#menuClose').click(function(){
		
		menuCloseClick();	
	});	

	
	/** this function shows the main menu on the screen. it adds the menu as a child to the body element in index file.	*/
	/*
	function ShowMainMenu(){
		
		//set focus to navigation		
		$('#navigation').focus();
		
		//change the header title from course title to 'Main Menu'		
		window.parent.$('#pageTitle').html('Main Menu');
		initNav();

	}
	*/
	
	/*
	//show glossary entry definitions
	$('.gEntry').click(function(){
		
		setgDefinition($(this).html().toUpperCase());	
		
	});
	*/
	
	//navigation topic
	$('.topicTitle').click(function(){
		
		if($(this).hasClass('active')){
			$(this).siblings('.topicPage').css("display", "none");
			$('.topicTitle').removeClass('active');
			
			//remove tabindex from topic pages (of this topic)
			$(this).nextAll('.topicPage').removeAttr('tabindex');
		}
		else{
			$('.topicTitle').removeClass('active');
			$('.topicPage').css("display", "none");
			$(this).addClass('active');
			$(this).siblings('.topicPage').css("display", "block");
			
			//add tabindex to unlocked topic pages (of this topic)
			$(this).siblings('.topicPage:not(.topicPageLock)').attr('tabindex' , '0');
		}
		
		
	});
	//navigation goto page
	$('.topicPage').click(function(){
		
		
		//highlight the page
		$('.topicPage').removeClass('topicPageActive');
		$(this).addClass('topicPageActive');		
		var pid = $('.topicPage').index($(this)) ;
		//var pid = parent.getPid();
		
		//remove focus
		$(this).blur();
		//close the menu
		$('#menuClose').click(menuCloseClick('topicPage')); 
		//console.log('data-page: ' + $(this).attr('data-page'));
		//console.log('data-page: ' + $(this).data('page'));
		//var pid = "#p" + parent.pages.indexOf($(this).attr('data-page')); //prop won't work
		//go to page
		//console.log("going to #p" + pid);
		parent.goToPage("#p" + pid);
		enableMenuButtonsOnComplete();
		
	});
	
	/*remove hover effect (on touch screens)*/
	$('.topicPage').on('touchstart', function(){
		$(this).css({"background" : "#595a5d"});
	}).on('touchend', function(){
		//$(this).addClass('noBackground');
		$('.topicPage').css({"background" : "unset"});
		//alert('touch ended.');
	});
	
	
});//end of document ready


function menuCloseClick(caller){
	// console.log('caller: ' + caller);
	$('.menuClose').blur();
	
	parent.$('#main').removeClass('menu-opened')
	let pageTitle = window.parent.$('#pageTitle');
	pageTitle.html(courseTitle);
//	pageTitle.fadeOut('fast', function(){
//		pageTitle.html(courseTitle).fadeIn('fast');
//	});
	
	window.parent.$('#mainMenuIframe').fadeOut('slow', function(){

		window.parent.$(".footerContainer").removeClass("negativeZIndex");
		//hide the menu containers (middle box)
		$('.navigationContainer, .resourcesContainer, .glossaryContainer, .helpContainer').css({'display' : 'none'});

		//set focus back to main menu button
		if(caller==="topicPage") {
			parent.$('#logo').focus();
			//parent.$('.firstTab').eq(0).focus();
		} else {
			parent.$('#main').focus();
		}
	});
}

/*-----------------------------------------------------------------------*/
/* this function adds the definitions of a letter to the  .gDefinitionContainer in mainMenu.html */
function setgDefinition(letter){
	
	
	//first clear the container
	//$('.jspPane').eq(0).empty();
	$('.gDefinitionContainer').eq(0).empty();
	var items = '';
	$.getJSON( "assets/js/glossary.json", function(data) {
		
		
		var obj = data.glossary[letter];
		$.each( obj , function( key, val ) {
			//adding the items to an html elmenent
			items += "<div class='gTitle'>" + key +"</div>" ; //adding the entry
			items += "<div class='gDef'>" + val + "</div>" ; //adding the definition of the entry
			
		});
		//$('.jspPane').eq(0).append(items);
		$('.gDefinitionContainer').eq(0).append(items);
		$('.gTitle, .gDef').fadeIn();
		//$('.gDefinitionContainer').eq(0).find('.simplebar-content').eq(0).append(items);
		
		//re-initialize the simplebar
		//var defCon = new SimpleBar(document.getElementsByClassName('gDefinitionContainer')[0], { autoHide: false });
		//var defCon = new SimpleBar($('.gDefinitionContainer')[0], { autoHide: false });
		/*defCon.getScrollElement().addEventListener('scroll', function(){
			console.log($(this).scrollTop());
		});*/
		//defCon.getScrollElement().scrollTop = 0;
//		defCon.recalculate();	
		//$('.simplebar-scroll-content').attr('tabindex' , '-1');	
		//defCon.getContentElement();
		
		//set focus for tab navigation
		//$('.gDefinitionContainer .gTitle').eq(0).addClass('lastTab').attr('tabindex', '0').focus();
		$('.gDefinitionContainer .gTitle').eq(0).attr('tabindex', '0').addClass('gtTab').focus();
		//$('.gDefinitionContainer ').eq(0).focus();
		
	});
	
	//add the custom scroll bar
	//var api = $('.scrollPane').data('jsp');
	//api.reinitialise();
	
	
}


//this function disbales the non-existance itemsin the glossary 
function disableEntry(){
	
	$.getJSON( "assets/js/glossary.json", function(data) {	
		var i;
		var entry ; 
		var c;
		for(i= 65 ; i<= 90 ; i++){
			c = String.fromCharCode(i);			
			entry = data.glossary[c] ;			
			if(entry===undefined || Object.keys(entry).length === 0){
				//console.log('no entry for ' + c );
				$('.gEntry:contains("' + c + '")').removeClass('link').removeClass('linkActive').addClass('menuDisabled').removeAttr('tabindex');
			}
				
			
		}
		
		// Display first correct entry uppon initial load
		const firstEntry = $('.gEntry:not(.menuDisabled)')[0];
		setgDefinition(firstEntry.innerHTML);
		
		$(firstEntry).addClass('linkActive').removeClass('link');	
		
	});
	
}

/* this function hides menu items located in the center */
function hideMenu(){
	$('.navigationContainer').css({'display' : 'none'});
	$('.resourcesContainer').css({'display' : 'none'});
	$('.glossaryContainer').css({'display' : 'none'});
	$('.helpContainer').css({'display' : 'none'});
}


/* this function provides print functionality for a document (see resources in main menu) */
/*
function print(btn){
	
	var title = $(btn).siblings('.resTitle').eq(0).text();
	console.log('print: ' + title);
	$(this).load('resources/' + title , function(){
		window.print();
	});
}
*/

/* this function initializes the main menu */

function initNav(){
	
	//reset old current page
	//$('#mainMenuIframe').contents().find('.topicPage').removeClass('topicPageActive');
	$('.topicPage').removeClass('topicPageActive');

	
	
	//get current page
	var pageIndex = parent.getPid().substring(2); //pid format : #pxx
	//var currPage = $('#mainMenuIframe').contents().find('.topicPage').eq(pageIndex);
	var currPage = $('.topicPage').eq(pageIndex);
	
	//unlock the current topic
	if(! $(currPage).siblings('.topicTitle').hasClass('active') ){
		//$(currPage).siblings('.topicTitle').click();
		//unlock the topic
		$(currPage).siblings('.topicTitle').css({'pointer-events': 'all'});
		$(currPage).siblings('.topicTitle').children('.topicLock').removeClass('topicLock').addClass('topicLockSpacer');	
				
		
	}
	//if(! $(currPage).parents('.panel').eq(0).prev('.accordion').hasClass('active') )
		//$(currPage).parents('.panel').eq(0).prev('.accordion').click();
	
	
	//unlock all the visisted pages (before last visited page)
	var lastVisIndex = parseInt(parent.getLastPid().substr(2));
	//var lastVisited = $('#mainMenuIframe').contents().find('.topicPage').eq(lastVisIndex);
	var lastVisited = $('.topicPage').eq(lastVisIndex);
	console.log('currPage: ' + pageIndex + "|lastVisited: " + lastVisIndex);
	//console.log('prev: ' + $(currPage).prevAll('.topicPage').length );
	//$(currPage).prevAll('.topicPage').removeClass('topicPageLock').removeClass('topicPageActive');
	//var pages = $('.topicPage');
	var i=0;
	//console.log('pageIndex: ' + pageIndex);
	//for(i=0; i< pageIndex; i++){
	for(i=0; i<= lastVisIndex; i++){
		//$('#mainMenuIframe').contents().find('.topicPage').eq(i).removeClass('topicPageLock').removeClass('topicPageActive');
		$('.topicPage').eq(i).removeClass('topicPageLock').removeClass('topicPageActive');
	}
	
	//unlock all topics before last visited page
	//var tIndex = $('#mainMenuIframe').contents().find('.topicTitle').index($(currPage).siblings('.topicTitle').eq(0));
	//var tIndex = $('#mainMenuIframe').contents().find('.topicTitle').index($(lastVisited).siblings('.topicTitle').eq(0));
	var tIndex = $('.topicTitle').index($(lastVisited).siblings('.topicTitle').eq(0));
	console.log('tindex: ' + tIndex);
	for(i=0; i<= tIndex; i++){
		//$('#mainMenuIframe').contents().find('.topicTitle').eq(i).css({'pointer-events': 'all'});
		$('.topicTitle').eq(i).css({'pointer-events': 'all'});
		//$('#mainMenuIframe').contents().find('.topicTitle').eq(i).children('.topicLock').removeClass('topicLock');	
		$('.topicTitle').eq(i).children('.topicLock').removeClass('topicLock').addClass('topicLockSpacer');	
	}
	
	//make current page active
	$(currPage).removeClass('topicPageLock').addClass('topicPageActive');
	
	//update module progress
	//$('#mainMenuIframe').contents().find('.panel').each(function(){
	$('.panel').each(function(){
		
		//complete
		var lockCount = $(this).find('.topicPageLock').length ;		
		if(lockCount===0){			
			//set progress to complete
			$(this).prev('.accordion').children('.progCircle').eq(0).removeClass('inprogress').removeClass('incomplete').addClass('complete');
			//remove the lock directive from next Module (if any)
			
			if($(this).nextAll('.panel')){
				//console.log('panel: ' + $(this).nextAll('.panel').length);
				$(this).nextAll('.panel').eq(0).find('.lockDirective').css({'display' : 'none'});
				$(this).nextAll('.panel').eq(0).find('.lockDirective').next('.hbar').css({'display' : 'none'});
			}
		}
		
		//inprogress
		var unlockCount = $(this).find('.topicPage:not(.topicPageLock)').length;
		if(lockCount>0 && unlockCount>0){			
			$(this).prev('.accordion').children('.progCircle').eq(0).removeClass('incomplete').addClass('inprogress');
		}
			
	});	
	
	
	//open the current page's drop down		
	if(! $(currPage).parents('.panel').eq(0).prev('.accordion').hasClass('active') ){		
		//click
		$(currPage).parents('.panel').eq(0).prev('.accordion').click();
	}
	if(! $(currPage).siblings('.topicTitle').hasClass('active') )
		$(currPage).siblings('.topicTitle').click();	
	//show navigation
	//$('#mainMenuIframe').contents().find('#navigation').eq(0).click();
	$('#navigation').click();
	
	//accessibility: set focus on Navigation
	//$('#mainMenuIframe').contents().find('#navigation').eq(0).focus();
	$('#navigation').focus();
	
}//initNav
														


/*
function tabNavigate(event){
	
	var key = event.which || event.keyCode ;
	console.log(String.fromCharCode(key));
	
}
*/														
/*----------accessibility---------*/


$(document).ready(function(){
	
	//if( == 'visible'){}
	var currTab = 100;
	var lastTab = false;
	$(document).keyup(function(event){
		
		var key = event.which || event.keyCode ;
		//console.log('act-up: ' + document.activeElement.className);	
		
		//it it's shift+tabing from the first focusable element, then set focus to the last focusable element
		if(key==9 && event.shiftKey && document.activeElement.className.indexOf('firstTab')>=0)
			//$('.navigationContainer .accordion').last().focus();
			$('.lastTab').focus();
		
		
		//go from lastTab to firstTab
		if(key==9 && !event.shiftKey && document.activeElement.className.indexOf('lastTab')>=0){			
			$('#navigation').focus();
			console.log('going to first.');			
		}	
		
		if(key==13){ //enter key	
			if(document.activeElement.tagName!='BUTTON')
				document.activeElement.click();
		}
		
		
	});//keyup
	
	//if lastTab was glossary gTitle (entry definition), set focus back to the entry
	$(document).keydown(function(event){
		var key = event.which || event.keyCode ;
		//console.log('act-down: ' + document.activeElement.className);
		if(key==9 && document.activeElement.className.indexOf('gtTab')>=0){
			console.log('in gtTab');
			//remove tabindex
			$(document.activeElement).removeAttr('tabindex');
			if($('.gEntry.linkActive').eq(0).nextAll('[tabindex]').length!=0)
				$('.gEntry.linkActive').eq(0).focus();
			
		}
		
	});
	
});//ready
	
												
														
/* this function adds tab navigation to the 'unlocked' also 'visible' topics and topic pages */

$(document).ready(function(){
	
	//add/remove tabindex to/from topic titles
	$('.accordion').click(function(){
//		$(this).next('.panel').find('.vertical').each(function(){
//			$(this).addClass('stayInvis');
//			$(this).delay(400).queue(function(){
//				$(this).removeClass('stayInvis').dequeue();
//			});
//		});
		
		let currentAccordion = $(this);
		//$(".simplebar-scrollbar", currentAccordion.next()).addClass("invisible");
		//$(".simplebar-scrollbar").addClass("invisible");
		
		//remove tabindex from all topics and pages.
		$('.topicTitle, .topicPage').removeAttr('tabindex');
		
		//console.log('menu aac. clicked');
		if( $(this).hasClass('active') ){	  
			$(this).removeClass('active');
			$(this).next().removeClass('show');
			
		}else{

			$('.accordion').removeClass('active');
			$('.panel').removeClass('show');

			$(this).addClass('active');
			$(this).next().addClass('show');

			//add tabindex to unlocked topics and pages
			$(this).next('.panel').find('.topicTitle').each(function(){
				if($(this).find('.topicLock').length==0)
					$(this).attr('tabindex' , '0');
				//$(this).siblings('.topicPage:not(.topicPageLock)').attr('tabindex' , '0');
			});
			$(this).next('.panel').find('.topicTitle.active').siblings('.topicPage:not(.topicPageLock)').attr('tabindex' , '0');
			

		}//else
		
		setTimeout(function() {
			//$(".simplebar-scrollbar", currentAccordion.next()).removeClass("invisible");
		}, 333);
		
		
		//set scrollbar to top
//		var el = new SimpleBar($(this).next('.panel').find('.topicContainer')[0], { autoHide: false });
//		el.getScrollElement().scrollTop = 0;
		//el.recalculate();

	});//accordion click	
	
	//remove tabbing from scrollbar
	//$('.simplebar-scroll-content').attr('tabindex' , '-1');	
	
});//ready														
	

function enableMenuButtonsOnComplete() {
	$('#forward', parent.document).css({
		'pointer-events': 'all'
	})
	$('#forward', parent.document).animate({
		opacity: 1
	}, 500)
}



												