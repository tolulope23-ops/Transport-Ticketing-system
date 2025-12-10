const sqlQuery = {
    createTicket: 'INSERT INTO Ticket(amount, ticket_code, seat_number, passenger_name) VALUES(?, ?, ?, ?)',
    getTicket: 'SELECT * FROM Ticket',
    getSeatNumber: "SELECT * FROM ticket WHERE seat_number = ?"
}

module.exports = {sqlQuery};