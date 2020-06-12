<template>
  <div class="legend">
    <div class="name" :style="{backgroundColor: data.backgroundColor, color: data.fontColor}">{{data.name}}</div>
    <div>Veniam et aute duis tempor officia</div>
    <div>Veniam et aute duis tempor officia</div>
    <div>Veniam et aute duis tempor officia</div>
    <div>Veniam et aute duis tempor officia</div>
    <div>Veniam et aute duis tempor officia</div>
    <div>Veniam et aute duis tempor officia</div>
  </div>
</template>

<script>
export default {
  name: 'Legend',
  props:{
    data: Object
  }
}
</script>

<style scoped>
  .legend{
    display: flex;
    margin: 0.3em 0;
  }

  .name{
    padding: 1em;
    width: 150px;
  }


</style>