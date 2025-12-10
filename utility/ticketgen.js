function generateTicket() {
    try {
        const ticket_code = "TKT-" + Math.random().toString(36).substring(2, 10);
        return ticket_code;
    }
     catch (error) {
        res.status(400).json({message: "Failed to generate ticket"})
    }
}
// console.log(generateTicket());
module.exports = {generateTicket};
