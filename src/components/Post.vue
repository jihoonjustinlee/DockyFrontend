<template>
  <div class="container" v-if="isMounted">
    <h1 class="title">{{post.title}}</h1>
    <div>{{post.body}}</div>
  </div>
</template>

<script>
export default {
  name: 'Post',
  data(){
    return{
      post: '',
      isMounted: false
    }
  },
  mounted(){
    const id = this.$route.params.id
    fetch(`https://ufred-dev.herokuapp.com/api/posts/${id}`)
      .then(res=>res.json())
      .then(data=> this.post = data)
      .then(()=>this.isMounted = true)
  }
}
</script>

<style scoped>
  .container{
    background: white;
    border-radius: 3px;
    padding: 1em;
    box-sizing: border-box;
    box-shadow: 0px 3px 3px 0px rgba(0,0,0,0.15);
  }

  .title{
    font-size: 1.5em;
    font-weight: normal;
  }
</style>

