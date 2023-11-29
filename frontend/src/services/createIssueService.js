import axios from 'axios';
const apiUrl = process.env.REACT_APP_ISSUE_SERVICE;

const createIssueService = async (issueDetails) => {
  try {
    const response = await axios.post(`${apiUrl}/issues/create`,
     issueDetails
    ,{      withCredentials: true
    }); 
    console.log(response)   
    return true;  
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

export default createIssueService;
