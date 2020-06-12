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
  name: 'MinervaTemplates',
  components:{
    Card
  },
  mounted(){
    console.log(this.templates.length)
    this.isMounted = true
  },
  data(){
    return{
      isMounted: false,
      templates:[
        {
          title: 'accordion_plus',
          body: '',
          img: '/assets/images/bubbles.svg',
          component: 'MinervaTemplatePage',
          url: 'minervatemplates/accordion_plus',
          container: 'row-20'
        },
        {
          title: 'accordion_plus2',
          body: '',
          img: '/assets/images/bubbles.svg',
          component: 'MinervaTemplatePage',
          url: 'minervatemplates/accordion_plus2',
          container: 'row-20'
        },
        {
          title: 'accordion',
          body: '',
          img: '/assets/images/bubbles.svg',
          component: 'MinervaTemplatePage',
          url: 'minervatemplates/accordion',
          container: 'row-20'
        },
        {
          title: 'assignment',
          body: '',
          img: '/assets/images/bubbles.svg',
          component: 'MinervaTemplatePage',
          url: 'minervatemplates/assignment',
          container: 'row-20'
        },
        {
          title: 'drag_and_drop',
          body: '',
          img: '/assets/images/bubbles.svg',
          component: 'MinervaTemplatePage',
          url: 'minervatemplates/drag_and_drop',
          container: 'row-20'
        },
        {
          title: 'drag_and_drop2',
          body: '',
          img: '/assets/images/bubbles.svg',
          component: 'MinervaTemplatePage',
          url: 'minervatemplates/drag_and_drop2',
          container: 'row-20'
        },
        {
          title: 'horizontal_image_w_text',
          body: '',
          img: '/assets/images/bubbles.svg',
          component: 'MinervaTemplatePage',
          url: 'minervatemplates/horizontal_image_w_text',
          container: 'row-20'
        },
        {
          title: 'image_click_display',
          body: '',
          img: '/assets/images/bubbles.svg',
          component: 'MinervaTemplatePage',
          url: 'minervatemplates/image_click_display',
          container: 'row-20'
        },
        {
          title: 'self_check',
          body: '',
          img: '/assets/images/bubbles.svg',
          component: 'MinervaTemplatePage',
          url: 'minervatemplates/self_check',
          container: 'row-20'
        },
        {
          title: 'summary',
          body: '',
          img: '/assets/images/bubbles.svg',
          component: 'MinervaTemplatePage',
          url: 'minervatemplates/summary',
          container: 'row-20'
        },
        {
          title: 'table',
          body: '',
          img: '/assets/images/bubbles.svg',
          component: 'MinervaTemplatePage',
          url: 'minervatemplates/table',
          container: 'row-20'
        },
        {
          title: 'text_only',
          body: '',
          img: '/assets/images/bubbles.svg',
          component: 'MinervaTemplatePage',
          url: 'minervatemplates/text_only',
          container: 'row-20'
        },
        {
          title: 'topic_conclusion',
          body: '',
          img: '/assets/images/bubbles.svg',
          component: 'MinervaTemplatePage',
          url: 'minervatemplates/topic_conclusion',
          container: 'row-20'
        },
        {
          title: 'topic_introduction',
          body: '',
          img: '/assets/images/bubbles.svg',
          component: 'MinervaTemplatePage',
          url: 'minervatemplates/topic_introduction',
          container: 'row-20'
        },
        {
          title: 'vertical_image_w_text',
          body: '',
          img: '/assets/images/bubbles.svg',
          component: 'MinervaTemplatePage',
          url: 'minervatemplates/vertical_image_w_text',
          container: 'row-20'
        },
        {
          title: 'video_intro',
          body: '',
          img: '/assets/images/bubbles.svg',
          component: 'MinervaTemplatePage',
          url: 'minervatemplates/video_intro',
          container: 'row-20'
        },
        {
          title: 'video_standard',
          body: '',
          img: '/assets/images/bubbles.svg',
          component: 'MinervaTemplatePage',
          url: 'minervatemplates/video_standard',
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