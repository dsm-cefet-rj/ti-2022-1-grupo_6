import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { useFetchProductQuery } from '../../redux/features/productsApiSlice';
import { formatDate } from '../../utils/date';

import { useRemoveFavoriteMutation } from '../../redux/features/wishlistApiSlice';

import './style.css';

export const Favorite = ({ FavSlug, FavId }) => {
  const { data: favorite = [], isFetching } = useFetchProductQuery(FavSlug);

  //const { data:wishlist = [], isFetching} = useFetchWishlistQuery(+FavId+1);
  const [removeFavorite] = useRemoveFavoriteMutation();


  if (isFetching) {
    return (
      <div className="spinner-border text-primary m-auto" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  const handleDelete = async () => {

    const slug = FavSlug;

    if (window.confirm('Você deseja remover este item dos Favoritos?')) {
      try {
        await removeFavorite({id: FavId, data: {slug}}).unwrap();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Link
        to={`/products/${favorite.slug}`}
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
        <p className="delete-fav fs-6" onClick={handleDelete}>
          {' '}
          Excluir dos Favoritos
        </p>
      </div>
    </>
  );
};
