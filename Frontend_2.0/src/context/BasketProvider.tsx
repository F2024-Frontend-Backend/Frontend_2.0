import React, { useEffect, useState, ReactNode} from "react";
import { fetchBasket } from "../api/axios";
import { BasketItem } from "../types/types";
import BasketContext from "./BasketContext";

export const BasketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [basket, setBasket] = useState<BasketItem[]>([]);

    const updateBasket = (updatedItem: BasketItem) => {
        setBasket(currentBasket => {
            const existingItemIndex = currentBasket.findIndex(item => item.product.string_id === updatedItem.product.string_id);
            if(existingItemIndex !== -1) {
                return currentBasket.map(item => item.product.string_id === updatedItem.product.string_id ? updatedItem : item);
            } else {
                return [...currentBasket, updatedItem];
            }
        });
    };

    const removeItemFromBasket = (itemToRemove: BasketItem) => {
        setBasket(currentBasket => currentBasket.filter(item => item.product.string_id !== itemToRemove.product.string_id));
    };

    //This useEffect should initialize the basket with the sessions basket from the api - if a session exists.
    useEffect(() => {
        const initializeBasket = async () => {
            try {
                const products = await fetchBasket();
                console.log("Products received:", products);
                if (Array.isArray(products)) {
                    const basketItems = products.map(product => ({
                        product: product,
                        quantity: 1,
                        subtotal: parseFloat(product.price)
                    }));
                    setBasket(basketItems);
                }
            } catch (error) {
                console.error("Error initializing basket:", error);
            }
        };
        initializeBasket();
    }, []);

    return (
        <BasketContext.Provider value={{ 
            basket, 
            setBasket, 
            updateBasket, 
            removeItemFromBasket 
            }}>
            {children}
        </BasketContext.Provider>
    );
}