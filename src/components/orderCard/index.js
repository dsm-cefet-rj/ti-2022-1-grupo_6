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

        
      </div>
      <button className='btn-success button' onClick={() => {
          window.location.href = "https://api.whatsapp.com/send?phone=5521995706383&text=Ol%C3%A1%2C%20vi%20seu%20an%C3%BAncio%20na%20TechBuy%2C%20gostaria%20de%20oferecer%20uma%20proposta!"
      }}
      >
          <img width={40} src="https://img.icons8.com/color/48/000000/whatsapp--v1.png"/>
        <p style={{color: 'white'}}>Contatar vendedor</p>
      </button>
    </div>
  );
}
