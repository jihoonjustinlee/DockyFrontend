<template>
  <div class="container" v-if="isComputed">
    <!-- <div :class="['gauge', {show: isDocRevisionInProgress}]">
      <div class="percentage"></div>
    </div> -->
    <div class="heading">
      <!-- <div class="summary">
        <div>Total Number of Pages: {{ pages.length }}</div>
        <div>Number of Errors in the Storyboard: {{ numberOfErrors}}</div>
        <div>Number of Custom Pages: {{ numberOfCustomPages}}</div>
        <div>Number of Topics: {{ topicIndex }} </div>
        <div>Estimated Time of Development with Docky: 1 hr</div>
      </div> -->
      <Button
        :text="isDocRevised ? 'Download Storyboard' : 'Revise Storyboard'"  
        v-on="!isDocRevised ? {click: fixStoryboard} : {}"
        v-if="numberOfErrors !== 0"
        :class="{warning: isDocRevised}"
      />
    </div>
    <div :class="['gauge', {show: isDocRevisionInProgress}]">
      <div class="percentage"></div>
    </div>
    <SBRunResultCard screenNumber="Screen Number" screenType="Screen Type" title="Screen Title" :isHeader='true'/>
    <SBRunResultCard v-for="(page,index) in revisions" :key="index" :screenNumber="page.screenNumber" :revisedScreenNumber="page.revisedScreenNumber" :title="page.title" :screenType="page.screenType" :revisedScreenType="page.revisedScreenType"/>
  </div>
</template>

<script>
import SBRunResultCard from './SBRunResultCard'
import Button from './Button'
const JSZip = require('jszip')

export default {
  name: 'SBRunResult',
  props:{
    xml: String,
    file: null
  },
  components:{
    SBRunResultCard,
    Button
  },
  data(){
    return{
      pages: Array,
      revisions: [],
      isMounted: false,
      isComputed: false,
      numberOfErrors: 0,
      topicIndex: 0,
      numberOfCustomPages: 0,
      revisedXML: String,
      isDocRevised: false,
      isDocRevisionInProgress: false,
      revisedDocFile: ''
    }
  },
  mounted(){
    if (this.xml === undefined){
      this.$router.replace({name: 'SBRun'})
    } else{
      this.initializeDocument(this.xml)
      this.isMounted = true
    }
  },
  methods:{
    fixStoryboard(){
      console.log(this.isDocRevised)
      const {revisions, xml} = this
      const parser = new DOMParser()
      const serializer = new XMLSerializer()
      const parsedXML = parser.parseFromString(xml, 'text/xml')
      const wbody = parsedXML.getElementsByTagName('w:body')[0]
      const wtbl = wbody.getElementsByTagName('w:tbl')
      let counter = 0
      for (let i=0; i<wtbl.length; i++){
        let s = wtbl[i].textContent.toLowerCase().replace(/\s/g,'')
        if ((s.indexOf('screen:') > -1) && (s.indexOf('title:') > -1) && (s.indexOf('screentype:') > -1)){
          const wtr = wtbl[i].getElementsByTagName('w:tr')
          console.log("-----------------------------------")
          for (let j=0; j<wtr.length; j++){
            s = wtr[j].textContent.toLowerCase().replace(/\s/g, '')
            if ((s.indexOf('screen:') > -1) && (s.indexOf('title:') > -1) && (s.indexOf('screentype:') > -1)){
              // console.log(`--------------${counter}-------------`)
              const wtc = wtr[j].getElementsByTagName('w:tc')
              const sn = wtc[0].textContent
              const st = wtc[2].textContent

              if (revisions[counter].screenNumber !== revisions[counter].revisedScreenNumber){
                if (sn.indexOf(revisions[counter].screenNumber) > -1){
                  wtbl[i].getElementsByTagName('w:tr')[j].getElementsByTagName('w:tc')[0].getElementsByTagName('w:p')[0].outerHTML = `<w:p><w:pPr><w:rPr><w:b/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:highlight w:val="green"/></w:rPr><w:t>Screen: ${revisions[counter].revisedScreenNumber}</w:t></w:r></w:p>`
                }
              }
              if (revisions[counter].screenType !== revisions[counter].revisedScreenType){
                if (st.indexOf(revisions[counter].screenType) > -1){

                  wtbl[i].getElementsByTagName('w:tr')[j].getElementsByTagName('w:tc')[2].getElementsByTagName('w:p')[0].outerHTML = `<w:p><w:pPr><w:rPr><w:b/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:highlight w:val="green"/></w:rPr><w:t xml:space="preserve">Screen Type: ${revisions[counter].revisedScreenType}</w:t></w:r></w:p>`
                }
              }
              counter++
            }
          }
        }
      }
      this.revisedXML = serializer.serializeToString(parsedXML)
      this.insertRevisedXMLToDoc()
    },
    insertRevisedXMLToDoc(){
      this.isDocRevisionInProgress = true
      const fileName = this.file.name.substr(0, this.file.name.lastIndexOf('.'))
      const zipFile = new File([this.file], `${fileName}.zip`)
      const zip = new JSZip()

      zip.loadAsync(zipFile)
        .then(function(zip){
          console.log(this.file)
          zip.file(zip.files)
          zip.file('word/document.xml', this.revisedXML)
          zip.generateAsync({type: 'blob'})
            .then(function(blob){
              if (!this.isDocRevised){
                setTimeout(() => {
                  this.revisedDocFile = new File([blob], `${fileName}.docx`)
                  this.isDocRevised = true
                  this.isDocRevisionInProgress = false
                  console.log(this.revisedDocFile)
                  console.log(document.getElementsByTagName('button')[0])
                  const button = document.getElementsByTagName('button')[0]
                  const link = document.createElement('a')
                  link.setAttribute('style', `
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                  `)
                  link.setAttribute('href', window.URL.createObjectURL(this.revisedDocFile))
                  link.setAttribute('download', `${fileName}_SBRun.docx`)
                  button.appendChild(link)
                }, 1000);
              }
            }.bind(this))
        }.bind(this))

     
    },
    initializeDocument(xml){
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(xml, 'text/xml')

      const wbody = xmlDoc.getElementsByTagName('w:body')[0]
      const wtbl = wbody.getElementsByTagName('w:tbl')
      const wtr = []
      const wtc = []
      const pages = []
      
      
      for (let i=0; i<wtbl.length; i++){
        const content = wtbl[i].textContent.toLowerCase().replace(/\s/g,'')
        if ((content.indexOf('screen:') > -1) && (content.indexOf('title:') > -1) && (content.indexOf('screentype:') > -1)){
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
          screen: wtc[i].firstRow[0].textContent.replace('Screen:','').trim(),
          title: wtc[i].firstRow[1].textContent.replace('Title:','').trim(),
          type: wtc[i].firstRow[2].textContent.replace('Screen Type:','').trim(),
          content: wtc[i].thirdRow[0].textContent
        }
        pages.push(page)
      }
      this.pages = pages
      this.initializeRevisionArray(this.pages)
      this.reviseScreenType(this.pages)
      this.reviseScreenNumber(this.pages)
      this.countErrors()
      this.isComputed = true

    },
    initializeRevisionArray(pages){
      for (let i=0; i<pages.length; i++){
        this.revisions[i] = {
          title: pages[i].title,
          screenNumber: pages[i].screen,
          screenType: pages[i].type,
          revisedScreenNumber: '',
          revisedScreenType: ''
        }
      }
    },
    reviseScreenType(pages){
      let accepted = [
        "accordion_plus",
        "accordion_plus2",
        "accordion",
        "carousel",
        "discussion_forum",
        "drag_and_drop",
        "drag_and_drop2",
        "flow_click_display",
        "horizontal_image_w_text",
        "image_click_display",
        "quiz",
        "reading_assignment",
        "research_assignment",
        "self_check",
        "slideout_click_display",
        "summary",
        "table",
        "text_click_display_w_image",
        "text_click_display",
        "text_only",
        "timeline_click_display",
        "topic_conclusion",
        "topic_introduction",
        "vertical_image_w_text",
        "video_intro"
      ]
      for (let i=0; i<pages.length; i++){
        const type = pages[i].type.toLowerCase()
        let passed = false
        if (type.indexOf('custom') === -1){
          for (let i=0; i<accepted.length; i++){
            if (type === accepted[i]){
              passed = true
              break
            }
          }
          //no matching
          if (passed === false){
            if (type.indexOf('accordion')>-1){
              this.revisions[i].revisedScreenType = "accordion"
              if (type.indexOf('plus')>-1){
                this.revisions[i].revisedScreenType = "accordion_plus"
                if (type.indexOf('2')>-1){
                  this.revisions[i].revisedScreenType = "accordion_plus2"
                }
              }
            }
            else if (type.indexOf('discussion')>-1){
              this.revisions[i].revisedScreenType = "discussion_forum"
            }
            else if (type.indexOf('horizontal')>-1){
              this.revisions[i].revisedScreenType = "horizontal_image_w_text"
            }
            else if (type.indexOf('assignment')>-1){
              if (type.indexOf('reading')>-1){
                this.revisions[i].revisedScreenType = "reading_assignment"
              }
              else if (type.indexOf('research')>-1){
                this.revisions[i].revisedScreenType = "research_assignment"
              }
            }
            else if (type.indexOf('self')>-1){
              this.revisions[i].revisedScreenType = "self_check"
            }
            else if (type.indexOf('topic')>-1){
              if (type.indexOf('conclusion')>-1){
                this.revisions[i].revisedScreenType = "topic_conclusion"
              } 
              else if (type.indexOf('introduction')>-1){
                this.revisions[i].revisedScreenType = "topic_introduction"
              }
            }
            else if (type.indexOf('vertical')>-1){
              this.revisions[i].revisedScreenType = "vertical_image_w_text"
            }
          } else{
            this.revisions[i].revisedScreenType = type
          }
        } else{
          this.numberOfCustomPages++
          this.revisions[i].revisedScreenType = pages[i].type
        } 
      }
    },
    reviseScreenNumber(pages){
      let moduleIndex = parseInt(pages[0].screen.replace(/[mtp]/g,'').split("_")[0])
      let pageIndex

      for (let i=0; i<pages.length; i++){       
        if (pages[i].type === "video_intro"){
          this.topicIndex = 0
          pageIndex = 1
        }
        else if (pages[i].type === "topic_introduction"){
          pageIndex = 1
          this.topicIndex++
        }
        else if (pages[i].type === "summary"){
          pageIndex = 1
          this.topicIndex++
        }
        else{
          pageIndex++
        }
        this.revisions[i].revisedScreenNumber = `m${moduleIndex}_t${this.topicIndex}_p${pageIndex}`
      }
    },
    countErrors(){
      for (let i=0; i<this.revisions.length; i++){
        const sn = this.revisions[i].screenNumber
        const rsn = this.revisions[i].revisedScreenNumber
        const st = this.revisions[i].screenType
        const rst = this.revisions[i].revisedScreenType
        if ((sn !== rsn) || (st !== rst)){
          this.numberOfErrors++
        }
      }
    },

  }
}
</script>

<style scoped>
  .container .heading{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .summary{
    font-size: 0.8em;
  }

  button{
    position: relative;
    width: 220px;
  }

  .container{
    min-height: 100%;
    background: #ffffff;
    padding: 1em;
    box-sizing: border-box;
  }

  .gauge{
    margin-top:5px;
    height: 5px;
    background: rgba(68, 138, 255, 0.3);
    position: relative;
    overflow:hidden;
    opacity: 0;
    border-radius: 2px;
  }

  .gauge.show{
    opacity: 1;
  }
  
  .percentage{
    position: absolute;
    width: 20%;
    height: 100%;
    background: #448aff;
    animation: converting 1s infinite linear;
  }

  @keyframes converting{
    0%{
      left: 0;
    }
    50%{
      left: 50%;
    }
    100%{
      left: 100%;
    }
  }
  
</style>