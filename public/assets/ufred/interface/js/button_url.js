const completeActivity = ()=>{
    // parent.blockerOn()
    // parent.closeAllMenus()
    $('div.content').fadeOut()
    
    setTimeout(() => {
        $('iframe.assignment').fadeIn()
        parent.blockerOff()
    }, 800);
}
//this tracks the sub page id
let index = 1

const continueToNextPage = ()=>{
    parent.blockerOn()
    parent.closeAllMenus()
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