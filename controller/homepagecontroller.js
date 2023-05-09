const fs = require('fs');

module.exports.homepage = async (req,res) =>{
    try {
      var check = null;
      var data = JSON.parse(fs.readFileSync("data.json"));
      data.forEach(element => {
         if(element.name==req.params.name)
         {
            check=element;
         }
      });

      if(check==null){
         return res.status(400).json({status:false,message:"user not found"});
      }else{
         return res.status(201).json({status:true,data:check});
      }
       
    } catch (error) {
         res.status(400).send(error);
    }
   }