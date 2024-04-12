import { createContext } from "react";
import { CheckoutContextType } from '../types/types';

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export default CheckoutContext;