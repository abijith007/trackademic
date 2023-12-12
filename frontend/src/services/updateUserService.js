import axios from 'axios'
const apiUrl = process.env.REACT_APP_API_GATEWAY_SERVICE;

const updateUserService = async (userDetails) => {
  try {
    const response = await axios.post(`${apiUrl}/users/update`,
    userDetails
    ,{      withCredentials: true
    });     
    return response;  
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

export default updateUserService;
