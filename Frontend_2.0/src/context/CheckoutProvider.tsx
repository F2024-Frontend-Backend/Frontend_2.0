import React, { useEffect, useState, ReactNode } from "react";
import { BillingInfo, PaymentInfo, PurchaseTotal } from '../types/types';
import CheckoutContext from './CheckoutContext';
import { useBasket } from '../hooks/useBasket';

export const CheckoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { basket } = useBasket();
  const [purchaseTotal, setPurchaseTotal] = useState<PurchaseTotal>({
    total: 0,
    shipping: 50,
  });

  const [billingInfo, setBillingInfo] = useState<BillingInfo>({
    firstName: "",
    lastName: "",
    address1: "",
    address2: null,
    postalCode: "",
    city: "",
    phone: "",
    email: "",
    country: "Denmark",
    deliveryFirstName: null,
    deliveryLastName: null,
    deliveryAddress: null,
    deliveryPostalCode: null,
    deliveryCity: null,
    companyName: null,
    companyVat: null,
  });
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    paymentMethod: "",
    cardType: "",
    cardNo: "",
    cvv: "",
    cardExpDate: "",
    giftCardNumber: "",
    giftCardAmount: "",
    mobilePayNumber: "",
  });


  const handleSetBillingInfo = (info: BillingInfo): void => {
    setBillingInfo(info);
  };

  const handleSetPaymentInfo = (details: PaymentInfo) => {
    setPaymentInfo(details);
  };

  useEffect(() => {
    
    const subtotal = basket.reduce((total, item) => total + parseFloat(item.sub_total.toString()), 0);
    console.log("Subtotal:", subtotal);
    const rebate = basket.reduce((total, item) => total + (item.rebate || 0), 0);
    console.log("Rebate:", rebate);
    const shipping = 50;
    let discount = 0;

    if (subtotal > 300) {
      discount = subtotal * 0.1;
      console.log("Discount 'over 300' applied:", discount);
    }

    const total = subtotal + shipping - discount - rebate;

    setPurchaseTotal({ total, shipping, rebate, discount });
    console.log("Total:", total, "Shipping:", shipping, "Rebate:", rebate, "Discount:", discount);
  }, [basket]);



  return (
    <CheckoutContext.Provider value={{
      purchaseTotal,
      billingInfo,
      handleSetBillingInfo,
      paymentInfo,
      handleSetPaymentInfo
    }}>
      {children}
    </CheckoutContext.Provider>
  );

};
