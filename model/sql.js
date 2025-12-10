const sqlQuery = {
    createTicket: 'INSERT INTO Ticket(passenger_name, ticket_code, amount, seat_number, weather, park_location, destinantion, date_expired) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
    getTicket: 'SELECT * FROM Ticket',
    getSeatNumber: "SELECT * FROM ticket WHERE seat_number = ?"
}

module.exports = {sqlQuery};

