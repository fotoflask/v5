import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { CSSTransition } from "react-transition-group";
import Emoji from "./Emoji";
import "./Reels.css";
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
//import 'bootstrap/dist/css/bootstrap.min.css';


const Carousel = (props) => {

  const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;
  

  const [user_details,setUser_Details] = useState([]);
  const [items, setItems] = useState(props.items || []);
  const [active, setActive] = useState(props.active || 0);
  const [direction, setDirection] = useState("");
 

  const rightClick = () => moveRight();
  const leftClick = () => moveLeft();

  useEffect(() => {
    const getReels = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URI}/api/reels/getAllReels`
        );
       console.log(response);
        const shuffledPosts = response.data;

        setItems(shuffledPosts);

        console.log("Component loaded");
       // console.log(items);
      } catch (error) {
        console.error("Error fetching reels:", error);
      }
    };
// hii
    getReels();

    console.log(items);
  }, []);

  useEffect(() => {
    console.log(items);
  }, [items]);

  const generateItems = () => {
    let generatedItems = [];
  
    for (let i = active - 2; i <= active + 2; i++) {
      let index = (i + items.length) % items.length;
      let level = active - i;
  
      generatedItems.push(
        <Item key={index} id={items[index]} level={level} />
      );
    }
  
    return generatedItems;
  };
  
  const moveLeft = () => {
    setActive((prevActive) => (prevActive - 1 + items.length) % items.length);
  };
  
  const moveRight = () => {
    setActive((prevActive) => (prevActive + 1) % items.length);
  };

  return (
    <div id="carousel" className="noselect">
      <div className="arrow arrow-left" onClick={leftClick}>
      <FontAwesomeIcon icon={faArrowRight} flip="horizontal" style={{color: "#ffffff",}} />
      </div>

      {generateItems().map((item, index) => (
        <CSSTransition
        key={index}
        classNames={direction}
        timeout={500} // Adjust the timeout as needed
        >
          {item}
        </CSSTransition>
      ))}
      <div className="arrow arrow-right" onClick={rightClick}>
        <FontAwesomeIcon icon={faArrowRight} style={{color: "#ffffff",}} />
      </div>
    </div>
  );
};





const Item = ({ level, id }) => {

  const userDetails_redux = useSelector((state) => state.user);
  let user =userDetails_redux.user;
  const jwt_here = user.jwttoken
 // console.log("pp"+user.user.profilepicture);
//console.log(id);



  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [R5count, setR5Count] = useState(1);
  const [R5status , setR5status] = useState(false);
  // const [R5count, setR5Count] = useState(id.Reaction5.length);
  // const [R5status , setR5status] = useState(id.Reaction5.includes(user.user._id) ? true : false);
  
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
  
    const handlePlay = () => {
      if (level === 0 && video.paused) {
        // Play the video in level 0 only if it's not already playing
        video.play().then(() => {
          setIsVideoPlaying(true);
        });
      }
    };
  
    const handlePause = () => {
      setIsVideoPlaying(false);
    };
  
    // Add event listeners for play and pause events
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
  
    // Cleanup event listeners on component unmount
    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [level]);

  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    const getuserdetails = async () => {
      try {
        const details = await axios.get(`${BACKEND_URI}/api/user/post/user/details/${id.user}`);
        console.log(details.data);
        setUserDetails(details.data);
      } catch (error) {
        console.log("ERROR OCCURED IN CATCH BLOCK" + error)
      }
    }
    getuserdetails();
  }, [])



  const handleReaction5 = async () => {

       await fetch(`${BACKEND_URI}/api/reels/${id._id}/react_5_reel`,
         {
           method: "PUT",
           headers: {
             'Content-Type': 'application/json',
             jwttoken: jwt_here
           } 
         })
         .then(response => {
           console.log(response)
           if (response.ok) {
            if(R5status){
            setR5status(false);
            setR5Count(R5count-1);
            }else{
              setR5status(true);
              setR5Count(R5count+1);
            }
           } else {
             console.error('Failed to update reaction5');
           }
         })
         .catch(error => {
           console.error('Error during reaction5 update:', error);
         });
         

    }

    //const [countR5, setCountR5] = useState(id.Reaction5.length);





  
  const handleVideoClick = () => {
    if (videoRef.current) {
      const video = videoRef.current;

      if (!isVideoPlaying) {
        // If the video is not playing, start playing after user interaction
        video.play().then(() => {
          setIsVideoPlaying(true);
        });
      } else {
        // If the video is playing, pause it on user interaction
        video.pause();
        setIsVideoPlaying(false);
      }
    }
    
  };

  const className = `item level${level}`;
  const videoUrl = id.video;
  const video_DESC = id.description;
  const video_Id = id._id;
  const [REELComments, setREELComments] = useState(id.comments);




//animation
const [hearts, setHearts] = useState([]);

  const startAnimation = () => {
    const intervalId = setInterval(() => {
      const container = document.querySelector('.anime_container');
      const newIcon = document.createElement('div');
      newIcon.classList.add('hearts');
      newIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
        <path fill="#ffb74d" d="M13.1,32.4l0.4,0.4c0,0-0.5-4.1,0-5.5c0.5-1.4,1.8-3.7,1.8-3.7s-0.9-1.9-0.9-3.7s4.2-5.5,6.4-5.5 c7.2-0.2,11.1,3.9,12.9,4.6C35.5,19.6,40,17,40,17l1,8l-2,8v0.8c0,0.8-0.1,1.6-0.4,2.4C37.6,38.7,36,43,36,43s-4,0.8-9.7,0.8 c-4.4,0-11.6-3-12.3-4.8s-1.8-7.5-1.8-7.5L13.1,32.4z"></path><path fill="#7f8c8d" d="M36,43c0,0-3.3,1-9,1c-4.4,0-12.3-3.2-13-5s-1.8-7.5-1.8-7.5l0.9,0.9l1.3,1.3c1.7,1,3.8,1.8,5.6,2.3 l2-3c0,0,3.7,0.5,9,1.6c5.8,1.1,5.6,0.2,6.3,2c0.1,0.3,0.3,1.2,0.5,2C37.3,39.6,36,43,36,43z"></path><path fill="#eaa549" d="M32,34c-0.4,0-0.8-0.2-0.9-0.6c-0.2-0.5,0-1.1,0.5-1.3c0.3-0.1,0.4-0.2,0.4-0.6 c0-0.3-0.8-0.5-1.1-0.5c-0.5,0-1-0.5-0.9-1.1c0-0.5,0.5-1,1.1-0.9c1.1,0.1,3,0.7,3,2.5c0,1.2-0.5,2-1.6,2.4C32.3,34,32.1,34,32,34z"></path><path fill="#fff" d="M24.3,30c0,0,1.5,0,2.6-0.9c1.1-0.9,1.4-2.7,0.9-3.4c-0.6-0.8-3-2.6-5.2-2.6c-1.9,0-2.6,1.7-2.6,1.7 S20,30,24.3,30z"></path><path fill="#6d4c41" d="M38,6c0,0-0.6,4.2-1,5c0,0-0.7-4.2-4-6c0,1.8,0,4,0,4s-1.6-3.9-7-5l2,5c0,0-3.8-3.7-10-4 c1.5,2.1,2,4,2,4c-3.8-2.2-6.5,0-8,1c3.2,0.4,4,2,4,2c-1,0-1,0-1,0c-4,0-6.3,1.5-7,4c1.2,0,3,1,3,1l-3,2l2,3v5l3,5c0,0,0.1,0,1,0 c0-0.4,0-1.3,0-2c0-4.3,1.8-6.1,1.8-6.1c0.3-0.7,0.2-1.2-0.4-1.9c-0.3-0.3-0.5-0.8-0.5-2c0-1.2,1.9-5,7-5c4.5,0,8.3,3.1,11,4 c2.7,1,4.9,1,7,1c0,0,2-0.7,2-6.1C42,9.5,38,6,38,6z"></path><path fill="#6d4c41" d="M22.9,26.4c-0.4,1.6,0.1,3.2,1.2,3.6c0.1,0,0.2,0,0.3,0c0.1,0,0.3,0,0.6-0.1 c0.8-0.3,1.6-1.1,1.9-2.3c0.3-1.3,0.1-2.5-0.6-3.2c-0.2-0.1-0.4-0.3-0.7-0.4C24.5,23.7,23.3,24.8,22.9,26.4z"></path><path fill="#333" d="M25.4,24.9c-0.6-0.2-1.3,0.4-1.5,1.4s0.1,2,0.7,2.2c0.6,0.2,1.3-0.4,1.5-1.4 C26.4,26.1,26.1,25.1,25.4,24.9z"></path><path fill="#fff" d="M36,32c-2,0-2-3.7-2-3.7s0.6-1.8,3-1.8c1.8,0,2.1,1.2,1.9,2.8C38.6,32,37,32,36,32z"></path><path fill="#6d4c41" d="M37.3,26.6c-0.7-0.4-1.5,0.2-1.8,1.7c-0.4,1.5-0.2,3.3,0.5,3.6c0.8,0.2,1.6-0.5,1.9-2 C38.1,28.4,38,26.9,37.3,26.6z"></path><path fill="#333" d="M37.1,27.4c-0.3-0.2-0.7,0.1-1,0.9c-0.2,0.8-0.2,1.8,0.1,2s0.8-0.3,1-1 C37.5,28.4,37.5,27.6,37.1,27.4z"></path><path fill="#fff" d="M35.3,36.9c0,0-10.8-1.5-12.3-1.9l1.4,4h10.2L35.3,36.9z"></path><path fill="#6d4c41" d="M29 25c-.3 0-.7-.2-.9-.5-.1-.1-2-2.8-9.1-2.5-.5 0-1-.4-1-1 0-.6.4-1 1-1 8.5-.4 10.8 3.3 10.9 3.5.3.5.1 1.1-.4 1.4C29.3 25 29.2 25 29 25zM40 26c-.2 0-.4-.1-.6-.2-.8-.5-2.9-.2-4.1.1-.5.2-1.1-.1-1.2-.7-.2-.5.1-1.1.7-1.2.4-.1 4-1.2 5.9.1.5.3.6.9.3 1.4C40.6 25.8 40.3 26 40 26z"></path><path fill="#ffb74d" d="M13.5,31c0,0-1.8-5-4.4-5c-4.5-0.1-2.8,5.1-2.8,5.1S8.7,36,11,36c2.4,0,3.6-2.2,4-3v-2H13.5z"></path><path fill="#eaa549" d="M11,32c-0.4,0-0.8-0.2-0.9-0.6C9.8,30.7,9.2,30,9,30c-0.6,0-1-0.4-1-1s0.4-1,1-1 c1.8,0,2.7,2.2,2.9,2.6c0.2,0.5,0,1.1-0.5,1.3C11.3,32,11.1,32,11,32z"></path>
        </svg>`;
      //newIcon.style.left = Math.random() * 100 + 'vw';
      newIcon.style.left=(Math.random() * 2 - 1) * 50 + 'vw';
      container.appendChild(newIcon);

      // Fade out the element after 2 seconds
      setTimeout(() => {
        newIcon.style.opacity = '0';
      }, 500);

      // Remove the element from the DOM after the transition ends
      newIcon.addEventListener('transitionend', () => {
        container.removeChild(newIcon);
      });
    }, 100);

    // Stop calling the function after 3 seconds
    setTimeout(() => {
      clearInterval(intervalId);
    }, 3000);
  };

  const startAnimation_1 = () => {
    const intervalId = setInterval(() => {
      const container = document.querySelector('.anime_container');
      const newIcon = document.createElement('div');
      newIcon.classList.add('hearts');
      newIcon.innerHTML = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="35"
        height="35"
      >
        <g id="_13-love" data-name="13-love">
          <circle cx="24" cy="24" r="23" style="fill:#ffce52;" />
          <path d="M24 4c12.15 0 22 8.507 22 19h.975a23 23 0 0 0-45.95 0H2C2 12.507 11.85 4 24 4z" style="fill:#ffe369;" />
          <path d="M46 23c0 10.493-9.85 19-22 19S2 33.493 2 23h-.975c-.014.332-.025.665-.025 1a23 23 0 0 0 46 0c0-.335-.011-.668-.025-1z" style="fill:#ffb32b;" />
          <ellipse cx="37" cy="9" rx=".825" ry="1.148" transform="rotate(-45.02 37 9)" style="fill:#f6fafd;" />
          <ellipse cx="30.746" cy="4.5" rx=".413" ry=".574" transform="rotate(-45.02 30.745 4.5)" style="fill:#f6fafd;" />
          <ellipse cx="34" cy="7" rx="1.65" ry="2.297" transform="rotate(-45.02 34 7)" style="fill:#f6fafd;" />
          <path d="M34 39c0-2.76-4.47-5-10-5s-10 2.24-10 5l-.1.13A10.727 10.727 0 0 1 9 30.15 2.025 2.025 0 0 1 10.87 28c1.88 1.08 6.39 1 13.13 1s11.25.08 13.12-1A2.026 2.026 0 0 1 39 30.15a10.727 10.727 0 0 1-4.9 8.98z" style="fill:#273941;" />
          <path class="cls-7" d="M16.5 9a4.465 4.465 0 0 1 4.5 4.8C21 21 13.5 25 12 25c-.72 0-8.38-3.7-8.97-10.39Q3 14.205 3 13.8a4.451 4.451 0 0 1 3.58-4.7A4.053 4.053 0 0 1 7.5 9c2.25 0 3.75 1.6 4.5 4 .75-2.4 2.25-4 4.5-4zM45 13.8q0 .4-.03.81C44.44 21.3 37.44 25 36 25c-.75 0-9-4-9-11.2A4.465 4.465 0 0 1 31.5 9c2.25 0 3.75 1.6 4.5 4 .75-2.4 2.25-4 4.5-4a4.053 4.053 0 0 1 .92.1A4.451 4.451 0 0 1 45 13.8z" style="fill:#cf4054;" />
          <path d="M10.87 30c1.88 1.08 6.39 1 13.13 1s11.25.08 13.12-1a1.926 1.926 0 0 1 1.793 1.536A11.043 11.043 0 0 0 39 30.15 2.026 2.026 0 0 0 37.12 28c-1.87 1.08-6.38 1-13.12 1s-11.25.08-13.13-1A2.025 2.025 0 0 0 9 30.15a11.015 11.015 0 0 0 .087 1.385A1.92 1.92 0 0 1 10.87 30z" style="fill:#141e21;" />
          <path d="M33.531 37.486A18.171 18.171 0 0 1 24 40a18.171 18.171 0 0 1-9.531-2.514A2.809 2.809 0 0 0 14 39l-.1.13A17.882 17.882 0 0 0 24 42a17.882 17.882 0 0 0 10.1-2.87L34 39a2.809 2.809 0 0 0-.469-1.514z" style="fill:#8a293d;" />
          <path class="cls-10" d="M36 25c-.71 0-8.131-3.59-8.921-10.081A6 6 0 0 0 27 15.8C27 23 35.25 27 36 27c1.44 0 8.44-3.7 8.97-10.39q.03-.41.03-.81a6.079 6.079 0 0 0-.07-.907C44.225 21.4 37.419 25 36 25zM12 25c-.71 0-8.131-3.59-8.921-10.081A6 6 0 0 0 3 15.8C3 23 11.25 27 12 27c1.44 0 8.44-3.7 8.97-10.39q.03-.41.03-.81a6.079 6.079 0 0 0-.07-.907C20.225 21.4 13.419 25 12 25z" style="fill:#fbb40a;" />
          <path class="cls-6" d="M40.5 9c-2.25 0-3.75 1.6-4.5 4 .583-1.8 1.75-3 3.5-3a3.408 3.408 0 0 1 3.5 3.6c0 5.4-5.833 8.4-7 8.4-.56 0-6.518-2.775-6.977-7.793A8.167 8.167 0 0 1 29 13.6a3.366 3.366 0 0 1 2.784-3.525A3.243 3.243 0 0 1 32.5 10c1.75 0 2.917 1.2 3.5 3-.75-2.4-2.25-4-4.5-4a4.053 4.053 0 0 0-.92.1A4.451 4.451 0 0 0 27 13.8q0 .4.03.81C27.62 21.3 35.28 25 36 25c1.5 0 9-4 9-11.2A4.465 4.465 0 0 0 40.5 9zM16.5 9c-2.25 0-3.75 1.6-4.5 4 .583-1.8 1.75-3 3.5-3a3.408 3.408 0 0 1 3.5 3.6c0 5.4-5.833 8.4-7 8.4-.56 0-6.518-2.775-6.977-7.793A8.25 8.25 0 0 1 5 13.6a3.366 3.366 0 0 1 2.784-3.525A3.243 3.243 0 0 1 8.5 10c1.75 0 2.917 1.2 3.5 3-.75-2.4-2.25-4-4.5-4a4.053 4.053 0 0 0-.92.1A4.451 4.451 0 0 0 3 13.8q0 .4.03.81C3.62 21.3 11.28 25 12 25c1.5 0 9-4 9-11.2A4.465 4.465 0 0 0 16.5 9z" style="fill:#ae2d4c;" />
          <ellipse cx="42" cy="13" rx=".825" ry="1.148" transform="rotate(-45.02 41.999 13)" style="fill:#f6fafd;" />
          <ellipse cx="40.746" cy="11.5" rx=".413" ry=".574" transform="rotate(-45.02 40.746 11.5)" style="fill:#f6fafd;" />
          <ellipse cx="18" cy="13" rx=".825" ry="1.148" transform="rotate(-45.02 18 13)" style="fill:#f6fafd;" />
          <ellipse cx="16.746" cy="11.5" rx=".413" ry=".574" transform="rotate(-45.02 16.745 11.5)" style="fill:#f6fafd;" />
        </g>
      </svg>`;
      //newIcon.style.left = Math.random() * 100 + 'vw';
      newIcon.style.left=(Math.random() * 2 - 1) * 50 + 'vw';
      container.appendChild(newIcon);

      // Fade out the element after 2 seconds
      setTimeout(() => {
        newIcon.style.opacity = '0';
      }, 500);

      // Remove the element from the DOM after the transition ends
      newIcon.addEventListener('transitionend', () => {
        container.removeChild(newIcon);
      });
    }, 100);

    // Stop calling the function after 3 seconds
    setTimeout(() => {
      clearInterval(intervalId);
    }, 3000);
  };


  const startAnimation_2 = () => {
    const intervalId = setInterval(() => {
      const container = document.querySelector('.anime_container');
      const newIcon = document.createElement('div');
      newIcon.classList.add('hearts');
      newIcon.innerHTML = `
      <svg
  id="_01-smile"
  data-name="01-smile"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 48 48"
  width="35"
  height="35"
>
  <circle cx="24" cy="24" r="23" fill="#ffce52" />
  <path d="M7 26c0 3.32 7.6 7 17 7s17-3.68 17-7a12.636 12.636 0 0 1-5.6 10.38 19.76 19.76 0 0 1-22.8 0A12.636 12.636 0 0 1 7 26z" fill="#ae2d4c" />
  <ellipse cx="33" cy="18" rx="3" ry="4" fill="#273941" />
  <ellipse cx="15" cy="18" rx="3" ry="4" fill="#273941" />
  <ellipse cx="33" cy="18" rx="2" ry="3" fill="#141e21" />
  <ellipse cx="15" cy="18" rx="2" ry="3" fill="#141e21" />
  <circle cx="34" cy="17" r="1" fill="#f6fafd" />
  <circle cx="16" cy="17" r="1" fill="#f6fafd" />
  <path d="M24 35c7.962 0 14.613-2.641 16.468-5.466A12.089 12.089 0 0 0 41 26c0 3.32-7.6 7-17 7S7 29.32 7 26a12.089 12.089 0 0 0 .532 3.534C9.387 32.359 16.038 35 24 35z" fill="#8a293d" />
  <path d="M39.475 28.655A3.775 3.775 0 0 0 41 26c-1 1-8 2-17 2S8 27 7 26a3.775 3.775 0 0 0 1.525 2.655C11.223 29.394 17 30 24 30s12.777-.606 15.475-1.345z" fill="#ededed" />
  <path d="M24 4c12.15 0 22 8.507 22 19h.975a23 23 0 0 0-45.95 0H2C2 12.507 11.85 4 24 4z" fill="#ffe369" />
  <path d="M46 23c0 10.493-9.85 19-22 19S2 33.493 2 23h-.975c-.014.332-.025.665-.025 1a23 23 0 0 0 46 0c0-.335-.011-.668-.025-1z" fill="#ffb32b" />
  <ellipse cx="37" cy="9" rx=".825" ry="1.148" transform="rotate(-45.02 37 9)" fill="#f6fafd" />
  <ellipse cx="30.746" cy="4.5" rx=".413" ry=".574" transform="rotate(-45.02 30.745 4.5)" fill="#f6fafd" />
  <ellipse cx="34" cy="7" rx="1.65" ry="2.297" transform="rotate(-45.02 34 7)" fill="#f6fafd" />
</svg>`;
      //newIcon.style.left = Math.random() * 100 + 'vw';
      newIcon.style.left=(Math.random() * 2 - 1) * 50 + 'vw';
      container.appendChild(newIcon);

      // Fade out the element after 2 seconds
      setTimeout(() => {
        newIcon.style.opacity = '0';
      }, 500);

      // Remove the element from the DOM after the transition ends
      newIcon.addEventListener('transitionend', () => {
        container.removeChild(newIcon);
      });
    }, 100);

    // Stop calling the function after 3 seconds
    setTimeout(() => {
      clearInterval(intervalId);
    }, 3000);
  };


  const startAnimation_3 = () => {
    const intervalId = setInterval(() => {
      const container = document.querySelector('.anime_container');
      const newIcon = document.createElement('div');
      newIcon.classList.add('hearts');
      newIcon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="35" height="35">
  <g id="_18-laughing" data-name="18-laughing">
    <circle cx="24" cy="24" r="23" style="fill: #ffce52;" />
    <path class="cls-2" d="M37.553 20.9C35.764 20 33.717 20 30 20a1 1 0 0 1-1-1c0-2.265 3.568-5 8-5v2a7.807 7.807 0 0 0-5.419 2c3.058.018 4.963.151 6.866 1.1zM10.447 20.9l-.894-1.79c1.9-.951 3.808-1.084 6.866-1.1A7.807 7.807 0 0 0 11 16v-2c4.432 0 8 2.735 8 5a1 1 0 0 1-1 1c-3.717 0-5.764 0-7.553.9z" />
    <path d="M35.2 26H38c0 8.36-6.53 13-14 13a14.971 14.971 0 0 1-9.8-3.36A12.283 12.283 0 0 1 10 26h2.8c0 3.87 5.01 7 11.2 7s11.2-3.13 11.2-7z" style="fill: #ae2d4c;" />
    <path class="cls-4" d="M12.8 26h22.4c0 3.87-5.01 7-11.2 7s-11.2-3.13-11.2-7z" />
    <path d="M24 4c12.15 0 22 8.507 22 19h.975a23 23 0 0 0-45.95 0H2C2 12.507 11.85 4 24 4z" style="fill: #ffe369;" />
    <path class="cls-6" d="M46 23c0 10.493-9.85 19-22 19S2 33.493 2 23h-.975c-.014.332-.025.665-.025 1a23 23 0 0 0 46 0c0-.335-.011-.668-.025-1z" />
    <ellipse class="cls-4" cx="37" cy="9" rx=".825" ry="1.148" transform="rotate(-45.02 37 9)" />
    <ellipse class="cls-4" cx="30.746" cy="4.5" rx=".413" ry=".574" transform="rotate(-45.02 30.745 4.5)" />
    <ellipse class="cls-4" cx="34" cy="7" rx="1.65" ry="2.297" transform="rotate(-45.02 34 7)" />
    <path d="M35.2 26c0 3.87-5.01 7-11.2 7s-11.2-3.13-11.2-7H12c0 4.976 5.368 9 12 9s12-4.024 12-9z" style="fill: #8a293d;" />
    <path d="M35.2 26H12.8a4.622 4.622 0 0 0 .469 2h21.462a4.622 4.622 0 0 0 .469-2z" style="fill: #ededed;" />
    <path class="cls-9" d="M46.044 22.429a3.263 3.263 0 0 1-4.615 4.615c-1.275-1.274-2.885-6.346-2.308-6.923s5.649 1.033 6.923 2.308zM1.956 22.429a3.263 3.263 0 0 0 4.615 4.615c1.275-1.274 2.885-6.344 2.308-6.923s-5.649 1.033-6.923 2.308z" />
    <path class="cls-10" d="M46.044 22.428c-1.12-1.12-5.173-2.5-6.529-2.424a10.448 10.448 0 0 1 4.768 1.817 2.448 2.448 0 0 1-3.462 3.462A10.453 10.453 0 0 1 39 20.515c-.075 1.355 1.3 5.408 2.425 6.529a3.264 3.264 0 1 0 4.615-4.616zM3.717 25.283a2.448 2.448 0 0 1 0-3.462A10.448 10.448 0 0 1 8.485 20c-1.356-.075-5.409 1.3-6.529 2.424a3.264 3.264 0 0 0 4.615 4.616c1.121-1.117 2.5-5.17 2.429-6.525a10.453 10.453 0 0 1-1.817 4.768 2.448 2.448 0 0 1-3.466 0z" />
    <ellipse class="cls-4" cx="45" cy="23" rx=".825" ry="1.148" transform="rotate(-45.02 45 23)" />
    <ellipse class="cls-4" cx="44.746" cy="24.5" rx=".413" ry=".574" transform="rotate(-45.02 44.745 24.5)" />
    <ellipse class="cls-4" cx="3" cy="23" rx="1.148" ry=".825" transform="rotate(-44.98 3 23)" />
    <ellipse class="cls-4" cx="3.254" cy="24.5" rx=".574" ry=".413" transform="rotate(-44.98 3.254 24.5)" />
    <path class="cls-11" d="M41.429 27.044a13.329 13.329 0 0 1-2.206-4.977.328.328 0 0 0-.1.054c-.577.577 1.033 5.649 2.308 6.923a3.249 3.249 0 0 0 3.069.856 17.065 17.065 0 0 0 .862-2.346 3.255 3.255 0 0 1-3.933-.51z" />
    <path class="cls-6" d="M46.829 25.736a3.069 3.069 0 0 1-1.469 1.817 17.065 17.065 0 0 1-.86 2.347 3.2 3.2 0 0 0 2.091-1.581q.213-1.12.316-2.277c-.025-.103-.046-.206-.078-.306z" />
    <path class="cls-11" d="M6.571 29.044c1.275-1.274 2.885-6.344 2.308-6.923a.328.328 0 0 0-.1-.054 13.329 13.329 0 0 1-2.206 4.977 3.255 3.255 0 0 1-3.931.509A17.065 17.065 0 0 0 3.5 29.9a3.249 3.249 0 0 0 3.071-.856z" />
    <path class="cls-6" d="M3.5 29.9a17.065 17.065 0 0 1-.862-2.346 3.069 3.069 0 0 1-1.469-1.817c-.032.1-.053.2-.076.3q.1 1.157.316 2.277A3.2 3.2 0 0 0 3.5 29.9z" />
  </g>
</svg>
`;
      //newIcon.style.left = Math.random() * 100 + 'vw';
      newIcon.style.left=(Math.random() * 2 - 1) * 50 + 'vw';
      container.appendChild(newIcon);

      // Fade out the element after 2 seconds
      setTimeout(() => {
        newIcon.style.opacity = '0';
      }, 500);

      // Remove the element from the DOM after the transition ends
      newIcon.addEventListener('transitionend', () => {
        container.removeChild(newIcon);
      });
    }, 100);

    // Stop calling the function after 3 seconds
    setTimeout(() => {
      clearInterval(intervalId);
    }, 3000);
  };


  const startAnimation_4 = () => {
    const intervalId = setInterval(() => {
      const container = document.querySelector('.anime_container');
      const newIcon = document.createElement('div');
      newIcon.classList.add('hearts');
      newIcon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="35" height="35">
  <g id="_11-wow" data-name="11-wow">
    <circle cx="24" cy="24" r="23" style="fill: #ffce52;" />
    <ellipse cx="33" cy="18" rx="3" ry="4" style="fill: #273941;" />
    <ellipse cx="15" cy="18" rx="3" ry="4" style="fill: #273941;" />
    <ellipse cx="33" cy="18" rx="2" ry="3" style="fill: #141e21;" />
    <ellipse cx="15" cy="18" rx="2" ry="3" style="fill: #141e21;" />
    <circle cx="34" cy="17" r="1" style="fill: #f6fafd;" />
    <circle cx="16" cy="17" r="1" style="fill: #f6fafd;" />
    <path class="cls-2" d="M37 10h-2a2 2 0 0 0-4 0h-2a4 4 0 0 1 8 0zM19 10h-2a2 2 0 0 0-4 0h-2a4 4 0 0 1 8 0z" />
    <path d="M24 4c12.15 0 22 8.507 22 19h.975a23 23 0 0 0-45.95 0H2C2 12.507 11.85 4 24 4z" style="fill: #ffe369;" />
    <path class="cls-6" d="M46 23c0 10.493-9.85 19-22 19S2 33.493 2 23h-.975c-.014.332-.025.665-.025 1a23 23 0 0 0 46 0c0-.335-.011-.668-.025-1z" />
    <ellipse class="cls-4" cx="34" cy="5" rx=".825" ry="1.148" transform="rotate(-45.02 34 5)" />
    <ellipse class="cls-4" cx="26.746" cy="3.5" rx=".413" ry=".574" transform="rotate(-45.02 26.746 3.5)" />
    <ellipse class="cls-4" cx="30" cy="4" rx="1.65" ry="2.297" transform="rotate(-45.02 30 4)" />
    <ellipse class="cls-2" cx="24" cy="34" rx="6" ry="9" style="fill: #273941;" />
    <path d="M24 43c2.542 0 4.71-2.375 5.584-5.723a7.985 7.985 0 0 0-11.168 0C19.29 40.625 21.458 43 24 43z" style="fill: #ae2d4c;" />
    <path class="cls-6" d="M24 43c-3.088 0-5.629-3.5-5.961-8-.024.329-.039.662-.039 1 0 4.971 2.686 9 6 9s6-4.029 6-9c0-.338-.015-.671-.039-1-.332 4.5-2.873 8-5.961 8z" />
    <path class="cls-3" d="M24 27c3.088 0 5.629 3.5 5.961 8 .024-.329.039-.662.039-1 0-4.971-2.686-9-6-9s-6 4.029-6 9c0 .338.015.671.039 1 .332-4.5 2.873-8 5.961-8z" />
    <path d="M24 41c-2.132 0-3.989-1.682-5.052-4.2a7.95 7.95 0 0 0-.532.473C19.29 40.625 21.458 43 24 43s4.71-2.375 5.584-5.723a7.95 7.95 0 0 0-.532-.473C27.989 39.318 26.132 41 24 41z" style="fill: #8a293d;" />
  </g>
</svg>

`;
      //newIcon.style.left = Math.random() * 100 + 'vw';
      newIcon.style.left=(Math.random() * 2 - 1) * 50 + 'vw';
      container.appendChild(newIcon);

      // Fade out the element after 2 seconds
      setTimeout(() => {
        newIcon.style.opacity = '0';
      }, 500);

      // Remove the element from the DOM after the transition ends
      newIcon.addEventListener('transitionend', () => {
        container.removeChild(newIcon);
      });
    }, 100);

    // Stop calling the function after 3 seconds
    setTimeout(() => {
      clearInterval(intervalId);
    }, 3000);
  };


  const startAnimation_5 = () => {
    if(!R5status){
    const intervalId = setInterval(() => {
      const container = document.querySelector('.anime_container');
      const newIcon = document.createElement('div');
      newIcon.classList.add('hearts');
      newIcon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="35" height="35">
      <g id="_04-wink" data-name="04-wink">
        <circle cx="24" cy="24" r="23" style="fill: #ffce52;" />
        <ellipse cx="15" cy="18" rx="3" ry="4" style="fill: #273941;" />
        <ellipse cx="15" cy="18" rx="2" ry="3" style="fill: #141e21;" />
        <circle cx="16" cy="17" r="1" style="fill: #f6fafd;" />
        <path class="cls-2" d="M23 38c-5.424 0-10-4.3-10-7h2c0 1.208 3.319 5 8 5 6.617 0 12-4.935 12-11h2c0 7.168-6.28 13-14 13zM36.445 22.832l-6-4a1 1 0 0 1 .108-1.727l6-3 .894 1.79-4.459 2.229 4.567 3.044z" />
        <path d="M24 4c12.15 0 22 8.507 22 19h.975a23 23 0 0 0-45.95 0H2C2 12.507 11.85 4 24 4z" style="fill: #ffe369;" />
        <path d="M46 23c0 10.493-9.85 19-22 19S2 33.493 2 23h-.975c-.014.332-.025.665-.025 1a23 23 0 0 0 46 0c0-.335-.011-.668-.025-1z" style="fill: #ffb32b;" />
        <ellipse class="cls-4" cx="37" cy="9" rx=".825" ry="1.148" transform="rotate(-45.02 37 9)" />
        <ellipse class="cls-4" cx="30.746" cy="4.5" rx=".413" ry=".574" transform="rotate(-45.02 30.745 4.5)" />
        <ellipse class="cls-4" cx="34" cy="7" rx="1.65" ry="2.297" transform="rotate(-45.02 34 7)" />
      </g>
    </svg>
    

`;
      //newIcon.style.left = Math.random() * 100 + 'vw';
      newIcon.style.left=(Math.random() * 2 - 1) * 50 + 'vw';
      container.appendChild(newIcon);

      // Fade out the element after 2 seconds
      setTimeout(() => {
        newIcon.style.opacity = '0';
      }, 500);

      // Remove the element from the DOM after the transition ends
      newIcon.addEventListener('transitionend', () => {
        container.removeChild(newIcon);
      });
    }, 100);

    // Stop calling the function after 3 seconds
    setTimeout(() => {
      clearInterval(intervalId);
    }, 3000);
  }
  };



  // Cleanup: Remove hearts after they fade out
  useEffect(() => {
    return () => {
      const heartsElements = document.querySelectorAll('.hearts');
      heartsElements.forEach((heart) => {
        heart.style.display = 'none';
      });
    };
  }, []);


  const [comment, setComment] = useState('');

  const addCommentToReel=async()=>{
    await fetch(`${BACKEND_URI}/api/reels/${id._id}/commentreel`,
    {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        jwttoken: jwt_here
      }, body: JSON.stringify({ entered_comment: comment })
    })
    .then(response => {
      if (response.ok) {
        setREELComments(REELComments.concat({
          comment_user_id:user.user.id,
          username:user.user.username,
          profilepic:user.user.profilepicture,
          comment:comment
        }));
        setComment('');
            console.log('comment added successfully')
      } else {
        console.error('Failed to add comment to reel');
      }
    })
    .catch(error => {
      console.error('Error during commenting reel :', error);
    });
    
  }



  return (
    <div className={className} style={{ display: "flex", flexDirection: "column" }}>
      {className === "item level0" && (
        <div className="descriptionn">
          <p
            style={{
              fontSize: "20px",
              position: "fixed",
              textAlign: "left",
              marginLeft: "-448px",
              marginTop: "51px",
              width: "300px",
              height: "300px",
              overflow: "hidden",
              wordWrap: "break-word",
              backdropFilter: 'blur(5px)'
            }}
          >
            {video_DESC}
            
          </p>
        </div>
      )}

      <video
        ref={videoRef}
        src={videoUrl}
        autoPlay={level===0} // Autoplay is handled in the useEffect
        loop
        // onClick={()=>{handleVideoClick;console.log(video_Id)}}
        onClick={() => { handleVideoClick(); console.log(video_Id,R5status); }}

        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "6%",
          zIndex: -1,
        }}
      ></video>

      {className === "item level0" && (
        <div style={{ display: "flex", alignItems: "center", marginTop: "-65px" }}>
          <img
            src={userDetails.profilepicture}
            className="PostImage" alt=""
            style={{ width: "50px", height: "50px", marginRight: "15px" }}
          />
          <p style={{ fontSize: "20px" }}>{userDetails.username}</p>
        </div>
      )}
      {
        className==="item level0"&& <div  class="All_comments" style={{ height:'max-content', overflowX:'hidden' ,WebkitOverflowScrolling: 'touch',overflowY:'scroll' ,marginTop:'-372px',marginLeft:'110%',display:'flex',flexDirection:'column',width:'353px',maxHeight:'250px',borderRadius:'20px 30px 30px 0px'}}>

          {
            REELComments && REELComments.map((comm)=>{
              return <div class = 'comment_container' style={{margin:'10px',display:'flex',flexDirection:'row',width:'333px',borderRadius:'20px 30px 30px 0px',border:'1px solid white', backgroundColor: 'rgba(255, 255, 255, 0.2)',backdropFilter: 'blur(10px)',boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'}}>
              <img
                  src={comm.profilepicture}
                alt=""
                className="PostImage"
                  style={{ width: "50px", height: "50px", marginRight: "5px" , marginTop:'9px' , marginBottom:'10px' }}
                />
                <p style={{ wordWrap:'break-word' , maxHeight:'max-content', display:'flex' , alignItems:'center' , justifyContent:'center', fontSize:'13px' , lineHeight:'15px' , textAlign:'start' , padding:'7px'}}>{comm.username }: {comm.comment}</p>
              </div>
            })
          }
       
        </div>
      }
      {   className==="item level0" &&<div className="comment_reel"  style={{display:'flex',flexDirection:'column'}}>
        <div style={{display:'flex',flexDirection:'row'}}>
        <input  value={comment} onChange={(e) => setComment(e.target.value)} type="text" placeholder="Enter Your Comment Here"/>
        <div class="send_svg" onClick={addCommentToReel}>
        <svg  style={{cursor:'pointer',backgroundColor:"#212121",marginLeft:'17px'}} width="40px" height="40px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fffafa" stroke-width="0.096"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.288"> <path fill-rule="evenodd" clip-rule="evenodd" d="M3.3938 2.20468C3.70395 1.96828 4.12324 1.93374 4.4679 2.1162L21.4679 11.1162C21.7953 11.2895 22 11.6296 22 12C22 12.3704 21.7953 12.7105 21.4679 12.8838L4.4679 21.8838C4.12324 22.0662 3.70395 22.0317 3.3938 21.7953C3.08365 21.5589 2.93922 21.1637 3.02382 20.7831L4.97561 12L3.02382 3.21692C2.93922 2.83623 3.08365 2.44109 3.3938 2.20468ZM6.80218 13L5.44596 19.103L16.9739 13H6.80218ZM16.9739 11H6.80218L5.44596 4.89699L16.9739 11Z" fill="#ffffff"></path> </g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M3.3938 2.20468C3.70395 1.96828 4.12324 1.93374 4.4679 2.1162L21.4679 11.1162C21.7953 11.2895 22 11.6296 22 12C22 12.3704 21.7953 12.7105 21.4679 12.8838L4.4679 21.8838C4.12324 22.0662 3.70395 22.0317 3.3938 21.7953C3.08365 21.5589 2.93922 21.1637 3.02382 20.7831L4.97561 12L3.02382 3.21692C2.93922 2.83623 3.08365 2.44109 3.3938 2.20468ZM6.80218 13L5.44596 19.103L16.9739 13H6.80218ZM16.9739 11H6.80218L5.44596 4.89699L16.9739 11Z" fill="#ffffff"></path> </g></svg>
        </div>
        </div>
 

  <div  className='reactions_box  anime_container' style={{display:'flex',flexDirection:'row'}}>


{/* <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
<path fill="#ffb74d" d="M13.1,32.4l0.4,0.4c0,0-0.5-4.1,0-5.5c0.5-1.4,1.8-3.7,1.8-3.7s-0.9-1.9-0.9-3.7s4.2-5.5,6.4-5.5 c7.2-0.2,11.1,3.9,12.9,4.6C35.5,19.6,40,17,40,17l1,8l-2,8v0.8c0,0.8-0.1,1.6-0.4,2.4C37.6,38.7,36,43,36,43s-4,0.8-9.7,0.8 c-4.4,0-11.6-3-12.3-4.8s-1.8-7.5-1.8-7.5L13.1,32.4z"></path><path fill="#7f8c8d" d="M36,43c0,0-3.3,1-9,1c-4.4,0-12.3-3.2-13-5s-1.8-7.5-1.8-7.5l0.9,0.9l1.3,1.3c1.7,1,3.8,1.8,5.6,2.3 l2-3c0,0,3.7,0.5,9,1.6c5.8,1.1,5.6,0.2,6.3,2c0.1,0.3,0.3,1.2,0.5,2C37.3,39.6,36,43,36,43z"></path><path fill="#eaa549" d="M32,34c-0.4,0-0.8-0.2-0.9-0.6c-0.2-0.5,0-1.1,0.5-1.3c0.3-0.1,0.4-0.2,0.4-0.6 c0-0.3-0.8-0.5-1.1-0.5c-0.5,0-1-0.5-0.9-1.1c0-0.5,0.5-1,1.1-0.9c1.1,0.1,3,0.7,3,2.5c0,1.2-0.5,2-1.6,2.4C32.3,34,32.1,34,32,34z"></path><path fill="#fff" d="M24.3,30c0,0,1.5,0,2.6-0.9c1.1-0.9,1.4-2.7,0.9-3.4c-0.6-0.8-3-2.6-5.2-2.6c-1.9,0-2.6,1.7-2.6,1.7 S20,30,24.3,30z"></path><path fill="#6d4c41" d="M38,6c0,0-0.6,4.2-1,5c0,0-0.7-4.2-4-6c0,1.8,0,4,0,4s-1.6-3.9-7-5l2,5c0,0-3.8-3.7-10-4 c1.5,2.1,2,4,2,4c-3.8-2.2-6.5,0-8,1c3.2,0.4,4,2,4,2c-1,0-1,0-1,0c-4,0-6.3,1.5-7,4c1.2,0,3,1,3,1l-3,2l2,3v5l3,5c0,0,0.1,0,1,0 c0-0.4,0-1.3,0-2c0-4.3,1.8-6.1,1.8-6.1c0.3-0.7,0.2-1.2-0.4-1.9c-0.3-0.3-0.5-0.8-0.5-2c0-1.2,1.9-5,7-5c4.5,0,8.3,3.1,11,4 c2.7,1,4.9,1,7,1c0,0,2-0.7,2-6.1C42,9.5,38,6,38,6z"></path><path fill="#6d4c41" d="M22.9,26.4c-0.4,1.6,0.1,3.2,1.2,3.6c0.1,0,0.2,0,0.3,0c0.1,0,0.3,0,0.6-0.1 c0.8-0.3,1.6-1.1,1.9-2.3c0.3-1.3,0.1-2.5-0.6-3.2c-0.2-0.1-0.4-0.3-0.7-0.4C24.5,23.7,23.3,24.8,22.9,26.4z"></path><path fill="#333" d="M25.4,24.9c-0.6-0.2-1.3,0.4-1.5,1.4s0.1,2,0.7,2.2c0.6,0.2,1.3-0.4,1.5-1.4 C26.4,26.1,26.1,25.1,25.4,24.9z"></path><path fill="#fff" d="M36,32c-2,0-2-3.7-2-3.7s0.6-1.8,3-1.8c1.8,0,2.1,1.2,1.9,2.8C38.6,32,37,32,36,32z"></path><path fill="#6d4c41" d="M37.3,26.6c-0.7-0.4-1.5,0.2-1.8,1.7c-0.4,1.5-0.2,3.3,0.5,3.6c0.8,0.2,1.6-0.5,1.9-2 C38.1,28.4,38,26.9,37.3,26.6z"></path><path fill="#333" d="M37.1,27.4c-0.3-0.2-0.7,0.1-1,0.9c-0.2,0.8-0.2,1.8,0.1,2s0.8-0.3,1-1 C37.5,28.4,37.5,27.6,37.1,27.4z"></path><path fill="#fff" d="M35.3,36.9c0,0-10.8-1.5-12.3-1.9l1.4,4h10.2L35.3,36.9z"></path><path fill="#6d4c41" d="M29 25c-.3 0-.7-.2-.9-.5-.1-.1-2-2.8-9.1-2.5-.5 0-1-.4-1-1 0-.6.4-1 1-1 8.5-.4 10.8 3.3 10.9 3.5.3.5.1 1.1-.4 1.4C29.3 25 29.2 25 29 25zM40 26c-.2 0-.4-.1-.6-.2-.8-.5-2.9-.2-4.1.1-.5.2-1.1-.1-1.2-.7-.2-.5.1-1.1.7-1.2.4-.1 4-1.2 5.9.1.5.3.6.9.3 1.4C40.6 25.8 40.3 26 40 26z"></path><path fill="#ffb74d" d="M13.5,31c0,0-1.8-5-4.4-5c-4.5-0.1-2.8,5.1-2.8,5.1S8.7,36,11,36c2.4,0,3.6-2.2,4-3v-2H13.5z"></path><path fill="#eaa549" d="M11,32c-0.4,0-0.8-0.2-0.9-0.6C9.8,30.7,9.2,30,9,30c-0.6,0-1-0.4-1-1s0.4-1,1-1 c1.8,0,2.7,2.2,2.9,2.6c0.2,0.5,0,1.1-0.5,1.3C11.3,32,11.1,32,11,32z"></path>
</svg> */}

<div  class="btn position-relative" onClick={startAnimation_1} style={{ cursor: 'pointer' , marginLeft:'-6px'}}>
<svg 
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width="35"
      height="35"
    >
      <defs>
        <style>{`.cls-4{fill:#f6fafd}.cls-6{fill:#ae2d4c}.cls-7{fill:#cf4054}.cls-10{fill:#fbb40a}`}</style>
      </defs>
      <g id="_13-love" data-name="13-love">
        <circle cx="24" cy="24" r="23" style={{ fill: '#ffce52' }} />
        <path d="M24 4c12.15 0 22 8.507 22 19h.975a23 23 0 0 0-45.95 0H2C2 12.507 11.85 4 24 4z" style={{ fill: '#ffe369' }} />
        <path d="M46 23c0 10.493-9.85 19-22 19S2 33.493 2 23h-.975c-.014.332-.025.665-.025 1a23 23 0 0 0 46 0c0-.335-.011-.668-.025-1z" style={{ fill: '#ffb32b' }} />
        <ellipse className="cls-4" cx="37" cy="9" rx=".825" ry="1.148" transform="rotate(-45.02 37 9)" />
        <ellipse className="cls-4" cx="30.746" cy="4.5" rx=".413" ry=".574" transform="rotate(-45.02 30.745 4.5)" />
        <ellipse className="cls-4" cx="34" cy="7" rx="1.65" ry="2.297" transform="rotate(-45.02 34 7)" />
        <path d="M34 39c0-2.76-4.47-5-10-5s-10 2.24-10 5l-.1.13A10.727 10.727 0 0 1 9 30.15 2.025 2.025 0 0 1 10.87 28c1.88 1.08 6.39 1 13.13 1s11.25.08 13.12-1A2.026 2.026 0 0 1 39 30.15a10.727 10.727 0 0 1-4.9 8.98z" style={{ fill: '#273941' }} />
        <path className="cls-6" d="m34 39 .1.13A17.882 17.882 0 0 1 24 42a17.882 17.882 0 0 1-10.1-2.87L14 39c0-2.76 4.47-5 10-5s10 2.24 10 5z" />
        <path className="cls-7" d="M16.5 9a4.465 4.465 0 0 1 4.5 4.8C21 21 13.5 25 12 25c-.72 0-8.38-3.7-8.97-10.39Q3 14.205 3 13.8a4.451 4.451 0 0 1 3.58-4.7A4.053 4.053 0 0 1 7.5 9c2.25 0 3.75 1.6 4.5 4 .75-2.4 2.25-4 4.5-4zM45 13.8q0 .4-.03.81C44.44 21.3 37.44 25 36 25c-.75 0-9-4-9-11.2A4.465 4.465 0 0 1 31.5 9c2.25 0 3.75 1.6 4.5 4 .75-2.4 2.25-4 4.5-4a4.053 4.053 0 0 1 .92.1A4.451 4.451 0 0 1 45 13.8z" />
        <path d="M10.87 30c1.88 1.08 6.39 1 13.13 1s11.25.08 13.12-1a1.926 1.926 0 0 1 1.793 1.536A11.043 11.043 0 0 0 39 30.15 2.026 2.026 0 0 0 37.12 28c-1.87 1.08-6.38 1-13.12 1s-11.25.08-13.13-1A2.025 2.025 0 0 0 9 30.15a11.015 11.015 0 0 0 .087 1.385A1.92 1.92 0 0 1 10.87 30z" style={{ fill: '#141e21' }} />
        <path d="M33.531 37.486A18.171 18.171 0 0 1 24 40a18.171 18.171 0 0 1-9.531-2.514A2.809 2.809 0 0 0 14 39l-.1.13A17.882 17.882 0 0 0 24 42a17.882 17.882 0 0 0 10.1-2.87L34 39a2.809 2.809 0 0 0-.469-1.514z" style={{ fill: '#8a293d' }} />
        <path className="cls-10" d="M36 25c-.71 0-8.131-3.59-8.921-10.081A6 6 0 0 0 27 15.8C27 23 35.25 27 36 27c1.44 0 8.44-3.7 8.97-10.39q.03-.41.03-.81a6.079 6.079 0 0 0-.07-.907C44.225 21.4 37.419 25 36 25zM12 25c-.71 0-8.131-3.59-8.921-10.081A6 6 0 0 0 3 15.8C3 23 11.25 27 12 27c1.44 0 8.44-3.7 8.97-10.39q.03-.41.03-.81a6.079 6.079 0 0 0-.07-.907C20.225 21.4 13.419 25 12 25z" />
        <path className="cls-6" d="M40.5 9c-2.25 0-3.75 1.6-4.5 4 .583-1.8 1.75-3 3.5-3a3.408 3.408 0 0 1 3.5 3.6c0 5.4-5.833 8.4-7 8.4-.56 0-6.518-2.775-6.977-7.793A8.167 8.167 0 0 1 29 13.6a3.366 3.366 0 0 1 2.784-3.525A3.243 3.243 0 0 1 32.5 10c1.75 0 2.917 1.2 3.5 3-.75-2.4-2.25-4-4.5-4a4.053 4.053 0 0 0-.92.1A4.451 4.451 0 0 0 27 13.8q0 .4.03.81C27.62 21.3 35.28 25 36 25c1.5 0 9-4 9-11.2A4.465 4.465 0 0 0 40.5 9zM16.5 9c-2.25 0-3.75 1.6-4.5 4 .583-1.8 1.75-3 3.5-3a3.408 3.408 0 0 1 3.5 3.6c0 5.4-5.833 8.4-7 8.4-.56 0-6.518-2.775-6.977-7.793A8.25 8.25 0 0 1 5 13.6a3.366 3.366 0 0 1 2.784-3.525A3.243 3.243 0 0 1 8.5 10c1.75 0 2.917 1.2 3.5 3-.75-2.4-2.25-4-4.5-4a4.053 4.053 0 0 0-.92.1A4.451 4.451 0 0 0 3 13.8q0 .4.03.81C3.62 21.3 11.28 25 12 25c1.5 0 9-4 9-11.2A4.465 4.465 0 0 0 16.5 9z" />
        <ellipse className="cls-4" cx="42" cy="13" rx=".825" ry="1.148" transform="rotate(-45.02 41.999 13)" />
        <ellipse className="cls-4" cx="40.746" cy="11.5" rx=".413" ry=".574" transform="rotate(-45.02 40.746 11.5)" />
        <ellipse className="cls-4" cx="18" cy="13" rx=".825" ry="1.148" transform="rotate(-45.02 18 13)" />
        <ellipse className="cls-4" cx="16.746" cy="11.5" rx=".413" ry=".574" transform="rotate(-45.02 16.745 11.5)" />
      </g>
    </svg>
    <span class="position-absolute top-0 start-10 translate-middle badge rounded-pill bg-danger">
    2.3k
  </span>

    </div>




    <div  class="btn position-relative" onClick={startAnimation_2} style={{ cursor: 'pointer' , marginLeft:'-50px'  }}>
<svg
      id="_01-smile"
      data-name="01-smile"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width="35"
      height="35"
    >
      <defs>
        <style>{`.cls-3{fill:#f6fafd}.cls-4{fill:#273941}.cls-5{fill:#141e21}`}</style>
      </defs>
      <circle cx="24" cy="24" r="23" style={{ fill: '#ffce52' }} />
      <path d="M7 26c0 3.32 7.6 7 17 7s17-3.68 17-7a12.636 12.636 0 0 1-5.6 10.38 19.76 19.76 0 0 1-22.8 0A12.636 12.636 0 0 1 7 26z" style={{ fill: '#ae2d4c' }} />
      <path className="cls-3" d="M41 26c0 3.32-7.6 7-17 7S7 29.32 7 26c1 1 8 2 17 2s16-1 17-2z" />
      <ellipse className="cls-4" cx="33" cy="18" rx="3" ry="4" />
      <ellipse className="cls-4" cx="15" cy="18" rx="3" ry="4" />
      <ellipse className="cls-5" cx="33" cy="18" rx="2" ry="3" />
      <ellipse className="cls-5" cx="15" cy="18" rx="2" ry="3" />
      <circle className="cls-3" cx="34" cy="17" r="1" />
      <circle className="cls-3" cx="16" cy="17" r="1" />
      <path d="M24 35c7.962 0 14.613-2.641 16.468-5.466A12.089 12.089 0 0 0 41 26c0 3.32-7.6 7-17 7S7 29.32 7 26a12.089 12.089 0 0 0 .532 3.534C9.387 32.359 16.038 35 24 35z" style={{ fill: '#8a293d' }} />
      <path d="M39.475 28.655A3.775 3.775 0 0 0 41 26c-1 1-8 2-17 2S8 27 7 26a3.775 3.775 0 0 0 1.525 2.655C11.223 29.394 17 30 24 30s12.777-.606 15.475-1.345z" style={{ fill: '#ededed' }} />
      <path d="M24 4c12.15 0 22 8.507 22 19h.975a23 23 0 0 0-45.95 0H2C2 12.507 11.85 4 24 4z" style={{ fill: '#ffe369' }} />
      <path d="M46 23c0 10.493-9.85 19-22 19S2 33.493 2 23h-.975c-.014.332-.025.665-.025 1a23 23 0 0 0 46 0c0-.335-.011-.668-.025-1z" style={{ fill: '#ffb32b' }} />
      <ellipse className="cls-3" cx="37" cy="9" rx=".825" ry="1.148" transform="rotate(-45.02 37 9)" />
      <ellipse className="cls-3" cx="30.746" cy="4.5" rx=".413" ry=".574" transform="rotate(-45.02 30.745 4.5)" />
      <ellipse className="cls-3" cx="34" cy="7" rx="1.65" ry="2.297" transform="rotate(-45.02 34 7)" />
    </svg>
    <span class="position-absolute top-0 start-10 translate-middle badge rounded-pill bg-danger">
    2.3k
  </span>

    </div>

    <div  class="btn position-relative" onClick={startAnimation_3} style={{ cursor: 'pointer' , marginLeft:'-50px'  }}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"  width="35"
      height="35">
      <defs>
        <style>{`.cls-2{fill:#273941}.cls-4{fill:#f6fafd}.cls-6{fill:#ffb32b}.cls-9{fill:#3bc5f6}.cls-10{fill:#00a3e1}.cls-11{fill:#ffc943}`}</style>
      </defs>
      <g id="_18-laughing" data-name="18-laughing">
        <circle cx="24" cy="24" r="23" style={{ fill: '#ffce52' }} />
        <path className="cls-2" d="M37.553 20.9C35.764 20 33.717 20 30 20a1 1 0 0 1-1-1c0-2.265 3.568-5 8-5v2a7.807 7.807 0 0 0-5.419 2c3.058.018 4.963.151 6.866 1.1zM10.447 20.9l-.894-1.79c1.9-.951 3.808-1.084 6.866-1.1A7.807 7.807 0 0 0 11 16v-2c4.432 0 8 2.735 8 5a1 1 0 0 1-1 1c-3.717 0-5.764 0-7.553.9z" />
        <path d="M35.2 26H38c0 8.36-6.53 13-14 13a14.971 14.971 0 0 1-9.8-3.36A12.283 12.283 0 0 1 10 26h2.8c0 3.87 5.01 7 11.2 7s11.2-3.13 11.2-7z" style={{ fill: '#ae2d4c' }} />
        <path className="cls-4" d="M12.8 26h22.4c0 3.87-5.01 7-11.2 7s-11.2-3.13-11.2-7z" />
        <path d="M24 4c12.15 0 22 8.507 22 19h.975a23 23 0 0 0-45.95 0H2C2 12.507 11.85 4 24 4z" style={{ fill: '#ffe369' }} />
        <path className="cls-6" d="M46 23c0 10.493-9.85 19-22 19S2 33.493 2 23h-.975c-.014.332-.025.665-.025 1a23 23 0 0 0 46 0c0-.335-.011-.668-.025-1z" />
        <ellipse className="cls-4" cx="37" cy="9" rx=".825" ry="1.148" transform="rotate(-45.02 37 9)" />
        <ellipse className="cls-4" cx="30.746" cy="4.5" rx=".413" ry=".574" transform="rotate(-45.02 30.745 4.5)" />
        <ellipse className="cls-4" cx="34" cy="7" rx="1.65" ry="2.297" transform="rotate(-45.02 34 7)" />
        <path d="M35.2 26c0 3.87-5.01 7-11.2 7s-11.2-3.13-11.2-7H12c0 4.976 5.368 9 12 9s12-4.024 12-9z" style={{ fill: '#8a293d' }} />
        <path d="M35.2 26H12.8a4.622 4.622 0 0 0 .469 2h21.462a4.622 4.622 0 0 0 .469-2z" style={{ fill: '#ededed' }} />
        <path className="cls-9" d="M46.044 22.429a3.263 3.263 0 0 1-4.615 4.615c-1.275-1.274-2.885-6.346-2.308-6.923s5.649 1.033 6.923 2.308zM1.956 22.429a3.263 3.263 0 0 0 4.615 4.615c1.275-1.274 2.885-6.344 2.308-6.923s-5.649 1.033-6.923 2.308z" />
        <path className="cls-10" d="M46.044 22.428c-1.12-1.12-5.173-2.5-6.529-2.424a10.448 10.448 0 0 1 4.768 1.817 2.448 2.448 0 0 1-3.462 3.462A10.453 10.453 0 0 1 39 20.515c-.075 1.355 1.3 5.408 2.425 6.529a3.264 3.264 0 1 0 4.615-4.616zM3.717 25.283a2.448 2.448 0 0 1 0-3.462A10.448 10.448 0 0 1 8.485 20c-1.356-.075-5.409 1.3-6.529 2.424a3.264 3.264 0 0 0 4.615 4.616c1.121-1.117 2.5-5.17 2.429-6.525a10.453 10.453 0 0 1-1.817 4.768 2.448 2.448 0 0 1-3.466 0z" />
        <ellipse className="cls-4" cx="45" cy="23" rx=".825" ry="1.148" transform="rotate(-45.02 45 23)" />
        <ellipse className="cls-4" cx="44.746" cy="24.5" rx=".413" ry=".574" transform="rotate(-45.02 44.745 24.5)" />
        <ellipse className="cls-4" cx="3" cy="23" rx="1.148" ry=".825" transform="rotate(-44.98 3 23)" />
        <ellipse className="cls-4" cx="3.254" cy="24.5" rx=".574" ry=".413" transform="rotate(-44.98 3.254 24.5)" />
        <path className="cls-11" d="M41.429 27.044a13.329 13.329 0 0 1-2.206-4.977.328.328 0 0 0-.1.054c-.577.577 1.033 5.649 2.308 6.923a3.249 3.249 0 0 0 3.069.856 17.065 17.065 0 0 0 .862-2.346 3.255 3.255 0 0 1-3.933-.51z" />
        <path className="cls-6" d="M46.829 25.736a3.069 3.069 0 0 1-1.469 1.817 17.065 17.065 0 0 1-.86 2.347 3.2 3.2 0 0 0 2.091-1.581q.213-1.12.316-2.277c-.025-.103-.046-.206-.078-.306z" />
        <path className="cls-11" d="M6.571 29.044c1.275-1.274 2.885-6.344 2.308-6.923a.328.328 0 0 0-.1-.054 13.329 13.329 0 0 1-2.206 4.977 3.255 3.255 0 0 1-3.931.509A17.065 17.065 0 0 0 3.5 29.9a3.249 3.249 0 0 0 3.071-.856z" />
        <path className="cls-6" d="M3.5 29.9a17.065 17.065 0 0 1-.862-2.346 3.069 3.069 0 0 1-1.469-1.817c-.032.1-.053.2-.076.3q.1 1.157.316 2.277A3.2 3.2 0 0 0 3.5 29.9z" />
      </g>
    </svg>
    <span class="position-absolute top-0 start-10 translate-middle badge rounded-pill bg-danger">
    2.3k
  </span>

    </div>





    <div  class="btn position-relative" onClick={startAnimation_4} style={{ cursor: 'pointer' , marginLeft:'-50px'  }}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="35" height="35">
      <defs>
        <style>{`.cls-2{fill:#273941}.cls-3{fill:#141e21}.cls-4{fill:#f6fafd}.cls-6{fill:#ffb32b}`}</style>
      </defs>
      <g id="_11-wow" data-name="11-wow">
        <circle cx="24" cy="24" r="23" style={{ fill: '#ffce52' }} />
        <ellipse className="cls-2" cx="33" cy="18" rx="3" ry="4" />
        <ellipse className="cls-2" cx="15" cy="18" rx="3" ry="4" />
        <ellipse className="cls-3" cx="33" cy="18" rx="2" ry="3" />
        <ellipse className="cls-3" cx="15" cy="18" rx="2" ry="3" />
        <circle className="cls-4" cx="34" cy="17" r="1" />
        <circle className="cls-4" cx="16" cy="17" r="1" />
        <path className="cls-2" d="M37 10h-2a2 2 0 0 0-4 0h-2a4 4 0 0 1 8 0zM19 10h-2a2 2 0 0 0-4 0h-2a4 4 0 0 1 8 0z" />
        <path d="M24 4c12.15 0 22 8.507 22 19h.975a23 23 0 0 0-45.95 0H2C2 12.507 11.85 4 24 4z" style={{ fill: '#ffe369' }} />
        <path className="cls-6" d="M46 23c0 10.493-9.85 19-22 19S2 33.493 2 23h-.975c-.014.332-.025.665-.025 1a23 23 0 0 0 46 0c0-.335-.011-.668-.025-1z" />
        <ellipse className="cls-4" cx="34" cy="5" rx=".825" ry="1.148" transform="rotate(-45.02 34 5)" />
        <ellipse className="cls-4" cx="26.746" cy="3.5" rx=".413" ry=".574" transform="rotate(-45.02 26.746 3.5)" />
        <ellipse className="cls-4" cx="30" cy="4" rx="1.65" ry="2.297" transform="rotate(-45.02 30 4)" />
        <ellipse className="cls-2" cx="24" cy="34" rx="6" ry="9" />
        <path d="M24 43c2.542 0 4.71-2.375 5.584-5.723a7.985 7.985 0 0 0-11.168 0C19.29 40.625 21.458 43 24 43z" style={{ fill: '#ae2d4c' }} />
        <path className="cls-6" d="M24 43c-3.088 0-5.629-3.5-5.961-8-.024.329-.039.662-.039 1 0 4.971 2.686 9 6 9s6-4.029 6-9c0-.338-.015-.671-.039-1-.332 4.5-2.873 8-5.961 8z" />
        <path className="cls-3" d="M24 27c3.088 0 5.629 3.5 5.961 8 .024-.329.039-.662.039-1 0-4.971-2.686-9-6-9s-6 4.029-6 9c0 .338.015.671.039 1 .332-4.5 2.873-8 5.961-8z" />
        <path d="M24 41c-2.132 0-3.989-1.682-5.052-4.2a7.95 7.95 0 0 0-.532.473C19.29 40.625 21.458 43 24 43s4.71-2.375 5.584-5.723a7.95 7.95 0 0 0-.532-.473C27.989 39.318 26.132 41 24 41z" style={{ fill: '#8a293d' }} />
      </g>
    </svg>
    <span class="position-absolute top-0 start-10 translate-middle badge rounded-pill bg-danger">
    5.5k
  </span>

    </div>

    <div  class="btn position-relative"  onClick={() => { startAnimation_5();handleReaction5(); console.log(video_Id); }} style={{ cursor: 'pointer'  , marginLeft:'-50px' }}>
<Emoji/>
<span class="position-absolute top-0 start-10 translate-middle badge rounded-pill bg-danger">
        {R5count-1}
  </span>

</div>

 
</div></div>}
    </div>
  );
};



export default Carousel;
