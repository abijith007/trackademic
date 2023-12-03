const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const envPath = path.join(__dirname, '../../', '.env');
require('dotenv').config({ path: envPath });
const { spawn } = require('child_process');
const app = express();
const PORT = 3002;
app.use(bodyParser.json());
app.use(cors());
app.use("/chatbot", (req, res) => {
  const textFromChatbot = "Create a new issue for the customer service department. As the customer is reporting that they are unable to log in to their account. ";
  const pythonProcess = spawn('python', ['nlp_client.py', textFromChatbot]);
  let pythonResponse = '';
  pythonProcess.stdout.on('data', (data) => {
    pythonResponse += data.toString();
  });
  pythonProcess.on('close', (code) => {
    if (code === 0) {
      try {
        const jsonResponse = JSON.parse(pythonResponse);
        res.json(jsonResponse);
        res.send(jsonResponse);
        return res.json({ message: "Response sent successfully" })
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
