export default function createDiscussionPage(json){
  const content = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <title>${json.screenTitle}</title>
    <link rel="stylesheet" href="interface/css/assignment.css">
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
      <iframe class="assignment" src='placeholder'></iframe>
      <div class="content">
        <div class="flexBox column">
          <div class="textarea fullWidth">
          <h1>${json.screenTitle}</h1>
          ${json.screenContent}
          <p class="directive">Click the ‘Go to Activity’ button to access the forum and join the discussion. Then, click the ‘Next’ arrow to continue.</p>
          <button style="margin-bottom:1.25em;" class="cndButton basic" onClick="completeActivity()">Go to Activity</button>
        </div>
        <div class="halfHorizontal" style="background-image:url('interface/images/discussion_forum.jpg')"></div>
      </div>
    </div>
  </body>
</html>`
  const file = new File([content], json.screenNumber, { type: 'text/html'})
  return file
}