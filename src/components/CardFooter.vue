<template>
  <div class="footer">
    <font-awesome-icon
      icon="clock"
      class="icon"
    />
    <div class="label">{{text}}</div>
  </div>
</template>

<script>
export default {
  name: 'CardFooter',
  props:{
    text:String
  }
}
</script>

<style scoped>
  .footer{
    font-size: 0.8em;
    color: #a6a6a6;
    padding-top: 0.5em;
    margin-top: 1em;
    border-top: 1px solid #f2f2f2;
    display: flex;
    align-items: center;
  }

  .icon{
    margin-right: 5px;
  }
</style>