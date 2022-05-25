import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductDetail } from '../../components/ProductDetail';
import { Question } from '../../components/Question';

import './style.css';

const questions = [
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
];

const data = {
  products: [
    {
      id: 1,
      owner: 'Felipe',
      local: 'Rio de Janeiro',
      slug: 'ryzen-3-3200G-felipe',
      title: 'Ryzen 3 3200G',
      imageUrl: `${window.location.origin}/ryzen2.jpg`,
      likes: 3,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non esse illum ex totam incidunt ipsam',
      price: 40000,
      createdAt: '2022-05-18T12:12:50.686Z',
      state: 'Rio de Janeiro',
      amount: 320,
      descriptionDetailed: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
      consequatur commodi nihil, quaerat voluptatum obcaecati. Architecto
      consequuntur quisquam, labore inventore maiores sed nobis asperiores
      unde, mollitia a, distinctio cupiditate velit nemo natus. Rerum
      labore aliquam cum, quasi tenetur, quod reprehenderit quo culpa
      totam, voluptatum temporibus. Earum vero tenetur dolorem vitae.`,
      questions,
    },
  ],
};

export const Product = ({ setCart }) => {
  const [product, setProduct] = useState(null);

  const { slug } = useParams();

  useEffect(() => {
    // get data from MongoDB
    setTimeout(() => {
      const productData = data.products.find(
        (product) => product.slug === slug
      );

      setProduct(productData);
    }, 1000);
  }, [slug]);

  if (!product) {
    return (
      <>
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
                  <h2 className="card-header placeholder-glow h-100">
                    {/* <span className="placeholder col-6"></span> */}
                    <div
                      className="spinner-border text-secondary"
                      style={{ borderWidth: '0.2rem' }}
                      role="status"
                    ></div>
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
                    <button className="btn btn-primary disabled placeholder col-2 d-block mb-3"></button>
                    <button className="btn btn-outline-primary disabled placeholder col-3"></button>
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
    );
  }

  return (
    <>
      <div className="container p-5">
        <ProductDetail product={product} setCart={setCart} />

        <div class="d-flex justify-content-center align-items-center mb-4">
          <div className="dropdown-divider w-75"></div>
        </div>

        <div className="description">
          <h3>Descrição do produto</h3>
          <p className="description-text">{product.descriptionDetailed}</p>
        </div>

        <div className="questions">
          <h3>Perguntas e Respostas</h3>

          <ul className="list-group list-group-flush">
            {product.questions.map((question) => (
              <li key={question.id} className="list-group-item question">
                <Question
                  user={question.user}
                  question={question.question}
                  owner={product.owner}
                  answer={question.answer}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
