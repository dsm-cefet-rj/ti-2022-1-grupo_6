import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSignInMutation } from '../../redux/features/userApiSlice';
import { SignUpModal } from '../SignUpModal';

export const SignInModal = ({ isSignInModalOpen, setIsSignInModalOpen }) => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const [signInMutation, { isFetching, isUninitialized }] = useSignInMutation();

  const handleSubmitSignIn = async (event) => {
    event.preventDefault();
    const data = await signInMutation(formData).unwrap();
    localStorage.setItem('TechBuy.token', data.token);
    setIsSignInModalOpen(false);
  };

  return (
    <>
      <Modal
        show={isSignInModalOpen}
        onHide={() => setIsSignInModalOpen(false)}
      >
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
        <Modal.Footer>
          Não possui conta?{' '}
          <Button variant="info" onClick={() => setIsSignUpModalOpen(true)}>
            Criar conta
          </Button>
        </Modal.Footer>
      </Modal>
      <SignUpModal
        isSignUpModalOpen={isSignUpModalOpen}
        setIsSignUpModalOpen={setIsSignUpModalOpen}
      />
    </>
  );
};
