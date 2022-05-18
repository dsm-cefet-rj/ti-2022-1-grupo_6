import { useEffect, useState } from 'react'
import { Favorite } from '../Favorite'
import { AiOutlineStar } from 'react-icons/ai'


export const Wishlist = () =>{
    const [wishlist, setWishlist] = useState(null)

   /* setTimeout(() => {
        setWishlist({
            name:'jorge',
            title:'legal'
        })
    },200)*/

    useEffect(() => {
        // get data from MongoDB
        setTimeout(() => {
          setWishlist({
            name: 'Meus Favoritos',
            favorites: [
              {
                id: 1,
                image:"https://m.media-amazon.com/images/I/51vBfbUxcOL._AC_SX450_.jpg",
                title:"Ryzen 3 3200G",
                price: new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format('399.99'),
                time:"2022-05-18", //new Date ("2022-05-18")
                local:"Rio de Janeiro"
              },
              {
                id: 2,
                image:"https://m.media-amazon.com/images/I/81Y3Vs0N0jL._AC_SY450_.jpg",
                title:"Placa de Vídeo - GALAX",
                price: new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format('209.99'),
                time:"2012-12-12", //new Date ("2022-05-18")
                local:"Santos"
              }
            ]
          })
       }, 1000)
      }, [])
    
    if(!wishlist){
      return(
          <>
          </>
      )}else
      return(
        <>
        <div className="container">
        <h1 className='mb-3 p-2 mr' style={{marginLeft:25}}><AiOutlineStar style={{color:'limegreen'}}/> Favoritos</h1>

        <h2 style={{marginLeft:35}}>{wishlist.name}</h2>
        
        <div className='container'>
          <ul className="list-group list-group-flush">
            {wishlist.favorites.map((favorito) => (
              <li key={favorito.id} className="list-group-item question">
                <Favorite
                  image={favorito.image}
                  title={favorito.title}
                  price={favorito.price}
                  time={favorito.time}
                  local={favorito.local}
                  />
                </li>
            ))}
          </ul>
        </div>
          
      </div>
      </>
    )
}