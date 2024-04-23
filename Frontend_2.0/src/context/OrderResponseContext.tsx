import { createContext } from "react";
import { OrderResponseContextType } from "../types/types";

const OrderResponseContext = createContext<OrderResponseContextType | undefined>(undefined);

export default OrderResponseContext;