const express = require('express');
const connect = require('./db/db.js');
const mainRoute = require("./Routes/index.js");
const cors = require('cors');
require('dotenv').config();
const app = express();

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Connect to database
connect.connectDB().catch(err => {
    console.error('Failed to connect to database:', err);
});

app.use(cors());
app.use(express.json());

app.use('/v1', mainRoute);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

const PORT = process.env.PORT || 3000;

// Only start the server if not in a serverless environment
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running at port ${PORT}`);
    });
}

module.exports = app;