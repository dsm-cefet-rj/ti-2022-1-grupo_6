export const ProductDetail = ({ product }) => {
  return (
    <div className="card border-0 mb-3 w-100">
      <div className="row g-4 center">
        <div className="col-md-4 h-100">
          <img
            src={product.image}
            className="img-fluid rounded-start"
            alt={product.name}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h2 className="card-header">{product.name}</h2>
            <form className="mt-3">
              <p className="card-text">Preço {product.price}</p>
              <p className="card-text">Local: {product.local}</p>
              <p className="card-text">
                Quantidade disponível: {product.amount}
              </p>
              <button className="btn btn-primary">Comprar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
