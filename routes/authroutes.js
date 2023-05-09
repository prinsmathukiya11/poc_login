const express = require('express');
const reguser = require('../controller/authcontroller');
const validator = require("../validator/uservalidation")
const routes = express.Router();

routes.post("/signup",validator.uservalidationsignprules,reguser.signup);

routes.get("/login",validator.uservalidationsigninrules,reguser.signin);

module.exports=routes;