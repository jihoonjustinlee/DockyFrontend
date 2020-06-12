let answersToGo = numItems

var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);


function generateMarkup() {
  document.documentElement.style.setProperty('--height', numItems + 1.5)
  for (let i = 0; i < numItems; i++) {
    $('.draggable-wrapper').append(`
      <div class="draggable" tabindex="1" data-key=${i}>${answerContent[i]}</div>
	  <audio class="interaction" src=assets/audio/${audioFilename}${i+numAudios+1}.mp3></audio>
    `)

    $('.droppable-wrapper').append(`
      <div class="droppable" tabindex="1" data-val=${String.fromCharCode(97+i)}>
        <div class="answer"></div>
        <div class="question customScroll">${dropContent[i]}</div>
      </div>  
    `)
  }

  // add one last audio file for final feedback
  $(".droppable-wrapper").append(`<audio class="interaction" src=assets/audio/${audioFilename}${numItems+numAudios+1}.mp3></audio>`);
}

function blink(param, bool) {
  $(param).addClass(bool)
  setTimeout(() => {
    $(param).removeClass(bool)
  }, 300)
}

function disableTarget(elem) {
  $(elem).css({
    opacity: 0,
    pointerEvents: 'none'
  })
}

function userGotEverythingRight(num) {

  let finalAudio
  // If user got everything right
  if (num === 0) {
    // loop through audios

    $(".interaction").map(function (index, audio) {
      // detect the last playing feedback audio
      if (audio.duration > 0 && !audio.paused) {
        // On last feedback audio end
        audio.onpause = function () {
          console.log(audio.currentTime)
          console.log(audio.duration)
          if (audio.currentTime == audio.duration) {
            $("#myModal").fadeIn();
            parent.currentAudio = $('.interaction')[numItems]

            if (iOS) {
              $('#playBtn', parent.document).removeClass('pause').addClass('play')
              $('#playBtn', parent.document).focus()
              $('#playBtn', parent.document).css({
                'box-shadow': '0 0 0 2px red inset'
              })

              setTimeout(() => {
                $('#playBtn', parent.document).css({
                  'box-shadow': 'none'
                })
              }, 1000);
            } else {
              parent.currentAudio.play()

              parent.currentAudio.onpause = function () {
                console.log("Testing")
              }

              parent.currentAudio.onplay = function () {
                $('#playBtn', parent.document).removeClass('play').addClass('pause')
              }
              // $('.interaction')[numItems].play();
              $('.interaction')[numItems].onended = function () {
                $('#playBtn', parent.document).removeClass('pause').addClass('play');
              }
            }
          }
        }
      }
    });
  }
}

let iosDragKey
let iosDropVal
let iosIndex


function initializeDraggableHandler() {
  $('.draggable').draggable({
    scroll: false,
    containment: '.container',
    // on drag start
    start: function (e, ui) {
      iosDragKey = answerArray[parseInt(ui.helper.data('key'))]
      console.log(iosDragKey)
      // store dataset
      ui.helper.data({
        key: $(e.target).data('key'),
        match: $(e.target).text(),
        inside: false,
        correct: false
      })
    },

    //trigger after drop event in .droppable
    stop: function (e, ui) {
      let inside = ui.helper.data('inside')
      let correct = ui.helper.data('correct')

      // if dropped outside or answer is incorrect
      if (!inside || !correct) {

        // bring scope back to its origin
        $(e.target).css({
          top: 0,
          left: 0
        })
        blink(e.target, 'wrong')

      } else { // user got the right answer
        disableTarget(e.target)
        answersToGo--
        userGotEverythingRight(answersToGo)
      }
    }
  })
}

function carryVolumeOnLoad(){
  let volSliderInput = parseInt(parent.document.getElementById('volSlider').value)
  const audios = document.getElementsByTagName('audio')

  if(volSliderInput == 1){
    volSliderInput = 0
  }

  for(let i=0; i<audios.length; i++){
    audios[i].volume = volSliderInput/100
  }
}

function initializeDroppableHandler() {
  $('.droppable').droppable({
    accept: '.draggable',

    // when .draggable is dropped
    drop: function (e, ui) {

      // set data@inside true
      ui.helper.data('inside', true)


      iosDropVal = $(e.target).data('val')
      // also retrieve the rest of datasets
      let key = answerArray[parseInt(ui.helper.data('key'))]
      let val = $(e.target).data('val')
      let match = ui.helper.data('match')
      let answerBox = e.target.querySelector('.answer')

      stopAllAudio();
      // if whichever dropped matches the key pair value
      if (key === val) {

        // handles audio logic for drag and drop
        const index = key.charCodeAt(0) - 97;
        // console.log(parent.currentAudio)
        parent.currentAudio = $('.interaction')[index]
        $('.interaction')[index].play();
        $('#playBtn', parent.document).removeClass('play').addClass('pause');

        $('.interaction')[index].onended = function () {
          $('#playBtn', parent.document).removeClass('pause').addClass('play');
        }

        // set data@correct to true
        ui.helper.data('correct', true)

        // some css stuffs for getting the right answer
        $(answerBox).text(match)
        $(answerBox).addClass('right')
        blink(e.target, 'right')
      }

      // if user gets the wrong answer
      else {

        // set data@correct to false
        ui.helper.data('correct', false)
        blink(e.target, 'wrong')
      }
    }
  })
}


generateMarkup()
initializeDraggableHandler()
initializeDroppableHandler()
carryVolumeOnLoad()

const draggablesDOM = document.getElementsByClassName('draggable')
const droppablesDOM = document.getElementsByClassName('droppable')
let isDraggableSelected = false
let isDroppableSelected = false
let draggableIndex = null
let droppableIndex = null


window.addEventListener('keyup', function (e) {

  // if tab is pressed
  if (e.keyCode == 9) {
    console.log("Test")
    // reset all focuses on tab if draggable hasn't been selected
    if (!isDraggableSelected) {
      for (let i = 0; i < draggablesDOM.length; i++) {
        $(draggablesDOM[i]).removeClass('focused')
      }
    }

    // reset focus on droppables on tab
    for (let i = 0; i < droppablesDOM.length; i++) {
      $(droppablesDOM[i]).removeClass('focused')
    }

    // select draggable
    if ($(document.activeElement).hasClass('draggable')) {

      if (!isDraggableSelected) {
        $(document.activeElement).addClass('focused')
      }

    }

    // select droppable
    else if ($(document.activeElement).hasClass('droppable')) {
      $(document.activeElement).addClass('focused')
    }
  }

  // on enter
  if (e.keyCode == 13) {

    //modal close
    if ($(document.activeElement).hasClass('close')) {
      $(document.activeElement).click()
    }

    // if any of the draggable is selected
    for (let i = 0; i < draggablesDOM.length; i++) {
      if ($(draggablesDOM[i]).hasClass('focused')) {

        // remember the index of the selected draggable, and set flag to true
        isDraggableSelected = true
        draggableIndex = i
        break
      }
    }

    // if draggable is selected
    if (isDraggableSelected) {

      for (let i = 0; i < droppablesDOM.length; i++) {

        //check if droppable is also selected
        if ($(droppablesDOM[i]).hasClass('focused')) {

          // remember the index of the focus of the droppable, and set flag to true
          isDroppableSelected = true
          droppableIndex = i
          break;
        }
      }

      // if droppable not selected, find the first not selected
      if (!isDroppableSelected) {
        for (let i = 0; i < droppablesDOM.length; i++) {
          if (!$(droppablesDOM[i]).find('.answer').hasClass('right')) {
            $(droppablesDOM[i]).focus()
            $(droppablesDOM[i]).addClass('focused')
            break
          }
        }
      }
    }

    // if draggable and droppable is selected
    if (isDraggableSelected && isDroppableSelected) {

      let focusedDraggable = $(draggablesDOM[draggableIndex])
      let focusedDroppable = $(droppablesDOM[droppableIndex])
      stopAllAudio();
      // let key = $(draggablesDOM[draggableIndex]).data('key')
      // let val = $(droppablesDOM[droppableIndex]).data('val')

      // if selected droppable and selected draggable are matching
      if (answerArray[parseInt($(focusedDraggable).data('key'))] == $(focusedDroppable).data('val')) {

        const index = answerArray[parseInt($(focusedDraggable).data('key'))].charCodeAt(0) - 97;


        $('.interaction')[index].play();
        $('#playBtn', parent.document).removeClass('play').addClass('pause');

        $('.interaction')[index].onended = function () {
          $('#playBtn', parent.document).removeClass('pause').addClass('play');
        }


        // do the same logics that we did in draggable-ui 
        disableTarget(focusedDraggable)
        answersToGo--
        userGotEverythingRight(answersToGo)
        let answerBox = $(focusedDroppable).find('.answer')
        let answerText = $(focusedDraggable).text()
        $(answerBox).text(answerText)
        $(answerBox).addClass('right')
        blink(focusedDroppable, 'right')

        $(focusedDroppable).removeAttr('tabindex')
        $(focusedDraggable).removeAttr('tabindex')

        // else user gets the wrong answer
      } else {
        blink(focusedDroppable, 'wrong')
      }

      // reset all progress on enter
      $(focusedDraggable).removeClass('focused')
      $(focusedDroppable).removeClass('focused')
      isDraggableSelected = false
      isDroppableSelected = false
      draggableIndex = null
      droppableIndex = null

      if (answersToGo == 0) {
        $('.close').focus()
      } else {
        $('html').focus()
      }
    }
  }
})

// help triggering audios properly on ios devices
if (iOS) {

  $('.draggable').bind('touchstart', function (e) {
    iosDragKey = answerArray[parseInt($(e.target).data('key'))]

    iosIndex = iosDragKey.charCodeAt(0) - 97;

    $('.interaction')[iosIndex].load()

  })
  $('.draggable').bind('touchend', function (e) {
    iosDropVal = $(e.target).data('val')
    if (iosDragKey == iosDropVal) {
      parent.currentAudio = $('.interaction')[iosIndex]
      $('.interaction')[iosIndex].play()

      $('.interaction')[iosIndex].onended = function () {
        alert("Testing")
      }
    }
  })
}