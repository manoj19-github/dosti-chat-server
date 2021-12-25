const User=require("../../../models/usersModel")
const logoutCtrl=async(req,res)=>{
  try{
    const user=await User.findByIdAndUpdate(req.body.userId,{isOnline:false})
    console.log("user is disconnected")
    // eventEmitter.emit("userLogout",req.body.userId)
    return res.status(201).json({status:true,message:"logout successfully",user})

  }catch(err){
    console.log(`error occured in logoutController :${err}`.red.bold)
    return res.status(201).json({status:false,message:"something went wrong"})
  }

}
module.exports=logoutCtrl
