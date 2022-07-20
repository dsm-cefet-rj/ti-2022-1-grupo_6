import { useSelector } from 'react-redux';
import { Carousel } from '../../components/Carousel';
import { ProductCard } from '../../components/ProductCard';
import { selectProductName } from '../../redux/features/productNameSlice';
import { useFetchProductsQuery } from '../../redux/features/productsApiSlice';

export const Feed = () => {
  const { productName } = useSelector(selectProductName);

  const { data: products = [], isFetching } =
    useFetchProductsQuery(productName);

  return (
    <>
      <Carousel />

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
