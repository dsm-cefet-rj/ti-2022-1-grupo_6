import { Link } from 'react-router-dom'
import { AiFillStar } from 'react-icons/ai'


import { useFetchProductQuery } from '../../redux/features/productsApiSlice'

import './style.css'

export const Favorite = ({Fav}) =>{

  const { data, isFetching } = useFetchProductQuery(Fav);


  if(isFetching) {
    return(
      <div className="spinner-border text-primary m-auto" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    )
  }


  const [favorite] = data;

    return(

      
      <Link to={`/product/${favorite.slug}`} style={{textDecoration:"none", color:"#000000"}}>
      <div className="product-fav">
      <img src={favorite.imageUrl} alt="Imagem"/>
           <form className = "text-fav">
               <p className="title-fav">{favorite.title}</p>
               <p className="price-fav">{new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(favorite.price / 100)}</p>
               <p className="date-fav">{favorite.createdAt}, {favorite.state}</p>
           </form>
        <div className="star-fav">
          <AiFillStar size={28} color={"limegreen"}/>
        </div>
      </div>
      </Link>
    )
}

    