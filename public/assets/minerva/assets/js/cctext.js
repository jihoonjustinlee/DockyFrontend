function updateCCText(currPage){
	console.log("Updating CCText");
	var $ccText = $('#ccText'); 
	$ccText.scrollTop(0);
	switch (parseInt(currPage.substring(1))) {
		case 0:
			$ccText.html("<p>Welcome to Module 6: Reviewing & Updating Organizational Policies & Procedures.</p><p>In this module, we discuss:</p><p>The purpose and function of organizational policies & procedures.<br>Workplace policies that are relevant to psychological health and safety.<br>Key steps in policy development.</p>");
			break;
		case 17:
			$ccText.html("<p>In this course we discussed how to evaluate the impacts of psychological health and safety procedures, including taking preventive and corrective action and continual improvement.</p><p>Having completed this course, you should now have an understanding of: </p><p>The components of an effective and appropriate evaluation; and performance measurement.<br>How to conduct a scheduled management review.<br>Preventive and corrective actions.<br>Continual improvement; and the review and updating of organizational policies and procedures.</p>");
			break;		
		default:
			$ccText.html("<p>This page does not have any audio content</p>");
	}
}//updateCCText


