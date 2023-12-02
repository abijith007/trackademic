const { Issues } = require('../ORM/models/models');
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({ keyFilename: '../trackademic.json' });
const bucketName = 'trackademic';

module.exports = updateIssueService = async (issueDetails, attachment) => {
  // Debug: Log the incoming issue details for verification
  console.log('\n\n\n\nReceived issue details for update:', issueDetails);

  // Fetch the current issue from the database using the primary key (issueID)
  const issue = await Issues.findByPk(issueDetails.issueID);

  // If the issue is not found, throw an error
  if (!issue) {
    console.error(`Issue with ID ${issueDetails.issueID} not found`); // Debug: Log error for missing issue
    throw new Error('Issue not found');
  }

  // If there's a new attachment, process it
  if (attachment) {
    console.log('Received an attachment for update:', attachment.originalname); // Debug: Log the attachment details

    // Generate a unique file name for the attachment using the issue ID and the original file name
    const newFileName = `issue_${issueDetails.issueID}_${attachment.originalname}`;

    // Construct the new attachment URL
    const newAttachmentURL = `https://storage.googleapis.com/${bucketName}/${newFileName}`;

    // If the current attachment URL is different from the new one, proceed with update
    if (issue.attachmentURL !== newAttachmentURL) {
      // Delete the old file from Google Cloud Storage if it exists
      if (issue.attachmentURL) {
        const oldFileName = issue.attachmentURL.split('/').pop();
        const oldFile = storage.bucket(bucketName).file(oldFileName);
        console.log(`Deleting old file: ${oldFileName}`); // Debug: Log the file deletion attempt
        await oldFile.delete().catch((error) => {
          console.error(`Failed to delete old file: ${oldFileName}`, error); // Debug: Log error if deletion fails
        });
      }

      // Upload the new file to Google Cloud Storage
      const file = storage.bucket(bucketName).file(newFileName);
      console.log(`Uploading new file: ${newFileName}`); // Debug: Log the file upload attempt
      await file.save(attachment.buffer, {
        gzip: true,
        metadata: {
          cacheControl: 'public, max-age=31536000',
          contentType: attachment.mimetype,
        },
      }).catch((error) => {
        console.error(`Failed to upload new file: ${newFileName}`, error); // Debug: Log error if upload fails
        throw error; // Re-throw the error to handle it further up the call stack
      });

      // Update the issue details with the new attachment URL
      issueDetails.attachmentURL = newAttachmentURL;
    }
  }

  // Update the issue with the new details in the database
  console.log(`Updating issue in database: ${issueDetails.issueID}`); // Debug: Log the database update attempt
  await issue.update(issueDetails).catch((error) => {
    console.error(`Failed to update issue: ${issueDetails.issueID}`, error); // Debug: Log error if update fails
    throw error; // Re-throw the error to handle it further up the call stack
  });

  // Debug: Confirm the issue update in the logs
  console.log(`Issue successfully updated: ${issueDetails.issueID}`);
};
