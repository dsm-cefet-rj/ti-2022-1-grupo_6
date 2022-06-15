import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { useFetchProductQuery } from '../../redux/features/productsApiSlice';
import { formatDate } from '../../utils/date';
import { useDispatch } from 'react-redux';
import { removeFavorite } from '../../redux/features/favoriteSlice';

import './style.css';

export const Favorite = ({ FavSlug, FavIndex }) => {
  const { data, isFetching } = useFetchProductQuery(FavSlug);

  const dispatch = useDispatch();

  if (isFetching) {
    return (
      <div className="spinner-border text-primary m-auto" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  const handleClick = () => {
    if (window.confirm('Você deseja remover este item dos Favoritos?')) {
      dispatch(removeFavorite({ slug: FavSlug, id: FavIndex }));
      console.log(FavIndex);
    }
  };

  const [favorite] = data;

  return (
    <>
      <Link
        to={`/product/${favorite.slug}`}
        style={{ textDecoration: 'none', color: '#000000' }}
      >
        <div className="product-fav">
          <img src={favorite.imageUrl} alt="Imagem" />
          <form className="text-fav">
            <p className="title-fav">{favorite.title}</p>
            <p className="price-fav">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(favorite.price / 100)}
            </p>
            <p className="date-fav">
              {formatDate(favorite.createdAt)}, {favorite.state}
            </p>
          </form>
          <div className="star-fav">
            <AiFillStar size={28} color={'limegreen'} />
          </div>
        </div>
      </Link>
      <div>
        <p className="delete-fav fs-6" onClick={handleClick}>
          {' '}
          Excluir dos Favoritos
        </p>
      </div>
    </>
  );
};
