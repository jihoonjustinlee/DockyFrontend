<template>
  <div>
    <transition name="bounce-in" enter-active-class="animated bounceInRight">
      <div class="container" v-if="isMounted">
        <ul>
          <li>have milestone available, like the excel that that was seen</li>
          <li>be able to edit each of the milestone, include dragging / custom time input, etc</li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Milestone',
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
  }
</style>