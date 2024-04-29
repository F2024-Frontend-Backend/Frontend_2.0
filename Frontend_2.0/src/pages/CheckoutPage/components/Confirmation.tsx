import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../../hooks/useCheckout";
import { SpinningCircles } from "react-loading-icons";
import { submitOrder } from "../../../api/axios";
import "../../BasketPage/BasketPage.css";
import { useOrderResponse } from "../../../hooks/useOrderResponse";
import { OrderResponse, BasketItem } from "../../../types/types";

const Confirmation: React.FC = () => {
  const { billingInfo, paymentInfo, purchaseTotal } = useCheckout();
  const navigate = useNavigate();
  const [isLoading, setloading] = useState(false);
  const { setOrderResponse } = useOrderResponse();

  
  const handleConfirmOrder = async () => {
    setloading(true);
      try{
        const response = await submitOrder(billingInfo, paymentInfo, purchaseTotal);
        console.log("Response data on submit:", response);
        const orderResponse: OrderResponse = {
          order_number: response.order_details.order_number,
          order_total: parseFloat(response.order_details.total_price),
          order_items: response.order_details.order_items.map((item: BasketItem) => ({
            product: item.product,
            quantity: item.quantity,
          })),
        };
        setOrderResponse(orderResponse);
        console.log("Order response:", orderResponse);
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
