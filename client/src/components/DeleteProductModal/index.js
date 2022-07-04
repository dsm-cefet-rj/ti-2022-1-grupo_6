import { Modal, Button } from 'react-bootstrap';

export const DeleteProductModal = ({
  handleDeleteProduct,
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  isLoading,
  isUninitialized,
  product,
}) => {
  return (
    <Modal show={isDeleteModalOpen} onHide={() => setIsDeleteModalOpen(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Deletar produto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Tem certeza que deseja deletar o produto:</h5>
        <p>{product.title}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
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
  );
};
