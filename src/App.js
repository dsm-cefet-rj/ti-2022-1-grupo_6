import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Cart } from './pages/Cart';
import { Feed } from './pages/Feed';
import { Product } from './pages/Product';
import { Wishlist } from './pages/Wishlist';
import { AddProduct } from './pages/AddProduct';
import { useState } from 'react';
import { Header } from './components/Header';

function App() {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('TechBuy.cart');

    if (storedCart) return JSON.parse(storedCart);

    return [];
  });

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/favorites" element={<Wishlist />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/product/:slug" element={<Product setCart={setCart} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
