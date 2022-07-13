import { useState } from 'react';
import { Button, Container, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { SignUpModal } from '../../components/SignUpModal';
import { selectAuth } from '../../redux/features/authSlice';
import { useSignInMutation } from '../../redux/features/userApiSlice';

import './style.css';

export const Login = () => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const auth = useSelector(selectAuth);

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
    navigate(from, { replace: true });
  };

  if (auth.isUninitialized)
    return (
      <Container>
        <Spinner animation="border" variant="primary" />{' '}
      </Container>
    );

  if (auth.isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <div id="loginForm">
      <form onSubmit={handleSubmitSignIn} className="mx-auto">
        <div className="form-group my-4">
          <label>E-mail</label>
          <input
            type="text"
            className="form-control"
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
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <hr />
        <div>
          Não possui conta?{' '}
          <Button variant="info" onClick={() => setIsSignUpModalOpen(true)}>
            Criar conta
          </Button>
        </div>
      </form>

      <SignUpModal
        isSignUpModalOpen={isSignUpModalOpen}
        setIsSignUpModalOpen={setIsSignUpModalOpen}
      />
    </div>
  );
};
