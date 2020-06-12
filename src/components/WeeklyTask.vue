<template>
  <div>
    <transition name="bounce-in" enter-active-class="animated bounceInRight">
      <div class="container" v-if="isMounted">
        <ul>
          <li>have weekly tasks available</li>
          <li>be able to edit each of the task</li>
        </ul>
      </div>
    </transition>

  </div>
</template>

<script>
export default {
  name: 'WeeklyTask',
  data(){
    return{
      isMounted: false
    }
  },
  mounted(){
    this.isMounted = true
  }
}
</script>

<style scoped>
  @import url('../../node_modules/animate.css/animate.min.css');
  
  .container{
    background: white;
    box-shadow: 0 1px 4px 0 rbga(0,0,0, .14);
    border-radius: 3px;
    padding: 1em;
  }

  td, th{
    border: 1px solid black;
  }
</style>