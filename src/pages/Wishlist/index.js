import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Favorite } from '../../components/Favorite'
import { AiOutlineStar, AiOutlinePlusSquare } from 'react-icons/ai'
import { Header } from '../../components/Header'
import { AddFavorite } from '../../components/AddFavorite';


export const Wishlist = () =>{
    const [wishlist, setWishlist] = useState(null)
    const [favList, setFavList] = useState(0)

    const handleChange = (event) => {
      setFavList(event.target.value)
  }

    useEffect(() => {
        setTimeout(() => {
          setWishlist([{
            id:1,
            listName: 'Meus Favoritos',
            favorites: [
              {
                id: 1,
                image:'/ryzen2.jpg',
                name:"Ryzen 3 3200G",
                price: new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format('399.99'),
                dateTime:"2022-05-18", //new Date ("2022-05-18")
                local:"Rio de Janeiro"
              },
              {
                id: 2,
                image:"/placa-de-video.png",
                name:"Placa de Vídeo - GIGABYTE",
                price: new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format('209.99'),
                dateTime:"2012-12-12",
                local:"Santos"
              }
            ]
          },{
            id:2,
            listName: 'Periféricos',
            favorites: [
              {
                id: 1,
                image:'/headset.jpg',
                name:"Headset Genérico",
                price: new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format('199.99'),
                dateTime:"2021-04-05",
                local:"Maranhão"
              }
            ]
          }])
       }, 1000)
      }, [])
    
    if(!wishlist){
      return(
          <>
            <Header/>
          </>
      )}else
      return(
        <>
        <Header/>

        <div className="container">
        <h1 className='mb-3 p-2 mr' style={{marginLeft:25}}><AiOutlineStar style={{color:'limegreen'}}/> Favoritos</h1>

        <div className='container'>
          <div>
            <select className="form-select fs-5" onChange={handleChange} style={{maxWidth:'50%',minWidth:"25%" ,width:"200px", textAlign:"center"}} >
                {wishlist.map((lista)=> (
                    <option key={lista.id} value={lista.id-1}  >{lista.listName}</option>
                ))}
            </select>
          </div>
          <ul className="list-group list-group-flush">
            {wishlist[favList].favorites.map((favorito) => (
              <li key={favorito.id} className="list-group-item question">
                <Favorite
                  favorite = {favorito}
                  />
                </li>
            ))}
          </ul>

        </div>
          
      </div>
      </>
    )
}