const { PutObjectCommand, S3Client } = require('@aws-sdk/client-s3');
const path = require('path');
const fs = require('fs');
const mime = require('mime-types');

class S3Repository {
  async uploadProductImage(filename) {
    const file = path.join(__dirname, '..', '..', '..', '..', 'tmp', filename);
    const fileStream = fs.createReadStream(file);

    const contentType = mime.lookup(file);

    const uploadParams = {
      Bucket: 'felipecurciopsw',
      Key: 'images/' + path.basename(file),
      Body: fileStream,
      ACL: 'public-read',
      ContentType: contentType,
    };

    const REGION = 'us-east-1';

    const s3Client = new S3Client({ region: REGION });

    try {
      await s3Client.send(new PutObjectCommand(uploadParams));
      fs.promises.unlink(file);
      const imageUrl = `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`;

      return imageUrl;
    } catch (err) {
      console.log('Error', err);
    }
  }
}

exports.S3Repository = S3Repository;
