import { Modal, Button } from 'react-bootstrap';

export const SignInModal = ({
  isSignInModalOpen,
  setIsSignInModalOpen,
  isUninitialized,
  isLoading,
  handleSubmitSignIn,
  formData,
  handleChange,
}) => {
  return (
    <Modal show={isSignInModalOpen} onHide={() => setIsSignInModalOpen(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmitSignIn} className="mx-auto">
          <div className="form-group my-4">
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              className="form-control w-75"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Endereço de e-mail"
            />
          </div>

          <div className="form-group my-4">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              className="form-control w-75"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="secondary" onClick={() => setIsSignInModalOpen(false)}>
          Cancelar
        </Button>
        <Button variant="primary">
          {isUninitialized && 'Login'}
          {isLoading && (
            <>
              <span>Login</span>
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
      </Modal.Footer> */}
    </Modal>
  );
};
