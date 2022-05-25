import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Cart } from "./pages/Cart";
import { Feed } from "./pages/Feed";
import { Product } from "./pages/Product";
import { Wishlist} from "./pages/Wishlist"
import { AddProduct } from "./pages/AddProduct"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Feed/>}/>
        <Route path="/favorites" element={<Wishlist/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/addProduct" element={<AddProduct/>}/>
        <Route path="/product/:id" element={<Product/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
