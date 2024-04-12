import React, { useEffect, useState, ReactNode } from "react";
import { fetchProducts } from "../api/fetchProducts";
import { BasketItem, BillingInfo, PaymentInfo, } from '../types/types';
import CheckoutContext from './CheckoutContext';

export const CheckoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [basket, setBasket] = useState<BasketItem[]>([]);
    const [billingInfo, setBillingInfo] = useState<BillingInfo>({
        firstName: "",
        lastName: "",
        address1: "",
        postalCode: "",
        city: "",
        phone: "",
        email: "",
    });
    const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
        paymentMethod: "",
    });

    const updateBasket = (updatedItem: BasketItem) => {
        setBasket(currentBasket => {
            return currentBasket.map(item => item.product.id === updatedItem.product.id ? updatedItem : item);
        });
    };

    const removeItemFromBasket = (itemToRemove: BasketItem) => {
        setBasket(currentBasket => currentBasket.filter(item => item.product.id !== itemToRemove.product.id));
    };
    
    
    const handleSetBillingInfo = (info: BillingInfo) => {
        setBillingInfo(info);
    };

    const handleSetPaymentInfo = (details: PaymentInfo) => {
        setPaymentInfo(details);
    };

    useEffect(() => {
        const initializeBasket = async () => {
            const basketItems = await fetchProducts();
            setBasket(basketItems.slice(0, 3));
        };
    
        initializeBasket();
    }, [setBasket]);

    return (
        <CheckoutContext.Provider value={{ 
            basket, 
            setBasket,
            updateBasket,
            removeItemFromBasket, 
            billingInfo, 
            handleSetBillingInfo,
            paymentInfo, 
            handleSetPaymentInfo
        }}>
            {children}
        </CheckoutContext.Provider>
    );
    
};