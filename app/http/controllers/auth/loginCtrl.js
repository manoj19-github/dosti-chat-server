const jwt=require("jsonwebtoken")
const User=require("../../../models/usersModel")

const loginController=async(req,res)=>{
  try{
    const {email,password}=req.body
    const userExists=await User.findOne({email})
    if(userExists){

      if(await userExists.authenticate(password)){
        const userToken=jwt.sign({id:userExists._id},process.env.JWT_SECRET)
        const sendUser={
          _id:userExists._id,
          name:userExists.name,
          email:userExists.email,
          pic:userExists.pic,
          createdAt:userExists.createdAt
        }
        return res.status(201).json({
          message:"Login successfull",
          userToken,
          sendUser,
          status:true
        })
      }
    }
    return res.status(501).json({
      message:"email or password not matched please try again",
      status:false
    })
  }catch(err){
    console.log(`error occured in loginController :${err}`.red.bold)
    return res.status(501).json({
      message:"something went wrong",
      status:false
    })
  }
}

module.exports=loginController
