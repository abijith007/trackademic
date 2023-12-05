const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const envPath = path.join(__dirname, '../', '.env');
require('dotenv').config({ path: envPath });
const { spawn } = require('child_process');
const app = express();
const PORT = 4003;
app.use(bodyParser.json());
app.use(cors({origin:process.env.REACT_SERVICE, credentials: true}));
app.use("/chatbot", (req, res) => {
  console.log("Message received")
  const textFromChatbot = req.body.message;
  const pythonProcess = spawn('python', ['nlp_client.py', textFromChatbot]);
  let pythonResponse = '';
  pythonProcess.stdout.on('data', (data) => {
    pythonResponse += data.toString();
  });
  pythonProcess.on('close', (code) => {
    if (code === 0) {
      try {
        const jsonResponse = JSON.parse(pythonResponse);
        console.log('Chatbot Response:', jsonResponse);
        return res.json(jsonResponse)
      } catch (error) {
        res.status(500).json({ error: "Failed to parse JSON response from Python script" });
      }
    } else {
      res.status(500).json({ error: "Failed to execute Python script" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
