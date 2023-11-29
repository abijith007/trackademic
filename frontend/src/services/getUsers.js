import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_GATEWAY_SERVICE;

const getUsers = async () => {
  try {
    const response = await axios.get(`${apiUrl}/users/getUsers`);    
    return response;  
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

export default createIssueService;
