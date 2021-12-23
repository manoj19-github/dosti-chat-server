const Message=require("../../../models/messageModel")
const User=require("../../../models/usersModel")
const Chat=require("../../../models/chatModel")
const sendMessageCtrl=async(req,res)=>{
  try{
    const {content,chatId}=req.body
    if(!content || !chatId){
      console.log(`invalid data passes into request `.red.bold)
      return res.status(501).json({status:false,message:"something went wrong"})
    }
    let newMessage={
      sender:req.user._id,
      content:content,
      chat:chatId
    }
    let message=await Message.create(newMessage)
    message=await message.populate("sender","name pic")
    message=await message.populate("chat")
    message=await User.populate(message,{
      path:"chat.users",
      select:"name pic email"
    })

    await Chat.findByIdAndUpdate(chatId,{
      latestMessage:message
    })
    return res.status(201).json({message,status:true})

  }catch(err){
    console.log(`error in sendMessageCtrl :${err}`.red.bold)
    return res.status(501).json({errorMessage:"something went wrong",status:false})
  }
}

module.exports=sendMessageCtrl
