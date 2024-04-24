import React from "react";
import { useOrderResponse } from "../../../../hooks/useOrderResponse"; // Corrected import path
import "./receipt.css";
const Receipt: React.FC = () => {
    //const printIconUrl =
    //"https://www.thoughtco.com/thmb/ZMxDFGSTlhHnMixURvVe-NQQBhg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-512803768-590a58a05f9b586470463c04.jpg";

  // Using the useOrderResponse hook to access the orderResponse from the context
  const { orderResponse } = useOrderResponse();

  return (
    <div>
      <h1>Receipt</h1>
      {/* Checking if orderResponse exists */}
      {orderResponse && (
        <div>
          <h2>Order Number: {orderResponse.order_number}</h2>
          <p>Total: {orderResponse.order_total}</p>
          <p>Shipping Cost: {orderResponse.order_shipping}</p>
          <p>Rebate: {orderResponse.order_rebate}</p>
          <p>Discount: {orderResponse.order_discount}</p>
          <h3>Ordered Items:</h3>
          {/* Mapping through order items and displaying details */}
          <ul>
            {orderResponse.order_items.map((item, index) => (
              <li key={index}>
                {item.product.name} - Quantity: {item.quantity} - Subtotal: {item.sub_total}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Receipt;

