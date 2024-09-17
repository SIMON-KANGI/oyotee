import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, decreaseQuantity, increaseQuantity, clearCart } from "../features/CartSlice"; // Assuming you have these actions
import { useNavigate } from "react-router-dom"; // Assuming you have navigation

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartTotalAmount = useSelector((state) => state.cart.total);

  // Get cart items from localStorage
  const getCartItems = () => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  };

  useEffect(() => {
    getCartItems();
  }, []);

  // Remove item from cart
  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  // Decrease item quantity
  const handleDecrement = (itemId) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === itemId && item.cartQuantity > 1) {
        item.cartQuantity -= 1;
        dispatch(decreaseQuantity(itemId)); // Update Redux store
      }
      return item;
    });
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  // Increase item quantity
  const handleIncrement = (itemId) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === itemId) {
        item.cartQuantity += 1;
        dispatch(increaseQuantity(itemId)); // Update Redux store
      }
      return item;
    });
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  // Clear the cart
  const ClearCart = () => {
    dispatch(clearCart());
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  // Handle checkout
  const handleCheckOut = () => {
    // Add your checkout logic here
  };

  return (
    <>
      <div className='container mx-auto mt-8'>
        <h1 className='text-center text-3xl text-green-600 font-bold'>Cart</h1>

        {cartItems.length === 0 ? (
          <div className='text-center mt-8'>
            <div className='flex justify-center items-center'>
              <img
                src='https://cdn-icons-png.flaticon.com/512/3081/3081840.png'
                width='250px'
                className='text-center'
              />
            </div>
            <h2 className='text-5xl'>Your cart is empty</h2>
            <p>Proceed to shop to view some of our fresh from the farm products</p>
            <p>Happy shopping😊</p>
            <button
              onClick={() => navigate('/')}
              className='px-8 py-3 bg-green-600 mt-4 mb-4 rounded-md text-white font-bold'
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className='cartProducts items-center mx-auto text-center'>
            <div className='flex justify-between font-bold mb-2'>
              <div>Product</div>
              <div>Quantity</div>
              <div>Price</div>
              <div>Total</div>
            </div>

            {cartItems.map((item) => (
              <div
                className='flex items-center justify-between border-b py-2'
                key={item.id}
              >
                <div className='flex items-center'>
                  <img
                    src={item.image1}
                    alt={item.name}
                    className='w-16 h-16 mr-4'
                  />
                  <div className='block'>
                    <h1>{item.name}</h1>
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className='text-red-500'
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className='flex'>
                  <button
                    onClick={() => handleDecrement(item.id)}
                    className='border-2 rounded-md border-gray-300 px-3 py-3 text-2xl'
                  >
                    -
                  </button>
                  <div className='border-2 border-gray-300 px-3 py-3 text-2xl'>
                    {item.cartQuantity}
                  </div>
                  <button
                    onClick={() => handleIncrement(item.id)}
                    className='border-2 rounded-md border-gray-300 px-3 py-3 text-2xl'
                  >
                    +
                  </button>
                </div>

                <div>Ksh. {item.price}</div>
                {/* <div>Ksh. {item.price * item.cartQuantity}</div> */}
              </div>
            ))}

            <div className='flex justify-between font-bold mb-2'>
              <div className='text-2xl'>Subtotal</div>
              <div>Ksh.</div>
            </div>

            <button
              onClick={ClearCart}
              className='px-8 py-3 bg-red-700 text-white rounded-sm mx-3 font-bold'
            >
              Clear Cart
            </button>
            <button
              onClick={() => navigate('/')}
              className='px-8 py-3 mt-5 bg-green-600 text-white font-bold'
            >
              Continue Shopping
            </button>
            <button
              onClick={handleCheckOut}
              className='px-8 py-3 m-5 bg-black text-white font-bold'
            >
              CheckOut
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
