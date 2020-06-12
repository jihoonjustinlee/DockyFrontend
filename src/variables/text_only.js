export default function createTextOnlyPage(json){
  const content = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>${json.screenTitle}</title>
    <link rel="stylesheet" href="interface/css/style-variables.css">
    <link rel="stylesheet" type="text/css" href="interface/css/style.css">
    <link rel="stylesheet" href="interface/css/text_only.css">
    <script src="interface/js/jquery.js"></script>
    <script src="interface/js/text_only.js"></script>
  </head>
  <body>
    <div class="textarea fullWidth">
      <h1>${json.screenTitle}</h1>
      ${json.screenContent}
      <p class="directive">Click the ‘Next’ arrow to continue.</p>
    </div>
    <script src="assets/js/pages.js"></script>
    <script src="interface/js/media_control.js"></script>
    <script src="interface/js/audio_markup_generator.js"></script>
  </body>
</html>`
  
  const file = new File([content], json.screenNumber, {type: 'text/html'})
  return file
}