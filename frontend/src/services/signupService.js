import axios from 'axios';

const signupService = async (userDetails) => {
  try {
    const response = await axios.post('http://localhost:4000/signup', {
      userDetails
    });    
    return true
  } catch (error) {
    console.error('Signup error:', error);
    return false;
  }
};

export default signupService;
