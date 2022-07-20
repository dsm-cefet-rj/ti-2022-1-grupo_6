import './style.css';
import { ProductCart } from '../../components/ProductCart';
import { useEffect, useState } from 'react';
import { SubTotalCart } from '../../components/SubTotalCart';
import { useSelector, useDispatch } from 'react-redux';
import { updateCart } from '../../redux/features/cartSlice';
import axios from 'axios';

export function Cart() {
  const [totalPrice, setTotalPrice] = useState(0);
  const cart = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getDataFromCartDB() {
      const token = localStorage.getItem('TechBuy.token');

      const cart = (await (axios.get(
        `${process.env.REACT_APP_BASE_URL}/cart`,
        { headers: { Authorization: `Bearer ${token}` } }
      ))).data
      
      dispatch(updateCart({cart}));
    }

    getDataFromCartDB();
  }, [dispatch]);

  useEffect(() => {
    if (cart.length !== 0) {
      const sum = cart
        .map((product) => product.price * product.quantity)
        .reduce((total, current) => total + current, 0);
  
      setTotalPrice(sum);
    } else {
      setTotalPrice(0);
    }
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
                  key={product._id}
                  product={product}
                />
              );
            })
          ) : (
            <h3 className="mt-5">Carrinho vazio</h3>
          )}
        </section>
      </div>

      <SubTotalCart cart={cart} totalPrice={totalPrice} />
    </>
  );
}
