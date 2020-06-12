// //button.simpleButton
// //.customScroll
// //button.accordion - toggle .active

// //img click and display
// //.img-click .wrapper

// //d & d v1
// //.droppableContainer .dropContainer
// //.draggableContainer .dragWords


// //d & d v2
// //.draggable-wrapper .draggable
// //.droppable-wrapper .droppable

// //self check
// //.answer .answer-composer .checkbox
// //button.submit

// // const ccButton = document.getElementById('ccButton')
// // const audioButton = document.getElementById('audioBtn')
// // const audioSlider = document.getElementsByClassName('audioSliderMask')[0]
// // const playButton = document.getElementById('playBtn')
// // const replayButton = document.getElementById('replayBtn')
// // const progressBar = document.getElementsByClassName('progressBar')[0]
// // const backButton = document.getElementById('back')
// // const mainmenuButton = document.getElementById('main')
// // const forwardButton = document.getElementById('forward')
// // const mainMenuIframe = document.querySelector('iframe#mainMenuIframe')

// // let focusedItemIndex = -1

// // let itemClickable = [
// //   ccButton,
// //   audioButton,
// //   audioSlider,
// //   playButton,
// //   replayButton,
// //   progressBar,
// //   backButton,
// //   mainmenuButton,
// //   forwardButton
// // ]

// // function resetArray(){
// //   itemClickable = itemClickable.slice(0,9)
// // }

// // function access() {
// //   resetArray()
// //   const allCategories = $('#iframe-container iframe').contents().find('a, button.simpleButton, .customScroll, button.accordion, .img-click .wrapper, .droppableContainer .dropContainer, .draggableContainer .dragWords, .draggable-wrapper .draggable, .droppable-wrapper .droppable, .answer .answer-composer input, button.submit')


// //   const iframeClickable = Object.values(allCategories).slice(0, -2)

// //   iframeClickable.map(function(item, i){itemClickable.push(item)})

// //   console.log(itemClickable)
// // }

// // function isMainMenuCurrentlyOpen() {
// //   return $(mainmenuButton).hasClass('menu-opened')
// // }

// // mainmenuButton.addEventListener('click', function () {
// //   $(this).addClass('menu-opened')
// // })

// // window.addEventListener('keydown', function(e){

// //   if(e.keyCode == 9){

// //     if(!e.shiftKey){

// //       focusedItemIndex = (focusedItemIndex + 1) % itemClickable.length
// //       itemClickable[focusedItemIndex].focus()


// //       console.log("From parent")
// //       console.log(focusedItemIndex)

// //       console.log(itemClickable[focusedItemIndex])


// //       // itemClickable[focusedItemIndex-1].focus()

// //       // itemClickable[focusedItemIndex].focus()

// //       // console.log(itemClickable[focusedItemIndex])

// //       // focusedItemIndex++


// //       // console.log(focusedItemIndex)
// //       // console.log(itemClickable.length)


// //       // if(focusedItemIndex == itemClickable.length){
// //       //   focusedItemIndex = 0
// //       // }

// //     } else{

// //       console.log('backward')
// //     }
// //     e.preventDefault()
// //   }





// // })

// // mainMenuIframe.addEventListener('load', function (e) {
// //   const mainMenuContainer = $(e.target).contents().find('.mainMenuContainer')[0]
// // })


// // need to have accessibility functionality for each iframe

// // 3 main iframes

// // index

// // page iframe

// // main menu iframe

// // 


// $(document).ready(function () {
//   const parentForwardButton = parent.document.getElementById('forward')
//   const parentCCButton = parent.document.getElementById('ccButton')

//   let pageIframeClickable = $(this).contents().find('a, button.simpleButton, .customScroll, button.accordion, .img-click .wrapper, .droppableContainer .dropContainer, .draggableContainer .dragWords, .draggable-wrapper .draggable, .droppable-wrapper .droppable, .answer .answer-composer input, button.submit')

//   pageIframeClickable = Object.values(pageIframeClickable).slice(0, -2)
  
//   let iframeIndex = -1

//   // window.addEventListener('keydown', function (e) {

//   //   if (e.keyCode == 9) {
      
//   //     if(iframeIndex >= 0 && iframeIndex < pageIframeClickable.length){
//   //       pageIframeClickable[iframeIndex].focus()

//   //     }

//   //     if (e.shiftKey) {
        
//   //       if(iframeIndex == 0){
//   //         parentForwardButton.focus()
//   //       } else{
//   //         iframeIndex --
//   //       }
        
//   //       e.preventDefault()
//   //     } else {

//   //       if(iframeIndex == pageIframeClickable.length){
//   //         parentCCButton.focus()
//   //         console.log("to another iframe")
//   //       } else{
//   //         iframeIndex++
//   //       }
        
//   //     }
//   //     console.log(`iframe index: ${iframeIndex}`)
//   //     console.log(document.activeElement)
//   //     e.preventDefault()
//   //   }

//   // })

//   window.addEventListener('keydown', function(e){
//     if (e.keyCode == 9){

//       if(!e.shiftKey){

//         if(iframeIndex == pageIframeClickable.length-1){
//           console.log("to parent")
//           parentCCButton.focus()
//           // iframeIndex = 0
//         } else{
//           iframeIndex++ 
//           pageIframeClickable[iframeIndex].focus()
//           console.log(`from iframe ${iframeIndex}`)
//         }
//       } else {

//         if(iframeIndex <= 0){
//           parentForwardButton.focus()
//           // iframeIndex = pageIframeClickable.length - 1
//           console.log("go to parent")
//         } else {
//           iframeIndex--
//           pageIframeClickable[iframeIndex].focus()
//           console.log(`from iframe ${iframeIndex}`)
//         }
//         e.preventDefault()
//       }
//       e.preventDefault()

//     }
//   })
// })

$(document).ready(function(){

  const ccButton = parent.document.getElementById('ccButton')
  const audioButton = parent.document.getElementById('audioBtn')
  const audioSlider = parent.document.getElementsByClassName('audioSliderMask')[0]
  const playButton = parent.document.getElementById('playBtn')
  const replayButton = parent.document.getElementById('replayBtn')
  const progressBar = parent.document.getElementsByClassName('progressBar')[0]
  const backButton = parent.document.getElementById('back')
  const mainmenuButton = parent.document.getElementById('main')
  const forwardButton = parent.document.getElementById('forward')

  let allItemArray = [
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

  let itemsInIframe = $(this).contents().find('a, button.simpleButton, .customScroll, button.accordion, .img-click .wrapper, .droppableContainer .dropContainer, .draggableContainer .dragWords, .draggable-wrapper .draggable, .droppable-wrapper .droppable, .answer .answer-composer input, button.submit')

  itemsInIframe = Object.values(itemsInIframe).slice(0, -2)

  itemsInIframe.map(function(item, i){
    allItemArray.push(item)
  })

  let focusedIndex = 0

  window.addEventListener('keydown', function(e){
    if(e.keyCode == 9){
      console.log("Testing")
      e.preventDefault()
    }
  })


  console.log(allItemArray)


  // console.log(itemsInIframe)
})