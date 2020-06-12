export default function createHelpMenuPage(){
  const content = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="interface/css/style-variables.css">
    <link rel="stylesheet" type="text/css" href="interface/css/style-menu.css">
    <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
    <script src="assets/js/menus.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <title>Help</title>
  </head>
  <body class="helpwindow" style="height:100%; overflow-y: auto">
    <div class="fullMenuContainer">
      <div class="blackcolumn"></div>
      <h1>Help Screen<img class="menuClose" src="interface/images/menu_close.svg"></h1>
      <div class="divider"></div>
      <div class="tableRight">
        <table>
          <tr>
            <td><img class="helpicons" src="interface/images/arrowN_icon.svg"></td>
            <td><b class="highlight">Next</b>- Clicking this button will take you to the next screen of the current module.</td>
          </tr>
          <tr>
            <td><img class="helpicons" src="interface/images/arrowB_icon.svg"></td>
            <td><b class="highlight">Previous</b>- Clicking this button will take you to the previous screen of the current module.</td>
          </tr>
          <tr>
            <td><img class="helpicons" src="interface/images/help_icon.svg"></td>
            <td><b class="highlight">Help</b>- Clicking this button will take you to the Help screen where you can recieve help to successfully navigate the module.</td> 
          </tr>
          <tr>
            <td><img class="helpicons" src="interface/images/menu_icon.svg"></td>
            <td><b class="highlight">Menu</b> - Clicking this button will allow you to jump to other areas in the same module.</td>
          </tr>
          <tr>
            <td><img class="helpicons" src="interface/images/links_icon.svg"></td>
            <td><b class="highlight">Resource</b> - Clicking this button will take you to the Resource listing, where you will have access to relevant links and files associated with the module.</td>
          </tr>
          <tr style="display: none">
            <td><img class="helpicons" src="interface/images/cc_icon.svg"></div></td>
            <td><b class="highlight">Closed Captioning</b> - If available, clicking this button will open the Closed Captioning panel at the bottom of the screen. Click it again to close the panel.</td>
          </tr>
          <tr id="popouttext">
            <td><img  class="helpicons" id="popouticon" src="interface/images/mobile_menu_icon2.svg"></td>
            <td><b class="highlight">Popout</b> - Clicking this button will provide access to the Topic Navigation, Resources and Help menus.</td>
          </tr>
        </table>
        <p><b>Require further assistance? Please click <a class="techsupport" href="http://login.ufred.ca/mod/page/view.php?id=112982/#techsupport" target="_blank" style="color:#ffcf48"><b class="highlight">here</b></a> to contact our Technical Support team.</b></p>
      </div>
    </div>
  </body>
</html>`

  const file = new File([content], 'help_menu.html', {type: 'text/html'})
  return file
}