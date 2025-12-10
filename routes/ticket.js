const express = require('express')
const router = express.Router();

const {generateTicketHtmlController, getTicketsController} = require('../controller/Ticket');
const {downloadTicketController} = require('../controller/downloadPDF');


router.post('/ticketgen', generateTicketHtmlController);
router.get('/download-pdf/:fileName', downloadTicketController);
router.get('/retrieveTicket', getTicketsController);

module.exports = router;