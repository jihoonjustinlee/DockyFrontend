export default function createResourceMenuPage(){
  const content = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Resources</title>
    <link rel="stylesheet" href="interface/css/style-variables.css">	
    <link rel="stylesheet" type="text/css" href="interface/css/style-menu.css">
    <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
    <script src="assets/js/menus.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  </head>
  <body class="helpwindow">
    <div class="fullMenuContainer">
      <div class="blackcolumn"></div>
      <h1>Resources<img class="menuClose" src="interface/images/menu_close.svg"></h1>
      <div>
        <p>Welcome to the resources screen. Listed below are all of the various external resources and links referenced in this module.<br><br><strong>Click each link to learn more.</strong><!-- There are no resources found in this module. --></p>
      </div>
    </div>
    <div class="menunav">
      <div class="tableRight">
        <table> 
          <!--resource links should be set in menus.js-->
          <tr class="resourceLinks" id="1"><td class="tdL"><img  class="menuicons" src="interface/images/link_icon.svg"></td><td class="tdR">Placeholder</td></tr>
          <tr class="resourceLinks" id="2"><td class="tdL"><img  class="menuicons" src="interface/images/file_icon.svg"></td><td class="tdR">Placeholder</td></tr>
        </table>
      </div>
    </div>
  </body>
</html>`  

  const file = new File([content], 'resource_menu.html', {type: 'text/html'})
  return file
}