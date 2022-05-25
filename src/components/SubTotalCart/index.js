import "./style.css";

export function SubTotalCart({totalPrice}) {
    return (
        <div class="value-container d-flex align-items-center justify-content-center">
            <section class="total-value">
                <div class="value">
                    <span>Total</span>
                    <p>R$ {totalPrice}</p>
                </div>
        
                <button class="buy-button">Continuar a compra</button>
            </section>
        </div>
    );
}