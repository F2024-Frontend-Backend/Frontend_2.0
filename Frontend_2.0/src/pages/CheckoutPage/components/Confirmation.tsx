import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../../hooks/useCheckout";
import { SpinningCircles } from "react-loading-icons";
import { submitOrder } from "../../../api/axios";
import "../../BasketPage/BasketPage.css";

const Confirmation: React.FC = () => {
  const { billingInfo, paymentInfo } = useCheckout();
  const navigate = useNavigate();
  const [isLoading, setloading] = useState(false);

  
  const handleConfirmOrder = async () => {
    setloading(true);
      try{
        const response = await submitOrder();
        console.log("Response data on submit:", response);
        navigate('/receipt');
      } catch (error) {
        console.error('Error submitting order:', error);
        setloading(false);
      }
  };

  return (
    <div>
      {isLoading && (
        <div className="loading spinner">
          <strong>
            Loading...
            <SpinningCircles />
          </strong>
        </div>
      )}
      <h1>Order Confirmation</h1>
      <div>
        <h2>Billing Information</h2>
        <p>
          {billingInfo.firstName} {billingInfo.lastName}
        </p>
        <p>{billingInfo.email}</p>
        <p>{billingInfo.address1}</p>
      </div>
      <div>
        <h2>Payment Information</h2>
        <p>Payment Method: {paymentInfo.paymentMethod}</p>
      </div>
      <button onClick={handleConfirmOrder}>Confirm Order</button>
    </div>
  );
};

export default Confirmation;
