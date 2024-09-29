import React, { useState } from 'react';
import "./Navbar.css";
import searchIcon from "../Images/search.png";
import Message from "../Images/message.png";
import defaultUser from "../Images/blank-profile-picture-973460_960_720.webp";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../ReduxContainer/UserReducer";
import Logo from "../Images/LOGO.svg"
import VideoIcon from "../Images/video.png"

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchKey, setSearchKey] = useState('')  ;

  const handleLogoClick = () => {
    navigate('/');
  };

  const userDetails = useSelector((state) => state.user);
  const user = userDetails.user;
  const id = user.user._id;

  const handleLogOut = () => {
    dispatch(logout());
  } 

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  }

  const handleSearch = () => {
    if (searchKey.trim() !== '') {
      navigate(`/searchpage/${searchKey}`);
    }
  };

  const handleInputChange = (event) => {
    setSearchKey(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='mainNavbar'>
      <div className='LogoContainer' onClick={handleLogoClick}>
        <img src={Logo} className='Logo' height='30rem' alt="" />

      </div>
      <div>
        <div className='searchInputContainer'>
          <input
            type="text"
            className='searchInput'
            placeholder='search Fotoflask'
            name="search"
            id="search"
            value={searchKey}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
          <img src={`${searchIcon}`} className="searchIcon" alt="" onClick={handleSearch}/>
        </div>
      </div>
      <div className='IconsContainer'>
         <Link to="/reels">
            <div className="iiconn2">
              <script src="https://cdn.lordicon.com/lordicon.js"></script>
              <lord-icon
                src="https://cdn.lordicon.com/aklfruoc.json"
                trigger="hover"
                style={{ width: "30px", height: "30px" }}
              ></lord-icon>
            </div>
          </Link>
          <Link to="/chat">
            <div className="iiconn2">
              <script src="https://cdn.lordicon.com/lordicon.js"></script>
              <lord-icon
              src="https://cdn.lordicon.com/fdxqrdfe.json"
                trigger="hover"
                style={{ width: "30px", height: "30px" }}
              ></lord-icon>
            </div>
          </Link>
          <Link to="/addnewpost">
            <div className="iiconn2">
              <script src="https://cdn.lordicon.com/lordicon.js"></script>
              <lord-icon
                 src="https://cdn.lordicon.com/zrkkrrpl.json"
                trigger="hover"
                stroke="bold"
                colors="primary:#121331,secondary:#000000"
                style={{ width: "30px", height: "30px" }}
              ></lord-icon>
            </div>
          </Link>
        <Link to="/addnewreel">
            <div className="iiconn2">
              <script src="https://cdn.lordicon.com/lordicon.js"></script>
              <lord-icon
                src="https://cdn.lordicon.com/msrokfyb.json"
                trigger="hover"
                stroke="bold"
                colors="primary:#121331,secondary:#000000"
                style={{ width: "30px", height: "30px" }}
              ></lord-icon>
            </div>
          </Link>
        <Link to={`/profilepage/${id}`} style={{ textDecoration: 'none', color: 'black' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={(user.user.profilepicture) ? user.user.profilepicture : defaultUser} className="ProfileImage" alt="" />
            <p className="NavbarUsername" style={{ marginLeft: '5px' }}>{user.user.username}</p>
          </div>
        </Link>
        <div className="dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
          <button className="dropbtn">▼</button>
          {showDropdown &&
            <div className="dropdown-content">
              <Link to="/settings">Settings</Link>
              {user.user.Admin==="0"?<Link to="/admin">Admin</Link>:null}
              <Link onClick={handleLogOut}>Logout</Link>
              {/* Add other options here */}
            </div>
          }
        </div>
      </div>
    </div>
  );
}
