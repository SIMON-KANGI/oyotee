import { createSlice } from "@reduxjs/toolkit";


const saveCartToLocalStorage = (cartState) => {
    localStorage.setItem('cartItems', JSON.stringify(cartState.items));
    localStorage.setItem('cartTotal', cartState.total.toString());
};


const loadCartFromLocalStorage = () => {
    const savedItems = localStorage.getItem('cartItems');
    const savedTotal = localStorage.getItem('cartTotal');
    
    return {
        items: savedItems ? JSON.parse(savedItems) : [],
        total: savedTotal ? parseFloat(savedTotal) : 0
    };
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: loadCartFromLocalStorage(),
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingItem = state.items.find(item => item.id === product.id);

            if (existingItem) {
                existingItem.quantity += 1; // Increment the quantity if the product already exists
            } else {
                state.items.push({ ...product, quantity: 1 });
            }

            state.total += product.price;
            state.total = parseFloat(state.total); // Handle decimal prices

            saveCartToLocalStorage(state); // Save updated cart state to localStorage
        },

        removeFromCart: (state, action) => {
            const productId = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === productId);

            if (itemIndex >= 0) {
                const item = state.items[itemIndex];
                state.total -= item.price * item.quantity;
                state.total = parseFloat(state.total); // Handle decimal prices

                state.items.splice(itemIndex, 1); // Remove the item from the cart

                saveCartToLocalStorage(state); // Update localStorage
            }
        },
        increaseQuantity:(state,action)=>{
            const productId = action.payload;
            const existingItem = state.items.find(item => item.id === productId);

            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity += 1;
                state.total += existingItem.price;
                state.total = parseFloat(state.total.toFixed(2)); // Handle decimal prices

                saveCartToLocalStorage(state); // Update localStorage
            }
        },
        decreaseQuantity: (state, action) => {
            const productId = action.payload;
            const existingItem = state.items.find(item => item.id === productId);

            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1;
                state.total -= existingItem.price;
                state.total = parseFloat(state.total.toFixed(2)); // Handle decimal prices

                saveCartToLocalStorage(state); // Update localStorage
            }
        },

        clearCart: (state) => {
            state.items = [];
            state.total = 0;

            localStorage.removeItem('cartItems'); // Remove cart data from localStorage
            localStorage.removeItem('cartTotal');
        }
    }
});

export const { addToCart, removeFromCart, decreaseQuantity, clearCart, increaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
