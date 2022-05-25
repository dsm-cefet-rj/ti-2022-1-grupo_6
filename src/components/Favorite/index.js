import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiFillStar } from 'react-icons/ai'

import './style.css'

export const Favorite = ({favorite}) =>{

    return(

      <Link to={`/product/${favorite.id}`} style={{textDecoration:"none", color:"#000000"}}>
      <div className="product-fav">
      <img src={favorite.image} alt="Imagem"/>
           <form className = "text-fav">
               <p className="title-fav">{favorite.name}</p>
               <p className="price-fav">{favorite.price}</p>
               <p className="date-fav">{favorite.dateTime}, {favorite.local}</p>
           </form>
        <div className="star-fav">
          <AiFillStar size={28} color={"limegreen"}/>
        </div>
      </div>
      </Link>
    )
}

    