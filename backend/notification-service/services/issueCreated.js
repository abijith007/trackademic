const { transporter } = require("../middleware/nodemailer");
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const envPath = path.join(__dirname, '../../', '.env');
require('dotenv').config({ path: envPath });

console.log(process.env.GMAIL_USER);

async function issueCreated(req, res) {
  
  data = req.body;
console.log(data)
  const templatePath = path.join(__dirname, `../templates/issue-created.hbs`);
  const source = fs.readFileSync(templatePath, 'utf-8');
  const template = handlebars.compile(source);

  // Compile the template with the provided context
  const htmlToSend = template(data);

  // Setup email data
  const mailOptions = {
    from: process.env.GMAIL_USER, // Replace with your email
    to: data.recipient,
    subject: 'Issue Created - ' + data.issueID,
    html: htmlToSend
  };

  // Send email
  const response = await transporter.sendMail(mailOptions);
  console.log(response)
  res.send({message: "Email sent successfully"});
}

module.exports = issueCreated;
