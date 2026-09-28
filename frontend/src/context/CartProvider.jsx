import { useState, useEffect } from "react";
import { CartContext } from "./CartContext";

const CartProvider = ({ children }) => {

    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item, restaurant) => {

        setCart((prev) => {

            if (
                prev.length > 0 &&
                prev[0].restaurantId !== restaurant._id
            ) {
                alert("You can order from only one restaurant at a time.");
                return prev;
            }

            const exists = prev.find(
                (i) =>
                    i._id === item._id &&
                    i.restaurantId === restaurant._id
            );

            if (exists) {

                return prev.map((i) =>
                    i._id === item._id &&
                    i.restaurantId === restaurant._id
                        ? {
                            ...i,
                            quantity: i.quantity + 1
                        }
                        : i
                );

            }

            return [
                ...prev,
                {
                    ...item,
                    restaurantId: restaurant._id,
                    restaurantName: restaurant.restaurantName,
                    quantity: 1
                }
            ];

        });

    };

    const removeFromCart = (itemId, restaurantId) => {

        setCart((prev) =>
            prev
                .map((item) =>
                    item._id === itemId &&
                    item.restaurantId === restaurantId
                        ? {
                            ...item,
                            quantity: item.quantity - 1
                        }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );

    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );

};

export default CartProvider;