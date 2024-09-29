import React, { useEffect, useState } from "react";
import image3 from "../Images/image3.jpg";
import LikeIcon from "../Images/like.png";
import CommentIcon from "../Images/speech-bubble.png";
import defaultUser from "../Images/blank-profile-picture-973460_960_720.webp";
import Share from "../Images/share.png";
import anotherlikeicon from "../Images/setLike.png";
import { useNavigate } from "react-router-dom";
import MoreOptions from "../Images/more.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  notifySuccess,
  notifyError,
  ToastContainer,
} from "../ToastNotification/Toast.js";
import axios from "axios";
import "./post.css";
import { set } from "mongoose";
import { rgbParse } from "@kurkle/color";

export default function Post(props) {
  const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;
  const userDetails2 = useSelector((state) => state.user);
  let user = userDetails2.user;
  const navigate = useNavigate();
  let id = user.user._id;

  const jwt_here = user.jwttoken;

  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    const getuserdetails = async () => {
      try {
        const details = await axios.get(
          `${BACKEND_URI}/api/user/post/user/details/${props.post.user}`,
          {
            headers: {
              jwttoken: jwt_here,
            },
          }
        );
        setUserDetails(details.data);
      } catch (error) {
        console.log("ERROR OCCURED IN CATCH BLOCK" + error);
      }
    };

    getuserdetails();
  }, []);

  const myUserId = userDetails2.user.user._id;

  const [Like, setLike] = useState(
    props.post.likes.includes(myUserId) ? anotherlikeicon : LikeIcon
  );
  const [count, setCount] = useState(props.post.likes.length);

  const [Comments, setComments] = useState(props.post.comments);
  const [commentwriting, setcommentwriting] = useState("");
  const [show, setshow] = useState(false);

  console.log(props.post);

  console.log(userDetails);

  const addComment = async () => {
    const comment = {
      id: `${props.post._id}`,
      username: `${user.user.username}`,
      comment: `${commentwriting}`,
    };
    setComments(Comments.concat(comment));
    await fetch(`${BACKEND_URI}/api/post/comment/post`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        jwttoken: jwt_here,
      },
      body: JSON.stringify({
        postId: props.post._id,
        user: user.user,
        comment: commentwriting,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // Update state after successful API call
          notifySuccess("Comment added successfully"); // Notify success using toast
        } else {
          notifyError("Failed to add comment"); // Notify error using toast
        }
      })
      .catch((error) => {
        console.error("Error during comment update:", error);
      });
  };

  const handleComment = () => {
    addComment();
    document.getElementById(props.post._id + "comment").value = "";
  };

  console.log(Comments);

  const handleshow = () => {
    if (show === false) {
      setshow(true);
    } else {
      setshow(false);
    }
  };

  const handleLike = async () => {
    if (Like === LikeIcon) {
      setLike(anotherlikeicon);
      await fetch(`${BACKEND_URI}/api/post/${props.post._id}/like`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          jwttoken: jwt_here,
        },
        body: JSON.stringify({ user: myUserId }),
      })
        .then((response) => {
          if (response.ok) {
            // Update state after successful API call
            setLike(anotherlikeicon);
            setCount(count + 1);
          } else {
            console.error("Failed to update like");
          }
        })
        .catch((error) => {
          setLike(LikeIcon);
          console.error("Error during like update:", error);
        });
      await fetch(
        `http://localhost:4000/api/user/likedpost/${props.post._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            jwttoken: jwt_here,
          },
          body: JSON.stringify({ user: myUserId }),
        }
      )
        .then((response) => {
          console.log(response);
          if (response.ok) {
            console.log("successfully update like");
          } else {
            console.error("Failed to update like");
          }
        })
        .catch((error) => {
          console.error("Error during like update in user array :", error);
        });
      //  setLike(anotherlikeicon);
      //   setCount(count + 1);
    } else {
      setLike(LikeIcon);
      await fetch(`${BACKEND_URI}/api/post/${props.post._id}/like`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          jwttoken: jwt_here,
        },
        body: JSON.stringify({ user: myUserId }),
      })
        .then((response) => {
          if (response.ok) {
            // Update state after successful API call
            setLike(LikeIcon);
            setCount(count - 1);
          } else {
            console.error("Failed to update like");
          }
        })
        .catch((error) => {
          setLike(anotherlikeicon);
          console.error("Error during like update:", error);
        });
      // setLike(LikeIcon)
      // setCount(count - 1);
    }
  };

  const handleShareClick = (link_postID) => {
    const currentUrl = window.location.href;

    // Create a URL object from the current URL
    const url = new URL(currentUrl);

    // Extract the protocol and host (base URL)
    const baseUrl = `${url.protocol}//${url.host}`;

    console.log(baseUrl);
    const linkToCopy = baseUrl + `/postpage/${link_postID}`;

    // Copy link to clipboard
    navigator.clipboard
      .writeText(linkToCopy)
      .then(() => {
        notifySuccess("Link copied to clipboard"); // Notify success using toast
      })
      .catch((err) => {
        notifyError("Failed to copy link to clipboard"); // Notify error using toast
      });
  };

  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

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
    <div className="PostContainer">
      <div className="SubPostContainer">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Link
            to={`/profilepage/${userDetails._id}`}
            style={{
              textDecoration: "none",
              color: "black",
              fontWeight: "600",
            }}
          >
            <div
              style={{ margin: "7px", display: "flex", alignItems: "center" }}
            >
              <img
                src={
                  userDetails?.profilepicture
                    ? userDetails.profilepicture
                    : defaultUser
                }
                className="PostImage"
                alt=""
              />
              <div>
                <p style={{ marginLeft: "5px", textAlign: "start" }}>
                  {userDetails.username}
                  <span style={{margin: '0 5px', color: 'gray', fontSize: 'small'}}>{userDetails?.type === 2 ? 'ad' : ''}</span>
                </p>
              </div>
            </div>
          </Link>
          {/* <div className="MoreOptions" style={{    margin: '0 5%', fontSize: 'larger', fontWeight: '900'}}>...</div> */}
          <div
            className="MoreOptions"
            style={{ margin: "0 1vw", cursor: "pointer" }}
          >
            {/* a button onclick navigate to postpage/id */}
            <img
              src={`${MoreOptions}`}
              className="iconsforPost"
              onClick={() => navigate(`/postpage/${props.post._id}`)}
              alt=""
            />
          </div>
        </div>

        {props.post.image === "" && props.post.video === "" ? (
          <div
            className="containerr"
            style={{
              width: "97%",
              wordBreak: "break-word",
              height: "430px",
              background: "rgb(108,68,255)",
              background:
                "linear-gradient(0deg, rgba(108,68,255,1) 22%, rgba(90,97,255,1) 35%, rgba(120,64,255,1) 61%, rgba(175,45,255,1) 78%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
              marginLeft: "7px",
              fontFamily: "Lobster, Poppins, sans-serif", // Specify the font family
            }}
          >
            <p
              style={{
                fontSize: "30px",
                color: "white",
                width: "100%",
                margin: 'auto',
                textAlign: 'center',
                overflowWrap: "break-word",
                wordWrap: "break-word",
                whiteSpace: "pre-line",
              }}
            >
              {props.post.description}
            </p>
          </div>
        ) : (
          <p></p>
        )}

        {props.post.image !== "" ? (
          <img src={`${props.post.image}`} className="PostImages" alt="" />
        ) : props.post.video !== "" ? (
          <video
            className="PostImages"
            width="500"
            height="500"
            controls
            autoPlay
            loop
            muted
          >
            <source src={`${props.post.video}`} type="video/mp4" />
          </video>
        ) : (
          ""
        )}

        <p
          style={{
            textAlign: "start",
            width: "96%",
            margin: "9px",
            height: expanded ? "auto" : "1.5rem",
            overflow: "hidden",

            textOverflow: "ellipsis",
            whiteSpace: expanded ? "pre-wrap" : "nowrap",
            cursor: "pointer",
          }}
          onClick={handleExpand}
        >
          <Link
            to={`/profilepage/` + userDetails._id}
            style={{
              margin: "5px",
              fontWeight: "bold",
              textDecoration: "none",
              color: "black",
            }}
          >
            {userDetails.username}
          </Link>
          {props.post.description}
        </p>

        {/* {  props.post.image && <img src={`${props.post.image}`} className="PostImages" alt="" />} */}
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={handleLike}
          >
            <img
              src={`${Like}`}
              className="iconsforPost"
              alt=""
              style={{ display: "none" }}
            />
            <script src="https://cdn.lordicon.com/lordicon.js"></script>
            <lord-icon
              src="https://cdn.lordicon.com/igciyimj.json"
              trigger="hover"
              colors="primary:#121331,secondary:#e83a30,tertiary:#ffc738,quaternary:#f9c9c0,quinary:#e83a30,senary:#ebe6ef"
              style={{ width: "29px", height: "29px" }}
            ></lord-icon>
            <p style={{ marginLeft: "6px" }}>{count} Likes</p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: 20,
              cursor: "pointer",
            }}
            onClick={handleshow}
          >
            <img
              src={`${CommentIcon}`}
              className="iconsforPost"
              alt=""
              style={{ display: "none" }}
            />
            <script src="https://cdn.lordicon.com/lordicon.js"></script>
            <lord-icon
              src="https://cdn.lordicon.com/ayhtotha.json"
              trigger="hover"
              colors="primary:#66d7ee"
              style={{ width: "29px", height: "29px" }}
            ></lord-icon>
            <p style={{ marginLeft: "6px" }}>
              {props.post.comments.length} Comments
            </p>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() => handleShareClick(props.post._id)}
          >
            <img
              src={`${Share}`}
              className="iconsforPost"
              alt=""
              style={{ display: "none" }}
            />
            <script src="https://cdn.lordicon.com/lordicon.js"></script>
            <lord-icon
              src="https://cdn.lordicon.com/boyoxams.json"
              trigger="hover"
              colors="primary:#e86830"
              style={{ width: "29px", height: "29px" }}
            ></lord-icon>
            <p style={{ marginLeft: "6px" }}>Share</p>
          </div>
        </div>
        {show === true ? (
          <>
            <div
              className="CommentsBoxScroll"
              style={{
                padding: "10px",
                maxHeight: "30vh",
                overflowX: "hidden",
                overflowY: "scroll",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "5px 0",
                }}
              >
                <img
                  src={
                    user.user.profilepicture
                      ? user.user.profilepicture
                      : defaultUser
                  }
                  className="PostImage"
                  alt=""
                />
                <textarea
                  id={props.post._id + "comment"}
                  className="commentinput"
                  placeholder="Write your comment here"
                  style={{
                    resize: "none",
                    minHeight: "30px",
                    backgroundColor: "whitesmoke",
                    marginLeft: "5px",
                    width: "100%",
                  }}
                  onChange={(e) => {
                    setcommentwriting(e.target.value);
                  }}
                />
                <button className="addCommentbtn" onClick={handleComment}>
                  Post
                </button>
              </div>

              {Comments.map((item) => (
                <div style={{ margin: "3px 0" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={
                        user.user.profilepicture
                          ? user.user.profilepicture
                          : defaultUser
                      }
                      className="PostImage"
                      alt=""
                    />
                    <div
                      style={{
                        margin: "5px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <p
                        style={{
                          maxWidth: "96%",
                          wordBreak: "break-word",
                          backgroundColor: "whitesmoke",
                          padding: "6px 30px 6px 4px",
                          borderRadius: "10px 25px 20px 2px",
                          fontSize: 15,
                          margin: "5px",
                          textAlign: "left",
                        }}
                      >
                        <span>
                          <Link
                            to={"/profilepage/" + item.user}
                            style={{
                              textDecoration: "none",
                              color: "black",
                              fontWeight: "bolder",
                            }}
                          >
                            {item.username} :{" "}
                          </Link>
                        </span>{" "}
                        {item.comment}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>{" "}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
