import { useEffect, useState } from 'react';
import { Favorite } from '../../components/Favorite';
import { AiOutlineStar, AiOutlinePlusSquare } from 'react-icons/ai';
import { useSelector } from 'react-redux';

export const Wishlist = () => {
  const [favProduct, setFavProduct] = useState(null);
  const [favList, setFavList] = useState(0);

  const wishlist = useSelector((state) => state.favorite);

  const handleChange = (event) => {
    setFavList(event.target.value);
  };

  /*useEffect(() => {
    setTimeout(() => {

    }, 1000);
  }, []);*/

  if (!wishlist) {
    return (
      <>
        <div className="container mb-3 p-2">
          <h1>
            Favoritos{' '}
            <div
              className="spinner-border text-secondary"
              style={{ borderWidth: '0.2rem' }}
              role="status"
            ></div>
          </h1>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="container">
        <h1 className="mb-3 p-2 mr" style={{ marginLeft: 25 }}>
          <AiOutlineStar style={{ color: 'limegreen' }} /> Favoritos
        </h1>

        <div className="container">
          <div>
            <select
              className="form-select fs-5"
              onChange={handleChange}
              style={{
                maxWidth: '50%',
                minWidth: '25%',
                width: '200px',
                textAlign: 'center',
              }}
            >
              {wishlist.map((lista) => (
                <option key={lista.id} value={lista.id - 1}>
                  {lista.listName}
                </option>
              ))}
            </select>
          </div>
          <ul className="list-group list-group-flush">
            {wishlist[favList].favorites.map((favorito) => (
              <li key={favorito.slug} className="list-group-item question">
                <Favorite Fav={favorito.slug} />
              </li>  
            ))}

          </ul>
        </div>
      </div>
    </>
  );
};
