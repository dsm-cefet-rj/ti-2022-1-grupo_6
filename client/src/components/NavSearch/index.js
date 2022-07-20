import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setProductName } from '../../redux/features/productNameSlice';

export const NavSearch = () => {
  const [searchProduct, setSearchProduct] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(setProductName(searchProduct));

    setSearchProduct('');
  };

  return (
    <form
      className="d-flex align-items-center my-2 my-lg-0"
      onSubmit={handleSubmit}
    >
      <input
        className="form-control search-input"
        type="search"
        placeholder="Busque aqui"
        aria-label="Search"
        onChange={(e) => setSearchProduct(e.target.value)}
        value={searchProduct}
      />
      <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">
        Search
      </button>
    </form>
  );
};
