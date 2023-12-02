const { Issues } = require('../ORM/models/models');
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({ keyFilename: '../trackademic.json' });
const bucketName = 'trackademic';

module.exports = createIssueService = async (issueDetails, attachment) => {    
  // Create the issue in the database
  const issue = await Issues.create({
    title: issueDetails.title,
    description: issueDetails.description,
    status: 'todo',
    createdBy: issueDetails.createdBy,
    assignee: issueDetails.assignee,    
  });
  const issueID = issue.dataValues.issueID;

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
    await Issues.update({ attachmentURL }, { where: { issueID } });

    console.log(`${attachment.originalname} uploaded to ${bucketName}. URL: ${attachmentURL}`);
  } catch (error) {
    console.error('Error uploading the file:', error);
  }
};
