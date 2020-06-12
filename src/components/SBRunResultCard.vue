<template>
  <div :class="['wrapper', {wrong: thereIsError, header:isHeader}]">
    <div class="column first">
      <div :class="['sn', {wrong: errorInScreenNumber}]">
        <font-awesome-icon icon="times-circle" v-if="errorInScreenNumber"/>
        {{ screenNumber }}
      </div>
      <div class="revised" v-if="errorInScreenNumber">
        <font-awesome-icon icon="wrench" v-if="errorInScreenNumber"/>
        {{ revisedScreenNumber }}
      </div>
    </div>
    <div class="column second">
      <div :class="['st', {wrong: errorInScreenType}]">
        <font-awesome-icon icon="times-circle" v-if="errorInScreenType"/>
        {{ screenType }}
      </div>
      <div class="revised" v-if="errorInScreenType">
        <font-awesome-icon icon="wrench" v-if="errorInScreenType"/>
        {{ revisedScreenType }}
      </div>
    </div>
    <div class="column third">
      <div class="title">{{ title }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SBRunResultCard',
  props:{
    screenNumber: String,
    revisedScreenNumber: String,
    title: String,
    screenType: String,
    revisedScreenType: String,
    isHeader: Boolean
  },
  data(){
    return{
      isChecked: false,
      isMounted: false,
      isCustom: false
    }
  },
  computed:{
    thereIsError(){
      if (!this.isHeader){
        if ((this.screenNumber !== this.revisedScreenNumber) || (this.screenType !== this.revisedScreenType)){
          return true
        } else{
          return false
        }
      }
    },
    errorInScreenNumber(){
      if (!this.isHeader){
        return this.screenNumber !== this.revisedScreenNumber
      }
    },
    errorInScreenType(){
      if (!this.isHeader){
        return this.screenType !== this.revisedScreenType
      }
    }
  }
}
</script>
<style scoped>
  .wrapper{
    padding: 0.5em;
    margin: 0.2em 0;
    display: flex;
  }

  .wrapper:not(.header){
    background: rgba(0, 128, 0, 0.5);
    border-radius: 3px;
  }

  .wrapper.header{
    text-transform: uppercase;
    font-weight: bold;
    color: rgba(0,0,0,0.5);
    border-bottom: 2px solid #ccc;
    padding: 0.5em 0;
  }

  .wrapper.wrong{
    background: rgba(255, 0, 0, 0.5);
    /* border-radius: 3px; */
  }

  .revised{
    color: #1aff1a;
  }
  .sn.wrong, .st.wrong{
    color: red;
    width: 40%;
  }
  .revised{
    width: 60%;
  }
  /* .column:not(.third) div{
    width: 50%;
  } */

  .column{
    display:flex;
  }
  
  .column.first{
    width: 40%;
  }

  .column.second{
    width: 40%;
  }

  .column.third{
    width: 20%;
  }

</style>