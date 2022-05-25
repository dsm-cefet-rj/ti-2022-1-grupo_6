import { useState } from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

export const AddFavorite = ({ product, wishlist }) => {
  const [favorites, setFavorites] = useState([]);
  const [selected, setSelected] = useState(null);

  const listaFavoritos = [
    { id: 1, value: 'Hardware' },
    { id: 2, value: 'Periféricos' },
  ];

  const handleChange = (event) => {
    if (event.target.value === 'default') {
      setSelected(null);
      return;
    }

    setSelected(event.target.value);
  };

  return (
    <>
      <div className="d-flex align-items-center g-2">
        <h5 className="fw-bold m-0">
          {!selected ? 'Adicione nos Favoritos' : `Adicionado em ${selected}`}
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
          {listaFavoritos.map((item) => (
            <option
              key={item.id}
              value={item.value}
              selected={selected === item.value ? true : false}
            >
              {item.value}
            </option>
          ))}
        </select>
      ) : (
        <div className="placeholder" style={{ height: '2.4rem' }}></div>
      )}
    </>
  );
};
