// NavBar.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../redux/actions/userActions';
import { useState } from 'react';

function NavBar() {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profilePhoto, setprofilePhoto] = useState(useSelector(state => state.user?.userDetails?.profilePhotoLink));
  const goTo = (page) => () => {    
    navigate('/' + page);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const getDynamicBackgroundColor = () => {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isDarkMode ? '#34495e' : '#3498db';
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        backgroundColor: getDynamicBackgroundColor(),
        padding: '8px',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'background-color 0.3s ease',
      }}
    >
      <div className="ms-2">
        <button
          className="btn btn-sm btn-light normal-case text-xl"
          style={{ fontWeight: 'bold', color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}
          onClick={goTo('')}
        >
          Trackademic
        </button>
      </div>

      {isLoggedIn ? (
        <div className="flex gap-2 me-3">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">

              <div className="w-10 rounded-full">
                <img src={profilePhoto != "" ? profilePhoto : "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"} alt="User Avatar" />                
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-primary-100 rounded-box w-36"
            >
              <li>
                <button onClick={goTo('profile')}>Profile</button>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex gap-2 me-3">
          <div className="flex justify-center">
            <button
              className="btn btn-light btn-sm mr-1" // Added margin-right for spacing
              onClick={goTo('signup')}
            >
              Sign Up
            </button>
            <button
              className="btn btn-light btn-sm"
              onClick={goTo('login')}
            >
              Login
            </button>
          </div>
        </div>
      )}

      {/* Unchanged styles for "Feature," "Team," and "About Us" buttons */}
      <div className="flex gap-2 me-3">
        <button className="btn btn-light btn-sm" onClick={goTo('feature')}>
          Feature
        </button>
        <button className="btn btn-light btn-sm" onClick={goTo('team')}>
          Team
        </button>
        <button className="btn btn-light btn-sm" onClick={goTo('about')}>
          About Us
        </button>
      </div>
    </div>
  );
}

export default NavBar;
