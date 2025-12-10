const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');

async function htmlToPdfAndSave(htmlContent, destFolder, fileName) {
  if (!fs.existsSync(destFolder)) {
    fs.mkdirSync(destFolder, { recursive: true });
  }

  const pdfPath = path.join(destFolder, fileName);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  await page.pdf({ path: pdfPath, format: 'A4', printBackground: true });

  await browser.close();
  return pdfPath;
}

module.exports = { htmlToPdfAndSave };
