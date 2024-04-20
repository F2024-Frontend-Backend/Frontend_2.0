import { createContext } from "react";
import { BasketContextType } from '../types/types';

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export default BasketContext;