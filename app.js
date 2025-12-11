const express = require('express');
const approutes = require('./routes/ticket');
const app = express();
const path = require('path');

app.use(express.json());
app.use('/ticketgen', express.static(path.join(__dirname, 'Tickets')));
app.use('/v1', approutes);


app.listen(4000, () => {
    console.log('server running...');
});