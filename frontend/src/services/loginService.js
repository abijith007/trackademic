import axios from 'axios';
import { setUser } from '../redux/actions/userActions';
const apiUrl = process.env.REACT_APP_API_GATEWAY_SERVICE;

const loginService = async (email, password, dispatch) => {
  try {
    const response = await axios.post(`${apiUrl}/users/login`, {
      email,
      password,
    });
    console.log(response.data);
    dispatch(setUser(response.data.userDetails));    
    return true;  
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

export default loginService;
