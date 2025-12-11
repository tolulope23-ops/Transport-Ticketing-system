const fs = require('fs');
const path = require('path');

//Reads ticket html file
function loadTemplate() {
  const tplPath = path.join(__dirname, '..', 'templates', 'ticketTemplate.html');
  return fs.readFileSync(tplPath, 'utf8');
}

//Funtion to replace each place holder with the actual value from data parameter using split and join method.
function renderTemplate(data) {
  let html = loadTemplate();

  for (const key in data) {
    html = html.split(`{{${key}}}`).join(data[key]);
  }
  return html;
}

module.exports = {renderTemplate};
