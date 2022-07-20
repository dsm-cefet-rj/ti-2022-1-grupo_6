import './style.css';
import { formatDate } from '../../utils/date';

export function OrderCard({ product }) {

    const formatterBRL = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

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
            onChange={(e) => {}}
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
    </div>
  );
}
