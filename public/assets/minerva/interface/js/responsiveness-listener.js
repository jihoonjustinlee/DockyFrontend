const isEnabled = true

let leftPosition
let topPosition

function getCenterCoordinate(width, height) {

  leftPosition = (window.screen.width / 2) - ((width / 2) - 10)
  topPosition = (window.screen.height / 2) - ((height / 2) + 50)
  
}

function popupWindow(url, width, height) {

  getCenterCoordinate(width, height)
  window.open(url, "_blank", `width=${width}, height=${height}, left=${leftPosition}, top=${topPosition}`)
  window.focus()

}

function resizeViewport(width, height) {

  if (parent.window.outerWidth) {

    parent.window.resizeTo(
      width + (parent.window.outerWidth - parent.window.innerWidth),
      height + (parent.window.outerHeight - parent.window.innerHeight)
    )

  } else {
    parent.window.resizeTo(500, 500)
    parent.window.resizeTo(
      width + (500 - document.documentElement.clientWidth),
      height + (500 - document.documentElement.clientHeight)
    )
  }
}


let width
let height

window.addEventListener('keydown', function (e) {

  if (isEnabled) {

    // local testing
    if (e.keyCode == 48) {
      popupWindow(window.location.href, 800, 800)
    } 
    
    // iPad Pro (12.9)
    else if (e.keyCode == 49) {

      width = !e.shiftKey ? 1024 : 1336
      height = !e.shiftKey ? 1336 : 1024

      resizeViewport(width, height)
      getCenterCoordinate(width, height)
      parent.window.moveTo(leftPosition, topPosition)
    }

    //iPad Pro (10.5)
    else if (e.keyCode == 50){

      width = !e.shiftKey ? 834 : 1112
      height = !e.shiftKey ? 1112 : 834

      resizeViewport(width, height)
      getCenterCoordinate(width, height)
      parent.window.moveTo(leftPosition, topPosition)
      
    }
    
    //iPad
    else if (e.keyCode == 51){

      width = !e.shiftKey ? 768 : 1024
      height = !e.shiftKey ? 1024 : 768

      resizeViewport(width, height)
      getCenterCoordinate(width, height)
      parent.window.moveTo(leftPosition, topPosition)
      
    }

    //Kindle Fire HDX / Nexus 10
    else if (e.keyCode == 52){

      width = !e.shiftKey ? 800 : 1280
      height = !e.shiftKey ? 1280 : 800

      resizeViewport(width, height)
      getCenterCoordinate(width, height)
      parent.window.moveTo(leftPosition, topPosition)
      
    }

    //Galaxy Note
    else if (e.keyCode == 53){

      width = !e.shiftKey ? 414 : 846
      height = !e.shiftKey ? 846 : 414

      resizeViewport(width, height)
      getCenterCoordinate(width, height)
      parent.window.moveTo(leftPosition, topPosition)
      
    }

    //Galaxy S9/S9+
    else if (e.keyCode == 54){

      width = !e.shiftKey ? 360 : 740
      height = !e.shiftKey ? 740 : 360

      resizeViewport(width, height)
      getCenterCoordinate(width, height)
      parent.window.moveTo(leftPosition, topPosition)
      
    }

    //Galaxy S5
    else if (e.keyCode == 55){

      width = !e.shiftKey ? 360 : 640
      height = !e.shiftKey ? 640 : 360

      resizeViewport(width, height)
      getCenterCoordinate(width, height)
      parent.window.moveTo(leftPosition, topPosition)
      
    }

    //iPhone 6/7/8
    else if (e.keyCode == 56){

      width = !e.shiftKey ? 375 : 667
      height = !e.shiftKey ? 667 : 375

      resizeViewport(width, height)
      getCenterCoordinate(width, height)
      parent.window.moveTo(leftPosition, topPosition)
      
    }

    //iPhone 5
    else if (e.keyCode == 57){

      width = !e.shiftKey ? 320 : 568
      height = !e.shiftKey ? 568 : 320

      resizeViewport(width, height)
      getCenterCoordinate(width, height)
      parent.window.moveTo(leftPosition, topPosition)
      
    }

  }

})