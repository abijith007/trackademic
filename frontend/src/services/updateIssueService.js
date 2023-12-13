import axios from 'axios'
const apiUrl = process.env.REACT_APP_API_GATEWAY_SERVICE;

const updateIssueService = async (issueDetails) => {
  try {
    const response = await axios.post(`${apiUrl}/issues/update`,
     issueDetails
    ,{      withCredentials: true
    });     
    return true;  
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

export default updateIssueService;
