import { useEffect, useState } from 'react';
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from '../../redux/features/productsApiSlice';
import { FaFileUpload } from 'react-icons/fa';

import './style.css';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../redux/features/authSlice';

const formInitialState = {
  owner: '',
  title: '',
  price: '',
  amount: '',
  state: '',
  imageUrl: '',
  new: 'true',
  overview: '',
  description: '',
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

  const auth = useSelector(selectAuth);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewImage(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedFile]);

  const handleFileChange = (event) => {
    const [file] = event.target.files;

    setSelectedFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = auth.user.name;

    const price = parseInt(formData.price.replaceAll(/,|\./g, ''));

    try {
      const { imageUrl } = await uploadProductImage(selectedFile).unwrap();

      const product = {
        ...formData,
        owner: user,
        price,
        imageUrl,
      };

      await createProduct(product).unwrap();
    } catch (err) {
      console.log(err);
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
              <img src={previewImage} className="rounded previewImage" />
              <input
                type="file"
                accept="image/*"
                className="d-none"
                id="previewImage"
                onChange={handleFileChange}
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
                placeholder="Quantidade em estoque"
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
              <label htmlFor="new">Estado do produto</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="new"
                  id="new"
                  value="true"
                  onChange={handleChange}
                  checked={formData.new === 'true'}
                />
                <label className="form-check-label" htmlFor="new">
                  Novo
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="new"
                  id="used"
                  value="false"
                  onChange={handleChange}
                  checked={formData.new === 'false'}
                />
                <label className="form-check-label" htmlFor="used">
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
