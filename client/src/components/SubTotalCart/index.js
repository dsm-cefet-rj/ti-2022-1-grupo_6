import './style.css';
import axios from "axios";

export function SubTotalCart({ cart, totalPrice }) {
  const formatterBRL = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const submitFunction = () => {
    const body = {
      "items": [],
      "payer": {
        "email": "example@gmail.com" //quando login estiver implementado, teremos mais informações do usuário
      }
    }
    cart.forEach((product) => {
      body.items.push({
        title: product.title,
        quantity: product.quantity,
        currency_id: 'BRL',
        unit_price: parseFloat(product.price/100)
      })
    })

    console.log(body)
    
    try{
      axios.post("http://localhost:5000/checkout", body);
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
          Ir para o pagamento
        </button>
      </section>
    </div>
  );
}