const express=require("express")
const Router=express.Router()
const requireSignIn=require("../app/http/middleware/requireSignIn")
const accessChatCtrl=require("../app/http/controllers/chat/accessChatCtrl")
const fetchChatsCtrl=require("../app/http/controllers/chat/fetchChatsCtrl")
const createGroupChatCtrl=require("../app/http/controllers/chat/createGroupChatCtrl")
const renameGroupChatCtrl=require("../app/http/controllers/chat/renameGroupChatCtrl")
const addToGroupCtrl=require("../app/http/controllers/chat/addToGroupChatCtrl")
const removeGroupChatCtrl=require("../app/http/controllers/chat/removeGroupChatCtrl")
Router.post("/",requireSignIn,accessChatCtrl)   // api/chat/
Router.get("/",requireSignIn,fetchChatsCtrl)
Router.post("/group/create",requireSignIn,createGroupChatCtrl)//  /api/chat/group/rename
Router.put("/group/rename",requireSignIn,renameGroupChatCtrl)
Router.put("/group/add",requireSignIn,addToGroupCtrl)
Router.put("/group/remove",requireSignIn,removeGroupChatCtrl)

module.exports=Router
