// Determines the filename for image path
let url = window.location.pathname;
let filename = url.substring(url.lastIndexOf('/')+1);
filename = filename.substring(0, filename.lastIndexOf('.'));

audioFilename = filename + '_a';
videoFilename = filename + '_v';
imageFilename = filename + '_i';

if (numAudios > 0) {
	
	for (let i = 0; i < numAudios; i++) {
		let resourceId = i + 1;
		console.log(`${audioFilename}${resourceId}.mp3`)

		if (i === 0 && numAudios === 1){
			$("body").prepend('<audio class="narration" src="assets/audio/' + audioFilename + resourceId + '.mp3"></audio>');
		} else if (i === 0) {
			$("body").prepend('<audio class="narration" src="assets/audio/' + audioFilename + resourceId + '.mp3" autostart="" onended="playAudio(' + (i+1) + ')"></audio>');
		} else if (i === numAudios - 1) {
			$(`.narration:eq(${i-1})`).after('<audio class="narration" src="assets/audio/' + audioFilename + resourceId + '.mp3" autostart="" onended="checkIfAllAudioStoppedPlaying()"></audio>');
		} else{
			$(`.narration:eq(${i-1})`).after('<audio class="narration" src="assets/audio/' + audioFilename + resourceId + '.mp3" autostart="" onended="playAudio(' + (i+1) + ')"></audio>');
		}
	}
}
