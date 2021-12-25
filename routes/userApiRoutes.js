const express=require("express")
const Router=express.Router()
const multer=require("multer")
const storage=multer.diskStorage({})
const uploads=multer({storage})
const registerCtrl=require("../app/http/controllers/auth/registerCtrl")
const loginCtrl=require("../app/http/controllers/auth/loginCtrl")
const ChatUserCtrl=require("../app/http/controllers/chat/ChatUserCtrl")
const requireSignIn=require("../app/http/middleware/requireSignIn")
const logoutCtrl=require("../app/http/controllers/auth/logoutCtrl")




// routes
Router.post("/register",uploads.single("pic"),registerCtrl)
Router.post("/login",loginCtrl)
Router.post("/logout",logoutCtrl)
Router.get("/chatUser",requireSignIn,ChatUserCtrl)
module.exports=Router
