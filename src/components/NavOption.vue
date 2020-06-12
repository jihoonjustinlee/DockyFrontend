<template>
  <router-link :to="link" :class="subNavStyle">
    <div class="nav-option">
      <font-awesome-icon v-bind:icon="icon" />
      <div>{{ label }}</div>
    </div>
  </router-link>
</template>

<script>

export default {
  name: 'NavOption',
  props: {
    icon: String,
    label: String,
    link: String,
    subNavStyle: String
  }
}
</script>

<style scoped>
  .nav-option{
    color: white;
    display: flex;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 1em;
  }

  svg{
    margin-right:0.5em;
  }

  a{
    transition: background 0.2s;
    border-radius: 3px;
  }

  a:hover{
    background: rgba(255, 255, 255, 0.1);
  }

  a.router-link-exact-active{
    background: #0d0d0d;
  }

  .sub-nav-1{
    margin-left: 2em;
  }
  .sub-nav-2{
    margin-left: 4em;
  }
</style>