import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import NavBar from '../common-components/NavBar/NavBar';
import SideDrawer from '../common-components/SideDrawer/SideDrawer';
import getUserByIDService from '../../services/getUserByIDService';
import { useSelector } from 'react-redux';
import updateUserService from '../../services/updateUserService';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
const UserProfile = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [userID, setUserID] = useState(useSelector(state => state.user.userDetails.userID));
  const fileInputRef = useRef(); // Create a reference to the file input field

  useEffect(() => {
    // Make axios request to get user details
    getUserByIDService(userID)
      .then(response => {
        console.log(response)
        const { firstName, lastName, email, profilePhoto } = response;
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
        setPreviewPhoto(profilePhoto);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });
  }, []);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];
    setPhoto(selectedPhoto);
    setPreviewPhoto(URL.createObjectURL(selectedPhoto));
  };

  const handleClearPhoto = () => {
    setPhoto(null);
    setPreviewPhoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the file input field
    }
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const handleSubmit = async (e) => {
  e.preventDefault();

  let base64Photo = null;
  let photoType = null
  if (photo) {
    base64Photo = await convertToBase64(photo);
    photoType = photo.type;
  }

  let payload = {
    userID: userID,    
    firstName: firstName,
    lastName: lastName,
    email: email,
    profilePhoto: {
      base64: base64Photo,
      type: photoType
    }
  }
  try {
    const response = await updateUserService(payload, dispatch);
    console.log(response);
    if(!response)
      throw new Error("Error updating profile");
    toast.success('Profile updated successfully!');
  } catch (error) {
    console.error(error);
    toast.error('Error updating profile');
  }
};


  return (
    <>
    <ToastContainer />
      <NavBar />
      <div className="flex h-100 overflow-hidden">
        <SideDrawer />
        <div className="flex flex-1 justify-center mt-3">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Edit User Profile</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="firstName" className="block font-bold mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full border border-gray-300 rounded py-2 px-3"
                  value={firstName}
                  onChange={handleFirstNameChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="lastName" className="block font-bold mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full border border-gray-300 rounded py-2 px-3"
                  value={lastName}
                  onChange={handleLastNameChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block font-bold mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 rounded py-2 px-3"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="photo" className="block font-bold mb-1">
                  Profile Photo
                </label>
                {previewPhoto ? (
                  <img
                    src={previewPhoto}
                    alt="Profile"
                    className="w-32 h-32 object-cover rounded-full mb-2"
                  />
                ) : (
                  <div className="w-32 h-32 bg-gray-300 rounded-full mb-2"></div>
                )}
                <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  className="w-full"
                  ref={fileInputRef}
                  onChange={handlePhotoChange}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Update Profile
              </button>
              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
                onClick={handleClearPhoto}
              >
                Clear Photo
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );

};

export default UserProfile;
