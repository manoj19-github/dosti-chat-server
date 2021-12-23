const mongoose=require("mongoose")
const Chat=require("../../../models/chatModel")
const User=require("../../../models/usersModel")
const removeGroupChatCtrl=async(req,res)=>{
  try{
    const {chatId,userId}=req.body

    //  filter the userList and checking  new user does not exists already

    const existsUser=await Chat.find({
      $and:[
        {_id:chatId},
        {users:{$elemMatch:{$eq:userId}}}
      ]})

     if(!existsUser.length)
        return res.status(501).json({status:false,message:"user  not Exists"})

     if(userId !== req.user._id.toString())
      if(req.user._id.toString() !== existsUser[0].groupAdmin.toString())
        return res.status(501).json({status:false,message:"only admin have access to remove anyone "})

     if(existsUser[0].groupAdmin.toString()===userId && userId===req.user._id.toString()){
       const dismissGroup=await Chat.findByIdAndDelete(chatId).populate("users","-password")
       if(!dismissGroup)
       return res.status(501)
       .json({
         status:false,
         message:"Something went wrong Please try again!!"
       })
       return res.status(201)
       .json({
         status:true,
         updatedData:dismissGroup,
         groupDeleted:true
       })

     }


    const removeFromGroup=await Chat.findByIdAndUpdate(
      chatId,
      {$pull:{users:userId}},
    {
      new:true
    }).populate("users","-password")

    if(!removeFromGroup)
    return res.status(501)
    .json({
      status:false,
      message:"Something went wrong Please try again!!"
    })
    return res.status(201)
    .json({
      status:true,
      updatedData:removeFromGroup,
      groupDeleted  :true
    })

  }catch(err){
    console.log(`removeFromCtrl error: ${err}`.red.bold)
    return res.status(501)
    .json({
      status:false,
      message:"Something went wrong Please try again!!"
    })
  }
}
module.exports=removeGroupChatCtrl
