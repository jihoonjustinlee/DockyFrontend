<template>
  <div class="container" v-if="isMounted">
    <Card
      v-for="(reference, index) in references"
      :key="index"
      :title="reference.title"
      :body="reference.body"
      :container="reference.container"
      :img="reference.img"
      :url="reference.url"
    />
  </div>
</template>

<script>
import Card from './Card'

export default {
  name: 'References',
  components:{
    Card
  },
  mounted(){
    this.isMounted = true
  },
  data(){
    return{
      isMounted: false,
      references: [
        {
          title: 'UFred Template Sets',
          body: 'Take a closer look at all the templates that we have available for UFred courses.',
          img: '/assets/images/circuit-board.svg',
          container: 'row-20',
          url: 'references/ufredtemplates'
        },
        {
          title: 'Minerva Template Sets',
          body: 'This is in progress.',
          img: '/assets/images/circuit-board.svg',
          container: 'row-20',
          url: '/references/todo4'
        },
        {
          title: 'Using Docky',
          body: 'Take a look at how Docky is used in course development.',
          img: '/assets/images/circuit-board.svg',
          container: 'row-20',
          url: '/references/usingdocky'
        },
        {
          title: 'Setting up a localhost via VSCode.',
          body: 'Read on setting up localhost while in course development',
          img: '/assets/images/circuit-board.svg',
          container: 'row-20',
          url: '/references/dev-localhost'
        },
        {
          title: 'What is RapidGen?',
          body: 'Take a look at our deprecated tool RapidGen. This tool set the first foot in automating courseware development',
          img: '/assets/images/circuit-board.svg',
          container: 'row-20',
          url: '/references/usingrapidgen'
        },
        {
          title: 'Setting up VPN from your home, or at work.',
          body: 'Take a look at setting up VPN at home in case the office is closed.',
          img: '/assets/images/circuit-board.svg',
          container: 'row-20',
          url: '/references/test'
        }
      ]
    }
  }
}
</script>

<style scoped>
  .container{
    display: flex;
    flex-wrap: wrap;
  }
</style>