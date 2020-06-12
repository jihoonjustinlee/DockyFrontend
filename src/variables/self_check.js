export default function createSelfCheckPage(json){
  let limits = [
    "[Q1]",
    "[Q2]",
    "[Q3]",
    "[Q4]",
    "[Q5]",
    "[Q6]",
    "[Q7]",
    "[Q8]",
    "[Q9]",
    "[Q10]"
  ]
  let numItems = 0
  let answerArray = []
  let questionArray = []
  let temp1 = []
  let temp2 = []
  let initialContent
  let interactiveContent
  let modalContentArray = []

  initialContent = json.screenContent.substring(0, json.screenContent.toLowerCase().indexOf("<p>[q"))
  interactiveContent = json.screenContent.substring(json.screenContent.toLowerCase().indexOf("<p>[q"), json.screenContent.length)
  for (let i=0; i<limits.length; i++){
    if (interactiveContent.indexOf(limits[i]) > -1){
      const index = interactiveContent.indexOf(limits[i])
      temp1.push(index)
    }
  }
  for (let i=0; i<temp1.length; i++){
    if (temp1[i + 1] !== undefined){
      temp2.push(interactiveContent.substring(temp1[i], temp1[i + 1]))
    } else{
      temp2.push(interactiveContent.substring(temp1[i], interactiveContent.length))
    }
  }
  for (let i=0; i<temp2.length; i++){
    numItems++
    let questionArrayTemp = []
    let question = temp2[i].substring(0, temp2[i].indexOf("</p>") + 4)
    let options = temp2[i].substring(question.length, temp2[i].length)

    //questions
    for (let j=0; j<limits.length; j++){
      if (question.indexOf(limits[j]) > -1){
        question = question.replace(limits[i], "")
        break
      }
    }
    question = question.replace("</p>", "")
    question = question.trim()
    questionArrayTemp.push(question)

    //options
    let startIndex = 0
    let index
    while ((index = options.indexOf("<p>", startIndex)) > -1){
      startIndex = index + 3
      let finish = options.substring(index, options.length).indexOf("</p>") + 4
      let found = options.substring(index, options.length).substring(0, finish)
      found = found.replace("<p>", "")
      found = found.replace("</p>", "")
      
      if (found.replace(/\s/g, '').toLowerCase() === "" || found.replace(/\s/g, '').indexOf("feedback]")> -1 ){
        //don't to anything
      } else{
        questionArrayTemp.push(found)
      }
    }
    questionArray.push(questionArrayTemp)
  }

  //determine answers
  for (let i=0; i<questionArray.length; i++){
    let answerArrayTemp = []
    for (let j=1; j<questionArray[i].length; j++){
      if (questionArray[i][j].toLowerCase().indexOf("[correct]") > -1){
        questionArray[i][j] = questionArray[i][j].replace("[correct]", "").trim()
        answerArrayTemp.push((j-1).toString())
      }
    }
    answerArray.push(answerArrayTemp)
  }

  for (let i=0; i<numItems; i++){
    modalContentArray.push([
      "Correct",
      "Placeholder feedback",
      "Please try again."
    ])
  }
  modalContentArray = JSON.stringify(modalContentArray)
  questionArray = JSON.stringify(questionArray)
  answerArray = JSON.stringify(answerArray)

  const content = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>${json.screenTitle}</title>
    <link rel="stylesheet" href="interface/css/style-variables.css">
    <link rel="stylesheet" type="text/css" href="interface/css/style-interactive.css">
    <link rel="stylesheet" type="text/css" href="interface/css/style.css">
    <script src="interface/js/jquery-3.3.1.min.js"></script>
    <link rel="stylesheet" href="interface/css/self_check.css">
    <script src="interface/js/self_check.js" defer></script>
    <script>
      // Sets number of questions.
      let numItems = ${numItems}
  
      // Sets feedback type, must be string "basic" (generic) or "extended" (custom).
      let type = "basic";
  
      let answerArray = ${answerArray}
  
      let questionArray = ${questionArray}
  
      //Feedback Box title and content
      let modalContentArray = ${modalContentArray}
    </script>
  </head>
  <body>
    <div class="textarea">
      <h1>${json.screenTitle}</h1>
      ${initialContent}
      <p class="directive">Select the correct answer from the options provided. To proceed to the next question, click the right-facing arrow. Then, click the ‘Next’ arrow to continue.</p>
    </div>
    <div class="container">
      <div class="vertical-align">
        <a class="prevSlide" onclick="plusSlides(-1)"></a>
      </div>
      <div class="swipe-container"></div>
      <div class="vertical-align">
        <a class="nextSlide" onclick="plusSlides(1)"></a>
      </div>
    </div>
    <script src="interface/js/media_control.js"></script>
  </body>
</html>
  `
  const file = new File([content], json.screenNumber, { type: 'text/html'})
  return file
}