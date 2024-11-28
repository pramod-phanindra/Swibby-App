const express = require("express");
const dotEnv = require('dotenv');
const mongoose = require("mongoose");
const app = express();
const vendorRoutes = require('./routes/vendorRoutes');
const bodyParser = require('body-parser');

const PORT = 4000;

dotEnv.config();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected Successfully !!!"))
.catch((error) => console.log(error))


app.use(bodyParser.json());

app.use('/vendor', vendorRoutes);

app.listen(PORT, () => {
  console.log(`Server is started and running at ${PORT}`);
});


app.use('/home', (req,res) => {
    res.send("<h1> Welcome to Swibby");
});