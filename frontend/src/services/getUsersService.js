import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_GATEWAY_SERVICE;

const getUsersService = async () => {
  try {
    const response = await axios.get(`${apiUrl}/users/getUsers`);        
    console.log(response.data);
    return response.data;  
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

export default getUsersService;
