const { getWeather } =  require('../utility/getWeather');
const { generateTicket } = require('../utility/ticketgen');
const { calculatePrice } = require('../utility/calculatePrice');
const {htmlToPdfAndSave} = require('../utility/genPDF');
const {encode} = require('../utility/config');
const {renderTemplate} = require('../utility/htmlTemplate');
const {createTicket, getTicket, checkSeatTaken} = require('../model/ticket');

const path = require("path");
const TICKETS_DIR = path.join(__dirname, '..', 'Tickets');
const server = encode().server;


async function generateTicketHtmlController (req, res) {
  try {
    const { passenger_name, seat_number, location } = req.body;
    const isSeatTaken = await checkSeatTaken(seat_number);

    if(isSeatTaken) {
      return res.status(400).json({
        message: `Seat number ${seat_number} is already taken. Choose another seat.`
      });
    }

    const weather = await getWeather(location);

    const amount = calculatePrice(weather);

    const ticket_code = generateTicket();

    const html = renderTemplate({
      passenger_name,
      // from: 'Base',
      to: location,
      date: Date.now(),
      seat_number,
      ticket_code,
      amount,
      weather: weather
    });

      // 5. create unique pdf filename
    const fileName = `ticket_${Date.now()}_${ticket_code}.pdf`;

    // 6. generate and save PDF
    const pdfPath = await htmlToPdfAndSave(html, TICKETS_DIR, fileName);

     // Saving ticket info to db
    const saveToDb = await createTicket(amount, ticket_code, seat_number, passenger_name);

    // 7. return download link
    const downloadUrl = `${server}/download-ticket/${fileName}`;

    return res.status(201).json({
      message: 'Ticket created',
      data: {
        passenger_name, to, date, seat_number, ticket_code, amount, weather, download: downloadUrl}
    });

  } catch (error) {
    console.error("Ticket generation error:", error.message);
    res.status(500).json({ message: "Failed to generate ticket" });
  }
}

async function getTicketsController(req, res) {
  try {
    const [rows] = await getTicket();  
    res.status(200).json({
      message: "Tickets retrieved successfully",
      data: rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch tickets"});
  }
}
module.exports = { generateTicketHtmlController, getTicketsController };
