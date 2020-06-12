export default function createAccordionPlusPage(json){
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
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>${json.screenTitle}</title>
    <link rel="stylesheet" href="interface/css/style-variables.css">
    <link rel="stylesheet" href="interface/css/style.css">
    <link rel="stylesheet" href="interface/css/accordion_plus.css">
    <script src="interface/js/jquery.js"></script>
    <script>
      // Sets number of options to click and display 
      let numItems = ${numItems}
      
      // Set media type, "image" or "video".
      let type = "image"

      // The label on the click and display buttons. If numItems is less than 6, DON'T have to remove the extra options (but you can if you want to make the page cleaner).
      let headerArray = [${headerArray}]

      // The content to display when the click and display button is clicked. If numItems is less than 6, DON'T have to remove the extra options (but you can if you want to make the page cleaner)
      let contentArray = [${contentArray}]
      
      // Determine how many audios are needed
      let numAudios = ${numAudios};
    </script>
  </head>
  <body>    
    <div class="organization">
      <h1>${json.screenTitle}</h1>
      ${initialContent}
      <p class="directive">Click the items below to learn more. Then, click the ‘Next’ arrow to continue.</p>
    </div>
    <div class="flexBox accordion accordionPlus">
      <div class="psurvey halfWidth">	
      </div>
    </div>
    <script src="assets/js/pages.js"></script>
    <script src="https://vjs.zencdn.net/7.4.1/video.js"></script>
    <script src="interface/js/media_control.js"></script>
    <script src="interface/js/audio_markup_generator.js"></script>
    <script src="interface/js/accordion_plus.js"></script>
  </body>
</html>`
  const file = new File([content], json.screenNumber, {type: 'text/html'})
  return file
}