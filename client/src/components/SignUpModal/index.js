import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useSignUpMutation } from '../../redux/features/userApiSlice';

export const SignUpModal = ({ isSignUpModalOpen, setIsSignUpModalOpen }) => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    address: '',
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const [signUpMutation, { isFetching, isUninitialized }] = useSignUpMutation();

  const handleSubmitSignUp = async (event) => {
    event.preventDefault();
    await signUpMutation(formData).unwrap();
    setIsSignUpModalOpen(false);
  };

  return (
    <>
      <Modal
        show={isSignUpModalOpen}
        onHide={() => setIsSignUpModalOpen(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Criar conta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmitSignUp} className="mx-auto">
            <div className="form-group my-4">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                className="form-control w-75"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nome"
              />
            </div>

            <div className="form-group my-4">
              <label htmlFor="username">Nome de usuário</label>
              <input
                type="text"
                className="form-control w-75"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
              />
            </div>

            <div className="form-group my-4">
              <label htmlFor="address">Endereço</label>
              <input
                type="text"
                className="form-control w-75"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Endereço"
              />
            </div>

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
              Cadastrar
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
