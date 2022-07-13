require("dotenv").config()

const express=require("express")
const colors=require("colors")
const cors=require("cors")
const path=require("path")


const connectDB=require("./app/config/dbconfig")
const {notFound,errorHandler}=require("./app/http/middleware/errorHandler")
const {initCloudinary}=require("./app/config/cloudinaryConfig")
const userApiRoutes=require("./routes/userApiRoutes")
const chatApiRoutes=require("./routes/chatApiRoutes")
const messagesApiRoutes=require("./routes/messagesApiRoutes")

const app=express()
const PORT=process.env.PORT ||3300


// General Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
  extended:true
}))
app.get("/",(req,res)=>{
    res.status(201).json({status:true,message:`hello users server is running on port ${process.env.PORT}`})
})
 // --------------------------- deployment   --------------------------------------
// const __dirname1=path.resolve()
// if(process.env.NODE_ENV==="production"){
//
//   app.use(express.static(path.join(__dirname1,"/client/build")))
//   app.get("*",(req,res)=>{
//     res.sendFile(path.resolve(__dirname1,"frontend","build","index.html"))
//   })
//
// }else{
//   app.get("/",(req,res)=>{
//     res.status(201).json({status:true,message:`hello users server is running on port ${process.env.PORT}`})
//   })
// }

//  --------------------------  deploymeent -----------------------------------------


// Route Middlewares

app.use("/api/user/",userApiRoutes)
app.use("/api/chat/",chatApiRoutes)
app.use("/api/messages",messagesApiRoutes)

// Error Handling Middlewares
app.use(notFound)
app.use(errorHandler)


// server listening on
const server=app.listen(4000,async()=>{
  initCloudinary()
  await connectDB()
  console.log(`app is listening on PORT : ${PORT}`.yellow.underline.bold)
})


//  create configuration of socket io with express server
const io=require("socket.io")(server,{
  pingTimeout:120000,
  cors:{
    origin:process.env.CLIENT_APP_URL
  }
})

io.on("connection",(socket)=>{
  console.log(`connected to socket io on my Dosti`)
  socket.on("setup",(userData)=>{
    socket.join(userData._id)
    console.log("connected to userId ",userData._id)
    socket.emit("connected")
  })

  socket.on("joinChat",(room)=>{
    socket.join(room)
    console.log(`user joined room :`,room)
  })

  socket.on("typing",(room)=>{
    socket.in(room).emit("typing")
  })
  socket.on("stopTyping",(room)=>{
    socket.in(room).emit("stopTyping")
  })

  socket.on("userLogin",(loggedData)=>{
    
    if(!loggedData.chatData) return console.log("chat not defined on login")
    loggedData.chatData.forEach(chat=>{
        chat.users.forEach(user=>{
          if(user._id==loggedData.authUser._id) return
          socket.in(user._id).emit("userLogged",loggedData.authUser._id)
        })
    })

  })
  socket.on("userLogout",(loggedData)=>{
    if(!loggedData.chatData) return console.log("chat not defined on logout")
    loggedData.chatData.forEach(chat=>{
        chat.users.forEach(user=>{
          if(user._id==loggedData.authUser._id) return
          socket.in(user._id).emit("userLoggedOut",loggedData.authUser._id)
        })
    })

  })



  socket.on("newMessage",(newMsgReceived)=>{
    var chat=newMsgReceived.chat
    if(!chat.users) return console.log("chat.users not defined")
    chat.users.forEach(user=>{

      if(user._id==newMsgReceived.sender._id) return
      console.log("sent")
      socket.in(user._id).emit("messageReceived",newMsgReceived)

    })
  })

  socket.off("setup",()=>{
    console.log("user disconncted")
    socket.leave(userData._id)
    console.log(`user is leave `,userData._id)
  })
})
