const express=require("express")
const Router=express.Router()
const multer=require("multer")
const storage=multer.diskStorage({})
const uploads=multer({storage})
const {
  validationSigninRequest,
  validationSignupRequest,
  isRequestValidated
}=require("../app/http/middleware/auth")
const registerCtrl=require("../app/http/controllers/auth/registerCtrl")
const loginCtrl=require("../app/http/controllers/auth/loginCtrl")
const ChatUserCtrl=require("../app/http/controllers/chat/ChatUserCtrl")
const requireSignIn=require("../app/http/middleware/requireSignIn")




// routes
Router.post("/register",uploads.single("pic"),registerCtrl)
Router.post("/login",loginCtrl)
Router.get("/chatUser",requireSignIn,ChatUserCtrl)
module.exports=Router
