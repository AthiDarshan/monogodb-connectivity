const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());

// MongoDB connection
const mongoURI =
    'mongodb://user_454s8y8ac:p454s8y8ac@db01.dbhost.dev:5050/db_454s8y8ac';

mongoose.connect(mongoURI)
    .then(() => {
        console.log('MongoDB Connected Successfully');

        // Import routes
        const routes = require('./routes');

        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, 'index.html'));
        });

        app.get('/ping', (req, res) => {
            res.send('pong');
        });

        app.use('/api', routes);

        const port = process.env.PORT || 3001;

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.log('MongoDB Connection Failed');
        console.log(error.message);
    });
