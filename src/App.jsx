import NavBar from "./components'/Navbar"
import Home from "./pages/Home"
import { Routes,Route } from "react-router-dom"
import Cart from "./pages/Cart"
import ProductDetails from "./pages/productDetails"
function App(){
  return(
    <>
<NavBar/>
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/cart" element={<Cart/>} />
  <Route path="/products/:name" element={<ProductDetails/>} />
</Routes>
    </>
  )
}
export default App