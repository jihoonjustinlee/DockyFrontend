<template>
  <div class="home" v-if="isMounted">
    <!-- <Roadmap/> -->
    <Card
      v-for="(post, index) in posts"
      :key="index"
      :title="post.title"
      :body="post.body"
      :author="post.author"
      :date="post.created_at"
      container="row-100"
      :url="'posts/'+post._id"
    />
  </div>
</template>

<script>
import Card from './Card'
import Roadmap from './Roadmap'

export default {
  name: "home",
  components: {
    Card,
    Roadmap
  },
  mounted(){
    fetch('https://ufred-dev.herokuapp.com/api/posts')
      .then(res=>res.json())
      .then(data=>this.posts = data)
      .then(()=>this.isMounted = true)
  },
  data(){
    return{
      posts: [],
      isMounted: false
    }
  }
};
</script>

<style scoped>
.home {
  display: flex;
  flex-wrap: wrap;
}
</style>