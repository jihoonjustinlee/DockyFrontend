const startTime = new Date();
//		const startTimeUTC = convertDateToUTC(startTime);
//		setTimeout(function(){
//			updateSessionTime(startTime);
//		}, 3000);
		
function updateSessionTime(startTime) {
	const start = startTime.getTime();

	// now get the current date and time on the computer clock
	const currentTime = new Date();
//			const currentTimeUTC = convertDateToUTC(currentTime);

	const current = currentTime.getTime();


	const timeDiffSec = Math.abs(current - start) / 1000; 

	const timeDiffFormated = format(timeDiffSec);

	//console.log(start);
	//console.log(current);
	//console.log(timeDiffFormated);
	set("cmi.core.session_time",timeDiffFormated);

	end();
}

function format(seconds) {
	var numhours = parseInt(Math.floor(((seconds % 31536000) % 86400) / 3600),10);
	var numminutes = parseInt(Math.floor((((seconds % 31536000) % 86400) % 3600) / 60),10);
	var numseconds = parseInt((((seconds % 31536000) % 86400) % 3600) % 60,10);
		return ((numhours<10) ? "0" + numhours : numhours)
		+ ":" + ((numminutes<10) ? "0" + numminutes : numminutes)
		+ ":" + ((numseconds<10) ? "0" + numseconds : numseconds);
}
		
//		function convertDateToUTC(date) { 
//			return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()); 
//		}
