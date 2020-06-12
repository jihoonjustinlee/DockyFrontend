<template>
  <div class="epic"> from epic</div>
</template>

<script>
export default {
  name: 'Epic',
  props:{
    data: Object
  },
  mounted(){
    console.log(this.data)
  }
}
</script>

<style scoped>
  
</style>