 const completeActivity = ()=>{
//    parent.closeAllMenus()
    $('div.content').fadeOut()

    $('div.content').fadeOut(()=>{
        setTimeout(() => {  
            $('iframe.assignment').fadeIn()
            parent.blockerOff()
        }, 500);
    })
}
//this tracks the sub page id
let index = 1

const continueToNextPage = ()=>{
//    parent.closeAllMenus()
    $('#'+index).fadeOut()
    setTimeout(() => {
        $('#'+index).fadeIn()
        parent.blockerOff()    
    }, 800);
    index++
}

//back button on lms
function goBackToCourse(){
    $('iframe.assignment').fadeOut()
    setTimeout(() => {
        $('div.content').fadeIn()
    }, 800);
}

function openResource(url){
    window.open(url)
}

window.addEventListener('keyup', function(e){
    console.log(document.activeElement)
})