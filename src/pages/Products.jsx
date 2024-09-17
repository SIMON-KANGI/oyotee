import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardBody, Tooltip } from '@chakra-ui/react';
import { FaStar,FaEuroSign } from 'react-icons/fa';
import { RiHeart2Fill, RiHeart2Line } from "react-icons/ri";
import { useToast } from '@chakra-ui/react';
import { addToCart } from '../features/CartSlice';
function Products({products}) {
  const dispatch=useDispatch()
  const [wishlist, setWishlist] = useState([]); // Track wishlist items
  const [cart, setCart] = useState([]); // Track cart items
  const toast=useToast()
  const toggleWishlist = (product) => {
    if (wishlist.includes(product)) {
      setWishlist(wishlist.filter(item => item !== product));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  
  const AddToCart=(product)=>{
    const res=dispatch(addToCart(product));
    if(res){
      toast({
        position: 'top-right',
        title: 'Product added to cart!',
        description: product.name,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <div>
      <div className='flex justify-end p-4'>
        <div className='relative'>
         
        </div>
      </div>
      <div className='lg:grid lg:grid-cols-4 flex-wrap flex gap-4'>
        {products.length > 0 && products.map(
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
                      <span className='font-bold flex items-center'><FaEuroSign/>{product.price}</span>
                    </p>
                    <button
                      className='font-bold px-6 py-2 mx-8 border border-gray-400 rounded-xl'
                      onClick={() => AddToCart(product)} 
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
