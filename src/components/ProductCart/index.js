import "./style.css"

export function ProductCart({product}) {
    return (
        <div className="product line">                
            <div className="product-image"></div>
            
            <div className="product-info">
                <span>{product.name}</span>
                <strong>{product.price}</strong>
                <p>{product.dateTime}, {product.local}</p>
                
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