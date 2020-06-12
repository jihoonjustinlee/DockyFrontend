<template>
  <div>
    <transition name="bounce-in" enter-active-class="animated bounceInRight">
      <div class="container" v-if="isMounted">
        <div class="partial">
          <div class="header-image"></div>
          <h1 class="topic">Currently Being Worked on Items on SPA</h1>
          <div class="article-description">
            <img src="/assets/images/i-like-food.svg" class="face">
            <div class="text">
              <span class="author">Justin Lee</span>
              <span class="d">Nov 5, 2019</span>
            </div>
          </div>
          <p>Nulla pariatur mollit anim Lorem exercitation pariatur fugiat laboris irure ea nisi. Deserunt sunt do do labore. Ea elit minim ut cillum commodo qui esse aliqua exercitation ut consectetur mollit. Eu amet et laborum voluptate nulla labore veniam reprehenderit consectetur velit ut dolor. Magna sint ea ad velit sunt ut reprehenderit. Quis duis eiusmod elit quis sit laborum quis velit dolor laborum. Ea commodo Lorem ipsum dolore sint deserunt velit.</p>
        </div>
      </div>
    </transition>
  </div>

</template>

<script>
export default {
  name: 'DevProgress',
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

<style scoped>
  .container{
    background: white;
    border-radius: 3px;
    padding: 1em;
  }

  .partial{
    width: 800px;
    display: block;
    margin: 0 auto;
  }
  
  .header-image{
    width: 100%;
    height: 300px;
    background-image: url('/assets/images/circuit-board.svg');
  }

  h1.topic{
    font-weight: normal;
    margin-top: 2em;
  }

  .topic-description{
    font-weight: normal;
    font-style: italic;
    color: rgba(0,0,0, 0.54);
  }

  .article-description{
    display: flex;
    align-items: center;
  }

  .face{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #ccc;
    margin-right: 10px;
  }

  .text{
    display: flex;
    flex-direction: column;
    font-size: 14px;
  }

  .text .date{
    color: rgba(0,0,0, 0.54);
    margin-top: 0.5em;
  }
</style>