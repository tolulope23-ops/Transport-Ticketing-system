const path = require('path');
const fs = require('fs');

const TICKETS_DIR = path.join(__dirname, '..', 'Tickets');

function downloadTicketController(req, res){
  const { fileName } = req.params;
  if (!fileName) 
    return res.status(400).json({ message: 'File name required' });

  const filePath = path.join(TICKETS_DIR, fileName);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'Ticket not found' });
  }

  res.download(filePath, fileName, (err) => {
    if (err) console.error('Download error:', err);
  });
}

module.exports = { downloadTicketController };
