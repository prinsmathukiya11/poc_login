const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
const auth = require("./routes/authroutes");
app.use("/user/api", auth);
const homepage = require("./routes/homepageroutes");
app.use("/user/api", homepage);

//server
var port = process.env.port;
app.listen(port, () => {
  console.log(`server running on ${port}`);
});
