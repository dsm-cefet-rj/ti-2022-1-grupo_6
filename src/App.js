import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Cart } from './pages/Cart';
import { Feed } from './pages/Feed';
import { Product } from './pages/Product';
import { Wishlist } from './pages/Wishlist';
import { AddProduct } from './pages/AddProduct';
import { Header } from './components/Header';
import { UpdateProduct } from './pages/UpdateProduct';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/favorites" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/products/:slug" element={<Product />} />
        <Route path="/products/update/:slug" element={<UpdateProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
