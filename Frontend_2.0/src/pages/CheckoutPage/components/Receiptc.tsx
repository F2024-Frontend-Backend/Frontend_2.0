import { useCheckout } from "../../../hooks/useCheckout"
import { useOrderResponse } from "../../../hooks/useOrderResponse";
import React from "react";
import './Receiptc.css'



const Receiptc:React.FC = () => {
    const {billingInfo, paymentInfo}=useCheckout();
    const{orderResponse} = useOrderResponse();

    if (!orderResponse){
        return <div>Loading...</div>
    }

    return 
    <div className="receiptc">
        <h1>Receiptc</h1>
        <div>
            <h2>Billing Information</h2>
            <p>Name:{billingInfo.firstName} {billingInfo.lastName}</p>
            <p>Email: {billingInfo.email}</p>
            <p>Address: {billingInfo.address1}</p>
        </div>
        <div>
          <h2>Payment Information</h2>
           <p>Payment Method: {paymentInfo.paymentMethod}</p>
        </div>
        <div>
          <h2>Order Details</h2>
          <p>Order Number: {orderResponse.order_number}</p>
          <p>Order Total: {orderResponse.order_total}</p>
          {/* Display order items */}
          <ul>
            {orderResponse.order_items.map((item, index) => (
              <li key={index}>
                Product: {item.product}<br />
                Quantity: {item.quantity}
              </li>
             ))}
           </ul>
        </div>
    </div>
};

export default Receiptc