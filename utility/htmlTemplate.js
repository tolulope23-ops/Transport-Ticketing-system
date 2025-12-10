const fs = require('fs');
const path = require('path');

function loadTemplate() {
  const tplPath = path.join(__dirname, '..', 'templates', 'ticketTemplate.html');
  return fs.readFileSync(tplPath, 'utf8');
}

// console.log(loadTemplate());

function renderTemplate(data) {
  let html = loadTemplate();

  for (const key in data) {
    html = html.split(`{{${key}}}`).join(data[key]);
  }
  return html;
}

module.exports = {renderTemplate};
