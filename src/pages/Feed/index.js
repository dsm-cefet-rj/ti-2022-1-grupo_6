import { Carousel } from '../../components/Carousel';
import { ProductCard } from '../../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { incremented, amountAdded } from '../../redux/features/counterSlice';
import { useFetchProductsQuery } from '../../redux/features/productsApiSlice';
import { useState } from 'react';

const olddata = {
  products: [
    {
      id: 1,
      owner: 'Felipe',
      slug: 'ryzen-3-3200G-felipe',
      title: 'Ryzen 3 3200G',
      imageUrl: `${window.location.origin}/ryzen2.jpg`,
      likes: 3,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non esse illum ex totam incidunt ipsam',
      price: 60000,
      createdAt: '2022-05-18T12:12:50.686Z',
      state: 'Rio de Janeiro',
    },
    {
      id: 2,
      owner: 'Thiago',
      slug: 'ryzen-3-3200G-thiago',
      title: 'Ryzen 3 3200G',
      imageUrl: `${window.location.origin}/ryzen2.jpg`,
      likes: 3,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non esse illum ex totam incidunt ipsam',
      price: 60000,
      createdAt: '2022-05-18T12:12:50.686Z',
      state: 'Rio de Janeiro',
    },
    {
      id: 3,
      owner: 'Marcus',
      slug: 'ryzen-3-3200G-marcus',
      title: 'Ryzen 3 3200G',
      imageUrl: `${window.location.origin}/ryzen2.jpg`,
      likes: 3,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non esse illum ex totam incidunt ipsam',
      price: 60000,
      createdAt: '2022-05-18T12:12:50.686Z',
      state: 'Rio de Janeiro',
    },
    {
      id: 4,
      owner: 'Gabriel',
      slug: 'ryzen-3-3200G-gabriel',
      title: 'Ryzen 3 3200G',
      imageUrl: `${window.location.origin}/ryzen2.jpg`,
      likes: 0,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non esse illum ex totam incidunt ipsam',
      price: 60000,
      createdAt: '2022-05-18T12:12:50.686Z',
      state: 'Rio de Janeiro',
    },
  ],
};
// fazer um map e pegar as propriedades de um objeto produto state pra cima
// mais tarde a api no nodejs vai fazer um select com o mongoose pra pegar so as propriedades necessarias

export const Feed = () => {
  const counter = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const [numProducts, setNumProducts] = useState('4');

  const { data = [], isFetching } = useFetchProductsQuery(numProducts);

  function handleClick() {
    dispatch(amountAdded(3));
    // localStorage.setItem('token.example', '123456789');
  }

  return (
    <>
      <Carousel />

      <p onClick={handleClick}>Counter: {counter}</p>

      <div>
        <p>Products to fetch</p>
        <select
          value={numProducts}
          onChange={(e) => setNumProducts(e.target.value)}
        >
          <option value="2">2</option>
          <option value="4">4</option>
        </select>
      </div>

      <div>
        <p>products fetched: {data.length}</p>
      </div>

      <div className="container my-5">
        <div className="row">
          {olddata.products.map((product) => {
            return <ProductCard key={product.id} productData={product} />;
          })}
        </div>
      </div>
    </>
  );
};
