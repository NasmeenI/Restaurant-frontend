import { useState, useEffect, createContext } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    // Cart
    const [cartItems, setCartItems] = useState([]);
    
    const addToCart = (item) => {
        setCartItems((prev) => {
            const existingItem = prev.find(cartItem => cartItem.id === item.id);
    
            if (existingItem) {
                // Increase quantity if item already exists
                return prev.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                // Add new item to cart with quantity 1
                return [...prev, { ...item, quantity: 1 }];
            }
        });
    };
    
    const removeFromCart = (item) => {
        setCartItems((prev) => {
            return prev.reduce((acc, cartItem) => {
                if (cartItem.id === item.id) {
                    if (cartItem.quantity > 1) {
                        acc.push({ ...cartItem, quantity: cartItem.quantity - 1 });
                    }
                } else {
                    acc.push(cartItem);
                }
                return acc;
            }, []);
        });
    };

    const getTotalCartAmount = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const contextValue = {
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;