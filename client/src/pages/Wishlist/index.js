import { useEffect, useState } from 'react';
import { Favorite } from '../../components/Favorite';
import { AiOutlineStar, AiOutlinePlusSquare, AiOutlineUser } from 'react-icons/ai';
import { useFetchAllWishlistsQuery, useCreateWishlistMutation, useDeleteWishlistMutation } from '../../redux/features/wishlistApiSlice';
import { selectAuth } from '../../redux/features/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setIsSignInModalOpen } from '../../redux/features/signInModalSlice';
import { SignInModal } from '../../components/SignInModal';

export const Wishlist = () => {
  const [favList, setFavList] = useState(0);
  const [inputList, setInputList] = useState(false);
  const [newFav, setNewFav] = useState('')

  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  
  const { data: wishlist = [], isFetching, refetch } = useFetchAllWishlistsQuery();
  const [createWishlist, { isLoading, isSuccess, isUninitialized }] = useCreateWishlistMutation();
  const [deleteWishlist] =useDeleteWishlistMutation();

  useEffect(() =>{
    setTimeout(() => {
      if(auth.isAuthenticated){
      refetch()
      }
    }, 2000)
  }, [auth.isAuthenticated])

  const handleLogIn = () => {
    dispatch(setIsSignInModalOpen(true))
  }

  if (!auth.isAuthenticated) {
    return (
      <>
        <div className="container mb-3 p-2">
        <h1 className="mb-3 p-2 mr" style={{ marginLeft: 25 }}>
          <AiOutlineStar style={{ color: 'limegreen' }} /> Favoritos
        </h1>
        <div className="fs-2 p-3 text-center">
          Você precisa de uma conta para acessar seus Favoritos
          <div>
            <button onClick={handleLogIn} className="btn btn-primary btn-lg m-3 fs-3"> <AiOutlineUser className="fs-2"/> Entrar </button>
          </div>
        </div>
        </div>
      </>
    );
  }

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

  return (
    <>
      <div className="container">
        <h1 className="mb-3 p-2 mr" style={{ marginLeft: 25 }}>
          <AiOutlineStar style={{ color: 'limegreen' }} /> Favoritos
        </h1>
        <div className="container" style={{position:"relative"}}>
        {!isFetching ?(
        <div>
          {wishlist.length !== 0 ? (<>
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
                <option key={lista._id} value={index}>
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
          </>) : (
          <>
            <div className="container mb-3 p-2">
            <div 
            className="fs-2 p-3 text-center">
              Você não possui nenhuma lista!
            </div>
          </div>
        </>) }
          
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
            
            {wishlist.length !== 0 ? (<div>
              <button className='btn btn-outline-danger ms-2' style={{position:"absolute", right:"10px"}} onClick={handleDelete}>
                Excluir Lista
              </button>
            </div>) : (<></>)
            }

              
        </div>
      </div>
    </>
  );
};
