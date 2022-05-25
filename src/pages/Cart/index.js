import './style.css'
import { ProductCart } from "../../components/ProductCart";
import { useEffect, useState } from 'react';
import { SubTotalCart } from '../../components/SubTotalCart';

const data = {
    products: [
        {
            "title": 'Ryzen 3 3200G',
            'imageUrl': `${window.location.origin}/ryzen2.jpg`,
            'likes': 3,
            'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non esse illum ex totam incidunt ipsam',
            'price': 3500.00,
            'createdAt': '2022-05-18T12:12:50.686Z',
            'state': 'Rio de Janeiro'
        },
        {
            "title": 'Ryzen 3 3200G',
            'imageUrl': `${window.location.origin}/ryzen2.jpg`,
            'likes': 3,
            'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non esse illum ex totam incidunt ipsam',
            'price': 3500.00,
            'createdAt': '2022-05-18T12:12:50.686Z',
            'state': 'Rio de Janeiro'
        }
    ]
}

export function Cart() {
    var formatterBRL = new Intl.NumberFormat('pt-BR');
    const [totalPrice, setTotalPrice] = useState(0.00);

    useEffect(() => {
        let sum = data.products.map(
            product => product.price
        ).reduce((prev, next) => formatterBRL.format(prev + next));

        setTotalPrice(sum);
    }, [data]);

    return (
        <>
            <div class="container d-flex align-items-center justify-content-center">
                <section class="cart col d-flex align-items-center justify-content-start">
                    <div class="session-title line">
                        <img src={window.location.origin + "/Cart.svg"} alt="carrinho imagem"/>
                        <h1>Carrinho</h1>
                        <div class="bottom-line"></div>
                    </div>

                    {data.products.map((product, idx) => {
                        return <ProductCart key={idx} product={product}/>
                    })}
                </section>
            </div>

            <SubTotalCart totalPrice={totalPrice}/>
        </>
    ); 
}