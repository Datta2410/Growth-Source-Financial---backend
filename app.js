require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')

mongoose.connect("mongodb+srv://glitch:GlItCh@cluster0.tbjsd.mongodb.net/GROWTHSOURCE",{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify:false
})
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Set-Cookie,Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Credentials", true);
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
      return res.status(200).json({});
    }
    next();
})
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));

const loanRoutes = require('./src/routes/loanApplication')

// routes here
app.use('/loans', loanRoutes)
//Error handles


module.exports = app