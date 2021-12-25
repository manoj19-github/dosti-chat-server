const bcrypt=require("bcryptjs")
const mongoose=require("mongoose")
const validator=require("validator")
const userSchema=mongoose.Schema({
  name:{
    type:String,
    required:true,
    trim:true
  },
  email:{
    type:String,
    required:true,
    unique:true,
    validate(val){
      if(!validator.isEmail(val)){
        throw new Error(`email is not valid`)
      }
    },
    trim:true
  },
  password:{
    type:String,
    required:true,
    trim:true
  },
  pic:{
    type:String,
    trim:true,
    default:"https://img.favpng.com/25/13/19/samsung-galaxy-a8-a8-user-login-telephone-avatar-png-favpng-dqKEPfX7hPbc6SMVUCteANKwj.jpg",
  },
  isOnline:{
    type:Boolean,
    default:false
  }


},{timestamps:true})

userSchema.pre("save",async function(next){
  if(!this.isModified) next()
  const salt =await bcrypt.genSalt(10)
  this.password=await bcrypt.hash(this.password,salt)

})
userSchema.methods={
  authenticate:async function(password){
    return await bcrypt.compare(password,this.password)
  }
}
const User=mongoose.model("User",userSchema)
module.exports=User
