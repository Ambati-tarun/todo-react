const express = require('express');
const connect = require('./db/db.js');
const mainRoute = require("./Routes/index.js");
const cors = require('cors');
require('dotenv').config();
const app = express();
connect.connectDB();

app.use(cors());
app.use(express.json());

app.use('/v1', mainRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});