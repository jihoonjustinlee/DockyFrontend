<template>
  <div class="container">
    <div id="upload-area">
      <transition name="bounce-in" enter-active-class="animated bounceIn">
        <font-awesome-icon icon="file-upload" v-if="isMounted"/>
      </transition>
      <input id="input-file" type="file" @change="uploadFile">
      <transition name="bounce-in" enter-active-class="animated bounceInLeft">
        <div class="message" v-if="isMounted">{{ message }}</div>
      </transition>
    </div>
  </div>
</template>

<script>
const JSZip = require('jszip')

export default {
  name: 'Docky',
  data(){
    return{
      xml: '',
      json: Array,
      message: "Upload a .docx or .xml file",
      isMounted: false
    }
  },
  mounted(){
    this.isMounted = true
    this.enableFileDragging()
  },
  methods:{
    checkFileExtension(type){
      return (type === "docx" || type === "xml") ? true: false
    },
    enableFileDragging(){
      const uploadArea = document.getElementById('upload-area')
      const inputFile = document.getElementById('input-file')
      uploadArea.addEventListener('click', function(){
        inputFile.click()
      })
      uploadArea.addEventListener('dragover', function(e){
        this.preventDefault(e)
      }.bind(this))
      uploadArea.addEventListener('drop', function(e){
        this.preventDefault(e)
        const file = e.dataTransfer.files[0]
        const type = file.name.split('.').pop()
        if (this.checkFileExtension(type)){
          inputFile.files = e.dataTransfer.files
          if (type === "docx"){
            this.convertDocxToXML(file)
          } else if (type === "xml"){
            this.readXMLFile(file)
          } else{
            console.log("This file is not supported")
          }
        }
      }.bind(this))
    },
    uploadFile(e){
      const file = e.target.files[0]
      const type = file.name.split('.').pop()
      if (this.checkFileExtension(type)){
        if (type === "docx"){
          this.convertDocxToXML(file)
        } else if (type === "xml"){
          this.readXMLFile(file)
        }
      } else{
        console.log("File not supported")
      }
      
    },
    readXMLFile(file){
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onloadend = function(){
        this.xml = reader.result
        this.initializePage(this.xml)
      }.bind(this)
    },
    convertDocxToXML(file){
      const zipFile = new File([file], 'archive.zip')
      const zip = new JSZip()
      const self = this
      zip.loadAsync(zipFile)
        .then(function(zip){
          const xml = zip.file('word/document.xml').async("string")
          xml.then(function(data){
            self.json = []
            self.xml = data
            self.initializePage(self.xml)
            console.log(self.xml)
          }, function(err){
            console.log("not good")
            throw err
          })
        })
    },

    initializePage(xml){
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(xml, 'text/xml')
      const wbody = xmlDoc.getElementsByTagName('w:body')[0]
      const wtbl = wbody.getElementsByTagName('w:tbl')
      console.log(wtbl)
      let wtr = []
      let wtc = []
      let pages = []
      let screenNumbers = []
      let screenTitles = []
      let screenTypes = []
      let screenContents = []

      for (let i=0; i<wtbl.length; i++){
        const content = wtbl[i].textContent.toLowerCase().replace(/\s/g, '')
        if ((content.indexOf('screen:') > -1) && (content.indexOf('title:') > -1) &&(content.indexOf('screentype:') > -1)){
          wtr.push(wtbl[i].getElementsByTagName('w:tr'))
        }
      }

      for (let i=0; i<wtr.length; i++){
        for (let j=0; j<wtr[i].length; j++){
          let s = wtr[i][j].textContent.toLowerCase().replace(/\s/g, '')
          if ((s.indexOf('screen:') > -1) && (s.indexOf('title:') > -1) && (s.indexOf('screentype:') > -1)){
            let object = {
              firstRow: wtr[i][j].getElementsByTagName('w:tc'),
              thirdRow: wtr[i][j+2].getElementsByTagName('w:tc')
            }
            wtc.push(object)
          }
        }
      }

      for (let i=0; i<wtc.length; i++){
        let page = {
          screen: wtc[i].firstRow[0].getElementsByTagName('w:p'),
          title: wtc[i].firstRow[1].getElementsByTagName('w:p'),
          type: wtc[i].firstRow[2].getElementsByTagName('w:p'),
          content: wtc[i].thirdRow[0].getElementsByTagName('w:p')
        }
        pages.push(page)
      }

      for (let i=0; i<pages.length; i++){
        let screenConcat = ''
        let titleConcat = ''
        let typeConcat = ''

        for (let j=0; j<pages[i].screen.length; j++){
          screenConcat = screenConcat.concat(pages[i].screen[j].textContent)
        }
        for (let k=0; k<pages[i].title.length; k++){
          titleConcat = titleConcat.concat(pages[i].title[k].textContent)
        }
        for (let l=0; l<pages[i].type.length; l++){
          typeConcat = typeConcat.concat(pages[i].type[l].textContent)  
        }
        if (screenConcat.trim().indexOf("Screen:") === 0){
          screenConcat = screenConcat.replace('Screen:','').trim()
        }
        if (titleConcat.trim().indexOf('Title:') === 0){
          titleConcat = titleConcat.replace('Title:','').trim()
        }
        if (typeConcat.trim().indexOf("Screen Type:") === 0){
          typeConcat = typeConcat.replace('Screen Type:', '').trim()
        }
        screenNumbers.push(screenConcat+".html")
        screenTitles.push(titleConcat)
        screenTypes.push(typeConcat)
      }
      for (let i=0; i<pages.length; i++){
        let screenConcat = ''
        let isListStarted = false

        // console.log("%c start page", 'background:#ffe6e6; color: yellow')
        for (let j=0; j<pages[i].content.length; j++){
          if (pages[i].content[j].hasChildNodes()){
            if (pages[i].content[j].childElementCount === 1 && pages[i].content[j].children[0].tagName === "w:pPr"){
              // console.log("remove")
            } else{
              let isList = false
              let sentenceConcat = ''
              //list
              // console.log("%c start sentence", 'background:#ff9999; color: yellow')
              if (pages[i].content[j].children[0].tagName === "w:pPr"){
                if (pages[i].content[j].children[0].children[0].tagName === "w:pStyle"){
                  if (pages[i].content[j].children[0].children[0].getAttribute('w:val') === "ListParagraph"){
                    if (!isListStarted){
                      sentenceConcat = sentenceConcat.concat("<ul>")
                      isListStarted = true
                    }
                    //TODO - DETERMINE LEVEL
                    // if (pages[i].content[j].children[0].children[0].nextElementSibling.firstChild.getAttribute('w:val') === '0'){
                    //   if (!isListStarted){
                    //     sentenceConcat = sentenceConcat.concat("<ul class='first-level'>")
                    //     isListStarted = true
                    //   }
                    //   // console.log("%c it is a first level list", 'background: #222; color: yellow')
                    // } else if (pages[i].content[j].children[0].children[0].nextElementSibling.firstChild.getAttribute('w:val') === '1'){
                    //   if (isListStarted){
                    //     sentenceConcat = sentenceConcat.concat("<ul class='second-level'>")         
                    //     // console.log("%c it is a second level list", 'background: #222; color: yellow')
                    //   }
                    // } else{
                    //   if (isListStarted){
                    //     sentenceConcat = sentenceConcat.concat("<ul class='third-level'>")
                    //   // console.log("%c it is a third level list", 'background: #222; color: yellow')
                    //   }
                    // }
                    sentenceConcat = sentenceConcat.concat('<li>')
                    isList = true
                  }
                } else{
                  if (isListStarted){
                    sentenceConcat = sentenceConcat.concat('</ul>')
                    isListStarted = false
                  }
                  sentenceConcat = sentenceConcat.concat('<p>')
                }
              } else {
                if (isListStarted){
                  sentenceConcat = sentenceConcat.concat('</ul>')
                  isListStarted = false
                }
                sentenceConcat = sentenceConcat.concat('<p>')
              }

              for (let l=0; l<pages[i].content[j].childElementCount; l++){
                if (pages[i].content[j].children[l].tagName === "w:r" || pages[i].content[j].children[l].tagName === "w:hyperlink"){
                  let styleArray = []

                  if (pages[i].content[j].children[l].textContent !== ""){
                    //if hyperlink
                    if (pages[i].content[j].children[l].tagName === "w:hyperlink"){
                      sentenceConcat = sentenceConcat.concat("<a href='' target='_blank'>")
                      styleArray.push('isHyperlink')
                      // console.log("%c it is a hyperlink", 'background: #ff6666; color: yellow')
                    } else{
                      //if it has styles
                      if (pages[i].content[j].children[l].childElementCount > 1 && pages[i].content[j].children[l].firstChild.tagName === "w:rPr"){
                        for (let m=0; m<pages[i].content[j].children[l].firstChild.childElementCount; m++){
                          //bold
                          if (pages[i].content[j].children[l].firstChild.children[m].tagName === "w:b"){
                            sentenceConcat = sentenceConcat.concat('<b>')
                            styleArray.push("isBold")
                            // console.log("%c BOLD", 'background: black; color:white')
                          }
                          //italics
                          if (pages[i].content[j].children[l].firstChild.children[m].tagName === "w:i"){
                            sentenceConcat = sentenceConcat.concat('<i>')
                            styleArray.push("isItalic")
                            // console.log("%c italics", 'background: #222; color: yellow')
                          }
                          //underline
                          if (pages[i].content[j].children[l].firstChild.children[m].tagName === "w:u"){
                            sentenceConcat = sentenceConcat.concat('<u>')
                            styleArray.push("isUnderline")
                            // console.log("%c underline", 'background: #222; color: yellow')
                          }
                          //superscript/subscript
                          if (pages[i].content[j].children[l].firstChild.children[m].tagName === "w:vertAlign"){
                            if (pages[i].content[j].children[l].firstChild.children[m].getAttribute('w:val') === "superscript"){
                              sentenceConcat = sentenceConcat.concat('<sup>')
                              styleArray.push("isSuperscript")
                              // console.log("%csuperscript", 'background:#222; color: yellow')
                            } else if(pages[i].content[j].children[l].firstChild.children[m].getAttribute('w:val') === "subscript"){
                              sentenceConcat = sentenceConcat.concat('<sub>')
                              styleArray.push("isSubscript")
                              // console.log("%csubscript", 'background:#222; color: yellow')
                            }
                          }
                        }
                      }
                    }
                    sentenceConcat = sentenceConcat.concat(pages[i].content[j].children[l].textContent)
                    for (let k=0; k<styleArray.length; k++){
                      if (styleArray[k] === "isBold"){
                        sentenceConcat = sentenceConcat.concat('</b>')
                      } else if (styleArray[k] === "isItalic"){
                        sentenceConcat = sentenceConcat.concat('</i>')
                      } else if (styleArray[k] === "isUnderline"){
                        sentenceConcat = sentenceConcat.concat('</u>')
                      } else if (styleArray[k] === "isSuperscript"){
                        sentenceConcat = sentenceConcat.concat('</sup>')
                      } else if (styleArray[k] === "isSubscript"){
                        sentenceConcat = sentenceConcat.concat('</sub>')
                      } else if (styleArray[k] === "isHyperlink"){
                        sentenceConcat = sentenceConcat.concat('</a>')
                      }
                    }                   
                  }
                }
              }
              if (!isList){
                sentenceConcat = sentenceConcat.concat("</p>")
              } else{
                sentenceConcat = sentenceConcat.concat('</li>')
              }
              // console.log(sentenceConcat)
              screenConcat = screenConcat.concat(sentenceConcat)
              // console.log('%c end sentence', 'background: #ff9999; color: yellow')
            }
            // console.log(pages[i].content[j].children)
          }
          if ((j === (pages[i].content.length - 1)) && isListStarted){
            screenConcat = screenConcat.concat('</ul>')
          }
          screenConcat = screenConcat.replace("<b></b>", "")
          screenConcat = screenConcat.replace("</b><b>", "")
          screenConcat = screenConcat.replace("<i></i>", "")
          screenConcat = screenConcat.replace("</i><i>", "")
          screenConcat = screenConcat.replace("<sup></sup>", "")
          screenConcat = screenConcat.replace("</sup><sup>", "")
          screenConcat = screenConcat.replace("<sub></sub>", "")
          screenConcat = screenConcat.replace("</sub><sub>", "")
        }
        screenContents.push(screenConcat)
        // console.log('%c end page', 'background:#ffe6e6; color: yellow')
      }
      for (let i=0; i<screenNumbers.length; i++){
        if (screenNumbers[i][0]){
          if (!isNaN(parseInt(screenNumbers[i][1]))){
            let object = {
              screenNumber: screenNumbers[i],
              screenTitle: screenTitles[i],
              screenType: screenTypes[i],
              screenContent: screenContents[i]
            }
            this.json.push(object)
            console.log(`%c ${object.screenNumber} : ${object.screenTitle}: ${object.screenType}`, 'background: #ccc')
          }
        }
      }
      this.$router.replace({name:'Download', params: {json: this.json}})
    },
    preventDefault(e){
      e.preventDefault()
      e.stopPropagation()
    }
  }
}
</script>

<style scoped>
  @import url('../../node_modules/animate.css/animate.min.css');

  #input-file{
    display: none;
  }
  #upload-area{
    background: #ffffff;
    border-radius: 3px;
    padding: 1em;
    height: 100%;
    cursor: pointer;
    box-shadow: 0 1px 4px 0 rgba(0,0,0,.14);
    margin: 1em;
    display: flex;
    align-items:center;
    justify-content: center;
    flex-direction: column;
    color: #8A8A8A;
  }

  svg{
    width: 150px !important;
    height: 150px !important;
    margin-bottom: 1em;
  }
  .message{
    font-size: 20px;
  }

  .container{
    height: calc(100% - 1em);
    display: flex;
    flex-direction: column;
  }

</style>