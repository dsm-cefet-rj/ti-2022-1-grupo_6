import { useState, useEffect } from 'react';
import { FaFileUpload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useCreateProductMutation } from '../../redux/features/productsApiSlice';

export function AddProduct() {
  const [inputs, setInputs] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const [createNewProduct] = useCreateProductMutation();

  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const handleSubmit = (event) => {
    event.preventDefault();
    createProduct();
  };

  const twoCalls = (event) => {
    setSelectedImage(event.target.files[0]);
    handleChange(event);
  };

  const convertToSlug = (name) => {
    return name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  }

  const convertToUrl = (image) => {
    return "http://localhost:3333/" + image.substring(12, image.length);
  } 

  async function createProduct() {
    //var now = new Date();
    var user = 'Gabriel';
    const data ={
      //id: now.getTime(),
      owner:user,
      imageUrl: convertToUrl(inputs.image),
      likes: 0,
      title: inputs.name,
      price: inputs.price * 100,
      amount: inputs.amount,
      used: inputs.used,
      state: inputs.local,
      slug: convertToSlug(user) + '-' + convertToSlug(inputs.name),
      createdAt: Date(),
        //now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear(),
      description: inputs.description,
      overview: inputs.description.substring(0, Math.min(inputs.description.length,100)) + '...',
      questions: []
    };
    
    try {
      await createNewProduct(data).unwrap();
    } catch (err) {
      console.log(err);
    }

    navigate(`/product/${data.slug}`)
    
  };

  return (
    <>
      <div className="container">
        <div className="p-4">
          <h1 className="p-3"> Adicionar Item</h1>

          <form onSubmit={handleSubmit}>
            <div className="p-2">
              <div className="p-2">
                <img
                  src={imageUrl}
                  style={{
                    borderRadius: '10px',
                    maxWidth: '200px',
                  }}
                />
              </div>
              <div className="m-2 ">
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="produtoimg"
                  name="image"
                  value={inputs.image || ''}
                  onChange={twoCalls}
                />

                <button type="button" className="btn btn-secondary btn-lg">
                  <label
                    htmlFor="produtoimg"
                    style={{ cursor: 'pointer', display: 'block' }}
                  >
                    <FaFileUpload /> Subir Imagem
                  </label>
                </button>
              </div>
            </div>

            <div className="p-2">
              <div className="m-2">
                <p className="fw-bold mb-0">Nome do Anúncio</p>
                <input
                  type="text"
                  name="name"
                  placeholder="Meu Produto"
                  value={inputs.name || ''}
                  onChange={handleChange}
                  className="form-control"
                  style={{ height: 50 }}
                />
              </div>
            </div>

            <div className="p-2">
              <div className="m-2">
                <p className="fw-bold mb-0"> Preço do Produto</p>
                <div className="input-group" style={{ width: 200 }}>
                  <span className="input-group-text">R$</span>
                  <input
                    type="number"
                    name="price"
                    placeholder="99"
                    value={inputs.price || ''}
                    prefix={'R$'}
                    step="any"
                    onChange={handleChange}
                    min="0"
                    className="form-control w-25"
                  />
                  <span className="input-group-text">.00</span>
                </div>
              </div>
            </div>

            <div className="p-2">
              <div className="m-2 w-25">
                <p className="fw-bold mb-0">Quantidade Disponível</p>
                <input
                  type="number"
                  name="amount"
                  placeholder="10"
                  value={inputs.amount || ''}
                  onChange={handleChange}
                  min="0"
                  className="form-control"
                  style={{ width: 200 }}
                />
              </div>
            </div>

            <div className="p-2">
              <div className="m-2">
                <p className="fw-bold mb-0">Local de Envio</p>
                <input
                  type="text"
                  name="local"
                  placeholder="Sua Cidade"
                  value={inputs.local || ''}
                  onChange={handleChange}
                  className="form-control"
                  style={{ height: 50 }}
                />
              </div>
            </div>

            <div className="p-2">
              <div className="m-2">
                <p className="fw-bold mb-0">Estado do Produto</p>
                <select
                  className="form-select"
                  name="used"
                  value={inputs.used || ''}
                  onChange={handleChange}
                  style={{ width: 200 }}
                >
                  <option value="novo">Novo</option>
                  <option value="usado">Usado</option>
                </select>
              </div>
            </div>

            <div className="p-2">
              <div className="m-2">
                <p className="fw-bold mb-0"> Descreva Seu Produto</p>
                <textarea
                  name="description"
                  placeholder="Meu produto é..."
                  value={inputs.description || ''}
                  onChange={handleChange}
                  className="form-control w-100"
                  style={{ height: 200 }}
                />
              </div>
            </div>

            <div className="d-grid gap-2">
              <input
                type="submit"
                value="Enviar"
                className="btn btn-primary fs-2"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
