import { getModuleTitle } from './video_intro'
import { getTopicTitle } from './topic_introduction'

export default function createMainMenuPage(json){
  const r = /\d+/g
  let topicIndex
  let topics = []
  let inner = []
  let outer = []
  let topicSlices = []

  for (let i=0; i<json.length; i++){
    if (topicIndex !== json[i].screenNumber.match(r)[1]){
      topicSlices.push(i)
      topicIndex = json[i].screenNumber.match(r)[1]
      if (topicIndex === 0 || json[i].screenType === "video_intro"){
        topics.push("Module Introduction")
      } else if (json[i].screenType === "topic_introduction"){
        topics.push(`Topic ${topicIndex}: ${getTopicTitle(json[i])}`)
      } else if (json[i].screenType === "summary" || json[i].screenTitle.toLowerCase().indexOf("summary") > -1){
        topics.push("Summary")
      }
    }
  }
  for (let i=0; i<topicSlices.length; i++){
    inner = []
    for (let j=topicSlices[i]; j<topicSlices[i+1]; j++){
      if (j !== undefined){
        if (j === 0 && json[j].screenType === "video_intro"){
          inner.push(getModuleTitle())
        } else if (json[j].screenType === "topic_introduction"){
          inner.push("Introduction")
        } else if (json[j].screenType === "topic_conclusion"){
          inner.push("Conclusion")
        } else{
          inner.push(json[j].screenTitle)
        }
      }
    }
    outer.push(inner)
  }
  console.log(outer)
  outer[outer.length-1].push("Summary")
  
  let innerStr = ''
  let index = 0
  for (let i=0; i<topics.length; i++){
    if (i === 0){
      innerStr = innerStr.concat(`<button class="accordion menuAccordion">${topics[i]}</button>
      <div class="panel">
        <table>`)
    } else{
      innerStr = innerStr.concat(`
      <button class="accordion menuAccordion">${topics[i]}</button>
      <div class="panel">
        <table>`)
    }
    for (let j=0; j<outer[i].length; j++){
      innerStr = innerStr.concat(`
          <tr class="links" id="#p${index}">
            <td class="tdL"><img alt="" class="menuicons" src="interface/images/mainmenu_icon.svg"></td>
            <td class="tdR">${outer[i][j]}</td>
          </tr>`)
      index++
    }
    innerStr = innerStr.concat(`
        </table>
      </div>`)
  }
  const content = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Main Menu</title>
    <link rel="stylesheet" href="interface/css/style-variables.css">
    <link rel="stylesheet" type="text/css" href="interface/css/style-menu.css">
    <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
    <script src="assets/js/menus.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="interface/js/page-indicator.js"></script>
  </head>
  <body class="helpwindow" style="height:100%">
    <div class="fullMenuContainer">
      <div class="blackcolumn"></div>
      <h1>Main Menu<img alt="" class="menuClose" src="interface/images/menu_close.svg"></h1>
      <div>
        <p>Welcome to the main menu screen. From here you can navigate to all the pages in this module using the page links below.<br><br>
        <b>Click a link to go to the corresponding page in this module.</b></p>
      </div>
    </div>
    <div class="menunav">
      ${innerStr}
    </div>
    <script src="interface/js/accordion.js"></script>
  </body>
</html>`

  const file = new File([content], 'main_menu.html', {type: 'text/html'})
  return file
}