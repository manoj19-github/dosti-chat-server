const mongoose=require("mongoose")
const connectDB=async()=>{
  try{
    await mongoose.connect(process.env.DB_URL,{
      useNewUrlParser:true,
      useUnifiedTopology:true
    })


  }catch(err){
    console.log(`database not connected : ${err}`.red.bold)

  }

  const {connection}=mongoose
  if(connection.readyState >=1){
    console.log('database connected successfully'.yellow.underline.bold)
    return
  }
  connection.on("error",()=>{
    console.log(`database not connected try again`.red.bold)

  })
}
module.exports=connectDB
