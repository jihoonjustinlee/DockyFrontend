<template>
  <router-link :class="['card', container]" :to="url">
    <div class="content">
      <div v-if="img" class="img" :style="{backgroundImage:'url('+img+')'}"></div>
      <h1 class="title">{{title}}</h1>
      <div v-if="body" v-html="body"></div>
    </div>
    <CardFooter :text="'Last updated by '+author" v-if="author"/>
  </router-link>
</template>

<script>
import CardFooter from './CardFooter'

export default {
  name: 'Card',
  components:{
    CardFooter
  },
  props:{
    title: String,
    body: String,
    author: String,
    date: String,
    container: String,
    img: String,
    url: String
  }
}
</script>

<style scoped>
  .card{
    background: white;
    border-radius: 3px;
    padding: 1em;
    box-sizing: border-box;
    margin: 0.2em;
    box-shadow: 0px 3px 3px 0px rgba(0,0,0,0.15);
    transition: background 0.2s ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: space-between; 
  }

  .card:hover{
    background: rgba(51, 51, 51, 0.04);
  }

  .content{
    overflow: hidden;
    mask-image: linear-gradient(180deg, #000 95%, transparent);
    width: 100%;
  }

  .title{
    font-size: 1.3em;
    font-weight: normal;
    margin: 0.5em 0;
  }

  .img{
    height: 150px;
  }

  .row-100{
    width: calc(100% - 0.4em);
  }

  .row-100 .content{
    /* height: 100px; */
  }

  .row-25{
    width: calc(25% - 0.4em);
  }

  .row-50{
    width: calc(50% - 0.4em);
  }

  .row-25 .content{
    max-height: 250px;
    /* height: 280px; */
  }

  .row-20{
    width: calc(20% - 0.4em);
  }

  .row-20 .content{
    /* height: 220px; */
  }

</style>