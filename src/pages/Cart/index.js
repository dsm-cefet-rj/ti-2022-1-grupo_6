import './style.css';
import { ProductCart } from '../../components/ProductCart';
import { useEffect, useState } from 'react';
import { SubTotalCart } from '../../components/SubTotalCart';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../redux/features/cartSlice';

export function Cart() {
  const [totalPrice, setTotalPrice] = useState(0);
  
  const cart = useSelector((state) => state.cart.products);
  const setCart = useDispatch();

  useEffect(() => {
    console.log(cart.length);
    // if (cart.length !== 0) {
    //   const sum = cart
    //     .map((product) => product.price * product.quantity)
    //     .reduce((total, current) => total + current, 0);
  
    //   setTotalPrice(sum);
    // }
  }, [cart]);

  return (
    <>
      <div className="container d-flex align-items-center justify-content-center">
        <section className="cart col d-flex align-items-center justify-content-start">
          <div className="session-title line">
            <img
              src={window.location.origin + '/Cart.svg'}
              alt="carrinho imagem"
            />
            <h1>Carrinho</h1>
            <div className="bottom-line"></div>
          </div>

          {cart.length ? (
            cart.map((product) => {
              return (
                <ProductCart
                  key={product.id}
                  product={product}
                  setCart={setCart(addProduct())}
                />
              );
            })
          ) : (
            <h3 className="mt-5">Carrinho vazio</h3>
          )}
        </section>
      </div>

      <SubTotalCart totalPrice={totalPrice} />
    </>
  );
}
