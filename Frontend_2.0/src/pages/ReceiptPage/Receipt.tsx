import React, { useEffect } from "react";
import { useOrderResponse } from "../../hooks/useOrderResponse"; // Corrected import path
import "./Receipt.css";


const Receipt: React.FC = () => {
    //const printIconUrl =
    //"https://www.thoughtco.com/thmb/ZMxDFGSTlhHnMixURvVe-NQQBhg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-512803768-590a58a05f9b586470463c04.jpg";

  // Using the useOrderResponse hook to access the orderResponse from the context
  const { orderResponse } = useOrderResponse();

  useEffect(() => { 
    console.log("Fetching order response....");
    console.log(orderResponse);
  });

  // function to handle printing
  const handlePrint = () => 
    {
      window.print(); 
    };
  return (
    <div className="receipt-container">
      <div className="receipt-header">
      <h1>Receipt</h1>
      <p>
        Thank you for choosing our Company for your shopping needs.
         We appreciate your trust in us and are committed
          to delivering an exceptional experience.
           </p>
        
          {/* Print button */}
          <button className="print-button" onClick={handlePrint}>
            <img
              src="https://www.thoughtco.com/thmb/ZMxDFGSTlhHnMixURvVe-NQQBhg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-512803768-590a58a05f9b586470463c04.jpg"
              alt="Print"
              className="print-icon"
           />
           Print
        </button>
      </div>
      {orderResponse && (
        <div className="receipt-details">
          <p>h</p>
          <div className="order-details">
          <h2 className="order-number">Order Number: {orderResponse.order_number}</h2>
          <p className="order-date">Dato: {orderResponse.order_date}</p>
          <p className="total">Total: {orderResponse.order_total}</p>
          </div>
          <div className="ordered-items">
          <h3>Ordered Items:</h3>
          <ul>
            {orderResponse.order_items.map((item, index) => (
              <li key={index} className="ordered-item">
                {item.product.name} - Quantity: {item.quantity} - Subtotal: {item.sub_total}
              </li>
            ))}
          </ul>
          </div>
          <p className="order-response-comment">Comment: {orderResponse.order_comment}</p>
          <p>We're already hard at work preparing your items for shipment. You can expect your order to arrive at your doorstep within 3 days </p>

        </div>
      )}
    </div>
  );
};

export default Receipt;

