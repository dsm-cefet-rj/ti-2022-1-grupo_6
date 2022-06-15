import { useParams } from 'react-router-dom';
import { ProductDetail } from '../../components/ProductDetail';
import { ProductDetailSkeleton } from '../../components/ProductDetailSkeleton';
import { Question } from '../../components/Question';
import {
  useDeleteProductMutation,
  useFetchProductQuery,
} from '../../redux/features/productsApiSlice';
import { Link, useNavigate } from 'react-router-dom';

import './style.css';
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export const Product = () => {
  const { slug } = useParams();
  const { data: product, isFetching } = useFetchProductQuery(slug);
  const navigate = useNavigate();

  const [deleteProduct, { isLoading, isUninitialized }] =
    useDeleteProductMutation();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  if (isFetching) return <ProductDetailSkeleton />;

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId).unwrap();
      navigate('/');
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container p-5">
        <ProductDetail product={product} />

        <Link className="btn btn-dark my-4" to={`/product/update/${slug}`}>
          Editar
        </Link>

        <button
          type="button"
          className="btn btn-outline-danger ms-3"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          Deletar
        </button>

        <div className="d-flex justify-content-center align-items-center mb-4">
          <div className="dropdown-divider w-75"></div>
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

      <Modal
        show={isDeleteModalOpen}
        onHide={() => setIsDeleteModalOpen(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Deletar produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Tem certeza que deseja deletar o produto:</h5>
          <p>{product.title}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDeleteProduct(product.id)}
          >
            {isUninitialized && 'Deletar'}
            {isLoading && (
              <>
                <span>Deletar</span>
                <div
                  className="spinner-border text-light ms-2"
                  id="spinner-adding-product"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
