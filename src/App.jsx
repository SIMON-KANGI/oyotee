import NavBar from "./components'/Navbar"
import Home from "./pages.jsx/Home"
import { Routes,Route } from "react-router-dom"
function App(){
  return(
    <>
<NavBar/>
<Routes>
  <Route path="/" element={<Home />} />
  
</Routes>
    </>
  )
}
export default App