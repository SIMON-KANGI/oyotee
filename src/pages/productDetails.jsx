import { useState } from 'react';
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from '@chakra-ui/react';
import { FaStar, FaEuroSign } from 'react-icons/fa';
import { RiHeart2Fill, RiHeart2Line } from 'react-icons/ri';
function ProductDetails({ product, isOpen, onClose, AddToCart }) {
  const [selectedImage, setSelectedImage] = useState(product.image1); // Set initial image as default

  // Function to handle image selection
  const handleImageClick = (image) => {
    if (selectedImage !== image) {
      setSelectedImage(image); // Only change state if a new image is clicked
    }
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerBody className="my-8">
          {/* Main Display Image */}
          <img src={selectedImage} alt={product.name} className="w-72 h-72 rounded-lg mx-auto" />

        
          <div className="p-4 flex justify-center">
            {[product.image1, product.image2, product.image3].map((image, index) => (
              <button key={index} onClick={() => handleImageClick(image)} className="mx-2">
                <img
                  src={image}
                  alt={`Thumbnail ${index}`}
                  className={`w-16 h-16 rounded-lg ${selectedImage === image ? 'border-2 border-blue-500' : 'opacity-70'}`}
                />
              </button>
            ))}
          </div>

        
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <h1>
            {product.details.slice(0, 150)}.... <span className="text-green-600 font-bold cursor-pointer">Read more</span>
          </h1>
            <div className='flex my-8'>
          <h1 className='mx-8 font-bold'>Details</h1>
          <h1 className='mx-8'>Ratings</h1>
          </div>
  <div className='flex items-center'>
  <button className='bg-red-100 rounded-lg p-3 m-4'>
    <RiHeart2Fill color="red" size="24px"/>
  </button>
      <button
            className="m-4 bg-green-700 flex items-center text-white px-8 py-3 rounded-lg"
            onClick={() => AddToCart(product)}
          >
            <h1 className="mx-2 font-semibold flex items-center">
              <FaEuroSign />
              {product.price}-
            </h1>
            Add to Cart
          </button>
  </div>
        
         
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default ProductDetails;
