// Geenrates the ticket code using random numbers converted to for every ticket generated.
function generateTicket() {
    try {
        const ticket_code = "TKT-" + Math.random().toString(36).substring(2, 10);
        return ticket_code;
    }
     catch (error) {
        res.status(400).json({message: "Failed to generate ticket"})
    }
}

// Function returning ticket expiration
function expireTicket() {
  let dateGenerated = new Date();      
  let expiryTime = new Date(dateGenerated.getTime() + 1 * 24 * 60 * 60 * 1000);

  dateGenerated = dateGenerated.toDateString();
  expiryTime = expiryTime.toDateString()  
  return { dateGenerated, expiryTime};
}

module.exports = {generateTicket, expireTicket};
