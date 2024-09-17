import { Link } from "react-router-dom";
import { IoBasketOutline } from "react-icons/io5";
import { RiHeart2Line } from "react-icons/ri";
import { useEffect, useState } from "react";

function NavBar() {
  const [cartItemCount, setCartItemCount] = useState(0);

  // Fetch cart items from localStorage and calculate total quantity
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Calculate total number of items in the cart
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setCartItemCount(totalItems);
  }, []);

  return (
    <header className="flex items-center justify-around p-4 border-b">
      <div className="flex items-center">
        <img src="/logo.jpg" alt="oyotee" className="w-12 h-12 rounded-full" />
        <h1 className="font-bold mx-4 text-xl">OYOTEE</h1>
      </div>
      <nav>
        <ul className="flex">
          <li className="mx-4 text-xl"><Link to="/">Shop</Link></li>
          <li className="mx-4 text-xl"><Link to="/">Plant Care</Link></li>
          <li className="mx-4 text-xl"><Link to="/">Workshops</Link></li>
          <li className="mx-4 text-xl"><Link to="/">Blogs</Link></li>
        </ul>
      </nav>
      <div className="flex items-center">
        <div className="relative">
        <Link to="/cart">
           <IoBasketOutline size="32px" className="mx-4" />
          <span className="absolute bottom-0 right-3 bg-rose-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold transform translate-x-1/2 -translate-y-1/2">
            {cartItemCount}
          </span>
        </Link>
         
        </div>
        <RiHeart2Line size="32px" className="mx-4" />
        <img src="/person.jpeg" alt="person" className="w-12 h-12 rounded-full mx-4" />
      </div>
    </header>
  );
}

export default NavBar;
