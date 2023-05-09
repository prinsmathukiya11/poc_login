const joi = require("joi");

module.exports.uservalidationsignprules = (req, res, next) => {
//   console.log("In uservalidationsignprules");
  const val = new joi.object({
    email: joi.string().required().email(),
    password: joi.string().min(8).max(15).required(),
    cnfpassword: joi.string().min(8).max(15).required(),
    name: joi.string().required(),
  });
  let result = val.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }
  next();
};

module.exports.uservalidationsigninrules = (req, res, next) => {
//   console.log("In uservalidationsigninrules");
  const val = new joi.object({
    email: joi.string().required().email(),
    password: joi.string().min(8).max(15).required(),
  });
  let result = val.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }
  next();
};
