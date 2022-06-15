import './style.css';
import axios from "axios";

export function SubTotalCart({ cart, totalPrice }) {
  const formatterBRL = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const submitFunction = () => {
    const body = {
      "items": cart,
      "payer": {
        "email": "example@gmail.com" //quando login estiver implementado, teremos mais informações do usuário
      }
    }
    try{
      axios.post("http://localhost:3333/purchases", body);
    } catch(e) {
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
          Continuar a compra
        </button>
      </section>
    </div>
  );
}
