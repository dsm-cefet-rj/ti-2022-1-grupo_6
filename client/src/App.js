import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Cart } from './pages/Cart';
import { Feed } from './pages/Feed';
import { Product } from './pages/Product';
import { Wishlist } from './pages/Wishlist';
import { AddProduct } from './pages/AddProduct';
import { Header } from './components/Header';
import { UpdateProduct } from './pages/UpdateProduct';
import { RequireAuth } from './components/RequireAuth';
import { Login } from './pages/Login';
import { Order } from './pages/Orders'
import NotFound from './pages/404';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/favorites" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/addProduct"
          element={
            <RequireAuth>
              <AddProduct />
            </RequireAuth>
          }
        />
        <Route
          path="/order"
          element={
            <RequireAuth>
              <Order />
            </RequireAuth>
          }
        />
        <Route path="/products/:slug" element={<Product />} />
        <Route path="/products/update/:slug" element={<UpdateProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
