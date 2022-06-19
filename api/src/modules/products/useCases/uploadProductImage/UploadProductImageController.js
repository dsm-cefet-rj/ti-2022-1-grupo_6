class UploadProductImageController {
  constructor(uploadProductImageUseCase) {
    this.uploadProductImageUseCase = uploadProductImageUseCase;
  }

  async handle(request, response) {
    const {
      file: { filename },
    } = request;

    const imageUrl = await this.uploadProductImageUseCase.execute(filename);

    return response.json({ imageUrl: imageUrl });
  }
}

exports.UploadProductImageController = UploadProductImageController;
