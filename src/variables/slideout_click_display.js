export default function createSlideoutClickDIsplayPage(json){

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
    <link rel="stylesheet" href="interface/css/slideout_click_display.css">
    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    <script src="interface/js/slideout_click_display.js"></script>
    <script>
      // Sets number of options to click and display 
      let numItems = ${numItems}; 
  
      // The label on the click and display buttons. If numItems is less than 6, DON'T have to remove the extra options (but you can if you want to make the page cleaner).
      let headerArray = [${headerArray}]
  
      // The content to display when the click and display button is clicked. If numItems is less than 6, DON'T have to remove the extra options (but you can if you want to make the page cleaner)
      let contentArray = [${contentArray}]

      // Determine how many NON-INTERACTIVE (auto played) audios are needed, set to negative number to indicate animation timing/custom implementation is required.
      let numAudios = ${numAudios}
    </script>
  </head>
  <body>
    <div class="textarea halfHeight">
      <h1>${json.screenTitle}</h1>
      ${initialContent}
      <p class="directive" >Click the items below to learn more. Then, click the ‘Next’ arrow to continue.</p>
    </div>
    <div class="vertical-container"></div>
    <script src="interface/js/media_control.js"></script>
  </body>
</html>`
  // const element = document.createElement('a')
  // element.setAttribute('href', 'data:text/plain;charset=utf-8,'+encodeURIComponent(content))
  // element.setAttribute('download', `${json.screenNumber}`)
  // element.setAttribute('style', 'margin-left: 1em;')
  // element.innerText = `Download ${json.screenNumber} (slideout click display)`
  // document.getElementsByClassName('downloadable-zip')[0].appendChild(element)
  
  const file = new File([content], json.screenNumber, { type: 'text/html'})
  return file
}