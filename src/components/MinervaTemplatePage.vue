<template>
  <div class="whole">
    <transition name="bounce-in" enter-active-class="animated bounceInRight">
      <div class="container" :key="type" v-if="isMounted">
        <div class="options">
          <div :class="['option', {active: active_el === 0}]" v-on:click="activate(0)">
            <font-awesome-icon icon="eye"/>
            <div class="label">Preview</div>
          </div>
          <div :class="['option', {active: active_el === 1}]" v-on:click="activate(1)">
            <font-awesome-icon icon="file-word"/>
            <div class="label">Storyboard</div>
          </div>
          <div :class="['option', {active: active_el === 2}]" v-on:click="activate(2)">
            <font-awesome-icon icon="code"/>
            <div class="label">html</div>
          </div>
          <div :class="['option', {active: active_el === 3}]" v-on:click="activate(3)">
            <font-awesome-icon icon="info-circle"/>
            <div class="label">Compatibility</div>
          </div>
        </div>
        <div class="view" :key="active_el">
          <div class="appearance background" v-if="active_el === 0">
            <iframe class="preview" :src="'/assets/minerva/'+type+'.html'" frameborder="0" :key="type"></iframe>
          </div>
          <div class="storyboard" v-if="active_el === 1">
            <img :src="'/assets/images/'+type+'_sb.png'" :key="type">
          </div>
          <div class="code" v-if="active_el === 2">
            <pre v-highlightjs="htmlSnippet">
              <code class="viewerHTML">
                
              </code>
            </pre>
          </div>
          <div class="details" v-if="active_el === 3">
            <p>Docky Compatibility: 
              <font-awesome-icon :icon="dockyCompatible()"/>
            </p>
           
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'UFredTemplatePage',
  props:{
    type: String
  },
  data(){
    return{
      isMounted: false,
      active_el: 0,
      htmlSnippet: `<html>test</html><div class="test">test</div>`
    }
  },
  mounted(){
    console.log(this.type)
    this.isMounted = true
  },
  methods:{
    activate(index){
      this.active_el = index
    },
    dockyCompatible(){
      return "ban"
    },
    applyBackground(type){
      if (type !== "video_intro" && type !== "topic_introduction" && type !== "topic_conclusion" && type !== "summary"){
        return true
      } else{
        return false
      }
    } 
  }
}
</script>

<style scoped>

  .whole{
    display: flex;
    flex-direction: column;
    height: calc(100% - 1em);
  }

  .appearance{
    height: 100%;
  }

  .appearance.background{
    background-image: url('/assets/minerva/interface/images/background_2048.jpg');
  }


  .template{
    width: 940px;
  }

  iframe.preview{
    width: 100%;
    height: 100%;
  }

  .options{
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    font-size:14px;
  }

  .option{
    display: flex;
    padding: 0.6em 1em;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    cursor: pointer;
    width: 100px;
    justify-content: center;
    color: rgba(169, 27, 27, 0.5);
  }

  .option.active{
    border-top: 5px solid rgba(167, 27, 27, 0.7);
    background: white;
    color: #000000;
  }

  .option svg{
    margin-top: 1px;
    margin-right: 6px;
  }

  .container{
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .view{
    height: 100%;
    background: #ffffff;
    padding: 1em;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  img{
    width: 100%;
  }
  
  .storyboard img{
    max-width: 800px;
  }

</style>