window.onload = function() {

    //function getEventTarget(e) {
    //    e = e || window.event;
   //     return e.target || e.srcElement;
   // }

	// add links here to the resources array. leave array[0] empty 
    var resourcesArray = ["", "assets/resources/1.pdf", "assets/resources/2.pdf", "assets/resources/3.pdf", "assets/resources/4.pdf", "assets/resources/5.pdf"
						 ];

    $(".links").click(function() {
        let currentPage = document.getElementById(parent.getPid())
        $(currentPage).css({
            'box-shadow': 'none'
        })

        var targetID = $(this).attr('id');

        $(this).css({
            'box-shadow': 'inset 0 0 100px 100px rgba(255, 255, 255, 0.3)'
        })
        
		window.sessionStorage.pid = targetID; /* set the page with targetID id as the active page*/
        parent.goToPage(targetID);
    });

    $(".menuClose").click(function() {
        console.log("Closing all menus");
        parent.closeAllMenus();
        parent.$('#main').blur()
    });

    $(".resourceLinks").click(function() {
        var curLink = $(this).attr('id');
        window.open(resourcesArray[parseInt(curLink)], '_blank');
    });

    $('.menuAccordion').click(function() {
		accordionClicked($(this));
        var scrollToHere = checkTopicNum($(this));
        $('.menunav').animate({
            scrollTop: scrollToHere
        });

    });
};

function checkTopicNum(chosenTopic) {
    var topicNum = chosenTopic.text().substr(chosenTopic.text().length - 1);
    var topOffset = parseInt(topicNum - 1) * 48;
    return topOffset;
}