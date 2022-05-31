import { Carousel } from '../../components/Carousel';
import { ProductCard } from '../../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchProductsQuery } from '../../redux/features/productsApiSlice';
import { amountAdded } from '../../redux/features/counterSlice';

export const Feed = () => {
  const { data: products = [], isFetching } = useFetchProductsQuery();

  const counter = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(amountAdded(3));
    // localStorage.setItem('token.example', '123456789');
  }

  return (
    <>
      <Carousel />

      <div className="container my-5">
        <button onClick={handleClick} className="btn btn-danger">
          <p>Counter: {counter}</p>
        </button>
      </div>

      <div className="container my-5">
        <div className="row">
          {!isFetching ? (
            products.map((product) => {
              return <ProductCard key={product.id} productData={product} />;
            })
          ) : (
            <div className="spinner-border text-primary m-auto" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
