import { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { AddFavorite } from '../AddFavorite';
import { useCreateProductMutation } from '../../redux/features/productsApiSlice';

export const ProductDetail = ({ product, setCart }) => {
  const [itemCardAdded, setItemCardAdded] = useState(false);
  const [createProduct] = useCreateProductMutation();

  function handleAddCart(e) {
    e.preventDefault();

    setCart((cart) => {
      const hasItem = cart.find((item) => item.id === product.id);

      if (hasItem) {
        const newCart = cart.map((item) => {
          if (item.id === product.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });

        localStorage.setItem('TechBuy.cart', JSON.stringify(newCart));
        return newCart;
      }

      const item = {
        id: product.id,
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        state: product.state,
        quantity: 1,
        createdAt: product.createdAt,
      };

      const newCart = [...cart, item];
      localStorage.setItem('TechBuy.cart', JSON.stringify(newCart));
      return newCart;
    });

    setItemCardAdded(true);
  }

  async function handleAddProduct() {
    const data = {
      id: 6,
      owner: 'Guigui',
      slug: 'guigui-placa-de-video',
      title: 'Placa de video do guigui',
      imageUrl: 'http://localhost:3333/placa-de-video.png',
      likes: 4,
      descriptionShort: 'desc short',
      price: 10000,
      createdAt: '2022-05-18T12:12:50.686Z',
      state: 'São Paulo',
      amount: 120,
    };

    try {
      await createProduct(data).unwrap();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    let timeoutRef;
    if (itemCardAdded)
      timeoutRef = setTimeout(() => setItemCardAdded(false), 1500);

    return () => clearTimeout(timeoutRef);
  }, [itemCardAdded]);

  return (
    <div className="card border-0 w-100">
      <div className="row center align-items-center">
        <div className="col-md-4">
          <img
            src={product.imageUrl}
            className="img-fluid rounded-start w-100"
            alt={product.title}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h2 className="card-header">{product.title}</h2>
            <form className="mt-3">
              <p className="card-text">
                Preço{' '}
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(product.price / 100)}
              </p>
              <p className="card-text">Local: {product.local}</p>
              <p className="card-text">
                Quantidade disponível: {product.amount}
              </p>

              <div>
                <button className="btn btn-primary mb-3 d-block">
                  Comprar
                </button>
                <button
                  className={`btn btn-outline-primary ${
                    itemCardAdded ? 'btn-outline-success' : ''
                  }`}
                  style={{ transition: '0.5s' }}
                  onClick={handleAddCart}
                >
                  {itemCardAdded ? (
                    <div>
                      Adicionado <FaCheckCircle className="icon-animated" />
                    </div>
                  ) : (
                    <div>Colocar no carrinho</div>
                  )}
                </button>
              </div>

              <div className="mt-4">
                <AddFavorite />
              </div>
              <h1 onClick={handleAddProduct}>Adicionar um produto</h1>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
