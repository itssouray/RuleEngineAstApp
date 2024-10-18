const express = require("express");
const cors = require("cors");
const ruleRoutes = require('./router/ruleRoutes'); 
const app = express();

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use('/rules', ruleRoutes);
module.exports = app;