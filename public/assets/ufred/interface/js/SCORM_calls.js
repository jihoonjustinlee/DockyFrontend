var scorm = pipwerks.SCORM;

		function init(){
			//Specify SCORM 1.2:
			scorm.version = "1.2";
			show("Initializing course.");
			var callSucceeded = scorm.init();
			show("Call succeeded? " +callSucceeded);
			console.log("Call succeeded? " +callSucceeded);
			
			//Check for a bookmark
        	//scorm.set("cmi.core.lesson_location", "1");
			
		}
		init();
		
		function send(){
			var field = document.getElementById("userText"),
				value = "Placeholder text";
			if(field.value !== null && field.value !== ""){
				value = field.value;
			}
			set('cmi.suspend_data', value);
		}

		function set(param, value){
			show("Sending: '" +value +"'");
			var callSucceeded = scorm.set(param, value);
			show("Call succeeded? " +callSucceeded);
			return callSucceeded;
		}

		function get(param){
			var value = scorm.get(param);
			show("Received: '" +value +"'");
			return value;
		}

		function complete(){
			show("Setting course status to 'completed'.");
			var callSucceeded = scorm.set("cmi.core.lesson_status", "completed");
			show("Call succeeded? " +callSucceeded);
		}

		function end(){
			show("Terminating connection.");
			
			var saved = scorm.save();//pipwerks function for LMSCommit()
			
			show("Save succeeded? " + saved);
			
			var callSucceeded = scorm.quit();
			
  			//scorm.quit();//pipwerks function for LMSFinish()

			show("quit succeeded? " +callSucceeded);
		}

		function show(msg){
			var debugText = document.getElementById("debugText");
			if(debugText){
				debugText.innerHTML += msg +"<br/>";
			}
			//Can also show data using pipwerks.UTILS.trace
			pipwerks.UTILS.trace(msg);
		}
		
		function getStudentName(){
			//console.log("Welcome " + scorm.get("cmi.learner_name")); 
			//var stName = get("cmi.core.student_name");
			var stName = scorm.get("cmi.core.student_name").split(',');
			//return first name
			return stName[1];
		}
		window.onload = function (){
			//init();
			//console.log("lesson_location: " + scorm.get("cmi.core.lesson_location"));
			
			//show student's name			
			console.log("Welcome " + getStudentName()); 
		}

		window.onunload = function (){
			
			//complete();
			end();
			//console.log("unload complete");
		}