const express= require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const socket = require('socket.io');

require('dotenv').config();

const MONGOOSE_URI = process.env.MONGOOSE_URI;
const FRONTENDPORT = process.env.FRONTENDPORT;



mongoose.connect(MONGOOSE_URI)
.then(()=>{console.log("MONGO DB CONNECTED SUCCESSFULLY")})
.catch(()=>{console.log("SOME ERROR OCCURED IN CONNECTING MONGODB")})


const PORT = process.env.PORT ;

const app = express(); 

app.use(express.json());
const server = app.listen(PORT,()=>{
    console.log("Backend server running at PORT "+PORT);
})

app.use(cors()); 
app.use('/api/user', require('./Routes/User'));
app.use('/api/post', require('./Routes/Post'));



const io = socket(server,{
    cors:{
        origin:`http://localhost:1${FRONTENDPORT}`,
        credentails:true
    }
})



global.onlineUsers = new Map();
const onlineUsers = global.onlineUsers; // Define 'onlineUsers' variable

io.on("connection",(socket)=>{
    global.chatsocket =socket;
    socket.on("addUser",(id)=>{
        onlineUsers.set(id,socket.id);
    })
    socket.on("send-msg",(data)=>{
        const sendUserSocket  = onlineUsers.get(data.io);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-receive",data.message)
        }
    })
})