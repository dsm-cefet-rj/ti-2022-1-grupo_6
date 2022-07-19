import './style.css';
import axios from "axios";
import { selectAuth } from '../../redux/features/authSlice';
import { useSelector } from 'react-redux';

export function SubTotalCart({ cart, totalPrice }) {
  const auth = useSelector(selectAuth); 

  const formatterBRL = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const submitFunction = async () => {
    const token = localStorage.getItem('TechBuy.token');
     
    const user = auth.user

    console.log(cart)

    const body = {
      //totalPrice,
      totalPrice: totalPrice,
      buyer: user,
      productsList: [],
    }

    cart.forEach((product) => {
      body.productsList.push({
        id: product._id,
        quantity: product.quantity,
        currency_id: 'BRL',
        unit_price: parseFloat(product.price),
        title: product.title,
        description: 'teste'
      })
    })

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/order`, 
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      const url = response.data.url
      window.location.href = url
    } catch (e) {
      console.log(e);
    }
    console.log('purchase');
  }

  return (
    <div className="value-container d-flex align-items-center justify-content-center">
      <section className="total-value">
        <div className="value">
          <span>Total</span>
          <p>{formatterBRL.format(totalPrice / 100)}</p>
        </div>

        <button onClick={() => {
          submitFunction()
        }} className={`btn buy-button ${totalPrice ? '' : 'disabled'}`}>
          Ir para o pagamento
        </button>
      </section>
    </div>
  );
}
