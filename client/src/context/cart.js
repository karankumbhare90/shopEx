import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();
const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const existingItemInCart = localStorage.getItem('cart');

        if (existingItemInCart) setCart(JSON.parse(existingItemInCart));
    }, [])


    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };