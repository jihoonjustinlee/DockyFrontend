<template>
  <div class="container" v-if="isMounted">
    <Card
      v-for="(tool, index) in tools"
      :key="index"
      :url="tool.url"
      :title="tool.title"
      :body="tool.body"
      :author="tool.author"
      :container="tool.container"
      :img="tool.img"
    />
  </div>
</template>

<script>
import Card from './Card'

export default {
  name: 'Tools',
  components: {
    Card
  },
  mounted(){
    this.isMounted = true
  },
  data(){
    return{
      isMounted: false,
      tools:[
        {
          title: 'Docky',
          body: '<p>Docky is a tool that automates course generation.</p>',
          url: '/tools/docky',
          container: 'row-25',
          img: '/assets/images/circuit-board.svg'
        },
        {
          title: "SBRun",
          body: '<p>SBRun diagnose functional errors in the storyboard and revise them.</p>',
          url: '/tools/sbrun',
          container: 'row-25',
          img: '/assets/images/circuit-board.svg'
        },
        {
          title: 'Revert',
          body: '<p>Revert is a tool that automatically generates Content Doc from a storyboard.</p>',
          url: '/tools/revert',
          container: 'row-25',
          img: '/assets/images/circuit-board.svg'
        },
        {
          title: 'RapidGen',
          body: '<p>RapidGen is a deprecated course generation tool. It requires manual copy-paste from storyboard to an Excel file. Then, the tool will interpret the Excel file to generate necesary files.</p>',
          url: "tools/rapidgen",
          container: 'row-25',
          img: '/assets/images/circuit-board.svg'
        }
      ]
    }
  }
}
</script>

<style scoped>
  .container{
    display: flex;
  }

</style>