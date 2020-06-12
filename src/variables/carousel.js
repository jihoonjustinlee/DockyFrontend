export default function createCarouselPage(json){
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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.3/TweenMax.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.4/plugins/ColorPropsPlugin.min.js"></script>
    <script src="interface/js/jquery.js"></script>
    <script src="assets/js/pages.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="interface/css/style-variables.css">
    <link rel="stylesheet" href="interface/css/style-interactive.css">
    <link rel="stylesheet" href="interface/css/style.css">
    <link rel="stylesheet" href="interface/css/carousel.css">
    <script src="interface/js/siema.min.js" type="text/javascript"></script>
    <script src="interface/js/carousel.js"></script>
    <script>
      // Sets number of options to click and display 
      let numItems = ${numItems} 
  
      // bottom, left, right determines the position of the textbox. Blank or any other unidentified string will default the position to bottom.
      let headerArray = [${headerArray}]
  
      // The content to display when the click and display button is clicked. If numItems is less than 6, DON'T have to remove the extra options (but you can if you want to make the page cleaner)
      let contentArray = [${contentArray}]

      let numAudios = ${numAudios}
    </script>
  </head>
  <body class="fade-wrapper">
    <div class="textarea storyteller">
      <h1>${json.screenTitle}</h1>
      ${initialContent}
      <p class="directive">Click on the right-facing arrow to proceed through the story. Then, click the ‘Next’ arrow to continue.</p>
    </div>	
    <div class="storytellerContainer">
      <div class="siema"></div>
      <span class="prev fa fa-angle-left"></span>
      <span class="next fa fa-angle-right"></span>
    </div>	
    <script src="assets/js/pages.js"></script>
    <script src="interface/js/media_control.js"></script>
    <script src="interface/js/audio_markup_generator.js"></script>
    <script>
      $(document).ready(function(){
        const storyImages = document.getElementsByClassName('storytellerImage')
        for(let i=0; i<storyImages.length; i++){
          $(storyImages[i]).attr({
            "id": "image"+i
          })
        }
      })
    </script>
  </body>
</html>
  `
  
  const file = new File([content], json.screenNumber, { type: 'text/html'} )
  return file
}