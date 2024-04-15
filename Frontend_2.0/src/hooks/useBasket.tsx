import { useContext } from "react";
import { BasketContextType } from "../types/types";
import BasketContext from "../context/BasketContext";

export const useCheckout = (): BasketContextType => {
    const context = useContext(BasketContext);
    if (context === undefined) {
        throw new Error('useBasket must be used within a BasketProvider');
    }
    return context;
};
