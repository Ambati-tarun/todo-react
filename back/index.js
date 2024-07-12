const express = require('express');
const connect = require('./db/db.js');
const mainRoute = require("./Routes/index.js");
const cors = require('cors');
const app = express();
connect.connectDB();

app.use(cors());
app.use(express.json());

app.use('/v1', mainRoute);

app.listen(3000, () => {
    console.log("Server is running at port 3000");
});