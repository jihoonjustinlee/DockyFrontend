import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home'
import Tools from './components/Tools'
import Docky from './components/Docky'
import RapidGen from './components/RapidGen'
import Downloadables from './components/Downloadables'
import References from './components/References'
import ZipDownload from './components/ZipDownload'
import WeeklyTask from './components/WeeklyTask'
import Milestone from './components/Milestone'
import UFredTemplates from './components/UFredTemplates'
import UFredTemplatePage from './components/UFredTemplatePage'
import Revert from './components/Revert'
import UsingDocky from './components/UsingDocky'
import StoryboardReference from './components/StoryboardReference'
import DevUpdates from './components/DevUpdates'
import DevProgress from './components/DevProgress'
import SBRun from './components/SBRun'
import SBRunResult from './components/SBRunResult'
import Post from './components/Post'
import SBStandardizedTemplate from './components/SBStandardizedTemplate'
import MinervaTemplates from './components/MinervaTemplates'
import MinervaTemplatePage from './components/MinervaTemplatePage'
import Board from './components/Board'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/board',
      name: 'Board',
      component: Board
    },
    {
      path: '/posts/:id',
      name: 'Post',
      component: Post
    },
    {
      path: '/weeklytask',
      name: 'WeeklyTask',
      component: WeeklyTask
    },
    {
      path: '/dev-updates',
      name: 'DevUpdates',
      component: DevUpdates
    },
    {
      path: '/dev-progress',
      name: 'DevProgress',
      component: DevProgress
    },
    {
      path: '/milestone',
      name: 'Milestone',
      component: Milestone
    },
    {
      path: '/tools',
      name: 'Tools',
      component: Tools
    },
    {
      path: '/tools/docky',
      name: 'Docky',
      component: Docky
    },
    {
      path: '/tools/sbrun',
      name: 'SBRun',
      component: SBRun
    },
    {
      path: '/tools/sbrun/result',
      name: 'SBRunResult',
      component: SBRunResult,
      props: true
    },
    {
      path: '/tools/revert',
      name: 'Revert',
      component: Revert
    },
    {
      path: '/tools/docky/download',
      name: 'Download',
      component: ZipDownload,
      props: true
    },
    {
      path: '/tools/rapidgen',
      name: 'RapidGen',
      component: RapidGen
    },
    {
      path: '/downloads',
      name: 'Downloadables',
      component: Downloadables
    },
    {
      path: '/downloads/sbtemplate',
      name: 'SBStandardizedTemplate',
      component: SBStandardizedTemplate
    },
    {
      path: '/references',
      name: 'References',
      component: References
    },
    {
      path: '/references/usingdocky',
      name: 'UsingDocky',
      component: UsingDocky
    },
    {
      path: '/references/storyboard',
      name: 'StoryboardReference',
      component: StoryboardReference
    },
    {
      path: '/references/ufredtemplates',
      name: 'UFredTemplates',
      component: UFredTemplates
    },
    {
      path: '/references/ufredtemplates/:type',
      name: 'UFredTemplatePage',
      component: UFredTemplatePage,
      props: true
    },
    {
      path: '/references/minervatemplates',
      name: 'MinervaTemplates',
      component: MinervaTemplates
    },
    {
      path: '/references/minervatemplates/:type',
      name: 'MinervaTemplatePage',
      component: MinervaTemplatePage,
      props: true
    }
  ]
})