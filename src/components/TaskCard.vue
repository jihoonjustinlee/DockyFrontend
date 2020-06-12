<template>
  <div class="task">
    <div class="first-row">
      <div class="description">{{task.description}}</div>
      <font-awesome-icon icon="times" @click="removeTask" class="remove-task"/>
    </div>
    <div class="state-container">
      <button 
        @click="openStateDropdown"
        :class="['state-button', this.stateColor]"
        v-if="!stateDropdownOpened">{{state}}
      </button>
      <div v-else>
        <button class="state-button open" @click="changeState('Open')">Open</button>  
        <button class="state-button assigned" @click="changeState('Assigned')">Assigned</button>  
        <button class="state-button in-progress" @click="changeState('In Progress')">In Progress</button>
        <button class="state-button ready-for-qa" @click="changeState('Ready for QA')">Ready for QA</button>  
        <button class="state-button completed" @click="changeState('Completed')">Completed</button>  
      </div>
    </div>
    <button 
      v-if="!assignInputOpened"
      class="assign-task" 
      @click="openAssignTaskInput">
      Pitch In
    </button>
    <div v-else class="assignee-input-container">
        <input type="text" v-model="assignee" placeholder="Name" class="assignee-input">
        <div class="not-assigned-yet">
          <div 
            class="filtered"
            v-for="(assignee) in filteredAssignee"
            :key="assignee._id"
            style="display:inline-block"
            @click="addAssignee(assignee)">{{assignee.name}}
          </div>
        </div>
      
      <div class="already-assigned-container">
        <div 
          class="already-assigned"
          v-for="(assigned, index) in assignedTo"
          :key="index">{{assigned.name}}
        </div>
      </div>
      <button @click="assignTask" class="assign-task-button">Assign people above</button>
    </div>
    <div v-if="!assignInputOpened" class="assigned-people">
      <div 
        v-for="(assigned, index) in assignedTo" 
        :key="index"
        class="assignee"
        @click="removeAssignee(assigned)">
        {{assigned.name}}
      </div>
    </div>
    <div class="date">Task created on {{formattedDate}}</div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TaskCard',
  props: {
    task: void 0,
    project_id: void 0
  },
  data(){
    return{
      devs: void 0,
      assignInputOpened: false,
      assignee: '',
      assignedTo: this.task.assigned_to,
      state: this.task.state,
      stateDropdownOpened: false,
    }
  },
  computed:{
    formattedDate: function(){
      const date = new Date(Date.parse(this.task.assigned_date))
      const month = (date.getMonth()+1 < 10) ? `0${date.getMonth()+1}` : date.getMonth()+1
      const day = (date.getDate() < 10) ? `0${date.getDate()}` : date.getDate()
      const year = date.getFullYear().toString().slice(2,4)
      return `${month}/${day}/${year}`
    },
    filteredAssignee: function(){
      return this.devs.filter(dev=>{
        if (this.assignee === ''){
          return null
        }
        return dev.name.toLowerCase().includes(this.assignee.toLowerCase())
      })
    },
    stateColor: function(){
      let buttonState
      if (this.state === "Open"){
        buttonState = "open"
      } else if (this.state === "Assigned"){
        buttonState = "assigned"
      } else if (this.state === "In Progress"){
        buttonState = "in-progress"
      } else if (this.state === "Ready for QA"){
        buttonState = "ready-for-qa"
      } else if (this.state === "Completed"){
        buttonState = "completed"
      }
      return buttonState
    }
  },
  mounted(){
    fetch('https://ufred-dev.herokuapp.com/api/people')
      .then(res=>res.json())
      .then(json=>this.devs = json)
  },
  methods:{
    openAssignTaskInput(){
      this.assignInputOpened = true
    },
    assignTask(){
      const projectId = this.project_id
      const taskId = this.task._id
      axios.put(`https://ufred-dev.herokuapp.com/api/project/${projectId}/task/${taskId}/add_assignee`, this.assignedTo)
      this.assignInputOpened = false
    },
    addAssignee(assignee){
      let alreadyAssigned = false
      for (let i=0; i<this.assignedTo.length; i++){
        if (this.assignedTo[i]._id === assignee._id){
          alreadyAssigned = true
          break
        }
      }
      if (!alreadyAssigned){
        this.assignedTo.push(assignee)
        this.assignee = ''
      }
    },
    removeAssignee(assignee){
      const projectId = this.project_id
      const taskId = this.task._id
      const assigneeId = assignee._id
      axios.delete(`https://ufred-dev.herokuapp.com/api/project/${projectId}/task/${taskId}/assignee/${assigneeId}/remove_assignee`)      
      this.assignedTo = this.assignedTo.filter(assignedTo => assignedTo._id !== assigneeId)      
    },
    openStateDropdown(){
      this.stateDropdownOpened = true
    },
    changeState(state){
      const projectId = this.project_id
      const taskId = this.task._id
      axios.put(`https://ufred-dev.herokuapp.com/api/project/${projectId}/task/${taskId}/change_state`, {state: state})
        .then()
        .catch(err=>console.log(err))
      this.state = state
      this.stateDropdownOpened = false
    },
    removeTask(){
      const taskId = this.task._id
      const projectId = this.project_id
      axios.delete(`https://ufred-dev.herokuapp.com/api/project/${projectId}/task/${taskId}/remove_task`)
      this.$emit('removeTask', taskId)
    }
  }
}
</script>

<style scoped>
  .task{
    background: white;
    border-radius: 3px;
    padding: 0.5em;
    box-shadow: 0px 3px 3px 3px rgba(0,0,0,0.1);
    box-sizing: border-box;
  }

  button{
    font-size: 0.8em;
  }

  .first-row{
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .description{
    margin: 0.3em 0.2em;
  }

  .remove-task{
    width: 15px;
    height: 15px;
    padding: 0.3em;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer; 
    transition: background 0.1s ease-in-out;
  }

  .state-button{
    border: none;
    padding: 0.5em;
    border-radius: 3px;
    box-shadow: 0px 3px 3px 1px rgba(0,0,0,0.1);
    color:white;
    cursor: pointer;
    transition: background 0.1s ease-in-out;
    margin: 0.2em;
  }

  .state-button.open{
    background: rgb(204, 0, 153);
  }
  
  .state-button.open:hover{
    background: rgba(204, 0, 153, 0.7);
  }

  .state-button.assigned{
    background: rgb(68, 138, 255);
  }

  .state-button.assigned:hover{
    background: rgba(68, 137, 255, 0.7);
  }

  .state-button.in-progress{
    background: rgb(0, 204, 153);
  }

  .state-button.in-progress:hover{
    background: rgba(0, 204, 153, 0.7);
  }

  .state-button.ready-for-qa{
    background: rgb(153, 0, 51);
  }

  .state-button.ready-for-qa:hover{
    background: rgba(153, 0, 51, 0.7);
  }

  .state-button.completed{
    background: rgb(0, 0, 102);
  }
  
  .state-button.completed:hover{
    background: rgba(0, 0, 102, 0.7);
  }

  .remove-task:hover{
    background: rgba(0,0,0, 0.2);
  }

  .assign-task{
    border: none;
    padding: 0.5em;
    margin: 0.2em;
    border-radius: 3px;
    box-shadow: 0px 3px 3px 1px rgba(0,0,0,0.1);
    background: rgb(204, 0, 153);
    color: white;
    cursor: pointer;
    transition: background 0.1s ease-in-out;
    display: block;
  }

  .assign-task:hover{
    background: rgba(204, 0, 153, 0.5);
  }

  .assignee-input-container{
    display: flex;
    flex-direction: column;
  }

  .assignee-input{
    border: none;
    padding: 0.5em;
    background:#EEE;
    border-radius: 3px;
    font-size: 0.8em;
    margin: 0.2em;
  }

  .assigned-people{
    display: flex;
    font-size: 0.8em;
    flex-wrap: wrap;
  }

  .assigned-people .assignee{
    background: white;
    border: 1px solid #737373;
    padding: 0.5em;
    color: #737373;
    border-radius: 3px;
    margin: 0.2em;
    cursor: pointer;
  }
  .date{
    font-size: 0.7em;
    color: #ccc;
    margin: 0.5em 0.2em 0 0.2em;
  }

  .already-assigned-container{
    display: flex;
    flex-wrap: wrap;
  }

  .already-assigned{
    background: #808080;
    padding: 0.5em;
    color: #ffffff;
    border-radius: 3px;
    margin: 0.2em;
    font-size: 0.8em;
    box-shadow: 0px 3px 3px 1px rgba(0,0,0,0.1);
  }

  .not-assigned-yet{
    display: flex;
    flex-wrap: wrap;
  }

  .filtered{
    padding: 0.5em;
    margin: 0.2em;
    border-radius: 3px;
    box-shadow: 0px 3px 3px 1px rgba(0,0,0,0.1);
    background: rgb(204, 0, 153);
    color:white;
    cursor: pointer;
    transition: background 0.1s ease-in-out;
    font-size: 0.8em;
  }

  .filtered:hover{
    background: rgba(204, 0, 153, 0.5);
  }

  .assign-task-button{
    padding: 0.5em;
    margin: 2em 0.2em 0.2em 0.2em;
    border-radius: 3px;
    box-shadow: 0px 3px 3px 1px rgba(0,0,0,0.1);
    background: rgb(204, 0, 153);
    color:white;
    cursor: pointer;
    transition: background 0.1s ease-in-out;
    font-size: 0.8em;
    border: none;
  }

   .assign-task-button:hover{
    background: rgba(204, 0, 153, 0.5);
  }
</style>