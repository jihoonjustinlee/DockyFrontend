
export default function createDragAndDrop2Page(json){

  let numAudios = 0
  let numItems
  let draggables = []
  let droppables = []
  let answerArray = []
  let interactiveStart
  let initialContent
  let interactiveContent

  //anything before interactive elements
  interactiveStart = json.screenContent.indexOf('<p><b>Answer Key')
  initialContent = json.screenContent.substring(0, interactiveStart).replace('<p></p>', '')
  interactiveContent = json.screenContent.substring(interactiveStart, json.screenContent.length)

  //store 3 components to temp
  let answerTemp = interactiveContent.substring(interactiveContent.indexOf('<p><b>Answer'), interactiveContent.indexOf('<p><b>Draggable'))

  let dragTemp = interactiveContent.substring(interactiveContent.indexOf('<p><b>Draggable'), interactiveContent.indexOf('<p><b>Target'))

  let dropTemp = interactiveContent.substring(interactiveContent.indexOf('<p><b>Target'), interactiveContent.length)

  let startIndex = 0
  let index
  let indices = []

  //draggables
  while ((index = dragTemp.indexOf('<b>Draggable', startIndex)) > -1){
    startIndex = index + 12
    indices.push(startIndex)
  }
  for (let i=0; i<indices.length; i++){
    let draggable
    if (indices[i+1] === undefined){
      draggable = dragTemp.substring(indices[i], dragTemp.length)
    } else{
      draggable = dragTemp.substring(indices[i], indices[i+1])
    }
    draggable = draggable.substring(draggable.indexOf(':')+1, draggable.length)
    draggable = draggable.replace('<b>Draggable', '')
    draggable = draggable.replace(/<\/b>/g,'')
    draggable = draggable.replace(/<\/p>/g,'')
    draggable = draggable.replace(/<p>/g, '')
    draggable = draggable.replace(/<b>/g, '')
    draggable = draggable.trim()
    draggables.push(draggable)
  }

  //droppables
  indices = []
  startIndex = 0
  
  while ((index = dropTemp.indexOf('<b>Target', startIndex)) > -1){
    startIndex = index + 9
    indices.push(startIndex)
  }
  for (let i=0; i<indices.length; i++){
    let droppable
    if (indices[i+1] === undefined){
      droppable = dropTemp.substring(indices[i], dropTemp.length)
    } else{
      droppable = dropTemp.substring(indices[i], indices[i+1])
    }
    droppable = droppable.substring(droppable.indexOf(':')+1, droppable.length)
    droppable = droppable.replace('<b>Target', '')
    droppable = droppable.replace(/<\/b>/g,'')
    droppable = droppable.replace(/<\/p>/g,'')
    droppable = droppable.replace(/<p>/g, '')
    droppable = droppable.replace(/<b>/g, '')
    droppable = droppable.trim()
    droppables.push(droppable)
  }
  
  //compare droppable and draggable length. numItems should reflect the one that is bigger
  if (droppables.length === draggables.length){
    numItems = droppables.length
  } else if (droppables.length > draggables.length){
    console.log('from droppable')
    numItems = droppables.length
  } else if (droppables.length < draggables.length){
    console.log('from draggable')
    numItems = draggables.length
  }
  
  //init empty answerArray
  for (let i=0; i<numItems; i++){
    answerArray[i] = []
  }

  //answerArray
  answerTemp = answerTemp.substring(answerTemp.indexOf(':') + 1, answerTemp.length)
  answerTemp = answerTemp.replace(/<\/b>/g,'')
  answerTemp = answerTemp.replace(/<\/p>/g,'')
  answerTemp = answerTemp.replace(/<p>/g, '')
  answerTemp = answerTemp.replace(/<b>/g, '')
  answerTemp = answerTemp.replace(/\s/g, '')
  answerTemp = answerTemp.replace(/=/g,'')
  let answerTemp2 = answerTemp.split(';')
  
  for (let i=0; i<answerTemp2.length; i++){
    if (answerTemp2[i][0] !== undefined && answerTemp2[i][1] !== undefined){
      let droppableToNum = (answerTemp2[i][1].toLowerCase().charCodeAt(0)-97).toString()
      answerArray[answerTemp2[i][0]-1].push(droppableToNum)
    }
  }
  const content = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${json.screenTitle}</title>
    <script src="interface/js/jquery-3.3.1.min.js"></script>
    <script src="interface/js/jquery-ui.min.js"></script>
    <script src="interface/js/jquery.ui.touch-punch.min.js"></script>
    <script src="interface/js/drag_and_drop2.js" defer></script>
    <link rel="stylesheet" href="interface/css/style-variables.css">
    <link rel="stylesheet" href="interface/css/style.css">
    <link rel="stylesheet" href="interface/css/drag_and_drop2.css">
    <link rel="stylesheet" href="interface/css/ufred-modal.css">
    <script>
      let numAudios = ${numAudios}
      
      let numItems = ${numItems}
      
      let draggables = ${JSON.stringify(draggables)}
      
      let droppables = ${JSON.stringify(droppables)}
      
      let answerArray = ${JSON.stringify(answerArray)}
    </script>
  </head>
  <body>
    <h1>${json.screenTitle}</h1>
    ${initialContent}
    <p class="directive">Click on a term below and drag it onto the description that best matches its meaning. When you have matched all descriptions, click the ‘Next’ arrow to continue.</p>
    <div class="container">
      <div class="draggable-wrapper"></div>
      <div class="droppable-wrapper"></div>
    </div>
    <div class="modal-container">
      <div class="modal-content">
        <div class="header">
          <h3 class="modal-title">Congratulations!</h3>
          <div class="close">&times;</div>
        </div>
        <div class="content">
          <p>Click the 'Next' arrow to continue.</p>
        </div>
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
