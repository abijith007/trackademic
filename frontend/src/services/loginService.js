import axios from 'axios';
import { setUser } from '../redux/actions/userActions';

const loginService = async (email, password, dispatch) => {
  try {
    const response = await axios.post('http://localhost:4000/login', {
      email,
      password,
    });

    dispatch(setUser(response.data.userDetails));
    return true;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

export default loginService;
