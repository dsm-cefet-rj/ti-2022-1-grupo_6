import { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { AddFavorite } from '../AddFavorite';
import { useCreateProductMutation } from '../../redux/features/productsApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../redux/features/cartSlice';

export const ProductDetail = ({ product }) => {
  const [itemCardAdded, setItemCardAdded] = useState(false);
  const [createProduct] = useCreateProductMutation();
  const dispatch = useDispatch();

  async function handleAddCart(e) {
    e.preventDefault();

    const data = {
      productId: product._id,
      quantity: 1,
    };

    dispatch(addProduct({ product: data }));
    setItemCardAdded(true);
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
              <p className="card-text">Local: {product.state}</p>
              <p className="card-text">
                Quantidade disponível: {product.amount}
              </p>
              <p className="card-text">
                Estado: {product.new ? 'novo' : 'usado'}
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
