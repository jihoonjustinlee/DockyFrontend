<template>
  <div class="container" v-if="isMounted">
    <Card
      v-for="(download, index) in downloads"
      :key="index"
      :title="download.title"
      :body="download.body"
      :img="download.img"
      :container="download.container"
      :url="download.link"
    />
  </div>
</template>

<script>
import Card from './Card'

export default {
  name: 'Downloadables',
  components: {
    Card
  },
  data(){
    return{
      isMounted: false,
      downloads:[
        {
          title: 'Templating Engine',
          body: '<p>Storyboard template file. List of available templates are inside this doc.</p>',
          img: '/assets/images/circuit-board.svg',
          link: 'downloads/sbtemplate',
          container: 'row-20'
        },
        {
          title: 'UFred Styleguide',
          body: '<p>Styleguide for UFred courses.</p>',
          img: '/assets/images/circuit-board.svg',
          link: 'downloads/ufredstyleguide',
          container: 'row-20'
        },
        {
          title: 'Minerva Styleguide',
          body: '<p>Styleguide for Minerva.</p>',
          img: '/assets/images/circuit-board.svg',
          link: 'downloads/minervastyleguide',
          container: 'row-20'
        },
        {
          title: 'GWL Styleguide',
          body: '<p>Styleguide for Great West Life.</p>',
          img: '/assets/images/circuit-board.svg',
          link: 'downloads/gwlstyleguide',
          container: 'row-20'
        },
        {
          title: 'Accessibility Documentation',
          body: '<p>Read about accessibility requirements in web development.</p>',
          img: '/assets/images/circuit-board.svg',
          link: 'downloads/accessibilitydoc',
          container: 'row-20'
        },
      ]
    }
  },
  mounted(){
    this.isMounted = true
  }
}
</script>

<style scoped>
  .container{
    display: flex;
    flex-wrap: wrap;
  }
</style>