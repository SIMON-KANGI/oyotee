import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardBody, Tooltip } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import { RiHeart2Fill, RiHeart2Line } from "react-icons/ri";

function Products() {
  const [productList, setProductList] = useState([]);
  const [wishlist, setWishlist] = useState([]); // Track wishlist items
  const [cart, setCart] = useState([]); // Track cart items

  // Fetch products
  const fetchProducts = () => {
    axios.get('https://api.npoint.io/6ef2027c33bf364b1272')
      .then(response => {
        setProductList(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add/Remove items from the wishlist
  const toggleWishlist = (product) => {
    if (wishlist.includes(product)) {
      setWishlist(wishlist.filter(item => item !== product));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  // Add items to the cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div>
      <div className='flex justify-end p-4'>
        <div className='relative'>
          <div className='font-bold'>Cart Items: {cart.length}</div> {/* Display cart count */}
        </div>
      </div>
      <div className='grid grid-cols-4 gap-4'>
        {productList.length > 0 && productList.map(
          (product, index) => (
            <Card key={product.id} margin="10px" width="fit-content">
              <CardBody className='shadow-sm rounded-lg'>
                <div className='relative'>
                  <img src={product.image1} alt={product.name} className='w-60 h-72 mx-auto relative' />
                  <Tooltip label="Add to wishlist">
                    <div className='top-3 absolute right-5'>
                      {wishlist.includes(product) 
                        ? <RiHeart2Fill color="red" size="24px" onClick={() => toggleWishlist(product)} />
                        : <RiHeart2Line color="red" size="24px" onClick={() => toggleWishlist(product)} />}
                    </div>
                  </Tooltip>
                </div>

                <div>
                  <h3 className='font-bold text-xl'>{product.name}</h3>

                  {/* Rating section */}
                  <div className='flex items-center my-2'>
                    {Array.from({ length: 5 }, (_, index) => (
                      <span key={index} className='text-yellow-500'>
                        <FaStar />
                      </span>
                    ))}
                    ({product.ratings})
                  </div>

                  <div className='flex items-center justify-between'>
                    <p>
                      Price: <br />
                      <span className='font-bold'>${product.price}</span>
                    </p>
                    <button
                      className='font-bold px-6 mx-8 border border-gray-400 rounded-xl'
                      onClick={() => addToCart(product)} 
                    >
                      Add to Cart
                    </button>  
                  </div>
                </div>
              </CardBody>
            </Card>
          )
        )}
      </div>
    </div>
  );
}

export default Products;
