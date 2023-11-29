import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_GATEWAY_SERVICE;
const signupService = async (userDetails) => {
  try {
    debugger;
    await axios.post(`${apiUrl}/users/signup`, {
      userDetails
    });    
    return true
  } catch (error) {
    console.error('Signup error:', error);
    return false;
  }
};

export default signupService;
