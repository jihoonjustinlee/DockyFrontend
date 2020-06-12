export default function createSummaryPage(json){
  const content = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <title>${json.screenTitle}</title>
    <link rel="stylesheet" href="interface/css/style-variables.css">
    <script src="interface/js/jquery.js"></script>
    <script src="assets/js/pages.js"></script>
    <link rel="stylesheet" type="text/css" href="interface/css/style-interactive.css">
    <link rel="stylesheet" type="text/css" href="interface/css/style.css">
    <link rel="stylesheet" href="interface/css/summary.css">
    <script type="text/javascript" src="interface/js/SCORM_API_wrapper.js"></script>
    <script src="interface/js/summary.js"></script>
  </head>
  <body class="redBG">
    <div class="textarea halfWidth white secondaryBullet">
      <h1 class="white">${json.screenTitle}</h1>
      ${json.screenContent}
      <p class="directive highlight" >Click the ‘Complete’ button to finish this module and return to the Main Course page. When you are ready, you can begin the quiz for this module. Please note that in order to proceed to the next module, you must successfully complete the quiz.</p>
      <div class="cndButton basic" onClick="parent.window.parent.close(); parent.complete();">Complete</div>
      <div class="empty"></div>
    </div>
    <div class="halfVertical"></div>
    <script src="interface/js/media_control.js"></script>
  </body>
</html>`
  const file = new File([content], json.screenNumber, { type: 'text/html'})
  return file
}