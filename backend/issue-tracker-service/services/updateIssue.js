const { Issues } = require('../ORM/models/models');
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({ keyFilename: '../trackademic.json' });
const bucketName = 'trackademic';

module.exports = updateIssueService = async (issueDetails) => {
  // Debug: Log the incoming issue details for verification
  console.log('\n\n\n\nReceived issue details for update:', issueDetails);

  // Fetch the current issue from the database using the primary key (issueID)
  const issue = await Issues.findByPk(issueDetails.issueID);
  const attachment = issueDetails.attachment;

  // If the issue is not found, throw an error
  if (!issue) {
    console.error(`Issue with ID ${issueDetails.issueID} not found`);
    throw new Error('Issue not found');
  }

  // If there's a new attachment, process it
  if (attachment) {
    console.log('Received an attachment for update:');

    // Generate a unique file name for the attachment
    const newFileName = `issue_${issueDetails.issueID}_${attachment.name}`;

    // Construct the new attachment URL
    const newAttachmentURL = `https://storage.googleapis.com/${bucketName}/${newFileName}`;

    // Delete the old file if it exists
    if (issue.attachmentURL) {
      const oldFileName = issue.attachmentURL.split('/').pop();
      const oldFile = storage.bucket(bucketName).file(oldFileName);
      console.log(`Deleting old file: ${oldFileName}`);
      await oldFile.delete().catch((error) => {
        console.error(`Failed to delete old file: ${oldFileName}`, error);
      });
    }

    // Decode the base64 string and upload the new file
    const base64Data = Buffer.from(attachment.base64.split(',')[1], 'base64');
    const file = storage.bucket(bucketName).file(newFileName);
    console.log(`Uploading new file: ${newFileName}`);
    await file.save(base64Data, {
      gzip: true,
      metadata: {
        cacheControl: 'public, max-age=31536000',
        contentType: attachment.type,
      },
    }).catch((error) => {
      console.error(`Failed to upload new file: ${newFileName}`, error);
      throw error;
    });

    // Update the issue details with the new attachment URL
    issueDetails.attachmentURL = newAttachmentURL;
  }

  // Update the issue with the new details in the database
  console.log(`Updating issue in database: ${issueDetails.issueID}`);
  await issue.update(issueDetails).catch((error) => {
    console.error(`Failed to update issue: ${issueDetails.issueID}`, error);
    throw error;
  });

  console.log(`Issue successfully updated: ${issueDetails.issueID}`);
};
