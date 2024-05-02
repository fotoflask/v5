import React, { useEffect } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircleCheck as okTick, faCircleXmark as noCross} from '@fortawesome/free-regular-svg-icons'
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../ReduxContainer/UserReducer";
import { useState } from "react";
import coverPhoto from "../Images/default-cover-4.jpeg";
import Image from "../Images/blank-profile-picture-973460_960_720.webp";
import {updateUserProfilePicture} from "../ReduxContainer/UserReducer";
import axios from "axios";
import { updateProfilePicture } from "../ReduxContainer/apiCall";
import app from "../../firebase"
import { toast } from 'react-toastify';
import { profilePicUpdate } from "../ReduxContainer/apiCall";

const settingsPane = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "99%",
  backgroundColor: "white",
  transition: "background-color 0.01s",
  width: "99%",
};

const settingHeader = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  height: "10%",
  width: "100%",
  borderBottom: "0.5px solid #c2c2c2",
};

const settings = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "90%",
  width: "100%",
};

const settingCSS = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  transition: "all 0.01s ease",
  alignItems: "center",
  margin: "10px",
  height: "10%",
  width: "100%",
};

const smallIcon = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  width: "50px",
  height: "50px",
  backgroundColor: "transparent",
  border: "none",
};

const settingInput = {
  width: "50%",
  border: "1.5px solid #c2c2c2",
  height: "80%",
  borderRadius: "5px",
};

const saveButton = {
  width: "80px",
  height: "30px",
  border: "none",
  borderRadius: "20px",
  backgroundColor: "rgb(0, 149, 246)",
  color: "white",
  fontWeight: "600",
  margin: "0 1pc",
  fontSize: "1em",
  cursor: 'pointer'
};

export const Setting1 = ({ user, setUser }) => {

  const [username, setUsername] = useState(user.user.username);


  const handleSave = () => {
    setUser({
      ...user,
      user: {
        ...user.user,
        username: document.getElementById("username").value,
        firstname: document.getElementById("firstname").value,
        lastname: document.getElementById("lastname").value,
        bio: document.getElementById("bio").value,
      },
    });
  }

  return (
    <div className="settingsPane" style={settingsPane}>
      <div className="settingHeader" style={settingHeader}>
        <h1>Profile</h1>
      </div>
      <div className="settings" style={settings}>
        <div className="setting" style={settingCSS}>
          <label
            htmlFor="username"
            style={{ width: "20%", fontWeight: "bold" }}
          >
            Username
          </label>
          <input
            type="text"
            style={settingInput}
            name="username" 
            editable
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
          />
          <div className="SettingsmallIcon" style={smallIcon}>
          <FontAwesomeIcon icon={okTick} style={{color: "#029702",}} />
          </div>
        </div>
        <div className="setting" style={settingCSS}>
          <label
            htmlFor="firstname"
            style={{ width: "20%", fontWeight: "bold" }}
          >
            First Name
          </label>
          <input
            type="text"
            style={settingInput}
            name="firstname"
            id="firstname"
          />
          <div className="SettingsmallIcon" style={smallIcon}>
            <img src={""} height="80%" alt="" />
          </div>
        </div>
        <div className="setting" style={settingCSS}>
          <label
            htmlFor="lastname"
            style={{ width: "20%", fontWeight: "bold" }}
          >
            Last Name
          </label>
          <input
            type="text"
            style={settingInput}
            name="lastname"
            id="lastname"
          />
          <div className="SettingsmallIcon" style={smallIcon}>
            <img src={''} height="80%" alt="" />
          </div>
        </div>
        <div
          className="setting"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            margin: "10px",
            minHeight: "10%",
            width: "100%",
          }}
        >
          <label htmlFor="bio" style={{ width: "20%", fontWeight: "bold" }}>
            Bio
          </label>
          <textarea
            type="text"
            style={{
              width: "50%",
              minHeight: "50px",
              border: "1.5px solid #c2c2c2",
              resize: "vertical",
              height: "80%",
              borderRadius: "5px",
            }}
            name="bio"
            id="bio"
          />
          <div className="SettingsmallIcon" style={smallIcon}>
            <img src={''} height="80%" alt="" />
          </div>
        </div>
      </div>
      <div
        className="saveButton"
        style={{
          width: "100%",
          height: "10%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <button style={saveButton} onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export const Setting2 = ({ user, setUser }) => {

  // alert("This feature is not available yet. Please try again later.");

  const handleSave = () => {
    console.log("Save");
  }

  return (
    <div className="settingsPane" style={settingsPane}>
      <div className="settingHeader" style={settingHeader}>
        <h1>Account</h1>
      </div>
      <div className="settings" style={settings}>
        <div className="setting" style={settingCSS}>
          <label htmlFor="email" style={{ width: "20%", fontWeight: "bold" }}>
            Email
          </label>
          <input
            type="text"
            style={settingInput}
            readOnly
            value={user.user.email} 
            name="email"
            id="email"
          />
          <div className="SettingsmallIcon" style={smallIcon}>
            <img src={''} height="80%" alt="" />
          </div>
        </div>
        <div className="setting" style={settingCSS}>
          <label
            htmlFor="currentpassword"
            style={{ width: "20%", fontWeight: "bold" }}
          >
            Current Password
          </label>
          <input
            type="password"
            style={settingInput}
            name="currentpassword"
            id="currentpassword"
          />
          <div className="SettingsmallIcon" style={smallIcon}>
            <FontAwesomeIcon icon={okTick} style={{color: "#029702",}} />
          </div>
        </div>
        <div className="setting" style={settingCSS}>
          <label
            htmlFor="newpassword"
            style={{ width: "20%", fontWeight: "bold" }}
          >
            New Password
          </label>
          <input
            type="password"
            style={settingInput}
            name="newpassword"
            id="newpassword"
          />
          <div className="SettingsmallIcon" style={smallIcon}>
          <FontAwesomeIcon icon={okTick} style={{color: "#029702",}} />
          </div>
        </div>
        <div className="setting" style={settingCSS}>
          <label
            htmlFor="confirmpassword"
            style={{ width: "20%", fontWeight: "bold" }}
          >
            Confirm Password
          </label>
          <input
            type="password"
            style={settingInput}
            name="confirmpassword"
            id="confirmpassword"
          />
          <div className="SettingsmallIcon" style={smallIcon}>
          <img src={''} height="80%" alt="" />
          </div>
        </div>
      </div>
      <div
        className="saveButton"
        style={{
          width: "100%",
          height: "10%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <button style={saveButton} onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export const Setting3 = ({ user, setUser }) => {

  const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;
  const dispatch = useDispatch();
  const [file,setFile] = useState(null);

  const jwt_here=user.jwttoken

  var ImagePreview = user.user.profilepicture ? user.user.profilepicture : Image;

  const handleImageInput = (event) => {
    if(event.target.files.length === 0) return;
    ImagePreview = URL.createObjectURL(event.target.files[0]);
    document.getElementById("ImagePreviewImage").src = ImagePreview;
  };

  const handlepost =(e) =>{
    // alert('Uploading Profile Photo');
    e.preventDefault();
    if(file !== null){
    const currentDate = new Date();
    const filename = currentDate.getTime()+file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage,filename);

    const uploadTask = uploadBytesResumable(storageRef, file);

    toast.info('Uploading Profile Photo ');
    uploadTask.on('state_changed', 
   (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
      default:
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
      await fetch(`${BACKEND_URI}/api/user/upload/profilepic`,{method:"POST",
      headers:{
        'Content-Type':'application/JSON',
        jwttoken:jwt_here 
      },
      body:JSON.stringify({image:downloadURL})
    }).then((data)=>{

      window.location.reload(true);
      toast.success('Post Added Successfully');
      profilePicUpdate(dispatch, downloadURL);
      window.location.reload(true);
    })
    });
  }
);
    }
  }
  

  return (
    <div className="settingsPane" style={settingsPane}>
      <div className="settingHeader" style={settingHeader}>
        <h1>Profile Photo</h1>
      </div>
      <div className="settings" style={settings}>
        <label
          htmlFor="profilepicture"
          style={{ width: "20%", fontWeight: "bold" }}
        >
          <div
            className="ImagePreview"
            style={{
              transition: "all 0.01s ease",
              border: "1.5px solid #c2c2c2",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              id="ImagePreviewImage"
              src={ImagePreview}
              height="100%"
              width="100%"
              alt=""
            />
          </div>
          <div
            className="ImageUploadButton"
            style={{
              transition: "all 0.01s ease",
              border: "1.5px solid #c2c2c2",
              borderRadius: "5px",
              width: "100px",
              margin: '5px auto',
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: 'pointer'
            }}
          >
            <p>Upload</p>
          </div>
        </label>
        <input
          type="file"
          name="profilepicture"
          onChange={(e)=> {setFile(e.target.files[0]); handleImageInput(e)}}
          id="profilepicture"
          style={{ display: "none" }}
        />
      </div>
      <div
        className="saveButton"
        style={{
          width: "100%",
          height: "10%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <button style={saveButton} onClick={handlepost}>Save</button>
      </div>
    </div>
  );
};

export const Setting4 = ({ user, setUser }) => {
  var ImagePreview = user.user.coverphoto ? user.user.coverphoto : coverPhoto;

  const handleImageInput = (event) => {
    if(event.target.files.length === 0) return;
    ImagePreview = URL.createObjectURL(event.target.files[0]);
    document.getElementById("ImagePreviewImage").src = ImagePreview;
  };

  const handleSave = () => {
    setUser({
      ...user,
      user: {
        ...user.user,
        coverphoto: ImagePreview,
      },
    });
  }

  return (
    <div className="settingsPane" style={settingsPane}>
      <div className="settingHeader" style={settingHeader}>
        <h1>Cover Photo</h1>
      </div>
      <div className="settings" style={settings}>
        <label
          htmlFor="coverphoto"
          style={{ width: "80%", fontWeight: "bold" }}
        >
          <div
            className="ImagePreview"
            style={{
              transition: "all 0.01s ease",
              border: "1.5px solid #c2c2c2",
              borderRadius: "5px",
              height: '50vh',
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              id="ImagePreviewImage"
              src={ImagePreview}
              height="100%"
              style={{objectFit: 'cover'}}
              width="100%"               
              alt=""
            />
          </div>
          <div
            className="ImageUploadButton"
            style={{
              transition: "all 0.01s ease",
              border: "1.5px solid #c2c2c2",
              borderRadius: "5px",
              width: "100px",
              margin: '5px auto',
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: 'pointer'
            }}
          >
            <p>Browse</p>
          </div>
        </label>
        <input
          type="file"
          name="coverphoto"
          onChange={handleImageInput}
          id="coverphoto"
          style={{ display: "none" }}
        />
      </div>
      <div
        className="saveButton"
        style={{
          width: "100%",
          height: "10%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <button style={saveButton} onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};


export const Setting5 = ({ user, setUser }) => {

  const [theme, setTheme] = useState("Light");

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
    if(event.target.value === "Light") {
      document.documentElement.style.setProperty("--primary-color", "#0095f6");
      document.documentElement.style.setProperty("--secondary-color", "#ffffff");
    }
    else if(event.target.value === "Dark") {
      document.documentElement.style.setProperty("--primary-color", "#ffffff");
      document.documentElement.style.setProperty("--secondary-color", "#000000");
    }
    else if(event.target.value === "Custom") {
      document.documentElement.style.setProperty("--primary-color", "#0095f6");
      document.documentElement.style.setProperty("--secondary-color", "#ffffff");
    }
  }

  const handleSave = () => {
    console.log("Save");
  }

  return (
    <div className="settingsPane" style={settingsPane}>
      <div className="settingHeader" style={settingHeader}>
        <h1>Theme Customization</h1>
      </div>
      <div className="settings" style={settings}>
        <div className="setting" style={settingCSS}>
          <label htmlFor="theme" style={{ width: "20%", fontWeight: "bold" }}>
            Theme
          </label>
          <select
            name="theme"
            id="theme"
            style={settingInput}
            defaultValue="Light"
            onChange={handleThemeChange}
          >
            <option value="Light">Light</option>
            <option value="Dark">Dark</option>
            <option value="Custom">Custom</option>
          </select>
          <div className="SettingsmallIcon" style={smallIcon}>
            <img src={''} height="80%" alt="" />
          </div>
        </div>
        {theme==='Custom'?  <div className="themeSettings" style={{display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'space-around', alignItems: 'center'}}>
          <div className="setting" style={settingCSS}>
            <label
              htmlFor="primarycolor"
              style={{ width: "20%", fontWeight: "bold" }}
            > 
              Primary Color
            </label>
            <input
              type="color"
              style={{...settingInput, width: "40px", height: '40px'}}
              name="primarycolor"
              id="primarycolor"
              defaultValue="#0095f6"
            />
            <div className="SettingsmallIcon" style={smallIcon}>
              <img src={""} height="80%" alt="" />
            </div>
          </div>
          <div className="setting" style={settingCSS}>
            <label
              htmlFor="secondarycolor"
              style={{ width: "20%", fontWeight: "bold" }}
            >
              Secondary Color
            </label>
            <input
              type="color"
              style={{...settingInput, width: "40px", height: '40px'}}
              name="secondarycolor"
              id="secondarycolor"
              defaultValue="#ffffff"
            />
            <div className="SettingsmallIcon" style={smallIcon}>
              <img src={''} height="80%" alt="" />
            </div>
          </div>
          <div className="setting" style={settingCSS}>
            <label
              htmlFor="tertiarycolor"
              style={{ width: "20%", fontWeight: "bold" }}
            >
              Tertiary Color
            </label>
            <input
              type="color"
              style={{...settingInput, width: "40px", height: '40px'}}
              name="tertiarycolor"
              id="tertiarycolor"
              defaultValue="#000000"
            />
            <div className="SettingsmallIcon" style={smallIcon}>
              <img src={''} height="80%" alt="" />
            </div>
          </div>
        </div>: <></>}
        
      </div>        
          <div
          className="saveButton"
          style={{
            width: "100%",
            height: "10%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <button style={saveButton} onClick={handleSave}>Save</button>
        </div>
    </div>
  );
}