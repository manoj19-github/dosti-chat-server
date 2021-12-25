const jwt=require("jsonwebtoken")
const User=require("../../../models/usersModel")

const loginController=async(req,res)=>{
  try{
    const {email,password}=req.body
    const userExists=await User.findOneAndUpdate({email},{isOnline:true},{new:true})
    if(userExists){

      if(await userExists.authenticate(password)){
        //const showUser=User.findByIdAndUpdate(userExists._id,{isOnline:true},{new:true})
        const userToken=jwt.sign({id:userExists._id},process.env.JWT_SECRET)

        const sendUser={
          _id:userExists._id,
          name:userExists.name,
          email:userExists.email,
          pic:userExists.pic,
          isOnline:userExists.isOnline,
          createdAt:userExists.createdAt,
          updatedAt:userExists.updatedAt,
        }
        return res.status(201).json({
          message:"Login successfull",
          userToken,
          sendUser,
          userId:userExists._id,
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
