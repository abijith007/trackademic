const { Issues, Users } = require('../ORM/models/models');
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({ keyFilename: '../trackademic.json' });
const bucketName = 'trackademic';
const axios = require('axios');
module.exports = createIssueService = async (issueDetails, attachment) => {    
  // Create the issue in the database  
  console.log(issueDetails);
  const issue = await Issues.create({
    title: issueDetails.title,
    description: issueDetails.description,
    status: 'todo',
    createdBy: issueDetails.createdBy,
    assignee: issueDetails.assignee,    
  });
  const issueID = issue.dataValues.issueID;
  const issueDataValues = issue.dataValues;
  if(!attachment) 
    return;

  try {
    // Reference to the bucket's file    
    const referenceFileName = issueID + '_' + attachment.originalname;
    const file = storage.bucket(bucketName).file(referenceFileName);

    // Save the buffer to Google Cloud Storage
    await file.save(attachment.buffer, {
      gzip: true,
      metadata: {
        cacheControl: 'public, max-age=31536000',
        contentType: attachment.mimetype,
      },
    });

    // Construct the public URL for the file
    const attachmentURL = `https://storage.googleapis.com/${bucketName}/${file.name}`;

    // Update the issue with the attachment URL
    assignee_user = await Users.findByPk(issueDataValues.assignee);
    created_by_user = await Users.findByPk(issueDataValues.createdBy);
    console.log(assignee_user, created_by_user);

    await Issues.update({ attachmentURL }, { where: { issueID } });
    console.log(`${attachment.originalname} uploaded to ${bucketName}. URL: ${attachmentURL}`);
    axios.post(process.env.NOTIFICATION_SERVICE, {
      type: 'issue-created',
      title: issueDataValues.title,
      description:issueDataValues.description,
      createdBy: issueDataValues.createdBy,
      assignee: assignee_user.firstName + ' ' + assignee_user.lastName,
      issueID: issueID,
      recipient: assignee_user.email + "; " + created_by_user.email,
    })
  } catch (error) {
    console.error('Error uploading the file:', error);
  }
};
