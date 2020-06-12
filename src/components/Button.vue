<template>
  <button @click="handleClick">{{text}}</button>
</template>

<script>
export default {
  name: 'Button',
  props:{
    text: String
  },
  methods:{
    handleClick(){
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
  button{
    border: none;
    border-radius: 3px;
    color:white;
    text-transform: uppercase;
    background: #448aff;
    padding: 0.6em;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);
    cursor: pointer;
    min-width: 150px;
    transition: background 0.1s ease-in-out;
  }

  button.warning{
    background: #ff5252;
  }

  button:hover{
    background: rgba(68, 138, 255, 0.8);
  }

  button.warning:hover{
    background: rgba(255, 82, 82, 0.8);
  }
</style>