import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './CartSlice'
const store=configureStore({
    reducer:{
        cart: cartReducer, // Import your cart slice here
        
    }
})

export default store