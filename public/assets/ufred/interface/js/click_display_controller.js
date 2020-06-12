	var currButt;	

	function buttonClick(buttNum) {
		if (currButt != buttNum) {
			if (currButt != undefined) { 
				var oldButt = "butt" + currButt;
				document.getElementById(oldButt).style.backgroundColor="#000000";
			}
			currButt = buttNum;
			var blocker = document.getElementsByClassName("mouseBlocker");
			blocker[0].style.display="block";
			hideEmAll();
			var currText = document.getElementById(buttNum);
			var clickedButt = "butt" + buttNum;
			var currButtPick = document.getElementById(clickedButt);
			currButtPick.style.backgroundColor="#cf2525";
			var currOpac = parseInt(currText.style.opacity);
			currText.style.display="block";
			var newInterval = setInterval(function () {
				if (currOpac < 1) {
					currOpac += .1;
					currText.style.opacity = currOpac;
				} else {
					blocker[0].style.display ="none";
					clearInterval(newInterval);
				}
			}, 50);
		} 
	}


	function hideEmAll() {
		
		for (i = 0; i < numItems; i++) { 
			var numString = i.toString();
			var thisText = document.getElementById(numString);
			thisText.style.display="none";
			thisText.style.opacity="0";
		}
	}	

	hideEmAll();