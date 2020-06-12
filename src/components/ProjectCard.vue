<template>
  <div class="project">
    <div class="header">
      <div class="name">{{project.name}}</div>
      <font-awesome-icon 
        icon="times"
        @click="deleteProject"
        class="delete-project-button"
      />
    </div>
    <div class="task-grid">
      <TaskCard
        v-for="(task, index) in tasks"
        :key="index"
        :task="task"
        :project_id="project._id"
        @removeTask="removeTask"
      />
      <div 
        v-if="!taskInputOpened"
        class="add-task"
        @click="addTask" 
      >
        + Add a new task
      </div>
      <div v-else class="submit-task">
        <textarea v-model="description"></textarea>
        <div class="submit">
          <button @click="submitTask">Add</button>
          <font-awesome-icon
            icon="times"
            @click="cancelSubmitTask"
            class="cancel-submit"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TaskCard from './TaskCard'
import axios from 'axios'

export default {
  name: 'ProjectCard',
  props:{
    project: void 0
  },
  data(){
    return{
      taskInputOpened: false,
      description: void 0,
      tasks: this.project.tasks
    }
  },
  components:{
    TaskCard
  },
  methods:{
    addTask(){
      this.taskInputOpened = true
    },
    submitTask(){
      const id = this.project._id
      axios.put(`https://ufred-dev.herokuapp.com/api/project/${id}/add_task`, {description: this.description})
        .then(res=>{
          this.tasks.push(res.data)
          this.description = ''
          this.taskInputOpened = false
        })
        .catch(err=>console.log(err))
    },
    cancelSubmitTask(){
      this.taskInputOpened = false
    },
    deleteProject(){
      const id = this.project._id
      axios.delete(`https://ufred-dev.herokuapp.com/api/project/${id}`)
      this.$emit('deleteProject', id)
    },
    removeTask(id){
      this.tasks = this.tasks.filter(task=>task._id !== id)
    }
  }
}
</script>

<style scoped>
  .project{
    background: #448aff;
    padding: 1em;
    border-radius: 3px;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);
  }

  .add-task{
    cursor: pointer;
    padding: 0.5em;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.2);
    transition: background 0.1s ease-in-out;
  }

  .add-task:hover{
    background: rgba(255,255,255, 0.5);
  }

  .submit-task{
    display: grid;
    grid-row-gap: 0.5em;
  }

  .task-grid{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 0.5em;
  }

  .submit-task textarea{
    border: none;
    padding: 0.5em;
    border-radius: 3px;
    box-shadow: 0px 3px 3px 3px rgba(0,0,0,0.1);
    width: 100%;
    box-sizing: border-box;
  }
  
  .submit{
    display: flex;
    align-items: center;
  }

  .submit button{
    border: none;
    padding: 0.5em;
    cursor: pointer;
    border-radius: 3px;
    box-shadow: 0px 3px 3px 3px rgba(0,0,0,0.1);
    background: #00cc99;
    color: white;
    width: 100px;
    margin-right: 0.5em;
  }

  .cancel-submit{
    width: 15px;
    height: 15px;
    padding: 0.5em;
    cursor: pointer;
  }

  .cancel-submit:hover{
    color: #d9d9d9;
  }

  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #ffffff;
    margin-bottom: 0.5em;
  }

  .delete-project-button{
    background: rgb(223, 58, 58);
    width: 15px;
    height: 15px;
    padding: 3px;
    border-radius: 2px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.1s ease-in-out;
  }

  .delete-project-button:hover{
    background: #e25050;
  }
</style>