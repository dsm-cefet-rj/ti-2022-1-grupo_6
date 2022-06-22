class UploadProductImageUseCase {
  constructor(s3Repository) {
    this.s3Repository = s3Repository;
  }

  async execute(filename) {
    const imageUrl = await this.s3Repository.uploadProductImage(filename);

    return imageUrl;
  }
}

exports.UploadProductImageUseCase = UploadProductImageUseCase;
