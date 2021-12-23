const Message=require("../../../models/messageModel")
const User=require("../../../models/usersModel")
const Chat=require("../../../models/chatModel")

const allMessagesCtrl=async(req,res)=>{
  try{
    const messages=await Message.find({chat:req.params.chatId})
                        .populate("sender","name pic email")
                        .populate("chat")

    return res.status(201).json({status:true,messages})
  }catch(err){
    console.log(`error in allMessageCtrl : ${err}`.red.bold)
    return res.status(501).json({status:false,errorMessage:"something went wrong"})
  }

}
module.exports=allMessagesCtrl
