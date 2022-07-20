import './style.css';
import { ProductCart } from '../../components/ProductCart';
import { useEffect, useState } from 'react';
import { SubTotalCart } from '../../components/SubTotalCart';
import { useSelector, useDispatch } from 'react-redux';
import { updateCart } from '../../redux/features/cartSlice';
import axios from 'axios';

export function Order() {
  const dispatch = useDispatch();
  const [ordersList, setOrdersList] = useState();

  useEffect(() => {
    getOrdersList()
  }, [])

  async function getOrdersList() {
    const token = localStorage.getItem('TechBuy.token');

    const cart = (await (axios.get(
      `${process.env.REACT_APP_BASE_URL}/cart`,
      { headers: { Authorization: `Bearer ${token}` } }
    ))).data

    dispatch(updateCart({ cart }));
  }

  return (
    (
      <div className="container">
        <div className="product line">
          <img
            src={"https://felipecurciopsw.s3.amazonaws.com/images/image-1656909040928-78rtx090.jpg"}
            alt="imagem do produto"
            className="product-image"
          />

          <div className="product-info">
            <span>teste</span>
            <strong>{100}</strong>
            <p>
              2022-04-04
            </p>

            <div className="quant">
              <p>Quant:</p>

              <select
                className="form-select bg-transparent"
                id="quant"
                onChange={(e) => { }}
                defaultValue={100}
                required
              >
                {Array.from({ length: 4 }, (el, i) => i + 1).map((element, idx) => (
                  <option
                    key={idx}
                  >
                    {element}
                  </option>
                ))}
              </select>
            </div>
           
          </div>
          <div>
              
            </div>
            <button onClick={() => {
              window.location.href = "https://api.whatsapp.com/send?phone=5521995709363&text=Ol%C3%A1%2C%20vi%20seu%20an%C3%BAncio%20na%20TechBuy%2C%20gostaria%20de%20oferecer%20uma%20proposta!"
            }}>
              Contatar vendedor
            </button>
        </div>
      </div>
    )
  )


}
