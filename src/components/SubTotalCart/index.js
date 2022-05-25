import './style.css';

export function SubTotalCart({ totalPrice }) {
  const formatterBRL = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <div className="value-container d-flex align-items-center justify-content-center">
      <section className="total-value">
        <div className="value">
          <span>Total</span>
          <p>{formatterBRL.format(totalPrice / 100)}</p>
        </div>

        <button className={`btn buy-button ${totalPrice ? '' : 'disabled'}`}>
          Continuar a compra
        </button>
      </section>
    </div>
  );
}
