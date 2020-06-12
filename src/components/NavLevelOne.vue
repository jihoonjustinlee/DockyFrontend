<template>
  <div>
    <div class="wrapper">
      <router-link :to="link" class="label" exact @click.native="openChildNav">
        <font-awesome-icon :icon="icon" class="icon"/>
        <div>{{label}}</div>
      </router-link>
      <font-awesome-icon icon="chevron-right" :class="['arrow', {rotated: isChildNavOpened}]" @click="toggleChildNav" v-if="sub"/>
    </div>
    <div v-if="sub" :class="['sub-nav', {opened: isChildNavOpened}]">
      <NavLevelTwo 
        v-for="(nav, index) in sub"
        :key="index"
        :icon="nav.icon"
        :label="nav.label"
        :link="nav.link"
        :sub="nav.sub"
        :customClass="nav.customClass"
      />
    </div>
  </div>
</template>

<script>
import NavLevelTwo from './NavLevelTwo'

export default {
  name: 'NavLevelOne',
  data(){
    return{
      isChildNavOpened: false
    }
  },
  components:{
    NavLevelTwo
  },
  props: {
    link: String,
    label: String,
    sub: Array,
    icon: String
  },
  mounted(){
    this.openNavOnMountIfPath()
  },
  methods: {
    openChildNav(){
      if (!this.isChildNavOpened){
        this.isChildNavOpened = true
      }
    },
    toggleChildNav(){
      this.isChildNavOpened = !this.isChildNavOpened
    },
    openNavOnMountIfPath(){
      const path = this.$router.currentRoute.path
      if (path.indexOf(this.link) > -1){
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
    width: 20px;
    height: 20px;
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