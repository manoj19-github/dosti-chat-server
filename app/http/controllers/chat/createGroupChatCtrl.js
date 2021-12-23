const Chat=require("../../../models/chatModel")
const createGroupChatCtrl=async(req,res)=>{
  try{
    if(!req.body.users || !req.body.name)
      return res.status(501).json({message:"please fill all the fields",status:false})
      // restriction for same name group creation

    // const checkgroupExists=await Chat.findOne({
    //   $and:[
    //     {isGroupChat:true},
    //     {chatName:{$eq:req.body.name}},
    //     {groupAdmin:{$eq:req.user._id}},
    //   ]
    // })
    // if(checkgroupExists)
    //   return res.status(501).json({status:false,message:"Sorry !! same name group already exists !!"})

    var users=JSON.parse(req.body.users)
    //  check logged in userid not present on these users array

    let adminUser=users.find((user)=>user===req.user._id)
    if(adminUser)
      return status(201).json({
      message:"Admin can not add himself to users list",
      status:false
    })

    if(users.length <2)
      return res.status(501).json({
        message:"More than two users are required to form the group chat",
        status:false
      })
    // add all users with logged in user
    users.push(req.user._id)
    const newGroupChat=await Chat.create({
      chatName:req.body.name,
      users:users,
      isGroupChat:true,
      groupAdmin:req.user._id,
    })
    const fullGroupChat=await Chat.findOne({_id:newGroupChat._id})
                            .populate("users","-password")
                            .populate("groupAdmin","-password")
    return res.status(201).json({groupChat:fullGroupChat,status:true})
  }catch(err){
    console.log(`error in createGroupChatCtrl err: ${err}`.red.bold)
    return res.status(500).json({status:false,message:"something went wrong"})
  }
}

module.exports=createGroupChatCtrl
