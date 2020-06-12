export default function createReadingAssignmentPage(json){
  const content = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <title>${json.screenTitle}</title>
    <link rel="stylesheet" href="interface/css/style-variables.css">
    <link rel="stylesheet" href="interface/css/style-interactive.css">
    <link rel="stylesheet" href="interface/css/style.css">
    <script src="interface/js/jquery.js"></script>
    <script src="interface/js/button_url.js"></script>
    <script src="assets/js/pages.js"></script>
    <script src="interface/js/media_control.js"></script>
    <script src="interface/js/audio_markup_generator.js"></script>
  </head>
  <body style="overflow: hidden">
    <div class="textarea halfWidth">
      <h1>${json.screenTitle}</h1>
      ${json.screenContent}
      <p class="directive">Click the link, or download and read the document. Then, click the ‘Next’ arrow to continue.</p>
    </div>
    <div class="halfVertical" style="background-image:url('interface/images/reading.jpg')"></div>
  </body>
</html>`
  const file = new File([content], json.screenNumber, {type: 'text/html'})
  return file
}