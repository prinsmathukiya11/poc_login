const express = require('express');
const { verifyjwttoken } = require('../jwtverify/jwttokenverify');
const { homepage } = require('../controller/homepagecontroller');
const routes = express.Router();

routes.get("/homepage/:name",verifyjwttoken,homepage);

module.exports=routes; 