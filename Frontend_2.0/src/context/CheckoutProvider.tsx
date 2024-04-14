import React, { useEffect, useState, ReactNode } from "react";
import { fetchProducts } from "../api/fetchProducts";
import { BasketItem, BillingInfo, PaymentInfo, PurchaseTotal, } from '../types/types';
import CheckoutContext from './CheckoutContext';

export const CheckoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [basket, setBasket] = useState<BasketItem[]>([]);
    const [purchaseTotal, setPurchaseTotal] = useState<PurchaseTotal>({ 
        total: 0,
        shipping: 50,
    });

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
            const existingItemIndex = currentBasket.findIndex(item => item.product.id === updatedItem.product.id);
            if(existingItemIndex !== -1) {
                return currentBasket.map(item => item.product.id === updatedItem.product.id ? updatedItem : item);
            } else {
                return [...currentBasket, updatedItem];
            }
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

    useEffect(() => {
        const subtotal = basket.reduce((total, item) => total + item.subtotal, 0);
        const rebate = basket.reduce((total, item) => total + (item.rebate || 0), 0);
        const shipping = 50;
        let discount = 0;

        if (subtotal > 300) {
            discount = subtotal * 0.1;
          }
        
        const total = subtotal + shipping - discount - rebate;

        setPurchaseTotal({ total, shipping, rebate, discount });
      }, [basket]);
    


    return (
        <CheckoutContext.Provider value={{ 
            basket, 
            setBasket,
            updateBasket,
            purchaseTotal,
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