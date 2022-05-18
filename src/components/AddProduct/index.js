import { useState } from 'react'
import {FaFileUpload} from 'react-icons/fa'

export function AddProduct() {
  const [inputs, setInputs] = useState("")

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
  }

  return(
    <>
    <div className = "container">
        <div className='p-4'>
            <h1 className="p-3"> Adicionar Item</h1>

            <form onSubmit={handleSubmit}>
                
            <div className="p-2">
                 <div className="m-2 ">
                    <input type = "file"
                    accept='image/*'
                    style={{ display: 'none' }}
                    id = "produtoimg"/>

                    <label htmlFor = "produtoimg">
                        <button className="btn btn-secondary btn-lg">
                            <FaFileUpload/> Subir Imagem
                        </button>
                    </label>
                </div>
            </div>

            <div className="p-2">
                 <div className="m-2">
                    <p className="fw-bold mb-0">Nome do Anúncio</p>
                    <input type = "text"
                    name = "anuncio"
                    placeholder="Meu Produto"
                    value = {inputs.anuncio || ""}
                    onChange = {handleChange}
                    className="form-control"
                    style={{height:50}}/>
                </div>
            </div>

            <div className="p-2">
                <div className="m-2">
                    <p className="fw-bold mb-0"> Preço do Produto</p>
                    <div className="input-group" style={{width:200}}>
                        <span className="input-group-text">R$</span>
                            <input type = "number"
                            name = "preco"
                            placeholder = "99"
                            value = {inputs.preco || ""}
                            prefix = {"R$"}
                            step = "any"
                            onChange = {handleChange}
                            className = "form-control w-25"/>
                        <span className="input-group-text">.00</span>
                    </div>
                </div>
            </div>

            <div className="p-2">
                <div className="m-2 w-25">
                    <p className="fw-bold mb-0">Quantidade Disponível</p>
                    <input type = "number"
                    name = "disponivel"
                    placeholder = "10"
                    value = {inputs.disponivel || ""}
                    onChange = {handleChange}
                    className ="form-control"
                    style={{width:200}}/>
                </div>
            </div>


            <div className="p-2">
                <div className="m-2">
                    <p className="fw-bold mb-0">Estado do Produto</p>
                        <select className="form-select" value = {inputs} onChange ={handleChange} style={{width:200}}>
                            <option value="novo">Novo</option>
                            <option value="usado">Usado</option>
                        </select>
                </div>
            </div>

            <div className="p-2">
                <div className="m-2">
                    <p className="fw-bold mb-0"> Descreva Seu Produto</p>
                        <textarea
                        name ="descricao"
                        placeholder = "Meu produto é..."
                        value = {inputs.descricao || ""}
                        onChange = {handleChange}
                        className ="form-control w-100"
                        style={{height:200}}/>
                </div>
            </div>

            <div className="d-grid gap-2">
                <input type = "submit" value="Enviar"  className="btn btn-primary fs-2"/>
            </div>

        
        </form>
      </div>
    </div>
      </>
  )

}