window.onload = function() {
    //function getEventTarget(e) {
    //    e = e || window.event;
   //     return e.target || e.srcElement;
   // }

	// add links here to the resources array. leave array[0] empty 
    var resourcesArray = ["", "https://www.ufred.ca/", "https://www.ufred.ca/", "https://www.ufred.ca/", "resources/test.pdf", "resources/test.pdf"];

    // $(".links").click(function() {
    //     var targetID = $(this).attr('id');
	// 	window.sessionStorage.pid = targetID; /* set the page with targetID id as the active page*/
    //     parent.goToPage(targetID);
    // });

    $(".menuClose").click(function() {
        console.log("Closing all menus");
        parent.closeAllMenus();
    });

    /*$(".resourceLinks").click(function() {
        var curLink = $(this).attr('id');
        window.open(resourcesArray[parseInt(curLink)], '_blank');
    });*/

    $('.menuAccordion').click(function() {
        var scrollToHere = checkTopicNum($(this));
        $('.menunav').animate({
            scrollTop: scrollToHere
        });

    });
};

function checkTopicNum(chosenTopic) {
    var topicNum = chosenTopic.text().substr(chosenTopic.text().length - 1);
	
	console.log(topicNum);
    var topOffset = parseInt(topicNum - 1) * 48;
    return topOffset;
}
