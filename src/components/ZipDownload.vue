<template>
  <div class="container">
    <div class="result" v-if="infoReceived">
      <div class="conversion-incompleted" v-if="!conversionCompleted">
        <div class="spinner"></div>
        <div class="text">Zipping {{ zipfileName }}...</div>
      </div>
      <a id="zip-download">
        <font-awesome-icon icon="file-archive" v-if="conversionCompleted"/>
      </a>
    </div>
    <transition name="bounce-in" enter-active-class="animated bounceInRight">
      <div class="information" v-if="!infoReceived && hasLoaded">
        <input type="text" name="course-name" v-model="courseName" placeholder="Course name">
        <input type="text" name="zipfile-name" v-model="zipfileName" placeholder="Zip name">
        <button v-on:click="validateForm" id="input-submit">Submit</button>
      </div>
    </transition>

  </div>
</template>

<script>
const JSZip = require('jszip')
const JSZipUtils = require('jszip-utils')

import createPagejs from '../variables/pages'
import createIndexPage from '../variables/index'
import createAccordionPage from '../variables/accordion'
import createAccordionPlusPage from '../variables/accordion_plus'
import createAccordionPlus2Page from '../variables/accordion_plus2'
import createReadingAssignmentPage from '../variables/reading_assignment'
import createResearchAssignmentPage from '../variables/research_assignment'
import createHorizontalImageWTextPage from '../variables/horizontal_image_w_text'
import createVerticalImageWTextPage from '../variables/vertical_image_w_text'
import createSummaryPage from '../variables/summary'
import createTextOnlyPage from '../variables/text_only'
import { createVideoIntroPage, setModuleNumber, setModuleTitle } from '../variables/video_intro'
import createDiscussionPage from '../variables/discussion_forum'
import createSelfCheckPage from '../variables/self_check'
import { createTopicIntroductionPage } from '../variables/topic_introduction'
import createTopicConclusionPage from '../variables/topic_conclusion'
import createEmptyPageForUnknown from '../variables/unknownpage'
import createImageClickDisplayPage from '../variables/image_click_display'
import createTablePage from '../variables/table'
import createCarouselPage from '../variables/carousel'
import createTextClickDisplayPage from '../variables/text_click_display'
import createTextClickDisplayWImagePage from '../variables/text_click_display_w_image'
import createSlideoutClickDIsplayPage from '../variables/slideout_click_display'
import createTimelineClickDisplayPage from '../variables/timeline_click_display'
import createMainMenuPage from '../variables/main_menu'
import createHelpMenuPage from '../variables/help_menu'
import createResourceMenuPage from '../variables/resource_menu'
import createFlowClickDisplayPage from '../variables/flow_click_display'
import createIMSManifest from '../variables/imsmanifest'
import createQuizPage from '../variables/quiz.js'
import createDragAndDrop2Page from '../variables/drag_and_drop2'
import createDragAndDropPage from '../variables/drag_and_drop'

export default {

  name: 'ZipDownload',
  props:{
    json: Array
  },
  data(){
    return{
      files: [],
      infoReceived: false,
      hasLoaded: false,
      conversionCompleted: false,
      courseName: '',
      zipfileName: '',
      percentage: Number
    }
  },
  mounted(){
    if (this.json === undefined){
      this.$router.replace({name: 'Docky'})
    } else{
      this.hasLoaded = true
    }
  },
  methods:{
    logAllPages(){
      for (let i=0; i<this.json.length; i++){
        console.log(`%c ${this.json[i].screenNumber} | ${this.json[i].screenType} | ${this.json[i].screenTitle}`, 'background: #ccc; color:black')
      }
    },
    validateForm(){
      if (this.courseName === ""){
        this.courseName = "untitled"
      }
      if (this.zipfileName === ""){
        this.zipfileName = "untitled.zip"
      }
      if (this.courseName !== "" && this.zipfileName !== ""){
        if (this.zipfileName.substring(this.zipfileName.indexOf('.'), this.zipfileName.length) !== '.zip'){
          this.zipfileName = this.zipfileName.concat('.zip')
        }
        this.infoReceived = true
        document.getElementsByClassName('information')[0].style.display = 'none'
        this.generateResult()
      } else{
        console.log("error")
      }
    },
    generateResult(){
      this.files.push(createPagejs(this.json))
      this.determineScreenType()
      this.files.push(createIndexPage(this.courseName))
      this.files.push(createMainMenuPage(this.json))
      this.files.push(createHelpMenuPage())
      this.files.push(createResourceMenuPage())
      this.files.push(createIMSManifest(this.courseName))
      this.createZipFile()
    },
    determineScreenType(){
      for (let i=0; i<this.json.length; i++){
        let type = this.json[i].screenType.toLowerCase()
        if (type.indexOf("custom") === 0){
          this.files.push(createEmptyPageForUnknown(this.json[i]))
        } else{
          if (type === "accordion_plus"){
            this.files.push(createAccordionPlusPage(this.json[i]))
          }
          else if (type === "accordion_plus2"){
            this.files.push(createAccordionPlus2Page(this.json[i]))
          }
          else if (type === "accordion"){
            this.files.push(createAccordionPage(this.json[i]))
          }
          else if (type === "carousel"){
            this.files.push(createCarouselPage(this.json[i]))
          }
          else if (type === "discussion_forum"){
            this.files.push(createDiscussionPage(this.json[i]))
          }
          //todo
          else if (type === "drag_and_drop"){
            this.files.push(createDragAndDropPage(this.json[i]))
          }
          else if (type === "drag_and_drop2"){
            this.files.push(createDragAndDrop2Page(this.json[i]))
          }
          else if (type === "flow_click_display"){
            this.files.push(createFlowClickDisplayPage(this.json[i]))
          }
          else if (type === "horizontal_image_w_text"){
            this.files.push(createHorizontalImageWTextPage(this.json[i]))
          }
          else if (type === "image_click_display"){
            this.files.push(createImageClickDisplayPage(this.json[i]))
          }
          else if (type === "quiz"){
            this.files.push(createQuizPage(this.json[i]))
          }
          else if (type === "reading_assignment"){
            this.files.push(createReadingAssignmentPage(this.json[i]))
          }
          else if (type === "research_assignment"){
            this.files.push(createResearchAssignmentPage(this.json[i]))
          }
          else if (type === "self_check"){
            this.files.push(createSelfCheckPage(this.json[i]))
          }
          else if (type === "slideout_click_display"){
            this.files.push(createSlideoutClickDIsplayPage(this.json[i]))
          }
          else if (type === "summary"){
            this.files.push(createSummaryPage(this.json[i]))
          }
          else if (type === "table"){
            this.files.push(createTablePage(this.json[i]))
          }
          else if (type === "text_click_display_w_image"){
            this.files.push(createTextClickDisplayWImagePage(this.json[i]))
          }
          else if (type === "text_click_display"){
            this.files.push(createTextClickDisplayPage(this.json[i]))
          }
          else if (type === "text_only"){
            this.files.push(createTextOnlyPage(this.json[i]))
          }
          else if (type === "timeline_click_display"){
            this.files.push(createTimelineClickDisplayPage(this.json[i]))
          }
          else if (type === "topic_conclusion"){
            this.files.push(createTopicConclusionPage(this.json[i]))
          }
          else if (type === "topic_introduction"){
            this.files.push(createTopicIntroductionPage(this.json[i]))
          }
          else if (type === "vertical_image_w_text"){
            this.files.push(createVerticalImageWTextPage(this.json[i]))
          }
          else if (type === "video_intro"){
            setModuleNumber(this.json[i])
            setModuleTitle(this.json[i])
            this.files.push(createVideoIntroPage(this.json[i]))
          }
          else{
            this.files.push(createEmptyPageForUnknown(this.json[i]))
          }
        }
      }
    },
    createZipFile(){ 
      const zip = new JSZip()
      zip.folder('assets/audios')
      zip.folder('assets/css')
      zip.folder('assets/images')
      zip.folder('assets/js')
      zip.folder('assets/resources')
      zip.folder('assets/video')

      //dynamically generated files
      for (let i=0; i<this.files.length; i++){
        if (this.files[i].name === "pages.js"){
          zip.file(`assets/js/${this.files[i].name}`, this.files[i])
        } else{
          zip.file(this.files[i].name, this.files[i])
        }
      }

      //statically existing files on backend API
      const staticFiles = [
        "interface/images/alert_icon.svg",
        "interface/images/arrow.svg",
        "interface/images/arrowB_icon.svg",
        "interface/images/arrowN_icon.svg",
        "interface/images/assignment.jpg",
        "interface/images/audio_slider_new.svg",
        "interface/images/background_1054.jpg",
        "interface/images/background_1435.jpg",
        "interface/images/background_2048.jpg",
        "interface/images/background_480.jpg",
        "interface/images/background_red_1054.jpg",
        "interface/images/background_red_1435.jpg",
        "interface/images/background_red_2048.jpg",
        "interface/images/background_red_264.jpg",
        "interface/images/cc_icon.svg",
        "interface/images/discussion_forum.jpg",
        "interface/images/file_icon.svg",
        "interface/images/help_icon.svg",
        "interface/images/links_icon.svg",
        "interface/images/link_icon.svg",
        "interface/images/logo_tab.svg",
        "interface/images/mainmenu_icon.svg",
        "interface/images/menu_close.svg",
        "interface/images/menu_icon.svg",
        "interface/images/mobile_menu_icon2.svg",
        "interface/images/prog_bar_400.svg",
        "interface/images/prog_bar_600.svg",
        "interface/images/prog_bar_right_450.svg",
        "interface/images/prog_bar_right_676.svg",
        "interface/images/reading.jpg",
        "interface/images/saws.scc",
        "interface/images/shield.svg",
        "interface/images/shield_tab.svg",
        "interface/images/summary.jpg",
        "interface/css/accordion.css",
        "interface/css/accordion_plus.css",
        "interface/css/accordion_plus2.css",
        "interface/css/animate.css",
        "interface/css/assignment.css",
        "interface/css/audio-control.css",
        "interface/css/carousel.css",
        "interface/css/devmode.css",
        "interface/css/drag_and_drop.css",
        "interface/css/drag_and_drop2.css",
        "interface/css/flow_click_display.css",
        "interface/css/horizontal_image_w_text.css",
        "interface/css/image_click_display.css",
        "interface/css/jquery.jscrollpane.css",
        "interface/css/progressbar.css",
        "interface/css/quiz.css",
        "interface/css/saws.scc",
        "interface/css/selectize.css",
        "interface/css/self_check.css",
        "interface/css/slideout_click_display.css",
        "interface/css/style-drag-and-drop.css",
        "interface/css/style-index.css",
        "interface/css/style-interactive-older.css",
        "interface/css/style-interactive.css",
        "interface/css/style-menu.css",
        "interface/css/style-table.css",
        "interface/css/style-variables.css",
        "interface/css/style.css",
        "interface/css/summary.css",
        "interface/css/table.css",
        "interface/css/template-style.css",
        "interface/css/text_click_display.css",
        "interface/css/text_click_display_w_image.css",
        "interface/css/text_only.css",
        "interface/css/timeline_click_display.css",
        "interface/css/topic_conclusion.css",
        "interface/css/topic_introduction.css",
        "interface/css/ufred-modal.css",
        "interface/css/vertical_image_w_text.css",
        "interface/css/video_intro.css",
        "interface/css/video_standard.css",
        "interface/js/accordion.js",
        "interface/js/accordion_plus.js",
        "interface/js/accordion_plus2.js",
        "interface/js/addTimeoutToAnimation.js",
        "interface/js/assignment&form.js",
        "interface/js/audio-control.js",
        "interface/js/audio_markup_generator.js",
        "interface/js/button_url.js",
        "interface/js/carousel.js",
        "interface/js/click_display_controller.js",
        "interface/js/drag_and_drop.js",
        "interface/js/drag_and_drop2.js",
        "interface/js/flow_click_display.js",
        "interface/js/help_menu_anim.js",
        "interface/js/horizontal_image_w_text.js",
        "interface/js/image_click_display.js",
        "interface/js/index-old.js",
        "interface/js/index-old2.js",
        "interface/js/index.js",
        "interface/js/jquery-3.3.1.min.js",
        "interface/js/jquery-ui.js",
        "interface/js/jquery-ui.min.js",
        "interface/js/jquery.js",
        "interface/js/jquery.jscrollpane.min.js",
        "interface/js/jquery.mousewheel.js",
        "interface/js/jquery.ui.touch-punch.min.js",
        "interface/js/media_control.js",
        "interface/js/menus.js",
        "interface/js/page-indicator.js",
        "interface/js/progressbar.js",
        "interface/js/quiz.js",
        "interface/js/SCORM_API_wrapper.js",
        "interface/js/SCORM_calls.js",
        "interface/js/selectize.min.js",
        "interface/js/self_check.js",
        "interface/js/sessionTime.js",
        "interface/js/siema.min.js",
        "interface/js/slideout_click_display.js",
        "interface/js/summary.js",
        "interface/js/table.js",
        "interface/js/text_click_display.js",
        "interface/js/text_click_display_w_image.js",
        "interface/js/text_only.js",
        "interface/js/timeline_click_display.js",
        "interface/js/topic_conclusion.js",
        "interface/js/topic_introduction.js",
        "interface/js/vertical_image_w_text.js",
        "interface/js/video_intro.js",
        "interface/js/video_standard.js",
        "assets/js/cctext.js",
        "assets/js/menus.js"
      ]
      let counter = 0
      
      for (let i=0; i<staticFiles.length; i++){
        JSZipUtils.getBinaryContent(`https://ufred-dev.herokuapp.com/public/${staticFiles[i]}`, function(err, data){
          zip.file(staticFiles[i], data)
          counter++
          this.percentage = `${Math.round((counter / staticFiles.length)*100)}%`
          if (counter === staticFiles.length){
            zip.generateAsync({type: 'blob'})
              .then(function(blob){
                const download = document.getElementById('zip-download')
                const fileName = document.createElement('div')
                fileName.innerHTML = this.zipfileName
                fileName.style.fontSize = '20px'
                download.setAttribute('href', window.URL.createObjectURL(blob))
                download.setAttribute('download', this.zipfileName)
                download.appendChild(fileName)
                this.conversionCompleted = true
              }.bind(this))
          }
        }.bind(this))
      }
    }
  }
}
</script>

<style scoped>
  @import url('../../node_modules/animate.css/animate.min.css');
  pre{
    white-space: pre-wrap;
  }

  .container{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  input{
    background: none;
    border: none;
    border-bottom: 1px solid #8e8e8e;
    padding-bottom: 0.3em;
    margin-bottom:1em;
  }

  .information{
    display: flex;
    flex-direction: column;
    background: white;
    padding: 2em;
    border-radius: 3px;
    box-shadow: 0 1px 4px 0 rgba(0,0,0,.14);
    animation-duration: 0.7s;
  }

  .information button{
    border: none;
    border-radius: 3px;
    color: white;
    text-transform: uppercase;
    background: #448aff;
    padding: 0.6em;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);
    cursor: pointer;
    transition: background 0.1s ease-in-out;
  }

  .information button:hover{
    background: rgba(68, 138, 255, 0.8);
  }

  input:focus{
    border-bottom-color: #0000b3;
  }
  input:focus::-webkit-input-placeholder {
    color: #0000b3;
  }

  input:focus:-moz-placeholder {
    color: #0000b3;
  }

  input:focus::-moz-placeholder {
    color: #0000b3;
  }

  input:focus:-ms-input-placeholder {
    color: #0000b3;
  }

  .spinner{
    border: 7px solid #f3f3f3;
    border-top: 7px solid #3498db;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    animation: spin 0.6s linear infinite;
    margin-bottom: 1em;
  }

  .conversion-incompleted{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .conversion-incompleted .text{
    font-size: 20px;
    color: #8A8A8A;
  }

  @keyframes spin{
    0%{
      transform: rotate(0deg);
    }
    100%{
      transform: rotate(360deg);
    }
  }

  #zip-download{
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #8A8A8A;
    padding: 1em;
    transition: transform 0.02s ease-in;
  }

  #zip-download:hover{
    transform: scale(1.03);
  }

  #zip-download svg{
    width: 150px;
    height: 150px;
    margin-bottom: 0.5em;
  }
</style>