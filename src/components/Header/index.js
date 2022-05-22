import './style.css'
import { FaShoppingCart } from 'react-icons/fa'

export const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={`${window.location.origin}/logo.png`} alt="TechBuy" />
          </a>
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="../feed/index.html"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="../favorites/index.html">
                  Favoritos
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="../cart/index.html">
                  Carrinho <FaShoppingCart />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="../addproduct/index.html">
                  Anunciar
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
