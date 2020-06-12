<template>
  <div class="modal-container">
    <div class="modal">
      <div class="header">
        <font-awesome-icon 
          icon="times"
          @click="closeModal"
          class="header__close"
        />
      </div>
      <div class="content">
        <input 
          type="text" v-model="projectName" 
          placeholder="Name of the project"
          class="content__input">
        <Button
          text="Create your project"
          @click="createProject"
          class="content__button"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Button from './Button'
import axios from 'axios'

export default {
  name: 'AddProjectModal',
  components:{
    Button
  },
  data(){
    return{
      projectName: void 0
    }
  },
  methods:{
    closeModal(){
      this.$emit('closeModal')
    },
    createProject(){
      axios.post('https://ufred-dev.herokuapp.com/api/project', {name: this.projectName})
        .then((res)=>{
          this.$emit('closeModal')
          this.$emit('addProject', res.data)
        })
        .catch(err=>{console.log(err)})
    }
  }
}
</script>

<style scoped>
  .modal-container{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal{
    width: 90vw;
    max-width: 300px;
    background: white;
    box-shadow: 1px 1px 3px 1px rgba(0,0,0, 0.1);
    border-radius: 3px;
    padding: 1em 0.5em;
  }

  .header{
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .header__close{
    width: 15px;
    height: 15px;
    padding: 0.5em;
    cursor: pointer;
    color:darkgray;
  }

  .header__close:hover{
    color: rgba(0,0,0, 0.6);
  }

  .content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .content__input{
    margin-bottom: 1em;
    border: none;
    border-bottom: 1px solid #ccc;
    padding: 0.5em;
    width: 90%;
  }

  .content__button{
    width: 95%;
  }

</style>
