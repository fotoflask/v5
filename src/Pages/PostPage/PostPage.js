import React from "react";
import "./PostPage.css";
import Navbar from "../../Component/Navbar/Navbar";
import { useSelector } from "react-redux";
import defaultUser from "../../Component/Images/blank-profile-picture-973460_960_720.webp";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LikeIcon from "../../Component/Images/like.png";
import CommentIcon from "../../Component/Images/speech-bubble.png";
import Share from "../../Component/Images/share.png";
import {
  notifySuccess,
  notifyError,
  ToastContainer,
} from "../../Component/ToastNotification/Toast.js";

export default function PostPage() {
  const userDetails = useSelector((state) => state.user);
  const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;
  let user = userDetails.user;
  let id = user.user._id;
  const jwt_here = user.jwttoken;
  let { postid } = useParams();
  const [postData, setPost] = useState([]);
  const [postUserDetails, setPostUserDetails] = useState([]);
  const [Comments, setComments] = useState();
//   const [commentwriting, setcommentwriting] = useState("");

  const [FollowStatus, setFollowStatus] = useState("Follow");

  const handleFollowClick = async () => {
    await fetch(`${BACKEND_URI}/api/user/follow/${postUserDetails._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        jwttoken: jwt_here,
      },
      body: JSON.stringify({ user: id }),
    }).then(setFollowStatus("Following"));
  };

  const getpost = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URI}/api/post/get/PostID/${postid}`,
        {
          headers: {
            jwttoken: jwt_here,
          },
        }
      );
      //   console.log(response.data);
      setPost(response.data);
      setComments(postData.comments);
      console.log(postData);
      const response2 = await axios.get(
        `${BACKEND_URI}/api/user/post/user/details/${response.data.user}`,
        {
          headers: {
            jwttoken: jwt_here,
          },
        }
      );
      setPostUserDetails(response2.data);
      // console.log("PostUserDetails", response2.data);
    } catch (error) {}
  };

  const isFollowing = async () => {
    try {
      if (postUserDetails.followers.includes(id)) {
        setFollowStatus("Following");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async (e) => {
    const commentwriting = e.target.value;
    const comment = {
      id: `${postData._id}`,
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
        postId: postData.post._id,
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

  useEffect(() => {
    getpost();
    console.log("post");
  }, []);

  useEffect(() => {
    isFollowing();
  }, [postUserDetails]);

  if (useSelector((state) => state.user.user) === null) {
    window.location.href = "/login";
  } else {
    return (
      <div className="postpage">
        <Navbar />
        <div className="postpage_container">
          <div className="postpage_left">
            <div className="imageContainer">
              {postData.image !== "" && <img src={postData.image} alt="post" />}
              {postData.video !== "" && postData.image === "" && (
                <video className="PostImages" width="300" height="500" controls>
                  <source src={`${postData.video}`} type="video/mp4" />
                </video>
              )}
              {postData.image === "" && postData.video === "" ? (
                <div
                  className="containerr"
                  style={{
                    width: "680px",
                    height: "530px",
                    background: "rgb(108,68,255)",
                    background:
                      "linear-gradient(0deg, rgba(108,68,255,1) 22%, rgba(90,97,255,1) 35%, rgba(120,64,255,1) 61%, rgba(175,45,255,1) 78%)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    overflow: "hidden",
                    padding: "20px",
                    marginLeft: "12px",
                    fontFamily: "Lobster, Poppins, sans-serif", // Specify the font family
                  }}
                >
                  <p
                    style={{
                      fontSize: "30px",
                      color: "white",
                      textAlign: "start",
                      width: "100%",
                      marginTop: 0,
                      overflowWrap: "break-word",
                      wordWrap: "break-word",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {postData.description}
                  </p>
                </div>
              ) : (
                <p></p>
              )}
            </div>
          </div>
          <div className="postpage_right">
            <div className="postpage_right_container">
              <div className="postpage_right_top">
                <div className="postpage_userdetails">
                  <div className="postpage_userphoto">
                    <img
                      src={
                        postUserDetails.profilepicture
                          ? postUserDetails.profilepicture
                          : defaultUser
                      }
                      className="PostPageProfileImage"
                      alt=""
                    />
                  </div>
                  <div className="postpage_username">
                    <Link
                      to={"/profilepage/" + postUserDetails._id}
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      <h3>{postUserDetails.username}</h3>
                      
                    </Link>
                  </div>
                  <div className="postpage_user_follow">
                    <button onClick={() => handleFollowClick()}>
                      {FollowStatus}
                    </button>
                  </div>
                </div>
                <div className="divider"></div>
              </div>
              <div className="postpage_right_middle">
                <div className="postpage_middle_description">
                  <p>{postData.description}</p>
                  <div className="divider"></div>
                </div>
                <div className="CommentBox">
                  <div className="Comments">
                    <div className="CommentsHeading">Comments</div>
                    <div className="divider"></div>
                    <div className="CommentsList">
                      {postData.comments &&
                        postData.comments.map((comment) => (
                          <div className="Comment">
                            <div className="CommentUser">
                              <img
                                src={defaultUser}
                                alt="user"
                                className="CommentUserImage"
                              />
                              <div className="CommentUserName">
                                <Link
                                  to={"/profilepage/" + comment.username}
                                  style={{
                                    color: "black",
                                    textDecoration: "none",
                                  }}
                                >
                                  <div>{comment.username}</div>
                                </Link>
                              </div>
                                <div className="CommentText">{comment.comment}</div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="AddComment">
                    <input type="text" placeholder="Add a comment" />
                </div>
                </div>
                <div className="divider"></div>
              </div>
              <div className="postpage_right_bottom">
                <img src={LikeIcon} alt="like" className="postpage_likeicon" />
                <img
                  src={CommentIcon}
                  alt="comment"
                  className="postpage_likeicon"
                />
                <img src={Share} alt="share" className="postpage_likeicon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
