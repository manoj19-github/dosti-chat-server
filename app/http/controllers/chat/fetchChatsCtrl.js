const Chat=require("../../../models/chatModel")
const Message=require("../../../models/messageModel")
const User=require("../../../models/usersModel")

const fetchChatsCtrl=async(req,res)=>{
  try{
    var chatData=await Chat.find({users:{$elemMatch:{$eq:req.user._id}}})
    .populate("users","-password")
    .populate("groupAdmin","-password")
    .populate("latestMessage")
    .sort({updatedAt:-1})

    chatData=await User.populate(chatData,{
      path:"latestMessage.sender",
      select:"name pic email"
    })
    return res.status(201).json({chatData,status:true})
  }catch(err){
    console.log(`error in fetchUser : ${err}`.red.bold)
    return res.status(500).json({message:"something went wrong",status:false})
  }
}

module.exports=fetchChatsCtrl
