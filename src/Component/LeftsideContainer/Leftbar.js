import React from "react";
import "./leftbar.css";
import image3 from "../Images/SAIPAVAN.jpg";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Leftbar() {
  const userDetails = useSelector((state) => state.user);
  const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;
  let user = userDetails.user;
  let id = user.user._id;

  const jwt_here = user.jwttoken;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getposts = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URI}/api/user/followingposts/${id}`,
          {
            headers: {
              jwttoken: jwt_here, // must be the attribute name (same name as in headers )-> i.e jwttoken
            },
          }
        );
        // before firebase used user  setPosts(response.data.followingPosts);
        setPosts(response.data); // include particularly .followingPosts
        //otherwise it returns an data object
      } catch (error) {
        console.log("ERROR OCCURED IN CATCH BLOCK " + error);
      }
    };
    getposts();
  }, []);

  const [viewers, setViewers] = useState([]);
  useEffect(() => {
    const getstoryviewers = async () => {
      try {
        const response2 = await axios.get(
          `${BACKEND_URI}/api/user/getstoryviewers`,
          {
            headers: {
              jwttoken: jwt_here, // must be the attribute name (same name as in headers )-> i.e jwttoken
            },
          }
        );

        console.log(response2.data);
        // before firebase used user  setPosts(response.data.followingPosts);
        setViewers(response2.data); // include particularly .followingPosts
        //otherwise it returns an data object
      } catch (error) {
        console.log("ERROR OCCURED IN CATCH BLOCK " + error);
      }
    };
    getstoryviewers();
  }, []);

  useEffect(() => {
    // Dynamically create script element
    const script = document.createElement("script");
    script.src = "https://cdn.lordicon.com/lordicon.js";
    script.async = true;

    // Append script to the document's body
    document.body.appendChild(script);

    // Remove script when component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    // Dynamically create script element
    const script = document.createElement("script");
    script.src = "https://cdn.lordicon.com/lordicon.js";
    script.async = true;

    // Append script to the document's body
    document.body.appendChild(script);

    // Remove script when component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="Leftbar">
      <div className="NotificationsContainer Activities">
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "10px",
          }}
        >
          <p style={{ marginLeft: "-3px" }}>Recent Story Viewers</p>
          <p style={{ color: "#aaa", marginLeft: "40px" }}>See all</p>
        </div>

        {viewers.map((item) => {
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "-35px",
                marginBottom: "10px",
              }}
            >
              <img
                src={`${item.others.profilepicture}`}
                className="notificationimg"
                alt=""
              />
              <h6
                style={{
                  marginLeft: "5px",
                  color: "#aaa",
                  fontSize: 14,
                  width: "120px",
                  textAlign: "start",
                }}
              >
                {item.others.username}
              </h6>
            </div>
          );
        })}
      </div>

      <div className="NotificationsContainer Activities">
        <div className="rowww1">
          <Link to="/reels">
            <div className="iiconn">
              <script src="https://cdn.lordicon.com/lordicon.js"></script>
              <lord-icon
                src="https://cdn.lordicon.com/aklfruoc.json"
                trigger="hover"
                style={{ width: "30px", height: "30px" }}
              ></lord-icon>
            </div>
          </Link>

          <Link to="/addnewpost">
            <div className="iiconn">
              <script src="https://cdn.lordicon.com/lordicon.js"></script>
              <lord-icon
                src="https://cdn.lordicon.com/hqymfzvj.json"
                trigger="hover"
                style={{ width: "30px", height: "30px" }}
              ></lord-icon>
            </div>
          </Link>

          <Link to="/chat">
            <div className="iiconn">
              <script src="https://cdn.lordicon.com/lordicon.js"></script>
              <lord-icon
                src="https://cdn.lordicon.com/fdxqrdfe.json"
                trigger="hover"
                style={{ width: "30px", height: "30px" }}
              ></lord-icon>
            </div>
          </Link>

          <Link to="/settings">
            <div className="iiconn">
              <script src="https://cdn.lordicon.com/lordicon.js"></script>
              <lord-icon
                src="https://cdn.lordicon.com/lecprnjb.json"
                trigger="hover"
                style={{ width: "30px", height: "30px" }}
              ></lord-icon>
            </div>
          </Link>
        </div>

        <div className="rowww1">
          <Link to="/likedposts">
            <div className="iiconn">
              <script src="https://cdn.lordicon.com/lordicon.js"></script>
              <lord-icon
                src="https://cdn.lordicon.com/xyboiuok.json"
                trigger="hover"
                style={{ width: "30px", height: "30px" }}
              ></lord-icon>
            </div>
          </Link>

          <Link to="/explorepage">
            <div className="iiconn">
              <script src="https://cdn.lordicon.com/lordicon.js"></script>
              <lord-icon
                src="https://cdn.lordicon.com/kkvxgpti.json"
                trigger="hover"
                style={{ width: "30px", height: "30px" }}
              ></lord-icon>
            </div>
          </Link>

          <Link to={`/profilepage/${id}`}>
            <div className="iiconn">
              <script src="https://cdn.lordicon.com/lordicon.js"></script>
              <lord-icon
                src="https://cdn.lordicon.com/kthelypq.json"
                trigger="hover"
                style={{ width: "30px", height: "30px" }}
              ></lord-icon>
            </div>
          </Link>

          <Link to={`/profilepage/${id}`}>
            <div className="iiconn">
              <script src="https://cdn.lordicon.com/lordicon.js"></script>
              <lord-icon
                src="https://cdn.lordicon.com/whrxobsb.json"
                trigger="hover"
                style={{ width: "30px", height: "30px" }}
              ></lord-icon>
            </div>
          </Link>
        </div>
      </div>

      <div className="NotificationsContainer">
        <div className="containerHead">
          <p>Explore</p>
          <Link
            to="/explorepage"
            style={{
              color: "var(--secondary-text-color)",
              textDecoration: "none",
            }}
          >
            <p>See all</p>
          </Link>
        </div>

        <div className="ExploreImageContainer ScrollContainerDisNone2">
          {posts.map((item) => {
            // return item.map((postdetails)=>{
            if (item.image) {
              return (
                <img src={`${item.image}`} className="exploreimage" alt="" />
              );
            } else return <></>;
            // })
          })}
        </div>
      </div>
    </div>
  );
}
