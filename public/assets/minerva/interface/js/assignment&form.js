const completeActivity = (url)=>{
    parent.blockerOn()
    parent.closeAllMenus()
    TweenMax.to($('body'), 0.5, {
        opacity: 0,
        onComplete: ()=>{
            location.href=url
            parent.blockerOff()
        }
    })
}
