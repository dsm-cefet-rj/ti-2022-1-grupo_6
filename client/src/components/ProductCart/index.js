import './style.css';
import { formatDate } from '../../utils/date';
import { useDispatch, useSelector } from 'react-redux';
import { removeProduct, updateProduct } from '../../redux/features/cartSlice';

export function ProductCart({ product }) {

  const formatterBRL = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const cart = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  function handleRemoveCart() {
    dispatch(removeProduct({cart, product}));
  }

  function handleChangeQuant(e) {
    let newProduct = JSON.parse(JSON.stringify(product));
    newProduct.quantity = Number(e.target.value);

    dispatch(updateProduct({cart, product: newProduct}));
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
            onChange={(e) => handleChangeQuant(e)}
            defaultValue={product.quantity}
            required
          >
            {Array.from({ length: 4 }, (el, i) => i + 1).map((element, idx) => (
              <option
                key={idx}
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
          onClick={() => handleRemoveCart()}
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
