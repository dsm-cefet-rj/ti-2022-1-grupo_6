import { useEffect, useState } from 'react';
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from '../../redux/features/productsApiSlice';
import { FaFileUpload } from 'react-icons/fa';

import './style.css';
import slugify from 'slugify';

const formInitialState = {
  owner: '',
  slug: '',
  title: '',
  price: '',
  amount: '',
  state: '',
  imageUrl: '',
  used: 'novo',
  overview: '',
  description: '',
  likes: 0,
  questions: [],
};

export function AddProduct() {
  const [formData, setFormData] = useState(formInitialState);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const [createProduct, { isLoading, isSuccess, isUninitialized }] =
    useCreateProductMutation();

  const [
    uploadProductImage,
    { isLoading: isLoadingUpload, isSuccess: isSuccessUpload },
  ] = useUploadProductImageMutation();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  useEffect(() => {
    if (previewImage) {
      const objectUrl = URL.createObjectURL(previewImage);
      setSelectedFile(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [previewImage]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = 'some-user';
    const { title } = formData;
    const slug =
      slugify(user, { lower: true }) +
      '-' +
      slugify(title, {
        lower: true,
      });

    const price = parseInt(formData.price.replaceAll(/,|\./g, ''));

    const product = {
      ...formData,
      owner: user,
      slug,
      price,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      await createProduct(product).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadProductImage = async (event) => {
    const [file] = event.target.files;
    try {
      // let { imageUrl } = await uploadProductImage(file).unwrap();
      let imageUrl =
        'https://images.unsplash.com/photo-1555618565-9f2b0323a10d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bnZpZGlhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60';
      setFormData((state) => ({ ...state, imageUrl }));
      setPreviewImage(file);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="p-4">
          <h1 className="p-3 text-center">Adicionar Produto</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group my-4">
              <label htmlFor="title">Título do anúncio</label>
              <input
                type="text"
                className="form-control w-75"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Título"
              />
            </div>

            <div className="form-group my-4">
              <label htmlFor="imageUrl">Imagem do produto</label>
              <input
                type="text"
                className="form-control w-75"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="URL da imagem"
              />
            </div>

            <div className="form-group my-4">
              <img src={selectedFile} className="rounded previewImage" />
              <input
                type="file"
                accept="image/*"
                className="d-none"
                id="previewImage"
                onChange={handleUploadProductImage}
              />
              <button
                className="btn btn-secondary btn-lg d-block my-2"
                type="button"
              >
                <label htmlFor="previewImage">
                  <FaFileUpload /> Subir Imagem
                </label>
              </button>
            </div>

            <div className="form-group my-4">
              <label htmlFor="price">Preço do produto</label>
              <input
                type="text"
                className="form-control w-25"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="299,99"
              />
            </div>

            <div className="form-group my-4">
              <label htmlFor="amount">Quantidade disponível</label>
              <input
                type="text"
                className="form-control w-25"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Preço"
              />
            </div>

            <div className="form-group my-4">
              <label htmlFor="state">Local de envio</label>
              <input
                type="text"
                className="form-control w-75"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Estado ou UF"
              />
            </div>

            <div className="form-group my-4">
              <label htmlFor="novo">Estado do produto</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="used"
                  id="novo"
                  value="novo"
                  onChange={handleChange}
                  checked={formData.used === 'novo'}
                />
                <label className="form-check-label" htmlFor="novo">
                  Novo
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="used"
                  id="usado"
                  value="usado"
                  onChange={handleChange}
                  checked={formData.used === 'usado'}
                />
                <label className="form-check-label" htmlFor="usado">
                  Usado
                </label>
              </div>
            </div>

            <div className="form-group my-4">
              <label htmlFor="overview">Resumo do produto</label>
              <input
                type="text"
                className="form-control"
                id="overview"
                name="overview"
                value={formData.overview}
                onChange={handleChange}
                placeholder="Descreva o produto resumidamente"
              />
            </div>

            <div className="form-group my-4">
              <label htmlFor="description">
                Descrição detalhada do produto
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="8"
                placeholder="Descreva o produto detalhadamente"
              ></textarea>
            </div>

            <div className="d-flex align-items-center justify-content-center">
              {isUninitialized && (
                <button type="submit" className="btn btn-primary w-75">
                  Enviar
                </button>
              )}
              {isLoading && (
                <button
                  type="submit"
                  className="btn btn-primary w-75 d-flex align-items-center justify-content-center"
                >
                  Enviar
                  <div
                    className="spinner-border text-light ms-2"
                    id="spinner-adding-product"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </button>
              )}
              {isSuccess && (
                <button type="submit" className="btn btn-success w-75">
                  Produto adicionado
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
