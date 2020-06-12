<template>
  <div>
    from Revert
    {{isMounted}}
  </div>
</template>

<script>
export default {
  name: 'Revert',
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