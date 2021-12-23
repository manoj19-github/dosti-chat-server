const Chat=require("../../../models/chatModel")
const Message=require("../../../models/messageModel")
const User=require("../../../models/usersModel")

const accessChatCtrl=async(req,res)=>{
  try{
    const {userId}=req.body
    if(!userId) return res.status(400)
    .json({message:"userId not sent",status:false})
    var isChat=await Chat.find({
      isGroupChat:false,
      $and:[
        {users:{$elemMatch:{$eq:req.user._id}}},
        {users:{$elemMatch:{$eq:userId}}},
      ]
    }).populate("users","-password")
    .populate("latestMessage")

    isChat =await User.populate(isChat,{
      path:"latestMessage",
      select:"name pic email"
    })
    if(isChat.length >0){
      return res.status(201).json({ChatData:isChat[0]})
    }else{
    //   changable
      var isGroupChat=await Chat.find({$and:[
        {_id:userId},
        {isGroupChat:true}
      ]}).populate("users","-password")
      .populate("latestMessage")

       isGroupChat =await User.populate(isGroupChat,{
        path:"latestMessage",
        select:"name pic email"
      })
      if(isGroupChat.length >0){
        return res.status(201).json({ChatData:isGroupChat[0]})
      }

      //   changable

      const checkValidUser=await User.findById(userId)
      if(checkValidUser){
        var  chatData={
          chatName:"sender",
          isGroupData:false,
          users:[req.user._id,userId]
        }
        const createdChat=await Chat.create(chatData)
        const fullChat=await Chat.findOne({_id:createdChat._id}).populate("users","-password")
        return res.status(201).json({ChatData:fullChat})
      }else{
        return res.status(501).json({ChatData:null,message:"sorry user not valid"})
      }
    }

  }catch(err){
    console.log(`accessChatCtrl error : ${err}`)
    return res.status(201).json({chatData:"something went wrong"})

  }
}
module.exports=accessChatCtrl
