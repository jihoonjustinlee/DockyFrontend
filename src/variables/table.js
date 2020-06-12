export default function createTablePage(json){
  const content = `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      <title>${json.screenTitle}</title>
      <link rel="stylesheet" href="interface/css/style-variables.css">
      <link rel="stylesheet" type="text/css" href="interface/css/style.css">
      <link rel="stylesheet" href="interface/css/table.css">
      <script src="interface/js/jquery.js"></script>
      <script src="interface/js/table.js"></script>
      <script>
        // Title of the table
        let tableTitle = 'Title'
        
        // A 2D array that contains the content of the table, tableContent[0] is the header row, tableContent[1] and on are the content rows. In the default example below, we are constructing a three column table with one header row and two content rows.
        let tableContent = [
          ['Header1',
          'Header2',
          'Header3'
          ],
          ['Lorem ipsum dolor sit amet, ',
          'Lorem ipsum dolor sit amet, ',
          'Lorem ipsum dolor sit amet, '
          ],
          ['Lorem ipsum dolor sit amet,  ',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse n']
        ]
        
        // Determine how many audios are needed, set to negative number to indicate animation timing/custom implementation is required.
        let numAudios = 3;
      </script> 
    </head>
    <body>
      <div class="flexBox column">
        <div class="textarea fullWidth">
          <h1>${json.screenTitle}</h1>
          <p style="background:yellow">Table template is not supported. Revise this page manually.</p>
          <div class="table-users"></div>
          <p class="directive">Click the ‘Next’ arrow to continue.</p>
        </div>
      </div>
      <script src="assets/js/pages.js"></script>
      <script src="interface/js/media_control.js"></script>
      <script src="interface/js/audio_markup_generator.js"></script>
    </body>
  </html>
  `
  
  const file = new File([content], json.screenNumber, { type: 'text/html'})
  return file
}