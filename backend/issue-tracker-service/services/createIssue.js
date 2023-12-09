const { Issues, Users } = require('../ORM/models/models');
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({ keyFilename: '../trackademic.json' });
const bucketName = 'trackademic';
const axios = require('axios');

module.exports = createIssueService = async (issueDetails) => {    
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
  const attachment = issueDetails.attachment;
  if(attachment) {
    try {
      // Generate a unique file name for the attachment using the issue ID and the original file name
      const referenceFileName = `issue_${issueID}_${attachment.name}`;
      
      // Decode the base64 string
      const base64Data = Buffer.from(attachment.base64.split(',')[1], 'base64');

      // Reference to the bucket's file    
      const file = storage.bucket(bucketName).file(referenceFileName);

      // Save the buffer to Google Cloud Storage
      await file.save(base64Data, {
        gzip: true,
        metadata: {
          cacheControl: 'public, max-age=31536000',
          contentType: attachment.type,
        },
      });

      // Construct the public URL for the file
      const attachmentURL = `https://storage.googleapis.com/${bucketName}/${file.name}`;

      // Update the issue with the attachment URL
      await Issues.update({ attachmentURL }, { where: { issueID } });
      console.log(`${attachment.name} uploaded to ${bucketName}. URL: ${attachmentURL}`);

      // Send notification (assuming this part of the code is correct and working)
      // ...
    } catch (error) {
      console.error('Error uploading the file:', error);
    }
  }
};
