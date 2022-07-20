import { useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { SignInModal } from '../SignInModal';
import {
  getUser,
  selectAuth,
  setIsUninitializedToFalse,
  signOut,
} from '../../redux/features/authSlice';
import { setIsSignInModalOpen } from '../../redux/features/signInModalSlice';
import { useDispatch, useSelector } from 'react-redux';

import './style.css';
import { NavSearch } from '../NavSearch';

export const Header = () => {
  const auth = useSelector(selectAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('TechBuy.token');
    if (token) dispatch(getUser(token));
    else dispatch(setIsUninitializedToFalse());
  }, []);

  const handleLogout = (event) => {
    localStorage.removeItem('TechBuy.token');
    dispatch(signOut());
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img src={`${window.location.origin}/logo.png`} alt="TechBuy" />
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <NavSearch />

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                  aria-current="page"
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                  to="/favorites"
                >
                  Favoritos
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                  to="/cart"
                >
                  Carrinho <FaShoppingCart />
                </NavLink>
              </li>
              {auth.isAuthenticated && (
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? 'nav-link active' : 'nav-link'
                    }
                    to="/addproduct"
                  >
                    Anunciar
                  </NavLink>
                </li>
              )}
              {auth.isAuthenticated && (
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? 'nav-link active' : 'nav-link'
                    }
                    to="/order"
                  >
                    Pedidos
                  </NavLink>
                </li>
              )}
              <li className="nav-item">
                {auth.isAuthenticated ? (
                  <button className="btn nav-link" onClick={handleLogout}>
                    Logout
                  </button>
                ) : (
                  <button
                    className="btn nav-link"
                    onClick={() => dispatch(setIsSignInModalOpen(true))}
                  >
                    Login
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <SignInModal />
    </header>
  );
};
