import { Header } from '../../components/Header'
import { Carousel } from '../../components/Carousel'
import { ProductCard } from '../../components/ProductCard'

const data = {
    products: [
        {
            "title": 'Ryzen 3 3200G',
            'imageUrl': `${window.location.origin}/ryzen2.jpg`,
            'likes': 3,
            'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non esse illum ex totam incidunt ipsam',
            'price': 60000,
            'createdAt': '2022-05-18T12:12:50.686Z',
            'state': 'Rio de Janeiro'
        },
        {
            "title": 'Ryzen 3 3200G',
            'imageUrl': `${window.location.origin}/ryzen2.jpg`,
            'likes': 3,
            'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non esse illum ex totam incidunt ipsam',
            'price': 60000,
            'createdAt': '2022-05-18T12:12:50.686Z',
            'state': 'Rio de Janeiro'
        },
        {
            "title": 'Ryzen 3 3200G',
            'imageUrl': `${window.location.origin}/ryzen2.jpg`,
            'likes': 3,
            'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non esse illum ex totam incidunt ipsam',
            'price': 60000,
            'createdAt': '2022-05-18T12:12:50.686Z',
            'state': 'Rio de Janeiro'
        },
        {
            "title": 'Ryzen 3 3200G',
            'imageUrl': `${window.location.origin}/ryzen2.jpg`,
            'likes': 0,
            'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non esse illum ex totam incidunt ipsam',
            'price': 60000,
            'createdAt': '2022-05-18T12:12:50.686Z',
            'state': 'Rio de Janeiro'
        }
    ]
}

export const Feed = () => {
    return <>
        <Header />
        <Carousel />

        <div class="container my-5">
            <div class="row">
                {data.products.map((product) => {
                    return <ProductCard productData={product} />
                })}
            </div>
        </div>
    </>
}