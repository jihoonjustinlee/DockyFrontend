

$(document).ready(function(){
	
	$(document).keyup(function(event){
	//$(document).on('keypress', function(event){
		var key = event.which || event.keyCode ;
		
		//console.log('up-act: ' + document.activeElement.className);
		
		//lastTab
		if(key==9 && !event.shiftKey && document.activeElement.className.indexOf('lastTab')>=0){
			$('#logo').focus();
			//console.log('going to logo.');
		}
		
		//firstTab (shift+tab)
		if(key==9 && event.shiftKey && document.activeElement.className.indexOf('firstTab')>=0){
			//console.log('in firstTab. going to lastTab');
			$('#forward').focus();
		}
		
		if(key==13){ //enter key	
	
			if(document.activeElement.tagName!='BUTTON')
				document.activeElement.click();

			if (document.activeElement.id === 'main'){
				console.log("main menu openend")
				$('#mainMenuIframe').focus()
				$('#mainMenuIframe').contents().find('#resources').focus()
			}

		}
		
	});
	
	$(document).keydown(function(event){
		var key = event.which || event.keyCode ;

		if(key==9 && !event.shiftKey && document.activeElement.id.indexOf('logo')>=0){
			$('#iframe-container iframe').focus()
			$('#iframe-container iframe').contents().find('html').focus()
		}
		if(key==9 && event.shiftKey){
			//console.log('act: ' + document.activeElement.tagName);
			
		}
		
	});	
	
	
	//check if CC is open
	$("#audioBtn").focus(function(){
		if($('#ccButton').hasClass('openCCBtn')){
			$('#ccButton').click();
			//$(this).focus();
		}
			
	});
	
	$("#ccButton").keydown(function(event){
	//$(document).on('keypress', function(event){
		var key = event.which || event.keyCode ;	
		//console.log('cc-down-act: ' + document.activeElement.id);
		if(key==9 && event.shiftKey){
			if($(this).hasClass('openCCBtn'))
				$(this).click();
		}
		
	});
	
	/* hide tooltip after 1 second */
	$('.tooltip, .ccTooltip, .sliderContainer').hover(function(){
		//$(this).find('.tooltiptext').removeClass('hide');
		$(this).find('.tooltiptext').addClass('showTT');
		$(this).delay(1000).queue(function(next){ $(this).find('.tooltiptext').removeClass('showTT'); next(); });
		//$(this).find('.tooltiptext').delay(1000).addClass('hide');
		//$(this).find('.tooltiptext').delay(1000).queue(function (next) { $(this).css('visibility', 'hidden'); next(); });
	}, function(){
		$(this).find('.tooltiptext').removeClass('showTT');
	});
	
	$('.tooltip, .ccTooltip, .slider').focus(function(){
		$(this).find('.tooltiptext').addClass('showTT');
		$(this).next('.tooltiptext').addClass('showTT');//volume slider
		$(this).delay(1000).queue(function(next){ $(this).find('.tooltiptext').removeClass('showTT'); next(); $(this).next('.tooltiptext').removeClass('showTT'); next(); /* volume slider */ });		
	});
	$('.tooltip, .ccTooltip, .slider').blur(function(){
		//$(this).find('.tooltiptext').removeClass('hide');		
		$(this).find('.tooltiptext').removeClass('showTT');
		$(this).next('.tooltiptext').removeClass('showTT');
	});
	
});//ready
		



