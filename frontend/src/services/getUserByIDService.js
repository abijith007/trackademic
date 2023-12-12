import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_GATEWAY_SERVICE;

const getUserByIDService = async (userID) => {
  try {
    const response = await axios.get(`${apiUrl}/users/getUserByID?userID=${userID}`, {withCredentials: true});        
    return response.data;  
  } catch (error) {    
    return {};
  }
};

export default getUserByIDService;
