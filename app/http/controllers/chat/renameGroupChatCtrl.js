const Chat=require("../../../models/chatModel")

const renameGroupChatCtrl=async(req,res)=>{
  try{
    const {chatId,chatName}=req.body

    const isAdminOrGroupExists=await Chat.findOne({
      $and:[
        {_id:{$eq:chatId}},
        {groupAdmin:{$eq:req.user._id}}
      ]
    })
    if(!isAdminOrGroupExists)
      return res.status(501).json({
        status:false,
        message:"sorry only admin can change the group name"
      })

    const updatedChat=await Chat
    .findByIdAndUpdate(chatId,{
      chatName,
    },
    {
      new:true
    })
    .populate("users","-password")
    .populate("groupAdmin","-password")

    if(!updatedChat)
      return res.status(501).json({
        status:false,
        message:"group name not updated!! try again"
      })

    return res.status(201).json({
        status:true,
        updatedData:updatedChat
      })

  }catch(err){
    console.log(`renameGroupChatCtrl error happend : ${err}`.red.bold)
    return res.status(501).json({
        status:false,
        message:'something went wrong'
      })
  }
}
module.exports=renameGroupChatCtrl
