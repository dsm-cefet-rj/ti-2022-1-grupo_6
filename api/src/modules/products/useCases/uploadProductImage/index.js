const { S3Repository } = require('../../repositories/S3Repository');
const { UploadProductImageUseCase } = require('./UploadProductImageUseCase');
const {
  UploadProductImageController,
} = require('./UploadProductImageController');

const s3Repository = new S3Repository();

const uploadProductImageUseCase = new UploadProductImageUseCase(s3Repository);

const uploadProductImageController = new UploadProductImageController(
  uploadProductImageUseCase
);

exports.uploadProductImageController = uploadProductImageController;
