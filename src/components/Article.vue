<template>
  <div>
    <transition name="bounce-in" enter-active-class="animated bounceInRight">
      <div class="container" v-if="isMounted">
        <div class="partial">
          <div class="header-image"></div>
          <div class="article-description">
            
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Article',
  props: {
    header: String,
    headerImage: String,
    topicTitle: String
  }
}
</script>