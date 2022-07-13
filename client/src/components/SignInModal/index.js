import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  selectSignInModal,
  setIsSignInModalOpen,
} from '../../redux/features/signInModalSlice';
import { useSignInMutation } from '../../redux/features/userApiSlice';
import { SignUpModal } from '../SignUpModal';

export const SignInModal = () => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const { isSignInModalOpen } = useSelector(selectSignInModal);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const from = location.state?.from?.pathname || '/';

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
    dispatch(setIsSignInModalOpen(false));
    navigate(from, { replace: true });
  };

  return (
    <>
      <Modal
        show={isSignInModalOpen}
        onHide={() => dispatch(setIsSignInModalOpen(false))}
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmitSignIn} className="mx-auto">
            <div className="form-group my-4">
              <label>E-mail</label>
              <input
                type="text"
                className="form-control w-75"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Endereço de e-mail"
              />
            </div>

            <div className="form-group my-4">
              <label>Senha</label>
              <input
                type="password"
                className="form-control w-75"
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
