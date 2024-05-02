import React, { useRef } from 'react'
import './chatcontainer.css'
import image3 from "../Images/image3.jpg";
import { useEffect, useState } from 'react';
import axios from "axios";
import {io} from 'socket.io-client';
import { useSelector } from 'react-redux'
import { json } from 'react-router-dom';
export default function Chatcontainer({ currentChatUser }) {
    console.log(currentChatUser.others)
    const userDetails = useSelector((state) => state.user);
    let user = userDetails.user;
    let id = user.user._id;
    const jwt_here = user.jwttoken;
    const scrollRef = useRef();
    const socket = useRef();

    const [message, setMessage] = useState();
    const [inputmessage, setInputmessage] = useState();
    const [arrivalmsg,setArrivalmsg] = useState(null);
    const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;



    useEffect(()=>{
        const getmessages = async()=>{   
          try{
            const response = await axios.get(`${BACKEND_URI}/api/post/get/chat/msg/${id}/${currentChatUser.others._id}`,{
              headers:{
                jwttoken:jwt_here // must be the attribute name (same name as in headers )-> i.e jwttoken
              }
            });
            console.log("MESSAGES"+response.data)
            // before firebase used user  setPosts(response.data.followingPosts);
            setMessage(response.data);  // include particularly .followingPosts 
                                                     //otherwise it returns an data object
        }catch(error){
             console.log("ERROR OCCURED IN CATCH BLOCK "+error);
        }
        }
        getmessages();
      },[currentChatUser.others._id])
    console.log(message)
    

    useEffect(()=>{

        if(currentChatUser!== null){
            socket.current = io(`${BACKEND_URI}`)
            socket.current.emit("addUser",id)
        }
    },[id])

    console.log(socket);

    useEffect(()=>{
       scrollRef.current?.scrollIntoView({behavior:'smooth'})
    },[message])

    const sendmsg = () => {
        const messages = {
            myself: true,
            message: inputmessage

        }
        socket.current.emit("send-msg",{
           to:currentChatUser.others._id,
           from:id,
           message:inputmessage
        })

        fetch(`${BACKEND_URI}/api/post/msg`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Fixed typo here
                'jwttoken': jwt_here,
            },
            body: JSON.stringify({
                from: id,
                to: currentChatUser.others._id,
                message: inputmessage,
            }),
        });
        setMessage(message.concat(messages))
        setInputmessage('');
    };

    useEffect(()=>{
        if(socket.current){
            socket.current.on('msg-receive',(msg)=>{
                setArrivalmsg({myself:false,message:msg})
            })
        }
    },[arrivalmsg])

    useEffect(()=>{
      arrivalmsg && setMessage((pre)=>[ ...pre, arrivalmsg])
    },[arrivalmsg])

    return (
        <div className="mainChatContainer">

            <div>
                <div style={{ display: "flex", marginLeft: '30x', marginTop: '10px', backgroundColor: 'rgb(0,0,0)',color:'white', width: '74pc', padding: '5px', borderRadius: '10px' }}>
                    <img src={`${currentChatUser.others.profilepicture}`} className='userProfile' />
                    <p style={{ marginTop: '10px', marginLeft: "10px" }}>{currentChatUser.others.username}</p>
                </div>
            </div>
            <div className='msgContainer'>
              {message && message.map((item)=>(
                    <div ref={scrollRef}>
                        {item.myself === false ? <div className='msg' >
                     <img src={`${currentChatUser?.others?.profilepicture}`} className='chatUserProfile' />
                     <p  style={{textAlign:'start' , marginLeft:'10px'}}>{item.message}</p>
                     </div> :     <div className='MSGG' style={{width:"40%" , marginTop:"10px", display: "flex", alignItems: 'center',marginLeft:'30px', backgroundColor: 'rgb(241,243,241)' ,padding:'5px', marginTop:'10px',borderRadius:'10px' , marginLeft:'650px'}}>
                    {/* <img src={`${image3}`} className='chatUserProfile' /> */}
                    <p  style={{textAlign:'start' , marginLeft:'10px'}}>{item.message}</p>
                </div> }
                     
                     </div>
                     
                ))
                }


            </div>

            <div className='msgSenderContainer'>
                <input type='text' value={inputmessage} onChange={(e) => setInputmessage(e.target.value)} placeholder='write your message here' className='msginput' />
                <button className='msgButton' onClick={sendmsg}>Send</button>
            </div>

        </div>
    )
}
