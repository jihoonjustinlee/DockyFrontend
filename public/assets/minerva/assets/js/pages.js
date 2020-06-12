/*$(document).ready(function() {
	$('.fade-wrapper').fadeIn();
});*/

/* to add a new page (iFrame) to the index file, insert its full name in the 'pages' array below */
var pages =[
	"video_intro.html", 
	"topic_introduction.html",
	"topic_conclusion.html",
	"summary.html",
	
	"text_only.html",
	"accordion.html",
	"table.html",
	
	"accordion_plus.html",
	"accordion_plus2.html",
	"horizontal_image_w_text.html",
	"vertical_image_w_text.html",
	"image_click_display.html",
	"video_standard.html",
	
	"drag_and_drop.html",
	"drag_and_drop2.html",
	"assignment.html",
	"self_check.html"
];

/**
return the current page (iFrame) ID. It has '#pXX' format. for example #p0, #p1, #p23, ....
*/
function getPageID(){
	console.log(window.location.pathname);
	var sPath = window.location.pathname;
	//console.log('pathanme: ' + sPage);
	var sPage = sPath.substring(sPath.lastIndexOf('/') + 1).toLowerCase();
	//alert(sPage + ":" + pages.indexOf[sPage]);
	//alert(sPage);
	//return pages.indexOf["intro video.html"] ;
	
	// console.log(sPage);
	//search the pages array  cause the indexOf is not working
	for(let i=0; i<pages.length; i++) {
		if (pages[i].substring(pages[i].lastIndexOf('/') + 1).toLowerCase() == sPage) {
			// console.log(i)
			// $(`#p${i}`).css({
			// 	'box-shadow' : 'inset 0 0 100px 100px rgba(255, 255, 255, 0.3)'
			// })
			return "#p"+i;
		}
	}
	return null; // page does not exists. 
}



/* this function returns the module and topic of a page. In other words it determins what topic and module a page is in with the help of pages array and modules object (above). */
function getMT(pageIndex){
	var res = [];
	switch (true){
		
		case (pageIndex == 0 && pageIndex < 1):
			res.push('Module 03:  Electrical Hazards and Controls', 'Module Introduction');
			return res;	
			
		case (pageIndex >= 1 && pageIndex < 7):
			res.push('Module 03:  Electrical Hazards and Controls', 'Topic One: Introduction to Electrical Hazards and Controls');
			return res;		
			
		case (pageIndex >= 7):
			res.push('Module 03:  Electrical Hazards and Controls', 'Module Summary');
			return res;	
			
		
	}
}//getTP



