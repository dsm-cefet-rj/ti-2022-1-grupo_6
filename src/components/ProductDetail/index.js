import { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

export const ProductDetail = ({ product, setCart }) => {
  const [itemCardAdded, setItemCardAdded] = useState(false);

  function handleAddCart(e) {
    e.preventDefault();

    setCart((cart) => {
      const hasItem = cart.find((item) => item.id == product.id);

      if (hasItem) {
        const newCart = cart.map((item) => {
          if (item.id == product.id) {
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

  useEffect(() => {
    let timeoutRef;
    if (itemCardAdded)
      timeoutRef = setTimeout(() => setItemCardAdded(false), 2500);

    return () => clearTimeout(timeoutRef);
  }, [itemCardAdded]);

  return (
    <div className="card border-0 mb-3 w-100">
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

              <button className="btn btn-primary mb-3 d-block">Comprar</button>
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
