const express = require("express");
var bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
var indexRouter = require('./routes/index');

app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type , access-token,regenarate-token,content-type');
    next();
});
  
app.use(indexRouter);

app.listen(port, () => console.log(`server started on port ${port}`));