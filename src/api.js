const express = require('express');
const app =  express();
const serverless = require("serverless-http");
const cors = require('cors');
var axios = require('axios');
const routes = require("./routes/index")
const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(cors({ origin: true }));
let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
  }
 app.use(allowCrossDomain);
app.use(routes)
const PORT = process.env.port || 3005
app.listen(PORT,()=>console.log('Server is running'));
process.on('unhandledRejection',(err)=>{console.log(err)})
module.exports = app;
module.exports.handler = serverless(app);