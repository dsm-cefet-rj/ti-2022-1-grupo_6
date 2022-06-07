import './style.css';
import { formatDate } from '../../utils/date';

export function ProductCart({ product, setCart }) {
  const formatterBRL = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  function handleRemoveCart(e, id) {
    setCart((cart) => {
      const newCart = cart.filter((item) => item.id !== id);

      localStorage.setItem('TechBuy.cart', JSON.stringify(newCart));

      return newCart;
    });
  }

  function handleChangeQuant(e, id) {
    setCart((cart) => {
      const newCart = cart.filter((item) => item.id !== id);
      
      product.quantity = "" + e.target.value;

      newCart.push(product);

      localStorage.setItem('TechBuy.cart', JSON.stringify(newCart));

      return newCart;
    })
  }

  return (
    <div className="product line">
      <img
        src={product.imageUrl}
        alt="imagem do produto"
        className="product-image"
      />

      <div className="product-info">
        <span>{product.title}</span>
        <strong>{formatterBRL.format(product.price / 100)}</strong>
        <p>
          {formatDate(product.createdAt)}, {product.state}
        </p>

        <div className="quant">
          <p>Quant:</p>

          <select 
            className="form-select bg-transparent" 
            id="quant" 
            onChange={(e) => handleChangeQuant(e, product.id)}
            defaultValue={product.quantity}
            required
          >
            {Array.from({ length: 4 }, (el, i) => i + 1).map((element, idx) => (
              <option
                key={idx}
                selected={element === product.quantity ? true : false}
              >
                {element}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="remove-button-session">
        <button
          className="btn p-0"
          onClick={(e) => handleRemoveCart(e, product.id)}
        >
          <img
            src="remove.svg"
            alt="remover produto"
            className="remove-button"
          />
        </button>
      </div>
    </div>
  );
}
