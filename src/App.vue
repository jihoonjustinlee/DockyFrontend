<template>
  <div id="app">
    <div class="app__authentication" v-if="!unlocked">
      <div class="app__authentication__wrapper">
        <div class="input__wrapper">
          <label class="input__wrapper__label">Password</label>
          <input class="input__wrapper__password" v-model="userInput" type="password" @input="revertBack">
        </div>
        <button class="input__wrapper__submit" @click="submitPassword">Submit</button>
      </div>
      <div v-if="incorrect" class="app__authentication__incorrect">Incorrect password. Please try again.</div>
    </div>
    <div v-else>
      <Navbar/>
      <div class="main">
        <router-view/>
      </div>
    </div>
  </div>  
</template>

<script>
import Navbar from './components/Navbar'
export default {
  name: 'App',
  components:{
    Navbar
  },
  data(){
    return{
      unlocked: false,
      userInput: '',
      password: 'Secret123',
      incorrect: false
    }
  },
  mounted(){
    if (!this.unlocked){
      document.addEventListener('keydown', (e)=>{
        if (e.keyCode === 13){
          if (this.userInput !== this.password){
            this.incorrect = true
          } else{
            this.unlocked = true
          }
        }
      })
    }
  },
  methods:{
    submitPassword(){
      if (this.userInput !== this.password){
        this.incorrect = true
      } else{
        this.unlocked = true
      }
    },
    revertBack(){
      this.incorrect = false
    }
  }
}
</script>

<style>
  body{
    font-family: 'Noto Sans', sans-serif;
    margin: 0;
    padding: 0;
    background: #EEEEEE;
    overflow-x: hidden;
    font-size: 14px;
  }

  input, button, textarea{
    font-family: 'Noto Sans', sans-serif;
    font-size: 13px;
  }

  #app{
    height: 100vh;
  }

  .app__authentication{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .app__authentication__wrapper{
    display: flex;
    flex-direction: column;
  }

  .input__wrapper__label{
    margin-right: 1em;
  }

  .input__wrapper__password{
    border: none;
    padding: 0.5em;
    border-radius: 3px;
  }

  .input__wrapper__submit{
    border: none;
    margin-top: 1em;
    background: #00e600;
    padding: 0.5em;
    border-radius: 3px;
    color: white;
    cursor: pointer;
  }

  .app__authentication__incorrect{
    color: red;
  }

  .main{
    margin-left: 302px;
    padding: 0.5em 1em;
    height: calc(100vh - 1em);
  }

  a{
    text-decoration: none;
    color: black;
    outline: 0;
  }

  h1.header, h2.header{
    font-weight: normal;
  }

  .row-100{
    width: 100%;
    display: flex;
  }

  .row-50{
    width: 50%;
    display: flex;
  }

  .row-33{
    width: 33.3%;
    display: flex;
  }
  
  .row-25{
    width: 25%;
    display: flex;
  }

  .row-20{
    width: 20%;
    display: flex;
  }


</style>
