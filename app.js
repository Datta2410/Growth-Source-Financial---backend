// require('dotenv').config()
const { default: Axios } = require('axios')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const qs = require('qs');
// const morgan = require('morgan')

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
// app.use(morgan("dev"));

const loanRoutes = require('./src/routes/loanApplication')

// routes here
app.use('/loans', loanRoutes)


app.post('/zoho', (req, res) => {
  console.log(req.body)
  try{
    var data = qs.stringify({
    'refresh_token': '1000.03f531b6e53fbe558738c587dcbdec0e.07ade1c6598f0cc65d113229c0a52051',
    'client_id': '1000.WAR1KI7OHRV19NDV3Z0RDLRESZHRHN',
    'client_secret': '9755b06be32aaa81914fa41b63a1ed8ee637c5383d',
    'grant_type': 'refresh_token' 
    });
    var config = {
      method: 'post',
      url: 'https://accounts.zoho.in/oauth/v2/token',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded', 
        'Cookie': 'e274bf66cd=a666ff609d879e0aed399e8010732d82; iamcsr=c0cd1005-a179-4cda-8998-7226d9d502d7; _zcsr_tmp=c0cd1005-a179-4cda-8998-7226d9d502d7'
      },
      data : data
    };

    Axios(config)
    .then(response => {
      // console.log(response.data.access_token)
      var data = JSON.stringify({
        "data":[req.body],
        "trigger":[
          "approval",
          "workflow",
          "blueprint"
        ]});

      var config = {
        method: 'post',
        url: 'https://www.zohoapis.in/crm/v2/Leads',
        headers: { 
          'Authorization': `Zoho-oauthtoken ${response.data.access_token}`, 
          'Content-Type': 'application/json', 
          'Cookie': '2fed7857e8=892b44adba9a263d20d457c5776a03e2; crmcsr=178b15fa-1fda-4542-8eb8-be6be6755a37; _zcsr_tmp=178b15fa-1fda-4542-8eb8-be6be6755a37; listview_enabled=true'
        },
        data : data
      };

      Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
    }).catch(e => console.log(e))
  }catch(e){
    console.log(e)
    res.status(500).json(e)
  }
})


module.exports = app