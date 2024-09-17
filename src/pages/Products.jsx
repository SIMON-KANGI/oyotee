

import { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { Card, CardBody, Tooltip } from '@chakra-ui/react';
import { FaStar, FaEuroSign, FaEye } from 'react-icons/fa';
import { RiHeart2Fill, RiHeart2Line } from 'react-icons/ri';
import { useToast } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/CartSlice';
import ProductDetails from './productDetails';

function Products({ products }) {
  const dispatch = useDispatch();
  const toast = useToast();
  const [wishlist, setWishlist] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // Track selected product
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toggleWishlist = (product) => {
    if (wishlist.some(item => item.id === product.id)) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const AddToCart = (product) => {
    dispatch(addToCart(product));
    toast({
      position: 'top-right',
      title: 'Product added to cart!',
      description: product.name,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  // Handle the opening of the drawer with a specific product
  const viewProductDetails = (product) => {
    setSelectedProduct(product); // Set the selected product
    onOpen(); // Open the drawer
  };

  return (
    <div>
      <div className='lg:grid lg:grid-cols-4 flex-wrap flex gap-4'>
        {products.map((product) => (
          <Card key={product.id} margin="10px" width="fit-content">
            <CardBody className='shadow-sm rounded-lg'>
              <div className='relative'>
                <img src={product.image1} alt={product.name} className='w-60 h-72 mx-auto relative' />
                <Tooltip label="View product">
               <div className='top-3 absolute left-5'>
                 <FaEye size="24px" color="orange" onClick={() => viewProductDetails(product)} />
               </div>
                 </Tooltip>
                <Tooltip label="Add to wishlist">
                  <div className='top-3 absolute right-5'>
                    {wishlist.some(item => item.id === product.id)
                      ? <RiHeart2Fill color="red" size="24px" onClick={() => toggleWishlist(product)} />
                      : <RiHeart2Line color="red" size="24px" onClick={() => toggleWishlist(product)} />}
                  </div>
                </Tooltip>
              </div>

              <div>
                <h3 className='font-bold text-xl'>{product.name.slice(0,20)}</h3>
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
                    <span className='font-bold flex items-center'><FaEuroSign />{product.price}</span>
                  </p>
                  <button
                    className='font-bold px-6 py-2 mx-8 border border-gray-400 rounded-xl'
                    onClick={() => AddToCart(product)}
                  >
                    Add to Cart
                  </button>  
                </div>
                {/* View Product Button */}
               
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Drawer to show product details */}
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          isOpen={isOpen}
          onClose={onClose}
          AddToCart={AddToCart}
          Toast={toast}
        />
      )}
    </div>
  );
}

export default Products;
