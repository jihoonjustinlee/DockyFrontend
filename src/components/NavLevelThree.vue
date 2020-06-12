<template>
  <div>
    <div class="wrapper">
      <router-link :to="link" class="label" exact @click.native="openChildNav">
        <font-awesome-icon :icon="icon" class="icon"/>
        <div>{{label}}</div>
      </router-link>
      <font-awesome-icon icon="chevron-right" v-if="sub" :class="['arrow', {rotated: isChildNavOpened}]" @click="toggleChildNav"/>
    </div>
    <div v-if="sub" :class="['sub-nav', {opened: isChildNavOpened}]">
      <NavLevelThree
        v-for="(nav, index) in sub"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
import NavLevelThree from './NavLevelThree'

export default {
  name: 'NavLevelTwo',
  components:{
    NavLevelThree
  },
  props:{
    icon: String,
    label: String,
    link: String,
    sub: Array
  },
  data(){
    return{
      isChildNavOpened: false
    }
  },
  methods:{
    toggleChildNav(){
      this.isChildNavOpened = !this.isChildNavOpened
    },
    openChildNav(){
      if (!this.isChildNavOpened){
        this.isChildNavOpened = true
      }
    }
  }
}
</script>

<style scoped>
  .wrapper{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 4em;
    overflow: hidden;
  }

  .label{
    color: white;
    display: flex;
    align-items: center;
    padding: 1em;
    flex-grow: 1;
    border-radius: 3px;
    transition: background 0.1s ease-in-out;
  }
  .label:hover{
    background: rgba(0,0,0, 0.5);
  }

  .arrow{
    padding: 1em;
    cursor: pointer;
    transition: transform 0.1s ease-in-out;
  }

  .arrow.rotated{
    transform: rotate(90deg);
  }

  .icon{
    width: 10px;
    height: 10px;
    margin-right: 10px;
  }

  .label.router-link-active{
    background: rgba(0,0,0, 0.8);
  }

  .sub-nav{
    height: 0;
    overflow-y: hidden;
    transition: height 0.2s ease-in-out;
  }
  
  .sub-nav.opened{
    height: 100%;
  }

</style>