import axios from 'axios';
import { setUser } from '../redux/actions/userActions';
const apiUrl = process.env.REACT_APP_USER_SERVICE;

const loginService = async (email, password, dispatch) => {
  try {
    const response = await axios.post(`${apiUrl}/login`, {
      email,
      password,
    });

    dispatch(setUser(response.data.userDetails));
    axios.get('http://localhost:4002/issues',{withCredentials: true});
    return true;  
  } catch (error) {
    console.error('Login error:', error);
    return true;
  }
};

export default loginService;
