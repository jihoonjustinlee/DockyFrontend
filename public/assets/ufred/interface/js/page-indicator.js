let buttonAccordions = document.getElementsByClassName('menuAccordion')
let panels = document.getElementsByClassName('panel')
let trs = document.getElementsByTagName('tr')
let tdl = document.getElementsByClassName('menuicons')

$(document).ready(function(){
    disableAllActiveButtons()
    highlightAllCompletedTopics()
    showActivePageButton()
    showIconInCurrentPage()
    addOpacityToUnvisitedTopic()
    unlockNewTopic()
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
	
    $('.menunav').animate({
        scrollTop: currentTopic.offset().top - $(".menunav").offset().top
    }, 1000);
}

function highlightAllCompletedTopics(){
    let furthest = window.localStorage.furthest || parent.scorm.get('cmi.suspend_data')
    let current = window.localStorage.pid || parent.scorm.get('cmi.core.lesson_location')
    let index = parseInt(furthest.slice(2)) + 1
    for (let i=index; i<trs.length; i++){
        $(trs[i]).css({
            color: 'white',
            opacity: '0.35'
        })
    }
}

function showIconInCurrentPage(){
    let current = window.localStorage.pid || parent.scorm.get('cmi.core.lesson_location')
    let index = parseInt(current.slice(2))+1
    console.log(index)
    $(tdl[index-1]).css({
        display: 'block'
    })
}

function addOpacityToUnvisitedTopic(){
    console.log(panels.length)
    let isAllInactive = true
    for (let i=0; i<panels.length; i++){
        isAllInactive = true
        let topicPages = $(panels[i]).children().children().children()
        for (let j=0; j<topicPages.length; j++){
            if ($(topicPages[j]).css('opacity') == 1){
                isAllInactive = false
            }
        }
        if(isAllInactive){
            $(panels[i]).prev().css({
                opacity: '0.35'
            })
        }
    }
}

function unlockNewTopic(){
    let isAllFinished = true
    for (let i=0; i<panels.length; i++){
        let topicPages = $(panels[i]).children().children().children()
        for (let j=0; j<topicPages.length; j++){
            if($(topicPages[j]).css('opacity') != 1){
                isAllFinished = false
            }
        }
        if(isAllFinished){
            $(panels[i]).next().css({
                opacity: '1'
            })
        }
    }
}


