$(document).ready(()=>{
    hideAllOnLoad()
    redBarOnLoad()
    percentStringOnLoad()
})

function getPercentage(current){ //return percentage of where youre at
    // let pageName = current.substring(current.lastIndexOf('/')+1)
    let pageId = window.localStorage.furthest || scorm.get('cmi.suspend_data')
    const divisor = parseInt(pageId.substring(2))+1
    console.log(divisor)
    const dividend = pages.length
    return Math.round((divisor/dividend)*100)
}

function updatePercentage(percentage){ //update content of percent string
    $('#percent').html(`${percentage}%`)
}

function updatePercentString(percentage){ //slide left and right the percent string
    $('#percent').animate({
        left: `${percentage}%`
    },{
        duration: 1000
    },
    {
        easing: 'swing'
    })
}

function updateMeter(percentage){ //slide left and right red progress bar
    const width = (percentage == 100) ? 100 : percentage
    const borderTopBottomLeftRight = (percentage == 100) ? '20px' : '4px'
    console.log(width)
    $('#meter').animate({
        width: `${width}%`,
        'max-width': `${width}%`,
        borderTopRightRadius: borderTopBottomLeftRight,
        borderBottomRightRadius: borderTopBottomLeftRight
    },{
        duration: 1000
    },{
        easing: 'swing'
    })
}

function percentStringOnLoad(){ //do some animation on refresh or reload
    setTimeout(() => {
        $('#percent').fadeIn()
    }, 1500);
}

function redBarOnLoad(){
    setTimeout(() => {
        $('#meter').fadeIn()
    }, 100);
}

function hideAllOnLoad(){
    if(progressBar){
        $('.svg-container').css({
            display: 'flex'
        })
    }
}
