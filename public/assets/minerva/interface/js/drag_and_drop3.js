let answersToGo = 0

var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

function calculateTotalQuestions() {
  for (let i = 0; i < answerArray.length; i++) {
    answersToGo += answerArray[i].length
  }
}

function isActivityCompleted() {
  let finalAudio
  if (answersToGo == 0) {
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
            console.log(parent.currentAudio)
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
  } else {
    console.log("not done")
  }
}

function calculateHeight() {
  document.documentElement.style.setProperty('--height', droppables.length + 1.5)
}

function generateDraggables() {
  for (let i = 0; i < draggables.length; i++) {
    $('.draggable-wrapper').append(`
      <div class="draggable" tabindex="1" data-key=${i}>${draggables[i]}</div>
      `)
  }
}

function generateDroppables() {
  for (let i = 0; i < droppables.length; i++) {
    $('.droppable-wrapper').append(`
      <div class="droppable tabindex="1" data-val=${i}>
      <div class="answer"></div>
      <div class="question customScroll">${droppables[i]}</div>
      <audio class="interaction" src=assets/audio/${audioFilename}${i+numAudios+1}.mp3></audio>
      </div>
    `)
  }

  $(".droppable-wrapper").append(`<audio class="interaction" src=assets/audio/${audioFilename}${numItems+numAudios+1}.mp3></audio>`);
}

function initializeDraggables() {
  $('.draggable').draggable({
    scroll: false,
    containment: '.container',
    start: function (e, ui) {
      ui.helper.data({
        key: $(e.target).data('key'),
        text: $(e.target).text(),
        inside: false,
        correct: false
      })
    },

    stop: function (e, ui) {
      let inside = ui.helper.data('inside')
      let correct = ui.helper.data('correct')
      if (!inside || !correct) {
        bringDraggableBackToScope(e.target)
      } else if (correct && answerArray[ui.helper.data('key')].length > 0) {
        console.log('more to go')
        $(e.target).css({
          top: 0,
          left: 0
        })
        answersToGo--
        console.log(answersToGo)
      } else {
        bringDraggableBackToScope(e.target)
        disableDraggable(e.target)
        answersToGo--
        isActivityCompleted()
        // console.log(answersToGo)
      }
    }
  })
}

function initializeDroppables() {
  $('.droppable').droppable({
    accept: '.draggable',
    drop: function (e, ui) {

      ui.helper.data('inside', true)
      let index = ui.helper.data('key')
      let key = answerArray[index]
      let val = $(e.target).data('val')
      let text = ui.helper.data('text')
      let answerBox = e.target.querySelector('.answer')

      console.log(`key ${key}`)
      console.log(`val ${val}`)
      stopAllAudio()
      for (let i = 0; i < key.length; i++) {

        if (key[i] == val) {

          console.log("right!")
          answerArray[index].splice(i, 1)
          ui.helper.data('correct', true)
          $(answerBox).addClass('right')
          blink(e.target, 'right')

          if ($(answerBox).text().length > 0) {
            let concatAnswerBoxText = $(answerBox).text() + `, ${text}`
            $(answerBox).text(concatAnswerBoxText)
          } else {
            $(answerBox).text(text)
          }
          console.log(`testing ${index}`)
          console.log(`testing ${val}`)
          parent.currentAudio = $('.interaction')[val]
          $('.interaction')[val].play()
          $('#playBtn', parent.document).removeClass('play').addClass('pause')

          $('.interaction')[val].onended = function () {
            $('#playBtn', parent.document).removeClass('pause').addClass('play');
          }

          break
        } else {
          ui.helper.data('correct', false)
          blink(e.target, 'wrong')
        }
      }
    }
  })
}

function blink(param, bool) {
  $(param).addClass(bool)
  setTimeout(() => {
    $(param).removeClass(bool)
  }, 300);
}

function bringDraggableBackToScope(target) {
  $(target).css({
    top: 0,
    left: 0
  })
}

function disableDraggable(target) {
  $(target).css({
    pointerEvents: 'none',
    opacity: 0
  })
}

function carryVolumeOnLoad() {
  let volSliderInput = parseInt(parent.document.getElementById('volSlider').value)
  const audios = document.getElementsByTagName('audio')

  if (volSliderInput == 1) {
    volSliderInput = 0
  }

  for (let i = 0; i < audios.length; i++) {
    audios[i].volume = volSliderInput / 100
  }
}

calculateHeight()
calculateTotalQuestions()
generateDraggables()
generateDroppables()
initializeDraggables()
initializeDroppables()
carryVolumeOnLoad()

let iosDragKey
let iosDropVal
let iosIndex

//need revisions for this page.
// help triggering audios properly on ios devices
if (iOS) {

  $('.draggable').bind('touchstart', function (e) {
    iosIndex = $(e.target).data('key')
    iosDragKey = answerArray[iosIndex]

    $('.interaction')[iosIndex].load()

  })
  $('.draggable').bind('touchend', function (e) {
    iosDropVal = $(e.target).data('val')

    for (let i = 0; i < iosDragKey.length; i++) {

      if (iosDragKey[i] == iosDropVal) {
        parent.currentAudio = $('.interaction')[iosIndex]
        $('.interaction')[iosIndex].play()

        $('.interaction')[iosIndex].onended = function () {
          alert("Testing")
        }
      }
      break
    }
  })
}