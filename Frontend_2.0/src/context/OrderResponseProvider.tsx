import React, { ReactNode, useState } from 'react';
import OrderResponseContext from './OrderResponseContext';

export const OrderResponseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orderResponse, setOrderResponse] = useState(null);

  return (
    <OrderResponseContext.Provider value={{ orderResponse, setOrderResponse }}>
      {children}
    </OrderResponseContext.Provider>
  );
};