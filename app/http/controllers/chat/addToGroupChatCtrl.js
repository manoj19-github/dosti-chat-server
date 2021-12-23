const mongoose=require("mongoose")
const Chat=require("../../../models/chatModel")
const User=require("../../../models/usersModel")
const addToGroupChatCtrl=async(req,res)=>{
  try{
    const {chatId,userId}=req.body

    //  filter the userList and checking  new user does not exists already
    const existsUser=await Chat.find({
      $and:[
        {_id:chatId},
        {users:{$elemMatch:{$eq:userId}}}
      ]})


     if(existsUser.length)
        return res.status(501).json({status:false,message:"user Already Exists"})


    const addedGroup=await Chat.findByIdAndUpdate(
      chatId,
      {$push:{users:userId}},
    {
      new:true
    }).populate("users","-password")


    if(!addedGroup)
    return res.status(501)
    .json({
      status:false,
      message:"Something went wrong Please try again!!"
    })
    return res.status(201)
    .json({
      status:true,
      updatedData:addedGroup
    })

  }catch(err){
    console.log(`addToGroupCtrl error: ${err}`.red.bold)
    return res.status(501)
    .json({
      status:false,
      message:"Something went wrong Please try again!!"
    })
  }
}
module.exports=addToGroupChatCtrl
