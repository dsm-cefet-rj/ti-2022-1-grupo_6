import {Component} from 'react';
import { useState } from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'




export const AddFavorite = ({product, wishlist}) =>{
    const [favIcon, setFavIcon] = useState(false)
    const [favList, setFavList] = useState("")

    const listaFavoritos = 
        [{id:1, listName: 'Meus Favoritos'},
        {id:2, listName: 'Peças'},
        {id:3, listName: 'Periféricos'}
        ]


    const handleChange = (event) => {
        setFavList(event.target.value)
        changeIcon()
    }

    const ShowStar = () =>{
        if(favIcon){
            return(
                <>
                    <p className="fs-5 fw-bold mb-0">
                        <AiFillStar className="fs-3" style={{color:"limegreen", cursor:"pointer"}}/>
                        Adicionado a '{listaFavoritos[listaFavoritos.findIndex((lista)=> lista.id==favList)].listName}'!
                    </p>
                </>
            )
        }else{
            return(
                <>
                    <p className="fs-5 fw-bold mb-0">
                        <AiOutlineStar className="fs-3" style={{color:"limegreen", cursor:"pointer"}}/>
                        Adicione aos Favoritos
                    </p>
                    <div>
                    <select className="form-select" onChange={handleChange} style={{maxWidth:'50%', width:"200px", textAlign:"center"}} >
                        <option defaultValue={""}>- - -</option>
                        {listaFavoritos.map((lista)=> (
                            <option key={lista.id} value={lista.id}  >{lista.listName}</option>
                        ))}
                    </select>
                    </div>
                </>
            )
        }
    }

    const changeIcon = () => setFavIcon(!favIcon)

    return(
        <>
            <div>
                <div>
                    <ShowStar/>
                </div>
            </div>
        </>
    )
    }