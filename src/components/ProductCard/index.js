import { formatDate } from '../../utils/date';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { usePrefetch } from '../../redux/features/productsApiSlice';

export const ProductCard = ({ productData }) => {
  const prefetchProduct = usePrefetch('fetchProduct');

  return (
    <div className="col-md-4">
      <div className="card mb-3">
        <img src={productData.imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <div className="row g-4">
            <div className="col">
              <h5 className="card-title">{productData.title}</h5>
            </div>
            <div className="col">
              <FaHeart className="text-danger" /> {productData.likes}
            </div>
          </div>

          <p className="card-text">
            {productData.descriptionShort}
          </p>
          <p className="card-text">
            <Link
              className="btn btn-outline-primary"
              to={`/product/${productData.slug}`}
              onMouseEnter={() =>
                prefetchProduct(productData.slug, { ifOlderThan: 60 })
              }
            >
              Ver detalhes <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </p>
          <p className="card-text fw-bold">
            Preço:{' '}
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(productData.price / 100)}
          </p>
          <p className="card-text">
            <small className="text-muted">
              {formatDate(productData.createdAt)}, {productData.state}
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};
