async function statusUpdate(req, res) {

  const { userIds, issueId } = req.body;

  const source = fs.readFileSync(path.join(__dirname, '../templates', 'status-update.hbs'), 'utf8');
  const template = handlebars.compile(source);
  
  userIds.forEach(async userId => {
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: userId, // Replace this with the actual email address
      subject: `Issue ID ${issueId} Status Update`,
      html: template({ issueId })
    };

    // Send email
    try {
      await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${userId}`);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  });

  res.send('Notifications sent');
}

module.exports = statusUpdate;

