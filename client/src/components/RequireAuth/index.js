import { Spinner, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectAuth } from '../../redux/features/authSlice';

export const RequireAuth = ({ children }) => {
  const auth = useSelector(selectAuth);
  const location = useLocation();

  if (auth.isUninitialized)
    return (
      <Container>
        <Spinner animation="border" variant="primary" />{' '}
      </Container>
    );

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
