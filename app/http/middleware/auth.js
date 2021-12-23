//  validation rules for sign in
const {check,validationResult}
=require("express-validator")

exports.validationSignupRequest=[
  check("name")
  .notEmpty()
  .withMessage("Name is required"),
  check("email")
  .isEmail()
  .withMessage("Email is required"),
  check("password")
  .isLength({min:4,max:20})
  .withMessage("password must be at least 4 char long")
]
exports.validationSigninRequest=[
  check("email")
  .isEmail()
  .withMessage("Email is not Valid"),
  check("password")
  .isLength({min:4,max:20})
  .withMessage("password must be at least 4 char long")
]
exports.isRequestValidated=(req,res,next)=>{
  const errors=validationResult(req)
  if(errors.array().length>0){
    return res.status(400).json({errors:errors.array()[0].msg})
  }
  next()
}
