const jwt = require("jsonwebtoken");

module.exports.verifyjwttoken = (req,res,next)=>{
    let usertoken = req.headers.token;
  try {
    if(!usertoken){
        return res.status(500).json({status:false,massage:"token is not provided",data:null})
    }
    jwt.verify(usertoken,process.env.sk,(err,result)=>{
    if(err){ return res.status(500).json({status:false,massage:"invalid token or expired",data:null})}
    req.body.userdata=result;
    return next();
    });
  } catch (error) {
    res.status(404).send("token is not valid");
  }
  
}