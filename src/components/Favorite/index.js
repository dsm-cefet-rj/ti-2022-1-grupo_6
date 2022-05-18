import { useState } from 'react'
import { AiFillStar } from 'react-icons/ai'

import './style.css'

export const Favorite = ({ image, title, price, time, local }) =>{

    return(

      <div className="product-fav">
      <img src={image} alt="Imagem"/>
           <form className = "text-fav">
               <p className="title-fav">{title}</p>
               <p className="price-fav">{price}</p>
               <p className="date-fav">{time}, {local}</p>
           </form>
        <div className="star-fav">
          <AiFillStar size={28} color={"limegreen"}/>
        </div>
      </div>
    )
}

    