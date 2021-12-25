const Message=require("../app/models/messageModel")
const express=require("express")
const Router=express.Router()
const requireSignIn =require("../app/http/middleware/requireSignIn")
const sendMessageCtrl=require("../app/http/controllers/messages/sendMessageCtrl")

const allMessagesCtrl=require("../app/http/controllers/messages/allMessagesCtrl")
Router.post("/",requireSignIn,sendMessageCtrl)
Router.get("/:chatId",requireSignIn,allMessagesCtrl)


module.exports=Router
