export default function createEmptyPageForUnknown(json){
  const content = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>${json.screenTitle}</title>
  </head>
  <body>
    <p>Screen type ${json.screenType} is not supported. Revise this page manually.</p>
  </body>
</html>`

  const file = new File([content], json.screenNumber, { type: 'text/html'})
  return file
}