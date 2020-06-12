import { getModuleNumber, getModuleTitle } from './video_intro'

export default function createIndexPage(courseName){
  const content = `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <title>${courseName}</title>
    <link rel="stylesheet prefetch" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="interface/css/style-variables.css">
    <link rel="stylesheet" href="interface/css/style-index.css">
    <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
    <link rel="stylesheet" href="interface/css/selectize.css">
    <link rel="stylesheet" href="interface/css/devmode.css">
    <link rel="stylesheet" href="interface/css/audio-control.css">
    <link rel="stylesheet" href="interface/css/progressbar.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.1/TweenMax.min.js"></script>
    <script src="assets/js/pages.js"></script>
    <script src="assets/js/cctext.js"></script>
    <script src="interface/js/index.js"></script>
    <script src="interface/js/selectize.min.js"></script>
    <script src="interface/js/sessionTime.js"></script>
    <script src="interface/js/SCORM_API_wrapper.js"></script>
    <script src="interface/js/audio-control.js"></script>
    <script src="interface/js/progressbar.js"></script>
    <base target="_self">
  </head>
  <script type="text/javascript">
    // Flag for quiz Data readiness; Keep the variables here as vars, since we need to access them from child frame Quiz. - Bill (Also clean up the old scorm code at somepont, they look stinky...)
    var quizDataReady = false;

    //creating shortcut for less verbose code
    var scorm = pipwerks.SCORM;

    function init(){
      //Specify SCORM 1.2:
      scorm.version = "1.2";
      show("Initializing course.");
      var callSucceeded = scorm.init();
      show("Call succeeded? " +callSucceeded);
      console.log("Scorm initialization succeeded? " +callSucceeded);

      // The purpose of this is if user left on the quiz window and next time they open scorm will land right on quiz page. 
      //We need to ensure that the scorm data is ready before processing anything, to prevent user submit regardless number of attempts.
      callSucceeded ? quizDataReady = true : null;
    }
    init();
    scorm.save();

    function set(param, value){
      show("Sending: '" +value +"'");
      var callSucceeded = scorm.set(param, value);
      show("Call succeeded? " +callSucceeded);
      return callSucceeded;
    }

    function get(param){
      var value = scorm.get(param);
      show("Received: '" +value +"'");
      return value;
    }

    function complete(){
      show("Setting course status to 'completed'.");
      var callSucceeded = scorm.set("cmi.core.lesson_status", "completed");
      show("Call succeeded? " +callSucceeded);
    }

    function end(){
      show("Terminating connection.");
      var saved = scorm.save();//pipwerks function for LMSCommit()
      show("Save succeeded? " + saved);
      var callSucceeded = scorm.quit();
      show("quit succeeded? " +callSucceeded);
    }

    function show(msg){
      var debugText = document.getElementById("debugText");
      if(debugText){
        debugText.innerHTML += msg +"<br/>";
      }
      //Can also show data using pipwerks.UTILS.trace
      pipwerks.UTILS.trace(msg);
    }
  
    function getStudentName(){
      //console.log("Welcome " + scorm.get("cmi.learner_name")); 
      //var stName = get("cmi.core.student_name");
      var stName = scorm.get("cmi.core.student_name").split(',');
      //return first name
      return stName[1];
    }

    window.onload = function (){
      //show student's name			
      console.log("Welcome " + getStudentName()); 
    }

    window.onunload = function (){
      updateSessionTime(startTime)
    }
  </script>	
  <body>
    <div id="devMode" class="devModeContainer">
      <select class="devSearch" name="search" placeholder="choose html file" id="search" onChange="renderPage(this)"></select>
      <button id="copy" onclick="copyToClipboard()">Copy</button>
    </div>
    <div class="blocker offBlocker"></div>
    <div class="header-container">
      <div class="logo-tab">
        <picture>
          <source media="(max-width: 480px)" srcset="interface/images/shield_tab.svg">
          <img src="interface/images/logo_tab.svg" alt="">
        </picture>
      </div>
      <div class="header">
        <div class="course-title">${courseName}</div>
      </div>
      <div class="top-bar1"></div>
      <div class="top-bar2"></div>
    </div>
    <div id="iframe-container" name="iframe-container" class="iframe-container"> 
      <div class="blockAndFade"></div>
      <div class="fader"></div>	
    </div>

    <div id="helpMenu" class="sideMenu">
      <iframe frameborder="0" src="help_menu.html" allowfullscreen  ></iframe>
    </div>

    <div id="resourceMenu" class="sideMenu">
      <iframe frameborder="0" src="resource_menu.html" allowfullscreen  ></iframe>
    </div>

    <div id="mainMenu" class="sideMenu">
      <iframe id="mainMenuIframe" frameborder="0" src="main_menu.html" allowfullscreen  ></iframe>
    </div>
    <div id="bgImage"></div>
    <div class="extraMenu">
      <div class="extraNav-items">
        <img class="extraBtn" id="extraMain" src="interface/images/menu_icon.svg" alt=""/>
        <div class="extraSpacer">&nbsp;</div>
        <img class="extraBtn" id="extraResource" src="interface/images/links_icon.svg" alt=""/>
        <div class="extraSpacer">&nbsp;</div>
        <img class="extraBtn" id="extraHelp" src="interface/images/help_icon.svg" alt=""/>
      </div>
    </div>

    <div class="audio-control audio-hidden">
      <div id="no-audio-text">No audio on this page.</div>
      <div class="mute-toggle-padding" id="mtp"></div>
      <div class="play-toggle-padding" id="ptp"></div>
      <div class="replay-padding" id="rp"></div>
      <div class="slider-wrapper">
        <input type="range" min="0" max="100" class="volume-control" id="vol-control" oninput="setVolume(this.value)">
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 233.8966 28.1875"><defs><style>.cls-1{fill:#a81f23;}.cls-1,.cls-2,.cls-4{fill-rule:evenodd;}.cls-2{fill:url(#linear-gradient);}.cls-3,.cls-4{fill:#fff;}</style><linearGradient id="linear-gradient" x1="141.85716" y1="0.21137" x2="141.85716" y2="27.9639" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#2d2d2d"/><stop offset="1"/></linearGradient></defs><g id="red"><path class="cls-1 audio-hide" d="M45.87266,0C21.246,0,9.83622,11.85065,0,28.1875H233.89659V0Z"/></g><g id="black"><path class="cls-2" d="M93.358,0C69.9835,0,55.27159,11.63239,49.81773,28.1875H233.89659V0Z"/></g><g id="icon_headphones"><path class="cls-3" d="M41.17008,16.08435l.09675-.2767a1.13962,1.13962,0,0,0-.5271-1.37827,6.29678,6.29678,0,1,0-12.59213-.05576,1.138,1.138,0,0,0-.64139,1.434l.09676.2767a3.24451,3.24451,0,0,0,.13978,2.39633A3.24119,3.24119,0,0,0,29.11231,20.401l.04642.1327a1.09733,1.09733,0,0,0,1.4118.68345L31.876,20.738l-.15888-.4545.88644-.63216-1.853-5.26907-1.06618.08747-.07675-.21929A4.8352,4.8352,0,0,1,39.2632,13.971l-.17441.49877-1.06637-.08747-1.853,5.26907.88639.63216-.15888.4545,1.3055.47919a1.09735,1.09735,0,0,0,1.41186-.68345l.04641-.1327a3.24118,3.24118,0,0,0,1.36962-1.92036A3.24505,3.24505,0,0,0,41.17008,16.08435Z"/></g><g id="icon_replay"><path class="cls-3" d="M220.1783,13.65859a4.8732,4.8732,0,0,1,.03646.58654,4.50676,4.50676,0,1,1-9.00729,0,4.59138,4.59138,0,0,1,4.50365-4.67428,4.36813,4.36813,0,0,1,2.58234.847l1.03006-1.1503-.13587,3.419-3.05881.222L217.205,11.7039a2.786,2.786,0,0,0-1.45375-.41076,2.99525,2.99525,0,1,0,2.8834,2.9931c0-.05648-.00188-.11259-.00471-.16838Z"/></g><g id="icon_play"><path id="play" class="cls-4" d="M195.121,9.35783l6.62282,4.81659L195.121,18.991Z"/></g><g id="icon_pause"><path class="cls-3" d="M199.23834,19.02963V9.37747h2.00549V19.0293h-2.00549Zm-3.65855-9.65216h2.00529V19.0293h-2.00529Z"/></g><g id="icon_audio"><path class="cls-4" d="M84.13979,20.76315a.45489.45489,0,0,1-.19423.04367.48754.48754,0,0,1-.44722-.321.55152.55152,0,0,1,.25607-.69806,6.23087,6.23087,0,0,0,3.43232-5.688A6.23583,6.23583,0,0,0,83.7429,8.40033a.54836.54836,0,0,1-.25541-.69761.47062.47062,0,0,1,.63962-.27849,7.30012,7.30012,0,0,1,4.034,6.67512A7.30072,7.30072,0,0,1,84.13979,20.76315Zm1.92336-6.664A4.994,4.994,0,0,1,83.31229,18.659a.45034.45034,0,0,1-.192.04373.48727.48727,0,0,1-.44885-.321.55131.55131,0,0,1,.25469-.69806,3.927,3.927,0,0,0,2.16309-3.58444,3.92949,3.92949,0,0,0-2.1742-3.5947.54987.54987,0,0,1-.25509-.69754.47214.47214,0,0,1,.63955-.27941A5.00089,5.00089,0,0,1,86.06315,14.09915Zm-2.15472-.00091a2.63247,2.63247,0,0,1-1.44384,2.39738A.44676.44676,0,0,1,82.27,16.54a.48743.48743,0,0,1-.44716-.31942.55106.55106,0,0,1,.25365-.699,1.61118,1.61118,0,0,0-.01039-2.853.54854.54854,0,0,1-.2564-.69715.47257.47257,0,0,1,.63694-.282A2.62608,2.62608,0,0,1,83.90843,14.09824Zm-6.075-2.3983h.0249l2.951-2.25324v9.6389l-2.97587-2.26893Zm-2.78081,4.38134V12.32582a.62455.62455,0,0,1,.62328-.62588h1.40952v5.00723H75.67592A.62459.62459,0,0,1,75.05264,16.08128Z"/></g><g id="icon_mute"><path class="cls-4" d="M77.83345,11.69994h.0249l2.951-2.25324v9.6389l-2.97587-2.26893Zm-2.78081,4.38134V12.32582a.62455.62455,0,0,1,.62328-.62588h1.40952v5.00723H75.67592A.62459.62459,0,0,1,75.05264,16.08128Zm12.93563.51517L87.17,17.423l-2.294-2.31791-2.2702,2.29354-.812-.82034,2.2702-2.29354-2.29405-2.3179.81827-.82657,2.294,2.31791,2.2702-2.29353.812.82034-2.27227,2.29353Z"/></g></svg>
    </div>
  
    <div class="bottom-bar1"></div>
    <div class="bottom-bar2"></div>	
    <div class="footer" style=" z-index: 10;">
      <div class="footerBlocker footer" style=""></div>
      <td>
        <div class="module-title">
          <div>Module ${getModuleNumber()}: ${getModuleTitle()}</div>
        </div>
      </td>
      <td>
        <div class="svg-container">
          <div class="center-svg">
            <div class="progress-container">
              <span id="meter"></span>
              <span id="percent"></span>
            </div>
          </div>			 
        </div>
        <div class="nav-items">
          <img class="btn" id="ccButton" src="interface/images/cc_icon.svg" alt="" ondragstart="return false;" style="display:none"/>				
          <img class="btn" id="main" src="interface/images/menu_icon.svg" alt="" ondragstart="return false;"/>
          <img class="btn" id="resource" src="interface/images/links_icon.svg" alt="" ondragstart="return false;"/>
          <img class="btn" id="help" src="interface/images/help_icon.svg" alt="" ondragstart="return false;"/>
          <img class="btn" id="extraMenus" src="interface/images/mobile_menu_icon2.svg" alt="" ondragstart="return false;"/>
          <div class="spacer">&nbsp;</div>
          <img class="btn" id="back" src="interface/images/arrowB_icon.svg" alt="" ondragstart="return false;"/>
          <img class="btn" id="forward" src="interface/images/arrowN_icon.svg" alt="" ondragstart="return false;"/>
        </div>
      </td>
    </div>
    <div id="stopIt">
      <div class="flashyBit"><img src="interface/images/alert_icon.svg" alt=""></div>
      <p id="stopItText"></p>
      <div id="closeIt"></div>
    </div>
    <div class="bottom-bar2" id="ccContainer"> 
      <div id="closedCaption">
        <div id="ccText"></div>
      </div>	
    </div>	

    <script>		
      /*----------------add touch functionality---------------*/
      $(".btn, .extraBtn").on('touchstart', function(){
        $(this).css({"background-color" : "#a91e23"}); 
      }).on('touchend', function(){
        $(this).css({"background-color" : "rgba(0,0,0,0)"});
      });
  
      function loadjscssfile(filename, filetype){
        if (filetype=="js"){ //if filename is a external JavaScript file
          var fileref=document.createElement('script')
          fileref.setAttribute("type","text/javascript")
          fileref.setAttribute("src", filename)
        }
        else if (filetype=="css"){ //if filename is an external CSS file
          var fileref=document.createElement("link")
          fileref.setAttribute("rel", "stylesheet")
          fileref.setAttribute("type", "text/css")
          fileref.setAttribute("href", filename)
        }
        if (typeof fileref!="undefined")
          document.getElementsByTagName("head")[0].appendChild(fileref)
      } 

      const _R = document.querySelector('[type=range]');
      document.documentElement.classList.add('js');

      _R.addEventListener('input', e => {
        _R.style.setProperty('--val', +_R.value);
      }, false);
    </script>
  </body>
</html>`

  const file = new File([content], "index.html", {type: 'text/html'})
  return file
}