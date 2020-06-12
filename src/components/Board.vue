<template>
  <div class="board">
    <div class="board__header">
      <Button 
        text="Add a project" 
        @click="openModal"
      />
      <div class="board__header__input-wrapper">
        <font-awesome-icon icon="search"/>
        <input type="text" v-model="filtered" placeholder="Search for a project">
      </div>
    </div>
    <div class="project-container">
      <ProjectCard 
        v-for="(project, index) in filteredProject"
        :key="index"
        :project="project"
        @deleteProject="deleteProject"
      />
    </div>
    <AddProjectModal 
      v-if="showModal"
      @closeModal="closeModal"
      @addProject="addProject"
      />
  </div>
</template>

<script>
import ProjectCard from './ProjectCard'
import Button from './Button'
import AddProjectModal from './AddProjectModal'

export default {
  name: 'Board',
  components:{
    ProjectCard,
    Button,
    AddProjectModal
  },
  data(){
    return{
      projects: [],
      showModal: false,
      filtered: ''
    }
  },
  mounted(){
    fetch('https://ufred-dev.herokuapp.com/api/projects')
      .then(res => res.json())
      .then(json => this.projects = json)
  },
  computed:{
    filteredProject: function(){
      let filteredProject = this.projects.filter(project => {
        return project.name.toLowerCase().includes(this.filtered.toLowerCase())
      })
      let orderedProject = filteredProject.sort((a,b) => {
        if (a.name > b.name) return 1
        if (a.name < b.name) return -1
        return 0
      })
      return orderedProject
    }
  },
  methods:{
    openModal(){
      this.showModal = true
    },
    addProject(project){
      this.projects.push(project)
    },
    closeModal(){
      this.showModal = false
    },
    deleteProject(id){
      const deletedProject = this.projects.find(project=>project._id === id)
      const index = this.projects.indexOf(deletedProject)
      this.projects.splice(index, 1)
    }
  }
}
</script>

<style scoped>
  .board{
    margin-bottom: 1em;
  }
  
  .project-container{
    margin-top: 15px;
    display: grid;
    grid-gap: 10px;
  }

  .board__header{
    display: flex;
  }

  .board__header__input-wrapper{
    display: flex;
    align-items: center;
    margin-left: 1em;
    border-radius: 3px;
    background: #ffffff;
    flex: 1;
    max-width: 500px;
  }

  .board__header__input-wrapper svg{
    color: #ccc;
    margin-left: 1em;
    margin-right: 0.5em;
  }

  .board__header__input-wrapper input{
    border: none;
    padding: 0.5em;
    width: 100%;
    flex: 1;
    display: none;
  }
</style>