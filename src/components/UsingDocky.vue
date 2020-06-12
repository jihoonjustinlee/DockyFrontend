<template>
  <div>
    <transition name="bounce-in" enter-active-class="animated bounceInRight">
    <div class="container" v-if="isMounted">
      <div class="partial-container">
        <div class="header-image"></div>
        <h1 class="topic">What is Docky?</h1>
        <h3 class="topic-description">Docky is a storyboard interpreter that contributes to the efficiency in the course development at UFred.</h3>
        <div class="article-description">
          <img class="face" src="/assets/images/i-like-food.svg">
          <div class="text">
            <span class="author">Justin Lee</span>
            <span class="date">Nov 1, 2019</span>
          </div>
        </div>
        <p>Docky is a storyboard (written in .docx) interpreter that is able to generate a SCORM package which can be directly uploaded on the LMS. But all developers should look through the generated files before uploading the package on the LMS.</p>
        <p>Docky can accept two types of file extension: .docx and .xml. You can think of .docx as collection of xml files that are packaged together. You wouldn't find any instances where you will be uploading .xml file since all the storyboards are written in .docx format.</p>
        <p>Storyboard needs to be formatted in a standardized way in order for Docky to understand the content inside. If you are an instructional designer, you can always refer to setting up a proper table in the word doc, as well as filling in the right information for each template. You can refer to the guidelines <router-link to="/references/ufredtemplates" class="reference" target="_blank">here </router-link>by clicking on each of the template.</p>
        <h1 class="topic">Accessing Docky Through the Website</h1>
        <p>On the left, there should be a navigation bar. Under the section Tools, click on Docky.</p>
        <img src="/assets/images/docky1.png">
        <p>Upon opening Docky, you should be able to see a section where you can drop off your storyboard (.docx) file. The drop section refers to the big white box. The storyboard can either be dragged and dropped, or by clicking on the white box.</p>
        <img src="/assets/images/docky2.png" style="width: 100%">
        <p>After uploading the storyboard, you should see two input fields where the course name, and the zip file name is entered. You can leave these sections blank. But the course name should refer to the actual course name that your storyboard belongs to, and the zip file name should be the name of the SCORM package that you will be uploading to LMS.</p>
        <img src="/assets/images/docky3.png" style="width: 100%">
        <p>Type in all of the optional fields, then press the SUBMIT button.</p>
        <img src="/assets/images/docky4.png" style="width: 100%">
        <p>After waiting for a few seconds, your .zip file should be ready.</p>
        <img src="/assets/images/docky5.png" style="width: 100%">
        <p>Structure of the output files should look like the picture below. There should be an interface folder that holds most of static files that are used throughout all the courses. It should also have imsmanifest.xml file which is a wrapper file that is used to recognize the .zip file as the SCORM package. Number of files really depend on how long the storyboard is. The more pages there are in the course, the bigger .zip file size would be.</p>
        <img src="/assets/images/docky6.png">
        <h1 class="topic">Accessing Docky Through the Local Code</h1>
        <p>I'm also writing this section in case this website is not deployed on the cloud by the time you started developing a course using Docky.</p>
        <p>I will assume that you have grabbed all the SPA code. This guideline will go over generally on how to set up all the node modules as well as setting up a backend, and frontend services in order for Docky to work properly.</p>
        <p>The first requirement is to have Node.js installed on your computer. You can download it from their official website.</p>
        <p>If you are not familiar with using command line interface, there are many resources that you can refer to online. But it should be pretty simple.</p>
        <p>From the root folder, go a folder named ufred-website-backend</p>
        <div class="code">C:\Users\jlee\code\ufred-website>cd ufred-website-backend</div>
        <p>Run the backend service. The backend service is generally used to serve all the static files that are required to generate a course, such as all the files that are in the interface folder. Static files refer to any files that does not need any modificiation.</p>
        <div class="code">C:\Users\jlee\code\ufred-website\ufred-website-backend>node index.js</div>
        <p>Upon successful launching of backend service. You should be able to see the success message in the command line interface.</p>
        <div class="code">C:\Users\jlee\code\ufred-website\ufred-website-backend>node index.js<br>Server is running on port 3000</div>
        <p>To test that backend is running properly, you can test out one of the API end point by typing the address below in your web browser. The address should return the javascript code that is used in our accordion template.</p>
        <div class="code">localhost:3000/api/interface/js/accordion.js</div>
        <p>You are now ready to run the frontend service. What frontend refers is all the things that you can visually see on a website. To run the frontend service, first you should go to the frontend repository.</p>
        <div class="code">C:\Users\jlee\code\ufred-website>cd ufred-website-frontend</div>
        <p>Download all the necessary node modules. This may take a while.</p>
        <div class="code">C:\Users\jlee\code\ufred-website\ufred-website-frontend>npm install --save</div>
        <p>Run the frontend service. This also may take a while.</p>
        <div class="code">C:\Users\jlee\code\ufred-website\ufred-website-frontend>npm run serve</div>
        <p>After all the code is compiled, the website should be accessible on port 8080. Type the link in your browser below. When launching the website, you should be able to see the dashboard of UFred Development site.</p>
        <div class="code">localhost:8080</div>
        <p>You can now access Docky by following the first reference that I've written above. Pretty simple, right?</p>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'UsingDocky',
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
  @import url('../../node_modules/animate.css/animate.min.css');
  li{
    margin-bottom: 1em;
  }
  
  .reference{
    color: rgba(0,0,255, 0.7);
  }

  .container{
    background: white;
    border-radius: 3px;
    padding: 1em;
  }

  .header-image{
    width: 100%;
    height: 300px;
    background-image: url('/assets/images/i-like-food.svg');
  }

  h1.topic{
    font-weight: normal;
    margin-top: 2em;
  }

  .topic-description{
    font-weight: normal;
    font-style: italic;
    color: rgba(0, 0, 0, 0.54);
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
  
  .partial-container{
    width: 800px;
    display: block;
    margin: 0 auto;
  }

  .code{
    font-family: Consolas,monospace;
    background: rgb(223, 223, 233);
    padding: 0.2em;
    margin-bottom: 2em;
  }

</style>