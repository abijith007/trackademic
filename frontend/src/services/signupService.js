import axios from 'axios';
const apiUrl = process.env.REACT_APP_USER_SERVICE;
const signupService = async (userDetails) => {
  try {
    debugger;
    await axios.post(`${apiUrl}/signup`, {
      userDetails
    });    
    return true
  } catch (error) {
    console.error('Signup error:', error);
    return false;
  }
};

export default signupService;
