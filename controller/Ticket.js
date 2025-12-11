const { getWeather } =  require('../utility/getWeather');
const { generateTicket } = require('../utility/ticketgen');
const { calculatePrice } = require('../utility/calculatePrice');
const {createTicket, getTicket, checkSeatTaken} = require('../model/ticket');

const {htmlToPdfAndSave} = require('../utility/genPDF');
const {encode} = require('../utility/config');
const {expireTicket} = require('../utility/ticketgen')
const {renderTemplate} = require('../utility/htmlTemplate');


const path = require("path");
const TICKETS_DIR = path.join(__dirname, '..', 'Tickets');
const server = encode().server;

const generateTicketHtmlController = async (req, res) => {
  try {
    const { passenger_name, seat_number, park_location, destination} = req.body;
    const isSeatTaken = await checkSeatTaken(seat_number);

    if(isSeatTaken) 
      return res.status(400).json({
        message: `Seat number ${seat_number} is already taken. Choose another seat.`
      });

    const weather = await getWeather(destination);

    const amount = calculatePrice(weather);

    const ticket_code = generateTicket();

    const ticket_date = expireTicket().dateGenerated;
    const ticketExpiredDate = expireTicket().expiryTime;


    const html = renderTemplate({
      passenger_name,
      from: park_location,
      to: destination,
      date: ticket_date,
      seat_number,
      ticket_code,
      amount,
      weather: weather,
      date_expired: ticketExpiredDate
    });

// 5. create unique pdf filename
    const fileName = `ticket_${Date.now()}_${ticket_code}.pdf`;

// 6. generate and save PDF
    const pdfPath = await htmlToPdfAndSave(html, TICKETS_DIR, fileName);

// Saving ticket info to db
    const saveToDb = await createTicket(passenger_name, ticket_code, amount, seat_number, weather, park_location, destination, ticketExpiredDate);

// 7. return download link
    const downloadUrl = `${server}/download-pdf/${fileName}`;

    return res.status(201).json({
      message: 'Ticket created',
      data: {
        passenger_name, seat_number, ticket_code, amount, weather, download: downloadUrl}
    });

  } catch (error) {
    console.error("Ticket generation error:", error.message);
    res.status(500).json({ message: "Failed to generate ticket" });
  }
}

const getTicketsController = async (req, res) => {
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
