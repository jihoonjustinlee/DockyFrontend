// Determines the filename for image path
let url = window.location.pathname;
let filename = url.substring(url.lastIndexOf('/')+1);
filename = filename.substring(0, filename.lastIndexOf('.'));
imgFilename = filename + '_i1';
$(".splashImage").css("background-image","url(assets/images/" + imgFilename + ".jpg)");

audioFilename = filename + '_a1';
$("body").prepend('<audio class="narration" src="assets/audio/' + audioFilename + '.mp3" autostart="" onended=""></audio>');