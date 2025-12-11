const {connPool} = require('../connect');
const {sqlQuery} = require('./sql')

async function createTicket(passenger_name, ticket_code, amount, seat_number, weather, park_location, destination, date_expired){
    try {
        const [result] = await connPool.query(sqlQuery.createTicket, [passenger_name, ticket_code, amount, seat_number, weather, park_location, destination, date_expired]);
        return result;
    } catch (error) {
        console.log(error.message);
    }
};

async function getTicket(){
    try {
        const result = await connPool.query(sqlQuery.getTicket);
        return result;
    } catch (error) {
        console.log(error.message);
    }
};

async function checkSeatTaken(seat_number) {
  const [rows] = await connPool.query(sqlQuery.getSeatNumber, [seat_number]);  
  return rows.length > 0;
}

module.exports = {createTicket, getTicket, checkSeatTaken};