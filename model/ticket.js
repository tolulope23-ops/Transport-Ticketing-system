const {connPool} = require('../connect');
const {sqlQuery} = require('./sql')

async function createTicket(amount, ticket_code, seat_number, passenger_name){
    try {
        const [result] = await connPool.query(sqlQuery.createTicket, [amount, ticket_code, seat_number, passenger_name]);
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