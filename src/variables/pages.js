export default function createPagejs(json){
  let pages = []
  for (let i=0; i<json.length; i++){
    pages.push('"'+json[i].screenNumber+'"')
  }

  const content = `var pages = [${pages}]

//return the current page (iFrame) ID. It has '#pXX' format. for example #p0, #p1, #p23..
function getPageID(){
  console.log(window.location.pathname);
  var sPath = window.location.pathname;
  var sPage = sPath.substring(sPath.lastIndexOf('/') + 1).toLowerCase();
  
  for(let i=0; i<pages.length; i++) {
    if (pages[i].substring(pages[i].lastIndexOf('/') + 1).toLowerCase() == sPage) {
      return "#p"+i;
    }
  }
  return null; // page does not exists. 
}`
 
  const file = new File([content], 'pages.js', { type: 'application/javascript'})
  return file
}