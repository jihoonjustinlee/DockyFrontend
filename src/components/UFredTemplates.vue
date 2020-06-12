<template>
<transition enter-active-class="animated bounceInRight">
  <div class="container" v-if="isMounted">
    <Card
      v-for="(template, index) in templates"
      :key="index"
      :title="template.title"
      :body="template.body"
      :url="template.url"
      :img="template.img"
      :container="template.container"
    />
  </div>
</transition>
</template>

<script>
import Card from './Card'

export default {
  name: 'UFredTemplates',
  components:{
    Card
  },
  mounted(){
    this.isMounted = true
  },
  data(){
    return{
      isMounted: false,
      templates:[
        {
          title: 'accordion_plus',
          body: "<p>Dolor irure magna pariatur occaecat et dolore reprehenderit esse do anim qui commodo tempor.</p>",
          img: '/assets/images/circuit-board.svg',
          component: 'UFredTemplatePage',
          url: 'ufredtemplates/accordion_plus',
          container: 'row-20'
        },
        {
          title: 'accordion_plus2',
          body: "<p>Dolor irure magna pariatur occaecat et dolore reprehenderit esse do anim qui commodo tempor.</p>",
          img: '/assets/images/circuit-board.svg',
          component: 'UFredTemplatePage',
          url: 'ufredtemplates/accordion_plus2',
          container: 'row-20'
        },
        {
          title: 'accordion',
          body: "<p>Dolor irure magna pariatur occaecat et dolore reprehenderit esse do anim qui commodo tempor.</p>",
          img: '/assets/images/circuit-board.svg',
          component: 'UFredTemplatePage',
          url: 'ufredtemplates/accordion',
          container: 'row-20'
        },
        {
          title: 'carousel',
          body: "<p>Dolor irure magna pariatur occaecat et dolore reprehenderit esse do anim qui commodo tempor.</p>",
          img: '/assets/images/circuit-board.svg',
          component: 'UFredTemplatePage',
          url: 'ufredtemplates/carousel',
          container: 'row-20'
        },
        {
          title: 'discussion_forum',
          body: "<p>Dolor irure magna pariatur occaecat et dolore reprehenderit esse do anim qui commodo tempor.</p>",
          img: '/assets/images/circuit-board.svg',
          component: 'UFredTemplatePage',
          url: 'ufredtemplates/discussion_forum',
          container: 'row-20'
        },
        {
          title: 'drag_and_drop',
          body: "<p>Dolor irure magna pariatur occaecat et dolore reprehenderit esse do anim qui commodo tempor.</p>",
          img: '/assets/images/circuit-board.svg',
          component: 'UFredTemplatePage',
          url: 'ufredtemplates/drag_and_drop',
          container: 'row-20'
        },
        {
          title: 'drag_and_drop2',
          body: "<p>Dolor irure magna pariatur occaecat et dolore reprehenderit esse do anim qui commodo tempor.</p>",
          img: '/assets/images/circuit-board.svg',
          component: 'UFredTemplatePage',
          url: 'ufredtemplates/drag_and_drop2',
          container: 'row-20'
        },
        {
          title: 'flow_click_display',
          body: "<p>Dolor irure magna pariatur occaecat et dolore reprehenderit esse do anim qui commodo tempor.</p>",
          img: '/assets/images/circuit-board.svg',
          component: 'UFredTemplatePage',
          url: 'ufredtemplates/flow_click_display',
          container: 'row-20'
        },
        {
          title: 'horizontal_image_w_text',
          body: "<p>Dolor irure magna pariatur occaecat et dolore reprehenderit esse do anim qui commodo tempor.</p>",
          img: '/assets/images/circuit-board.svg',
          component: 'UFredTemplatePage',
          url: 'ufredtemplates/horizontal_image_w_text',
          container: 'row-20'
        },
        {
          title: 'image_click_display',
          body: "<p>Dolor irure magna pariatur occaecat et dolore reprehenderit esse do anim qui commodo tempor.</p>",
          img: '/assets/images/circuit-board.svg',
          component: 'UFredTemplatePage',
          url: 'ufredtemplates/accordion',
          container: 'row-20'
        },
        {
          title: 'quiz',
          body: "<p>Dolor irure magna pariatur occaecat et dolore reprehenderit esse do anim qui commodo tempor.</p>",
          img: '/assets/images/circuit-board.svg',
          component: 'UFredTemplatePage',
          url: 'ufredtemplates/quiz',
          container: 'row-20'
        },
        {
          title: 'reading_assignment',
          body: "<p>Dolor irure magna pariatur occaecat et dolore reprehenderit esse do anim qui commodo tempor.</p>",
          img: '/assets/images/circuit-board.svg',
          component: 'UFredTemplatePage',
          url: 'ufredtemplates/reading_assignment',
          container: 'row-20'
        },
        {
          title: 'research_assignment',
          body: "<p>Dolor irure magna pariatur occaecat et dolore reprehenderit esse do anim qui commodo tempor.</p>",
          img: '/assets/images/circuit-board.svg',
          component: 'UFredTemplatePage',
          url: 'ufredtemplates/research_assignment',
          container: 'row-20'
        },
        {
          title: 'self_check',
          body: "<p>Dolor irure magna pariatur occaecat et dolore reprehenderit esse do anim qui commodo tempor.</p>",
          img: '/assets/images/circuit-board.svg',
          component: 'UFredTemplatePage',
          url: 'ufredtemplates/self_check',
          container: 'row-20'
        },
        {
          title: 'slideout_click_display',
          body: "<p>Dolor irure magna pariatur occaecat et dolore reprehenderit esse do anim qui commodo tempor.</p>",
          img: '/assets/images/circuit-board.svg',
          component: 'UFredTemplatePage',
          url: 'ufredtemplates/slideout_click_display',
          container: 'row-20'
        },
        {
          title: 'summary',
          body: "<p>Dolor irure magna pariatur occaecat et dolore reprehenderit esse do anim qui commodo tempor.</p>",
          img: '/assets/images/circuit-board.svg',
          component: 'UFredTemplatePage',
          url: 'ufredtemplates/summary',
          container: 'row-20'
        },
        {
          title: 'table',
          body: "<p>Dolor irure magna pariatur occaecat et dolore reprehenderit esse do anim qui commodo tempor.</p>",
          img: '/assets/images/circuit-board.svg',
          component: 'UFredTemplatePage',
          url: 'ufredtemplates/table',
          container: 'row-20'
        },
        {
          title: 'text_click_display_w_image',
          body: "<p>Dolor irure magna pariatur occaecat et dolore reprehenderit esse do anim qui commodo tempor.</p>",
          img: '/assets/images/circuit-board.svg',
          component: 'UFredTemplatePage',
          url: 'ufredtemplates/text_click_display_w_image',
          container: 'row-20'
        },
        {
          title: 'text_click_display',
          body: "<p>Dolor irure magna pariatur occaecat et dolore reprehenderit esse do anim qui commodo tempor.</p>",
          img: '/assets/images/circuit-board.svg',
          component: 'UFredTemplatePage',
          url: 'ufredtemplates/text_click_display',
          container: 'row-20'
        },
        {
          title: 'text_only',
          body: "<p>Dolor irure magna pariatur occaecat et dolore reprehenderit esse do anim qui commodo tempor.</p>",
          img: '/assets/images/circuit-board.svg',
          component: 'UFredTemplatePage',
          url: 'ufredtemplates/text_only',
          container: 'row-20'
        },
        {
          title: 'timeline_click_display',
          body: "<p>Dolor irure magna pariatur occaecat et dolore reprehenderit esse do anim qui commodo tempor.</p>",
          img: '/assets/images/circuit-board.svg',
          component: 'UFredTemplatePage',
          url: 'ufredtemplates/timeline_click_display',
          container: 'row-20'
        },
        {
          title: 'topic_conclusion',
          body: "<p>Dolor irure magna pariatur occaecat et dolore reprehenderit esse do anim qui commodo tempor.</p>",
          img: '/assets/images/circuit-board.svg',
          component: 'UFredTemplatePage',
          url: 'ufredtemplates/topic_conclusion',
          container: 'row-20'
        },
        {
          title: 'topic_introduction',
          body: "<p>Dolor irure magna pariatur occaecat et dolore reprehenderit esse do anim qui commodo tempor.</p>",
          img: '/assets/images/circuit-board.svg',
          component: 'UFredTemplatePage',
          url: 'ufredtemplates/topic_introduction',
          container: 'row-20'
        },
        {
          title: 'vertical_image_w_text',
          body: "<p>Dolor irure magna pariatur occaecat et dolore reprehenderit esse do anim qui commodo tempor.</p>",
          img: '/assets/images/circuit-board.svg',
          component: 'UFredTemplatePage',
          url: 'ufredtemplates/vertical_image_w_text',
          container: 'row-20'
        },
        {
          title: 'video_intro',
          body: "<p>Dolor irure magna pariatur occaecat et dolore reprehenderit esse do anim qui commodo tempor.</p>",
          img: '/assets/images/circuit-board.svg',
          component: 'UFredTemplatePage',
          url: 'ufredtemplates/video_intro',
          container: 'row-20'
        },
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