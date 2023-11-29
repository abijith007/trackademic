import axios from 'axios';
const apiUrl = process.env.REACT_APP_ISSUE_SERVICE;

const getIssuesService = async () => {
  try {
    const response = await axios.get(`${apiUrl}/issues/getIssues`);        
    return response.data;  
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

export default getIssuesService;
