let url = window.location.pathname;
let filename = url.substring(url.lastIndexOf("/")+1);
filename = filename.substring(0, filename.lastIndexOf("."));
videoFilename = filename + "_v1";
$("video").append(`<source src="assets/video/${videoFilename}.mp4" type="video/mp4">`);
console.log(videoFilename)
function fadeInVideoFrame() {
	$(".intro").fadeIn(1000);
}
setTimeout(() => {
	fadeInVideoFrame()
}, 500);