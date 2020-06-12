const popup = document.getElementsByClassName('popup-container')[0]

const closeButton = document.querySelector('.popup-container .head .close')

closeButton.addEventListener('click', function(){
  $(popup).fadeOut()
})


