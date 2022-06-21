const uuid = require('uuid');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

app.use(morgan('dev'));
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function(req, res, next) {
    req.requestId = uuid.v4();
    req.requestTime = (new Date()).toISOString();
    next();
})

app.get('/', function(req, res, next) {
    return res.status(200).send('ok');
});

app.get('/ping', function(req, res, next) {
    return res.status(200).json({ message: "pong" });
});

app.use('/', routes);

app.use(function(err, req, res, next) {
    console.log(`Exception : ${err.message}`);
    return res.status(500).send();
});

module.exports = app;
