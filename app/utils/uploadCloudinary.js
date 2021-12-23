const cloudinary = require('cloudinary').v2

const uploadCloudinary=async(filePath)=>{
  let uploadedFile
  try{
    uploadedFile=await cloudinary.uploader.upload(filePath,{
      folder:"dosti-drive",
      resource_type:"auto"
    })
    const {secure_url}=uploadedFile
    return secure_url
  }catch(err){
    console.log(`cloudinary uploading error in uploadCloudinary page : ${err}`.red.bold)
    return null

  }
}
module.exports=uploadCloudinary
