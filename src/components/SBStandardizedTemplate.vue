<template>
    <div class="container" v-if="isMounted">
      <div class="content">
        <div class="header-image"></div>
        <h1 class="topic">Templating Engine</h1>
        <h3 class="topic-description">Templating Engine is a .dotx file where you can take a look at how the storyboard is filled for each of available template.</h3>
        <div class="article-description">
          <img src="/assets/images/i-like-food.svg" class="face">
          <div class="text">
            <span class="author">Justin Lee</span>
            <span class="date">Nov 22, 2019</span>
          </div>
        </div>
        <p>This .dotx file helps instructional designers to fill in the right information for each of the templates efficiently. Before having this tool, we had to manually copy and paste the table content for each of the template which was very annoying.</p>
        <p>How Templating Engine works is inside this .dotx file, there are data that can be auto-populated, and the data that I am referring to are the available templates.</p>
        <p>Click the download button below to download the .dotx file. For the instructional designers that are unsure of how to use the engine, follow the instruction below.</p>
        <a href="/assets/resources/Templating Engine.dotx" class="download-button">Download</a>
        <h1 class="topic">Creating a storyboard with Templating Engine</h1>
        <p>When opening the Templating Engine, you should see a first table. There are also sections where the information need to be filled in. </p>
        <img src="/assets/images/templatingengine/1.png" alt="" class="instruction-image">
        <p>You should be able to see a section in the top left corner where you can fill in the course title, as well as module title. Courses are usually divided into multiple modules, and each of the module can have different topics. That's generally how courses are constructed at UFred. The course usually starts with a video introduction where the student is able to grasp the overview of the course by watching a video.</p>
        <p>After filling in all the information for video_intro page, you would usually want to include a topic introduction page. To insert a topic_introduction page: </p>
        <img src="/assets/images/templatingengine/2.png" class="instruction-image">
        <span class="figure-description">Make sure the cursor is placed after the first table. This is pretty obvious that we are trying to append new tables after one another.</span>
        <img src="/assets/images/templatingengine/3.png" class="instruction-image">
        <span class="figure-description">Click Insert button on the top.</span>
        <img src="/assets/images/templatingengine/4.png" class="instruction-image">
        <span class="figure-description">Click Quick Parts</span>
        <img src="/assets/images/templatingengine/5.png" class="instruction-image">
        <span class="figure-description">Click AutoText. You should be able to see the list of all available templates when scrolling down.</span>
        <img src="/assets/images/templatingengine/6.png" alt="" class="instruction-image">
        <span class="figure-description">Scroll down until you find Topic_Introduction. Clicking on it will auto-populate a table for topic_introduction.</span>
        <img src="/assets/images/templatingengine/7.png" alt="" class="instruction-image">
        <span class="figure-description">You should now see a new table that has a screen type topic_introduction. If you have noticed, the content compared to video_intro and the topic_introduction are quite different. This is simply because the content that each page shows will be different from one template to another.</span>
        <p>It should be pretty straight forward from here. To insert a new page, you can follow the same step as we did to create a topic introduction page.</p>
        <p class="congrats">Congratulations, you did it! 🎉</p>
      </div>
    </div>
</template>

<script>

export default {
  name: 'SBStandardizedTemplate',
  data(){
    return{
      isMounted: false
    }
  },
  mounted(){
    this.isMounted = true;
  }
}
</script>

<style scoped>
  .instruction-image{
    max-width: 100%;
    box-shadow: 0px 0px 2px 2px rgba(0,0,0,0.1);
    display: block;
    margin: 0 auto;
  }
  .congrats{
    font-size: 1.5em;
    
  }
  .figure-description{
    text-align: center;
    display: block;
    color: rgba(0,0,0, 0.60);
    font-size: 13px;
    width: 60%;
    margin: 0 auto;
    font-style: italic;
    margin-bottom: 3em;
  }

  .container{
    background: white;
    border-radius: 3px;
    padding: 1em;
  }

  .header-image{
    width: 100%;
    height: 300px;
    background-image: url('/assets/images/circuit-board.svg');
  }

  .topic{
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

  .content{
    width: 50%;
    margin: 0 auto;
  }

  .download-button{
    display: block;
    text-align: center;
    width: 150px;
    color: white;
    padding: 0.6em;
    border-radius: 3px;
    background: #448aff;
    font-size: 14px;
    text-transform: uppercase;
  }

  .download-button:hover{
    background: rgba(68, 138, 255, 0.8);
  }
</style>