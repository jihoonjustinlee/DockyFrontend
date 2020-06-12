<template>
  <div>
    <transition name="bounce-in" enter-active-class="animated bounceInRight">
      <div class="container" v-if="isMounted">
        <div class="partial">
        <div class="header-image"></div>
        <h1 class="topic">Motive for building SPA, and future work for UFred.</h1>
        <h3 class="topic-description">I started building SPA just for Docky, but things kind of got bigger and bigger.</h3>
        <div class="article-description">
          <img src="/assets/images/i-like-food.svg" class="face">
          <div class="text">
            <span class="author">Justin Lee</span>
            <span class="date">Nov 1, 2019</span>
          </div>
        </div>
        <p>The only code that I originally had for this single page application was the logic built behind Docky, and really this was the only goal that I wanted to achieve going forward to what we call SPA. But in order for Docky to be readily accessible by other developers at UFred, I had to come up with a way to share this website. One way was to deploy the website on the cloud with a domain, or share the local code that I have on my PC to other developers.</p>
        <p>Big downside of sharing local code is that only people who have what I have physically build will have access to the website. So theoretically, the best way is to have this website on the cloud.</p>
        <p>I am still not quite sure if I am able to deploy the website. Because this kind of started as my personal project (because I really hated filling in an excel sheet for each of the course that we were building) to make development process much faster. But with the idea of deploying the SPA as a website made me want to do a lot of things, especially for having our UFred resources somewhere where it is readily available. But having the website on the cloud meant that the company assets were also accessible by people outside of UFred.</p>
        <p>I guess the only way is to give an access token when accessing the website, or deploy the website on a private server where it is only availble on UFred domain.</p>
        <h1 class="topic">Things I Would Like to Work on In the Future</h1>
        <div class="box-container">
          <div class="box assigned" v-for="(item, index) in assignedItems" :key="index">
            {{item}}
          </div>
        </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'DevUpdates',
  data(){
    return{
      isMounted: false,
      assignedItems: [
        "Automatic content doc creation from a storyboard",
        "Integrate Adobe Stock API to grab all the image assets automatically",
        "Integrate Docky for Minerva (Advanced) template",
        "Write a documentation on how to fill in the storyboard properly. How screen is named, how the assests are named in the storyboard. More of functional stuffs rather than content",
        "Write logic to find errors in the storyboard (such as finding wrong screen number because it is shifted by one). Focusing more on functional side of the storyboard so that it run smoothly with Docky",
        "Have weekly tasks available / editable on SPA",
        "Have our development milestone available / editable on SPA",
        "Deploy the website on the cloud",
        "Create material icons. More for visual appealing to the website",
        "Build our own Learning Management System",
        "Develop a mobile (Android / iOS) application for University of Fredericton. Will be used to connect with employees, take courses",
        "Find more interesting (but realistically possible) way to create a course other than HTML based pages"
      ],
      inProgressItems:[

      ]
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

  .box-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .box{
    width: calc(33% - 0.6em);
    height: 150px;
    background: rgba(169, 27, 27, 0.8);
    margin: 0.3em;
    display: flex;
    align-items: center;
    padding: 1em;
    box-sizing: border-box;
    color: white;
    border-radius: 3px;
    box-shadow: 0 1px 4px 0 rgba(0,0,0, 0.14);
  }
</style>