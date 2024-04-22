import React, { useEffect, useState, ReactNode, useContext } from "react";
import { fetchBasket, updateBasket } from "../api/axios";
import { BasketItem, Product } from "../types/types";
import BasketContext from "./BasketContext";
import { SessionContext } from "../App";

interface APIBasketItem {
    product: Product;
    quantity: number;
    rebate?: string;
    sub_total: string;
}

export const BasketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [basket, setBasket] = useState<BasketItem[]>([]);
    const session = useContext(SessionContext);

    const updateItemInBasket = async (updatedItem: BasketItem) => {
        setBasket(currentBasket => {
            const existingItemIndex = currentBasket.findIndex(item => item.product.string_id === updatedItem.product.string_id);
            let newBasket;
            if (existingItemIndex !== -1) {
                newBasket = currentBasket.map(item => item.product.string_id === updatedItem.product.string_id ? updatedItem : item);
            } else {
                newBasket = [...currentBasket, updatedItem];
            }
            const newBasketForAPI = newBasket.map(item => ({ 
                string_id: 
                item.product.string_id, 
                quantity: item.quantity 
            }));
            updateBasket(newBasketForAPI);
            return newBasket;
        });
    };

    const removeItemFromBasket = async (itemToRemove: BasketItem) => {
        setBasket(currentBasket => {
            const newBasket = currentBasket.filter(item => item.product.string_id !== itemToRemove.product.string_id);
            const newBasketForAPI = newBasket.map(item => ({ string_id: item.product.string_id, quantity: item.quantity }));
            updateBasket(newBasketForAPI);
            return newBasket;
        });
    };

    //This useEffect should initialize the basket with the sessions basket from the api - if a session exists.
    useEffect(() => {
        if (!session) return;
        const initializeBasket = async () => {
            try {
                const response = await fetchBasket();
                console.log("Products received:", response);
                if (Array.isArray(response.basket_items)) {
                    const basketItems = response.basket_items.map((item: APIBasketItem) => ({
                        product: item.product,
                        quantity: item.quantity,
                        rebate: item.rebate ? parseFloat(item.rebate) : 0,
                        sub_total: parseFloat(item.sub_total)
                    }));
                    console.log("Basket items:", basketItems);
                    setBasket(basketItems);
                }
            } catch (error) {
                console.error("Error initializing basket:", error);
            }
        };
        initializeBasket();
    }, [session]);

    return (
        <BasketContext.Provider value={{
            basket,
            setBasket,
            updateItemInBasket,
            removeItemFromBasket
        }}>
            {children}
        </BasketContext.Provider>
    );
}