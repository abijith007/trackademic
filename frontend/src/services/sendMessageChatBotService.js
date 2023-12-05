import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_GATEWAY_SERVICE;

const sendMessageChatBotService = async (message) => {
  try {
    const response = await axios.post(`${apiUrl}/chatbot`,
     message
    ,{      withCredentials: true
    });     
    console.log(response)
    return response;  
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

export default sendMessageChatBotService;
