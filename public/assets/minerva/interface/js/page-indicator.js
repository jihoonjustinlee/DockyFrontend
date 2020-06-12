let buttonAccordions = document.getElementsByClassName('menuAccordion')
let panels = document.getElementsByClassName('panel')
let trs = document.getElementsByTagName('tr')

$(document).ready(function(){
    disableAllActiveButtons()
    highlightAllCompletedTopics()
    showActivePageButton()
})


function disableAllActiveButtons(){
    $('.menuAccordion').removeClass('active')
    $('.panel').removeClass('show')
}

function showActivePageButton(){
    let currentPage = document.getElementById(parent.getPid())
    let currentTopic = $(currentPage).parent().parent().parent()
    currentTopic.addClass('show')
    currentTopic.prev().addClass('active')
    $(currentPage).css({
        'box-shadow' : 'inset 0 0 100px 100px rgba(255, 255, 255, 0.3)'
    })
	
	console.log(currentTopic.offset().top);
	console.log($(currentPage).offset().top);
	
    $('.menunav').animate({
        scrollTop: currentTopic.offset().top - $(".menunav").offset().top
    }, 1000);
}

function highlightAllCompletedTopics(){
    let furthest = window.localStorage.furthest || parent.scorm.get('cmi.suspend_data')
    let index = parseInt(furthest.slice(2)) + 1
    console.log(index)
    console.log(trs)
    for(let i=0; i<index; i++){
        $(trs[i]).css({
            background: 'rgba(0,0,0,0.4)',
            'box-shadow': 'inset 0 -3px 0 0 var(--primary)'
        })
        // trs[i].style.background = "rgba(0,0,0,0.4)"
    }
}




