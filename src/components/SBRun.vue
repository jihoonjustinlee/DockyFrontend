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
  name: 'SBRun',
  data(){
    return{
      xml: String,
      isMounted: false,
      json: Array,
      message: "Upload your storyboard",
      file: File
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
        this.file = file
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
        this.reRouteToResult(this.xml)
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
            self.routeToResult(self.xml)
          }, function(err){
            console.log("not good")
            throw err
          })
        })
    },
    preventDefault(e){
      e.preventDefault()
      e.stopPropagation()
    },
    routeToResult(xml){
      this.$router.replace({name: 'SBRunResult', params: {xml: xml, file: this.file}})
    }
  }
}
</script>

<style scoped>
  .container{
    height: calc(100% - 1em);
    display: flex;
    flex-direction: column;
  }
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
  .message{
    font-size: 20px;
  }

  svg{
    width: 150px !important;
    height: 150px !important;
    margin-bottom: 1em;
  }
</style>