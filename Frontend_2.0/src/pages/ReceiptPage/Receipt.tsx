<<<<<<< HEAD:Frontend_2.0/src/pages/CheckoutPage/components/Receipt.tsx
// receipt bage . 
import React, { useEffect } from "react";
import { useOrderResponse } from "../../../hooks/useOrderResponse"; // to manage the order response 
=======
import React, { useEffect } from "react";
import { useOrderResponse } from "../../hooks/useOrderResponse"; // Corrected import path
>>>>>>> d5cc78eb49aaa3399549ee850ab7909c9c78d407:Frontend_2.0/src/pages/ReceiptPage/Receipt.tsx
import "./Receipt.css";
import { useCheckout } from "../../../hooks/useCheckout";


const Receipt: React.FC = () => {
<<<<<<< HEAD:Frontend_2.0/src/pages/CheckoutPage/components/Receipt.tsx
  const{billingInfo, paymentInfo}= useCheckout();
  const { orderResponse , setOrderResponse } = useOrderResponse();
//to simulate receiving data from the backend,replace this with actual data retrieval logic from your backend API
  useEffect(() => {
    const backendResponse: { // simulated backend response, oprette  i uEf
      order_details: {
        order_number: string;
        order_date: string;
        total_price: string;
        customer: {
          email: string;
          first_name: string;
          last_name: string;
          phone: string;
          billing_address: number;
          shipping_addresses: number[];
          allow_marketing: boolean;
        };
        payment_method: string;
        order_items: {
          product: {
            string_id: string;
            name: string;
            price: string;
            currency: string;
            rebateQuantity: number;
            rebatePercent: number;
            upsellProductID: null;
            image: string;
            inventory: number;
            category: number;
            count: number; 
          };
          quantity: number; //detaljerne for hvert produkt i en ordre
          rebate: string;
          sub_total: string;
        }[];
      };
    } = {
      order_details: {
        order_number: "123456",
        order_date: "15-05-2024",
        total_price: "300",
        customer: {
          email: "jhone@example.com",
          first_name: " Jhone",
          last_name: "Doe",
          phone: "23456789",
          billing_address: 17,
          shipping_addresses: [17],
          allow_marketing: true,
        },
        payment_method: "Creditcard",
        order_items: [
          {
            product: {
              string_id: "123",
              name: "Vitamin C",
              price: "200",
              currency: "",
              rebateQuantity: 3,
              rebatePercent: 10,
              upsellProductID: null,
              image:
                "https://images.matas.dk/Assets_v3/600001-700000/631001-632000/631601-631700/631666/product_v1_x2.jpg",
              inventory: 33,
              category: 1,
              count: 1, 
            },
            quantity: 0,
            rebate: "0.00",
            sub_total: "175.00",
          },
          
        ],
      },
=======
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
>>>>>>> d5cc78eb49aaa3399549ee850ab7909c9c78d407:Frontend_2.0/src/pages/ReceiptPage/Receipt.tsx
    };
//behandling af dataene  behandler:Efter simuleringen af backend-responsen foretages der behandling af dataene
    const mappedOrderResponse = {
      order_number: backendResponse.order_details.order_number,
      order_total: parseFloat(backendResponse.order_details.total_price),
      order_items: backendResponse.order_details.order_items.map((item) => ({
        product: {
          ...item.product,
          price: parseFloat(item.product.price), 
        },  
        quantity: item.quantity,
        rebate: parseFloat(item.rebate),
        sub_total: parseFloat(item.sub_total),
      })),
    };
    //Den behandlede data sendes derefter videre til konteksten ved hjælp af setOrderResponse-funktionen, der er leveret af  kontekst.
    setOrderResponse(mappedOrderResponse);//set the mapped order response using the setOrderResponse function provided by ouer context.

    //setOrderResponse(mappedOrderResponse);
  }, [setOrderResponse]);

  const handlePrint = () => {
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
            <p className="total">Total: {orderResponse.order_total}</p>
            <p className="shipping-cost">Shipping Cost: {orderResponse.order_shipping}</p>
            <p className="rebate">Rebate: {orderResponse.order_rebate}</p>
            <p className="discount">Discount: {orderResponse.order_discount}</p>
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
              <div>
                <h2>Billing Information</h2>
                <p>Name: {billingInfo.firstName} {billingInfo.lastName}</p>
                <p>Email: {billingInfo.email}</p>
                <p>Address: {billingInfo.address1}</p>
            </div>
            <div>
                <h2>Payment Information</h2>
                <p>Payment Method: {paymentInfo.paymentMethod}</p>
            </div>
            <div>
                <h2>Order Details</h2>
                <p>Order Number: {orderResponse?.order_number}</p>
                <p>Order Total: {orderResponse?.order_total}</p>
                </div>
          </div>
          <p>We're already hard at work preparing your items for shipment. You can expect your order to arrive at your doorstep within 3 days </p>
       
        </div>
      )}
    </div>
  );
};

export default Receipt;

