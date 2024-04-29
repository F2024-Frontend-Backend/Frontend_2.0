import { useContext } from "react";
import { OrderResponseContextType } from "../types/types";
import OrderResponseContext from "../context/OrderResponseContext";

export const useOrderResponse = (): OrderResponseContextType => {
    const context = useContext(OrderResponseContext);
    if (context === undefined) {
        throw new Error('useOrderResponse must be used within a OrderResponseProvider');
    }
    return context;
};