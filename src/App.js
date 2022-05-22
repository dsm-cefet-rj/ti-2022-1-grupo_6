import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Feed } from "./pages/Feed";
import { Product } from "./pages/Product";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Feed/>}/>
        <Route path="/favorites" element={<Feed/>}/>
        <Route path="/cart" element={<Feed/>}/>
        <Route path="/addProduct" element={<Feed/>}/>
        <Route path="/product/:id" element={<Product/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
