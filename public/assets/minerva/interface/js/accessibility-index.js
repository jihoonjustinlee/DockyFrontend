//nav items
const ccButton = document.getElementById('ccButton'),
  audioButton = document.getElementById('audioBtn'),
  audioSlider = document.getElementsByClassName('audioSliderMask')[0],
  playButton = document.getElementById('playBtn'),
  replayButton = document.getElementById('replayBtn'),
  progressBar = document.getElementsByClassName('progressBar')[0],
  backButton = document.getElementById('back'),
  mainmenuButton = document.getElementById('main'),
  forwardButton = document.getElementById('forward')

//interactive items container
let allInteractiveItemArray = [
  ccButton,
  audioButton,
  audioSlider,
  playButton,
  replayButton,
  progressBar,
  backButton,
  mainmenuButton,
  forwardButton
]

//track index of focused item
let focusedIndex = -1

//find interactive items dynamically on iframe load
function resetIndexOnLoad() {
  focusedIndex = -1
  allInteractiveItemArray = allInteractiveItemArray.slice(-9, allInteractiveItemArray.length)
  let iframeContents = Object.values($('#iframe-container iframe').contents().find('a, button.simpleButton, .customScroll, button.accordion, .img-click .wrapper, .droppableContainer .dropContainer, .draggableContainer .dragWords, .draggable-wrapper .draggable, .droppable-wrapper .droppable, .answer .answer-composer input, button.submit')).slice(0, -2).reverse()
  iframeContents.map(function (item, i) {
    allInteractiveItemArray.unshift(item)
  })
  console.log(allInteractiveItemArray)
}


window.addEventListener('keydown', function (e) {
  // remove previous focus
  $(allInteractiveItemArray[focusedIndex]).removeClass('focused')

  // if tab pressed
  if (e.keyCode === 9) {

    // and if no shift pressed
    if (!e.shiftKey) {


      focusedIndex++

    // and if shift pressed
    } else {

      //loop back to end if focused index is zero
      if (focusedIndex <= 0) {
        focusedIndex = allInteractiveItemArray.length
      }

      focusedIndex--
      e.preventDefault()
    }

    //loop around the index
    focusedIndex %= allInteractiveItemArray.length
    
    // if($(allInteractiveItemArray[focusedIndex-1]).hasClass('accordion')){

    //   if(!$(allInteractiveItemArray[focusedIndex-1]).hasClass('active')){

    //     if ($(allInteractiveItemArray[focusedIndex]).hasClass('panel')){

    //       for(let i=focusedIndex; i<allInteractiveItemArray.length; i++){
  
    //         if ($(allInteractiveItemArray[i]).hasClass('accordion')){
    //           console.log(`next accordion found at ${i}`)
    //           focusedIndex = i
    //           break
    //         }
  
    //       }
    //     }
    //     // console.log("not active")
    //   } else if ($(allInteractiveItemArray[focusedIndex]).hasClass('accordion')){
    //     console.log("Testing")
    //   }

    // }

    // $(allInteractiveItemArray[focusedIndex]).addClass('focused')



    let currentItem = allInteractiveItemArray[focusedIndex]
    
    console.log(focusedIndex)
    
    $(currentItem).addClass('focused')

    $(currentItem).focus()
    // $(currentItem).css({
    //   background: 'yellow'
    // })
    console.log(currentItem)

    e.preventDefault()
  }

  // if (e.keyCode == 13) {


  //   console.log("enter")
  //   e.preventDefault()
  // }
})