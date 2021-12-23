const User=require("../../../models/usersModel")
const ChatUserController=async(req,res)=>{
  try{
    // /api/user/chatUser?search=manoj
    const searchQry=req.query.search?{
      $or:[
        {name:{$regex:req.query.search,$options:'i'}},
        {email:{$regex:req.query.search,$options:'i'}},
      ]
    }:{}

    const users=await User.find(searchQry).find({_id:{$ne:req.user._id}}).select('-password');
    return res.status(201).json({users,status:true})
  }catch(err){
    console.log("chat user controller ",err)
    return res.status(501).json({message:"something went wrong",status:false})
  }

}
module.exports=ChatUserController
