<template>
  <nav>
    <NavLevelOne 
      v-for="(nav, index) in lists" 
      :key="index"
      :link="nav.link"
      :category="nav.category"
      :label="nav.label"
      :sub="nav.sub"
      :icon="nav.icon"
    />
  </nav>  
</template>
<script>
import NavLevelOne from './NavLevelOne'

export default {
  name: 'Navbar',
  components:{
    NavLevelOne
  },
  data(){
    return{
      lists: [
        {
          category: 'name',
          icon: 'home',
          label: 'Home',
          link: '/'
        },
        {
          icon: 'columns',
          label: 'Dashboard',
          link: '/board'
        },
        {
          category: 'tools',
          icon: 'toolbox',
          label: 'Tools',
          link: '/tools',
          sub: [
            {
              icon: 'star-of-life',
              label: 'Docky',
              link: '/tools/docky'
            },
            {
              icon: 'star-of-life',
              label: 'SBRun',
              link: '/tools/sbrun'
            },
            {
              icon: 'star-of-life',
              label: 'Revert',
              link: '/tools/revert'
            },
            {
              icon: 'star-of-life',
              label: 'RapidGen',
              link: '/tools/rapidgen'
            }
          ]
        },
        {
          category: 'downloads',
          icon: 'file-download',
          label: 'Downloads',
          link: '/downloads',
          sub: [
            {
              link: '/downloads/sbtemplate',
              icon: 'star-of-life',
              label: 'Templating Engine'
            },
            {
              link: '/downloads/ufredstyleguide',
              icon: 'star-of-life',
              label: 'UFred Styleguide'
            },
            {
              link: '/downloads/minervastyleguide',
              icon: 'star-of-life',
              label: 'Minerva Styleguide'
            },
            {
              link: '/downloads/gwlstyleguide',
              icon: 'star-of-life',
              label: 'GWL Styleguide'
            },
            {
              link: '/downloads/accessibilitydoc',
              icon: 'star-of-life',
              label: 'Accessibility Documentation'
            }
          ]
        },
        {
          category: 'references',
          icon: 'book',
          label: 'References',
          link: '/references',
          sub: [
            {
              link: '/references/ufredtemplates',
              icon: 'star-of-life',
              label: 'UFred Template Sets',
              customClass: 'ufred',
              sub:[
                {
                  link: '/references/ufredtemplates/accordion_plus',
                  icon: 'star-of-life',
                  label: 'accordion_plus'
                },
                {
                  link: '/references/ufredtemplates/accordion_plus2',
                  icon: 'star-of-life',
                  label: 'accordion_plus2'
                },
                {
                  link: '/references/ufredtemplates/accordion',
                  icon: 'star-of-life',
                  label: 'accordion'
                },
                {
                  link: '/references/ufredtemplates/carousel',
                  icon: 'star-of-life',
                  label: 'carousel'
                },
                {
                  link: '/references/ufredtemplates/discussion_forum',
                  icon: 'star-of-life',
                  label: 'discussion_forum'
                },
                {
                  link: '/references/ufredtemplates/drag_and_drop',
                  icon: 'star-of-life',
                  label: 'drag_and_drop'
                },
                {
                  link: '/references/ufredtemplates/drag_and_drop2',
                  icon: 'star-of-life',
                  label: 'drag_and_drop2'
                },
                {
                  link: '/references/ufredtemplates/flow_click_display',
                  icon: 'star-of-life',
                  label: 'flow_click_display'
                },
                {
                  link: '/references/ufredtemplates/horizontal_image_w_text',
                  icon: 'star-of-life',
                  label: 'horizontal_image_w_text'
                },
                {
                  link: '/references/ufredtemplates/image_click_display',
                  icon: 'star-of-life',
                  label: 'image_click_display'
                },
                {
                  link: '/references/ufredtemplates/quiz',
                  icon: 'star-of-life',
                  label: 'quiz'
                },
                {
                  link: '/references/ufredtemplates/reading_assignment',
                  icon: 'star-of-life',
                  label: 'reading_assignment'
                },
                {
                  link: '/references/ufredtemplates/research_assignment',
                  icon: 'star-of-life',
                  label: 'research_assignment'
                },
                {
                  link: '/references/ufredtemplates/self_check',
                  icon: 'star-of-life',
                  label: 'self_check'
                },
                {
                  link: '/references/ufredtemplates/slideout_click_display',
                  icon: 'star-of-life',
                  label: 'slideout_click_display'
                },
                {
                  link: '/references/ufredtemplates/summary',
                  icon: 'star-of-life',
                  label: 'summary'
                },
                {
                  link: '/references/ufredtemplates/table',
                  icon: 'star-of-life',
                  label: 'table'
                },
                {
                  link: '/references/ufredtemplates/text_click_display_w_image',
                  icon: 'star-of-life',
                  label: 'text_click_display_w_image'
                },
                {
                  link: '/references/ufredtemplates/text_click_display',
                  icon: 'star-of-life',
                  label: 'text_click_display'
                },
                {
                  link: '/references/ufredtemplates/text_only',
                  icon: 'star-of-life',
                  label: 'text_only'
                },
                {
                  link: '/references/ufredtemplates/timeline_click_display',
                  icon: 'star-of-life',
                  label: 'timeline_click_display'
                },
                {
                  link: '/references/ufredtemplates/topic_conclusion',
                  icon: 'star-of-life',
                  label: 'topic_conclusion'
                },
                {
                  link: '/references/ufredtemplates/topic_introduction',
                  icon: 'star-of-life',
                  label: 'topic_introduction'
                },
                {
                  link: '/references/ufredtemplates/vertical_image_w_text',
                  icon: 'star-of-life',
                  label: 'vertical_image_w_text'
                },
                {
                  link: '/references/ufredtemplates/video_intro',
                  icon: 'star-of-life',
                  label: 'video_intro'
                }
              ]
            },
            {
              link: '/references/minervatemplates',
              icon: 'star-of-life',
              label: 'Minerva Template Sets',
              customClass: "minerva",
              sub:[
                {
                  link: '/references/minervatemplates/accordion_plus',
                  icon: 'star-of-life',
                  label: 'accordion_plus'
                },
                {
                  link: '/references/minervatemplates/accordion_plus2',
                  icon: 'star-of-life',
                  label: 'accordion_plus2'
                },
                {
                  link: '/references/minervatemplates/accordion',
                  icon: 'star-of-life',
                  label: 'accordion'
                },
                {
                  link: '/references/minervatemplates/assignment',
                  icon: 'star-of-life',
                  label: 'assignment'
                },
                {
                  link: '/references/minervatemplates/drag_and_drop',
                  icon: 'star-of-life',
                  label: 'drag_and_drop'
                },
                {
                  link: '/references/minervatemplates/drag_and_drop2',
                  icon: 'star-of-life',
                  label: 'drag_and_drop2'
                },
                {
                  link: '/references/minervatemplates/horizontal_image_w_text',
                  icon: 'star-of-life',
                  label: 'horizontal_image_w_text'
                },
                {
                  link: '/references/minervatemplates/image_click_display',
                  icon: 'star-of-life',
                  label: 'image_click_display'
                },
                {
                  link: '/references/minervatemplates/self_check',
                  icon: 'star-of-life',
                  label: 'self_check'
                },
                {
                  link: '/references/minervatemplates/summary',
                  icon: 'star-of-life',
                  label: 'summary'
                },
                {
                  link: '/references/minervatemplates/table',
                  icon: 'star-of-life',
                  label: 'table'
                },
                {
                  link: '/references/minervatemplates/text_only',
                  icon: 'star-of-life',
                  label: 'text_only'
                },
                {
                  link: '/references/minervatemplates/topic_conclusion',
                  icon: 'star-of-life',
                  label: 'topic_conclusion'
                },
                {
                  link: '/references/minervatemplates/topic_introduction',
                  icon: 'star-of-life',
                  label: 'topic_introduction'
                },
                {
                  link: '/references/minervatemplates/vertical_image_w_text',
                  icon: 'star-of-life',
                  label: 'vertical_image_w_text'
                },
                {
                  link: '/references/minervatemplates/video_intro',
                  icon: 'star-of-life',
                  label: 'video_intro'
                },
                {
                  link: '/references/minervatemplates/video_standard',
                  icon: 'star-of-life',
                  label: 'video_standard'
                }
              ]
            },
            {
              link: '/references/usingdocky',
              icon: 'star-of-life',
              label: 'Docky Documentation'
            },
            {
              link: '/references/usingrapidgen',
              icon: 'star-of-life',
              label: 'Using Rapidgen'
            },
            {
              link: '/references/storyboard',
              icon: 'star-of-life',
              label: 'Storyboard Checklist'
            }
          ]
        }
      ]
    }
  }
}
</script>
<style scoped>
  nav{
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #a91b1b;
    color: white;
    position: fixed;
    width: 302px;
    box-shadow: 0 10px 30px -12px rgba(0,0,0,.42),0 4px 25px 0 rgba(0,0,0,.12),0 8px 10px -5px rgba(0,0,0,.2);
    padding: 1em;
    box-sizing: border-box;
    overflow-y: auto;
    scrollbar-width: thin;
    font-size: 13px;
  }
</style>