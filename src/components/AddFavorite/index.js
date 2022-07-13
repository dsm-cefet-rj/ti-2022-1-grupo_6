import { useState } from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { useCreateFavoriteMutation, useFetchAllWishlistsQuery } from '../../redux/features/wishlistApiSlice';

export const AddFavorite = (product) => {
  const [selected, setSelected] = useState(null);

  const { slug } = useParams();

  const {data: listaFavoritos = [], isFetching} = useFetchAllWishlistsQuery();
  const [createFavorite] = useCreateFavoriteMutation();

  const handleChange = async(event) => {
    if (event.target.value === 'default') {
      setSelected(null);
      return;
    }
    setSelected(event.target.value);

    try {
      await createFavorite({id:event.target.value, data: {slug}}).unwrap();
    } catch (error) {
      console.log(error);
    }


  };
  
  return (
    <>
      <div className="d-flex align-items-center g-2">
        <h5 className="fw-bold m-0">
          {!selected ? `Adicione nos Favoritos` : `Adicionado em ${(listaFavoritos.find((item)=> item._id == selected)).listName}`}
        </h5>
        <div className="paddingLeft-2" style={{ transition: '2s' }}>
          {!selected ? (
            <AiOutlineStar className="fs-3 text-warning" />
          ) : (
            <AiFillStar className="fs-3 text-warning" />
          )}
        </div>
      </div>

      {!selected ? (
        <select className="form-select m-0 w-auto" onChange={handleChange}>
          <option value="default">Selecione uma seção</option>
          {listaFavoritos.map((item, index) => (
            <option
              key={item._id}
              value={item._id}
            >
              {item.listName}
            </option>
          ))}
        </select>
      ) : (
        <div className="placeholder" style={{ height: '2.4rem' }}></div>
      )}
    </>
  );
};
