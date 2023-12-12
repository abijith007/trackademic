import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_GATEWAY_SERVICE;

const getDashboardService = async () => {
  try {
    const response = await axios.get(`${apiUrl}/issues/dashboard`, {withCredentials: true});        
    return response.data;  
  } catch (error) {
    console.error('Dasboard error:', error);
    return [];
  }
};

export default getDashboardService;
