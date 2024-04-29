import React, { ReactNode, useState } from 'react';
import OrderResponseContext from './OrderResponseContext';
import { OrderResponse } from '../types/types';

export const OrderResponseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orderResponse, setOrderResponse] = useState<OrderResponse>({
    order_number: "",
    order_date: "",
    order_total: 0,
    order_items: [],
    order_comment: "",
  })

  return (
    <OrderResponseContext.Provider value={{ orderResponse, setOrderResponse }}>
      {children}
    </OrderResponseContext.Provider>
  );
};