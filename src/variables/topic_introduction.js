export function createTopicIntroductionPage(json){
  const js = json.screenContent
  const splashTop = js.substring(js.indexOf("<p>")+3, js.indexOf(":")).trim()
  const splashMiddle = js.substring(js.indexOf(":")+1, js.indexOf("</p>")).trim()

  const content = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Topic Introduction</title>
    <link rel="stylesheet" href="interface/css/style-variables.css">
    <link rel="stylesheet" type="text/css" href="interface/css/style.css">
    <link rel="stylesheet" href="interface/css/topic_introduction.css">
    <script src="interface/js/jquery.js"></script>
    <script src="assets/js/pages.js"></script>
  </head>
  <body class="splashContainer">
    <div class="splashImage"></div>
    <div id="splashTitleContainer">
      <div id="splashShield"><img src="interface/images/shield.svg" alt="" style="width: 100%; height: 100%;"/></div>
      <div id="splashText">	
        <h2 id="splashTop">${splashTop}</h2>
        <h1 id="splashMiddle">${splashMiddle}</h1>
        <h2 id="splashDirective">Click the ‘Next’ arrow to continue.</h2> 
      </div>
    </div>
    <script src="interface/js/topic_introduction.js"></script>	
    <script src="interface/js/media_control.js"></script>
  </body>
</html>`
  const file = new File([content], json.screenNumber, { type: 'text/html'})
  return file
}

export function getTopicTitle(json){
  const r = /\d+/g
  //ERROR HANDLE IF NOT NUMBER
  console.log(json.screenContent.match(r))
  if(json.screenContent.match(r) == null)
  {
    console.log("Check the screen content for the topic number in the SB.")
  }
  const start = json.screenContent.indexOf(json.screenContent.match(r)[0]) + 1
  const end = json.screenContent.indexOf('</p>')
  let title = json.screenContent.substring(start, end).trim()
  if (title.indexOf(":") === 0){
    title = title.substring(1).trim()
  }
  console.log("Stuck?")
  return title
}