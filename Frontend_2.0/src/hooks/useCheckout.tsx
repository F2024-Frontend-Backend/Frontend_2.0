import { useContext } from "react";
import { CheckoutContextType } from "../types/types";
import CheckoutContext from "../context/CheckoutContext";

export const useCheckout = (): CheckoutContextType => {
    const context = useContext(CheckoutContext);
    if (context === undefined) {
        throw new Error('useCheckout must be used within a CheckoutProvider');
    }
    return context;
};
