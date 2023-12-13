const Users = require("../ORM/models/Users");
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
const bucketName = 'trackademic';

async function updateUserService(req, res) {
  let userDetails = req.body;
  console.log(userDetails);
  let profilePhotoLink = '';
  if (userDetails.profilePhoto.base64) {
    console.log("Porfile Photo indentified");
    const fileName = `userID_${userDetails.userID}_profilePhoto`;
    const base64Data = Buffer.from(userDetails.profilePhoto.base64.split(',')[1], 'base64');
    const file = storage.bucket(bucketName).file(fileName);
    const uploadResponse = await file.save(base64Data, {
      gzip: true,
      metadata: {
        cacheControl: 'public, max-age=31536000',
        contentType: userDetails.profilePhoto.type,
      },
    })
    console.log(uploadResponse);
    profilePhotoLink = `https://storage.googleapis.com/${bucketName}/${file.name}`;
  }
  await Users.update({ firstName: userDetails.firstName, lastName: userDetails.lastName, email: userDetails.email, profilePhoto: profilePhotoLink }, { where: { userID: userDetails.userID } });
  let userFromDB = await Users.findOne({ where: { userID: userDetails.userID } });
  res.send({ message: 'Update Successful', userDetails: userFromDB });

}

module.exports = updateUserService;