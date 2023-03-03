const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();

const apiRoutes = require('Note-Taker\routes\apiRoutes');
const htmlRoutes = require('Note-Taker\routes\htmlRoutes');

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static('public'));
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
});
