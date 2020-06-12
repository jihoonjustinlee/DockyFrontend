export default function createTimelineDisplayPage(json){
  let limits = [
    "Option One:",
    "Option Two:",
    "Option Three:",
    "Option Four:",
    "Option Five:",
    "Option Six:",
    "Option Seven:",
    "Option Eight:",
    "Option Nine:",
    "Option Ten:",
    "Option Eleven:",
    "Option Twelve:",
    "Option Thirteen:",
  ]
  let numItems = ''
  let headerArray = []
  let contentArray = []
  let numAudios = 1
  let initialContent = ''
  let interactiveContent = ''
  let interactiveStart
  let option

  //initial content
  if (json.screenContent.indexOf("<p><b>Option ") > -1){
    interactiveStart = json.screenContent.indexOf("<p><b>Option")
    option = "<p><b>Option"
  } else if (json.screenContent.indexOf("<p>Option ") > -1){
    interactiveStart = json.screenContent.indexOf("<p>Option")
    option = "<p>Option"
  }
  
  initialContent = json.screenContent.substring(0, interactiveStart)
  interactiveContent = json.screenContent.substring(interactiveStart, json.screenContent.length)
  

  let startIndex = 0
  let index
  while ((index = interactiveContent.indexOf(option, startIndex)) > -1){
    numItems++
    startIndex = index + option.length
    let finish = interactiveContent.substring(index, interactiveContent.length).indexOf("</p>") + 4
    let found = interactiveContent.substring(index, interactiveContent.length).substring(0, finish)
    let data = interactiveContent.substring(interactiveContent.indexOf(found) + found.length, interactiveContent.length)

    if (data.indexOf(option) > -1){
      contentArray.push('"'+data.substring(0, data.indexOf(option))+'"')
    } else{
      //at the end of the content
      contentArray.push('"'+data.substring(0, data.length)+'"')
    }
 
    for (let i=0; i<limits.length; i++){
      found = found.replace(limits[i], "")
      found = found.replace("<p>", "")
      found = found.replace("</p>", "")
      found = found.replace("<b>", "")
      found = found.replace("</b>", "")
      found = found.trim()
    }
    headerArray.push('"'+found+'"')
  }

  const content = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>${json.screenTitle}</title>
    <script src="interface/js/jquery-3.3.1.min.js"></script>
    <link rel="stylesheet" href="interface/css/style-variables.css">
    <link rel="stylesheet" type="text/css" href="interface/css/style-interactive.css">
    <link rel="stylesheet" type="text/css" href="interface/css/style.css">
    <link rel="stylesheet" href="interface/css/timeline_click_display.css">
    <script src="interface/js/timeline_click_display.js"></script>
    <script>
      let numItems = ${numItems}
      
      let headerArray = [${headerArray}]
      
      let contentArray = [${contentArray}]

      let numAudios = ${numAudios}
    </script>
  </head>
  <body>
    <div class="textarea halfHeight">
      <h1>${json.screenTitle}</h1>
      ${initialContent}
      <p class="directive" >Click the items below to learn more. Then, click the ‘Next’ arrow to continue.</p>
    </div>
    <div class="vertical-container">
      <div class="container"></div>
      <div class="container greyGrad">
        <div class="textContainer"></div>
        <div class="imageContainer"></div>
      </div>
    </div>
    <script src="assets/js/pages.js"></script>
    <script src="interface/js/media_control.js"></script>
    <script src="interface/js/audio_markup_generator.js"></script>
  </body>
</html>`

  const file = new File([content], json.screenNumber, { type: 'text/html'})
  return file
}