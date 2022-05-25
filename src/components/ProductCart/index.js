import "./style.css"
import { formatDate } from '../../utils/date'

export function ProductCart({product}) {
    var formatterBRL = new Intl.NumberFormat('pt-BR');

    return (
        <div className="product line">                
            <img src={product.imageUrl} alt="imagem do produto" className="product-image"/>

            <div className="product-info">
                <span>{product.title}</span>
                <strong>{formatterBRL.format(product.price)}</strong>
                <p>{formatDate(product.createdAt)}, {product.state}</p>
                
                <div className="quant">
                    <p>
                    Quant:
                    </p>
                                        
                    <select className="form-select bg-transparent" id="quant" required>
                        <option selected>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </select>
                </div>
            </div>

            <div className="remove-button-session">
                <img src="remove.svg" alt="remover produto" className="remove-button"/>
            </div>
        </div>
    );
} 