import { useParams } from 'react-router-dom';
import { ProductDetail } from '../../components/ProductDetail';
import { ProductDetailSkeleton } from '../../components/ProductDetailSkeleton';
import { PostQuestion } from '../../components/PostQuestion';
import { DeleteProductModal } from '../../components/DeleteProductModal';
import { Question } from '../../components/Question';
import {
  useDeleteProductMutation,
  useFetchProductQuery,
} from '../../redux/features/productsApiSlice';
import { Link, useNavigate } from 'react-router-dom';

import './style.module.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../redux/features/authSlice';

export const Product = () => {
  const { slug } = useParams();
  const { data: product, isLoading } = useFetchProductQuery(slug);
  const navigate = useNavigate();

  const auth = useSelector(selectAuth);

  const [
    deleteProduct,
    { isLoading: isLoadingDeleteProduct, isUninitialized },
  ] = useDeleteProductMutation();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  if (isLoading) return <ProductDetailSkeleton />;

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

        {auth.isAuthenticated && product.user === auth.user._id && (
          <>
            <Link className="btn btn-dark my-4" to={`/products/update/${slug}`}>
              Editar
            </Link>

            <button
              type="button"
              className="btn btn-outline-danger ms-3"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Deletar
            </button>
          </>
        )}

        <div className="d-flex justify-content-center align-items-center mb-4">
          <div className="dropdown-divider w-75"></div>
        </div>

        <div className="description">
          <h3>Descrição do produto</h3>
          <pre className="description-text">{product.description}</pre>
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

          <div className="d-flex justify-content-center align-items-center mb-4">
            <div className="dropdown-divider w-75"></div>
          </div>

          {auth.isAuthenticated && product.user !== auth.user._id && (
            <PostQuestion productId={product._id} />
          )}
        </div>
      </div>

      <DeleteProductModal
        handleDeleteProduct={handleDeleteProduct}
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        isLoading={isLoadingDeleteProduct}
        isUninitialized={isUninitialized}
        product={product}
      />
    </>
  );
};
