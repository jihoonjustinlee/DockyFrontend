<template>
  <div class="roadmap row-100">
    <h1 class="title">Roadmap</h1>
    <div class="container">
      <Epic 
        v-for="(epic, index) in epics"
        :key="index"
        :data="epic"
      />
    </div>
  </div>
</template>

<script>
import Epic from './Epic'

export default {
  name: 'Roadmap',
  components:{
    Epic
  },
  data(){
    return{
      epics: Array
    }
  },
  mounted(){
    fetch('https://ufred-dev.herokuapp.com/api/epics')
      .then(data => data.json())
      .then(json => this.epics = json)
  }
}
</script>

<style scoped>
  .roadmap{
    background: white;
    box-shadow: 0px 3px 3px 0px rgba(0,0,0,0.15);
    margin: 0.2em;
    box-sizing: border-box;
    padding: 1em;
    flex-direction: column;
  }

  .title{
    font-size: 1.3em;
    font-weight: normal;
    margin: 0.5em 0;
  }
</style>