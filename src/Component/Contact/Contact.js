import React from 'react'
import './contact.css'
import image3 from "../Images/image3.jpg";
import Chatcontainer from '../Chatcontainer/Chatcontainer';
import {useEffect,useState} from 'react';
import axios from "axios";
import {useSelector}  from 'react-redux'
export default function Contact() {


    const userDetails = useSelector((state)=>state.user);
    const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;
    let user = userDetails.user;
    let id =user.user._id;
    const jwt_here=user.jwttoken;

    const [users,setUsers]= useState('');
    const [currentChatUser,setCurrentChatUser] = useState('');
    
useEffect(()=>{
    const getusers = async()=>{   
      try{
        const response = await axios.get(`${BACKEND_URI}/api/user/get/followings/${id}`,{
          headers:{
            jwttoken:jwt_here // must be the attribute name (same name as in headers )-> i.e jwttoken
          }
        });
        console.log(response.data)
        // before firebase used user  setPosts(response.data.followingPosts);
        setUsers(response.data);  // include particularly .followingPosts 
                                                 //otherwise it returns an data object
    }catch(error){
         console.log("ERROR OCCURED IN CATCH BLOCK "+error);
    }
    }
    getusers();
  },[])

//   console.log(users)

const handleUser=(e)=>{
    setCurrentChatUser(e)
}

    return (
        <div className='mainContactContainer'>
            <div>
                <div style={{ width: "20pc", padding: '10px' }}>
                    <input type="search" placeholder='Search Your Friends Here' className='searchBarForContact' />
                </div>
                {/* <div className='userDetailsContainer'>
                    {users.map((item)=>(
                   
                   <div>
                    {item.id !==id ? <div className='userContainer' onClick={(e)=>handleUser(item)}>
                        <img src={`${item.others.profilepicture}`} className='chatUserImage' />
                        <div style={{ marginLeft: '10px' }}>
                            <p style={{ color: 'white', textAlign: 'start', marginTop: '5px', fontSize: "16px" }}>{item.others.username}</p>
                            <p style={{ color: 'white', textAlign: 'start', marginTop: '-16px', fontSize: "14px" }}> open your message </p>
                        </div>
                    </div> : ""}
                    

                    </div>

                    

                    ))}
                    
                    
                </div> */}

<div className='userDetailsContainer'>
    {users && users.map((item) => (
        <div key={item.id}>
            {item.id !== id ? (
                <div className='userContainer' onClick={(e) => handleUser(item)}>
                    <img src={`${item.others.profilepicture}`} className='chatUserImage' />
                    <div style={{ marginLeft: '10px' }}>
                        <p style={{ color: 'white', textAlign: 'start', marginTop: '5px', fontSize: "16px" }}>{item.others.username}</p>
                        <p style={{ color: 'white', textAlign: 'start', marginTop: '-16px', fontSize: "14px" }}> open your message </p>
                    </div>
                </div>
            ) : ""}
        </div>
    ))}
</div>


            </div>
      {currentChatUser !== '' ?  <Chatcontainer currentChatUser={currentChatUser}/> :
       <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'80%',height:'85vh'}}>
         <p style={{fontSize:'4rem',fontWeight:'1000'}}> Welcome to FotoFlask Chat</p>
         </div>}
            
        </div>

    )
}

