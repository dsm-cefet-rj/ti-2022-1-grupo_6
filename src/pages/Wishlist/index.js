import { useEffect, useState } from 'react';
import { Favorite } from '../../components/Favorite';
import { AiOutlineStar, AiOutlinePlusSquare } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { addWishlist } from '../../redux/features/favoriteSlice';

export const Wishlist = () => {
  const [favList, setFavList] = useState(0);
  const [inputList, setInputList] = useState(false);
  const [newFav, setNewFav] = useState('')

  const wishlist = useSelector((state) => state.favorite);
  const dispatch = useDispatch();


  const handleChange = (event) => {
    setFavList(event.target.value);
  };

  const handleButton = (e) =>{
    dispatch(addWishlist({id:wishlist.length+1, listName:newFav}))
  }

  const changeOnClick = () => setInputList(!inputList);

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
                <Favorite FavSlug={favorito.slug} FavIndex={favList} />
              </li>  
            ))}

          </ul>

            <div>
              <div className='fs-4' onClick={changeOnClick} style={{cursor: 'pointer', display: 'inline-block'}}> <AiOutlinePlusSquare className='fs-3'/> Criar uma nova lista</div>
            {!inputList ? (
              <div></div>
            ) : (
              <div className='m-2'>
                <form>
                  <input
                  type="text"
                  value={newFav}
                  onChange ={(e) => setNewFav(e.target.value)}
                  placeholder="Nova Lista"
                  style={{float:'left'}}/>
                </form>

                <button type="button" className="btn btn-outline-secondary ms-2" onClick={handleButton}>Criar</button>
              </div>
            ) }
            </div>

        </div>
      </div>
    </>
  );
};
