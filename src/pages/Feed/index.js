import { Carousel } from '../../components/Carousel';
import { ProductCard } from '../../components/ProductCard';

const data = {
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

export const Feed = () => {
  return (
    <>
      <Carousel />

      <div className="container my-5">
        <div className="row">
          {data.products.map((product) => {
            return <ProductCard key={product.id} productData={product} />;
          })}
        </div>
      </div>
    </>
  );
};
