import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_GATEWAY_SERVICE;

const getIssuesService = async () => {
  try {
    const response = await axios.get(`${apiUrl}/issues/getIssues`, {withCredentials: true});        
    return response.data;  
  } catch (error) {
    console.error('Login error:', error);
    return [];
  }
};

export default getIssuesService;
