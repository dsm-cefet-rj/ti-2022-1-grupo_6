import { useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { ProductDetail } from '../../components/ProductDetail'
import { Question } from '../../components/Question'

import './style.css'

export const Product = () => {
  const [product, setProduct] = useState(null)

  useEffect(() => {
    // get data from MongoDB
    setTimeout(() => {
      setProduct({
        owner: 'Jhenny Doe',
        image: 'ryzen2.jpg',
        name: 'Ryzen 3 3200G',
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format('399'),
        local: 'Rio de Janeiro',
        amount: 320,
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
        consequatur commodi nihil, quaerat voluptatum obcaecati. Architecto
        consequuntur quisquam, labore inventore maiores sed nobis asperiores
        unde, mollitia a, distinctio cupiditate velit nemo natus. Rerum
        labore aliquam cum, quasi tenetur, quod reprehenderit quo culpa
        totam, voluptatum temporibus. Earum vero tenetur dolorem vitae.`,
        questions: [
          {
            id: 1,
            questionByUser: 'Felipe Nieto',
            question: 'Qual é o preço?',
            answer: 'O preço é 399,00 R$',
          },
          {
            id: 2,
            questionByUser: 'John Doe',
            question: 'Entrega no Rio de Janeiro?',
            answer: 'Entregamos sim, também é possivel retirar na loja',
          },
        ],
      })
    }, 1000)
  }, [])

  if (!product) {
    return (
      <>
        <Header />
        <div className="container p-5 h-150 vh-100">
          <div className="card border-0 mb-3">
            <div className="row g-4 center">
              <div className="col-md-4">
                <div className="w-100 h-100">
                  <span className="placeholder col-12 h-100"></span>
                </div>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h2 className="card-header placeholder-glow">
                    <span className="placeholder col-6"></span>
                  </h2>
                  <form className="mt-3">
                    <p className="card-text placeholder-glow">
                      <span className="placeholder col-2"></span>
                    </p>
                    <p className="card-text placeholder-glow">
                      <span className="placeholder col-3"></span>
                    </p>
                    <p className="card-text placeholder-glow">
                      <span className="placeholder col-3"></span>
                    </p>
                    <button className="btn btn-primary">Comprar</button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="description">
            <h3 className="placeholder-glow">
              <span className="placeholder col-3"></span>
            </h3>
            <p className="description-text placeholder-glow">
              <span className="placeholder col-8"></span>
              <span className="placeholder w-50"></span>
            </p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="border border-danger">
        <Header />
      </div>
      <div className="container p-5">
        <div className="border border-danger">
          <ProductDetail product={product} />
        </div>

        <div className="description">
          <h3>Descrição do produto</h3>
          <p className="description-text">{product.description}</p>
        </div>

        <div className="questions">
          <h3>Perguntas e Respostas</h3>

          <ul className="list-group list-group-flush">
            {product.questions.map((question) => (
              <li key={question.id} className="list-group-item question">
                <div className="border border-danger">
                  <Question
                    user={question.user}
                    question={question.question}
                    owner={product.owner}
                    answer={question.answer}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
