import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductDetail } from '../../components/ProductDetail';
import { ProductDetailSkeleton } from '../../components/ProductDetailSkeleton';
import { Question } from '../../components/Question';
import { useFetchProductQuery } from '../../redux/features/productsApiSlice';

import './style.css';

export const Product = () => {
  const { slug } = useParams();
  const { data, isFetching } = useFetchProductQuery(slug);

  if (isFetching) return <ProductDetailSkeleton />;

  const [product] = data;

  return (
    <>
      <div className="container p-5">
        <ProductDetail product={product}/>

        <div className="d-flex justify-content-center align-items-center mb-4">
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
