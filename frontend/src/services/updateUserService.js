import axios from 'axios'
import { setUser } from '../redux/actions/userActions';
const apiUrl = process.env.REACT_APP_API_GATEWAY_SERVICE;


const updateUserService = async (userDetails, dispatch) => {  
  try {
    const response = await axios.post(`${apiUrl}/users/update`,
    userDetails
    ,{      withCredentials: true
    });  
    dispatch(setUser(response.data.userDetails));    
    return response;  
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

export default updateUserService;
