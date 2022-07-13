import { useEffect, useState } from 'react';
import { Favorite } from '../../components/Favorite';
import { AiOutlineStar, AiOutlinePlusSquare } from 'react-icons/ai';
import { useFetchAllWishlistsQuery, useCreateWishlistMutation, useDeleteWishlistMutation } from '../../redux/features/wishlistApiSlice';

export const Wishlist = () => {
  const [favList, setFavList] = useState(0);
  const [inputList, setInputList] = useState(false);
  const [newFav, setNewFav] = useState('')

  const { data: wishlist = [], isFetching } = useFetchAllWishlistsQuery();
  const [createWishlist, { isLoading, isSuccess, isUninitialized }] = useCreateWishlistMutation();
  const [deleteWishlist] =useDeleteWishlistMutation();

  const handleChange = (event) => {
    setFavList(event.target.value);
  };

  const handleButton = async (e) =>{
    e.preventDefault();
    try {
      await createWishlist({listName:newFav, favorites: []}).unwrap();
    } catch (error) {
      console.log(error);
    }
  }


  const handleDelete = async () =>{
    var wishlistId = wishlist[favList]._id;

    if (window.confirm('Você deseja remover permanentemente esta lista?')) {
      try {
        await deleteWishlist(wishlistId).unwrap();

      } catch (error) {
        console.log(error);
      }
    }
  }

  const changeOnClick = () => setInputList(!inputList);

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

        
        <div className="container" style={{position:"relative"}}>
        {!isFetching ?(<div>
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
              {wishlist.map((lista, index) => (
                <option key={lista.id} value={index}>
                  {lista.listName}
                </option>
              ))}
            </select>
          </div>
          <ul className="list-group list-group-flush">
            {wishlist[favList].favorites.map((favorito) => (
              <li key={favorito.slug} className="list-group-item question">
                <Favorite FavSlug={favorito.slug} FavId={wishlist[favList]._id} />
              </li>  
            ))}
          </ul>
          </div>
          ):(<div>
          </div>)}

            <div style={{float:'left'}}>
              <div className='fs-4' onClick={changeOnClick} style={{cursor: 'pointer', display: 'inline-block'}}> <AiOutlinePlusSquare className='fs-3'/> Criar uma nova lista</div>
            {!inputList ? (
              <div></div>
            ) : (
      
              <div className='m-2'>
                { isUninitialized && ( <div>
                  <form>
                  <input
                  type="text"
                  value={newFav}
                  onChange ={(e) => setNewFav(e.target.value)}
                  placeholder="Nova Lista"
                  style={{float:'left'}}/>
                </form>

                <button type="button" className="btn btn-outline-secondary ms-2" onClick={handleButton}>Criar</button>
                </div>) }
                { isLoading && ( <div>
                  <form>
                  <input
                  type="text"
                  value={newFav}
                  placeholder="Nova Lista"
                  style={{float:'left'}}/>
                </form>

                <button type="button" className="btn btn-outline-secondary ms-2">
                  Criar
                </button>
                </div>) }
                {isSuccess &&(
                  <div className='fs-4'>
                    Lista Criada!
                  </div>
                )}
                
              </div>
              
            ) }
            </div>
            <div>
              <button className='btn btn-outline-danger ms-2' style={{position:"absolute", right:"10px"}} onClick={handleDelete}>
                Excluir Lista
              </button>
            </div>

              
        </div>
      </div>
    </>
  );
};
