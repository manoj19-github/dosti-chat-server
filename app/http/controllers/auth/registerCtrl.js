const User=require("../../../models/usersModel")
const uploadCloudinary=require("../../../utils/uploadCloudinary")
const registerController=async(req,res)=>{
  try{
        const {name,email,password}=req.body
    if(!name || !email || !password)
      return res.status(500)
        .json({message:"name, email and password are required",status:false})
        
    let newUser
    const userExists=await User.findOne({email})
    if(userExists) return res.status(500)
    .json({message:"User email already exists",status:false})

    if(req.file){
      const picUrl=await uploadCloudinary(req.file.path)
      newUser=new User({
        name,
        email,
        password,
        pic:picUrl,
      })
    }else{
      newUser=await User({
        name,
        email,
        password
      })
    }
    const savedUser=await newUser.save()
    const sendUser= {
      _id:savedUser._id,
      name:savedUser.name,
      email:savedUser.email,
      pic:savedUser.pic,
      createdAt:savedUser.createdAt
    }
    return res.status(201).json({message:"User created successfully",status:true,sendUser})
  }catch(err){
    console.log(`error in registerController :  ${err}`.red.bold)
    return res.status(501).json({message:"User not created",status:false})
  }


}
module.exports=registerController
