// Determines the filename for image path
let url = window.location.pathname;
let filename = url.substring(url.lastIndexOf('/')+1);
filename = filename.substring(0, filename.lastIndexOf('.'));

if (numAudios > 0) {
	audioFilename = filename + '_a';

	for (let i = 0; i < numAudios; i++) {

		let resourceId = i + 1;

		$("body").prepend('<audio class="narration" src="assets/audio/' + audioFilename + resourceId + '.mp3" autostart="" onended=""></audio>');
	}
}