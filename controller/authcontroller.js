const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const fs = require("fs")
const crypto = require("crypto");
require('dotenv').config()

module.exports.signup = async (req,res) => {
    try {
        let password=req.body.password;
        let cnfpassword=req.body.cnfpassword;
        let email=req.body.email;
        const id = crypto.randomBytes(16).toString("hex");

        if(password==cnfpassword)
        {
            const bpass = await bcrypt.hash(password,10);

            var userdata = {
            userid:id,
            email:email,
            password:bpass,
            name:req.body.name
        }

        const finished = (error)=>{
            if(error)
            {
                console.log(error);
            }
        }

        const jsondata = JSON.stringify(userdata);
        const stat = await fs.promises.stat("data.json")
        const fileSize = stat.size;
        if(fileSize==0)
        {
            fs.appendFile("data.json","["+jsondata+"]",finished);
            res.status(200).json(jsondata);
        }else{
            await fs.promises.truncate("data.json", fileSize - 1);
            fs.appendFile("data.json",","+jsondata+"]",finished);
            res.status(200).json(jsondata);
        }
        

        }else{
           res.status(400).send("password does not match");
        }

        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
   
}

module.exports.signin = async (req,res) =>{
 try {
    const email = req.body.email;
    const pass = req.body.password;
    var check = null;

    var jsondata = JSON.parse(fs.readFileSync("data.json"));
    jsondata.forEach(element => {
        if(element.email==email)
        {
            const isMatch = bcrypt.compare(pass,element.password);
            const token = jwt.sign({userid:element.userid},process.env.sk,{expiresIn:"3d"});
            if(isMatch)
            {
                check=token;
            }
            
        }
    });
    if(check==null)
    {
        res.status(400).send({status:false,massage:"user not found",data:null})
       
    }else{
        return res.status(202).send({status:true,massage:"Login Succesfully",data:check});
    }
     
 } catch (error) {
      res.status(400).send(error);
 }
} 