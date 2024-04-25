import React from "react";
import { useCheckout } from "../../../hooks/useCheckout";
import { useBasket } from "../../../hooks/useBasket";
import "./OrderSummary.css";

const OrderSummary: React.FC = () => {
    const { basket } = useBasket();
    const { purchaseTotal } = useCheckout();

    return (
        <div className="order-summary">
            <h2>Order Summary</h2>
            <ul style={{ listStyleType: "none" }}>
                {basket.map((item) => (
                    <li key={item.product.string_id}>
                        <img src={item.product.image} alt={item.product.name} width="50" height="50" />
                        <span>{item.product.name}</span>{" "}
                        <span>{item.product.price} {item.product.currency}</span>
                    </li>
                ))}
            </ul>
            <span className="sub-total-summary">Total discount: -{(purchaseTotal.discount || 0) + (purchaseTotal.rebate || 0)} DKK</span>
            <span className="shipping-summary">Shipping: {purchaseTotal.shipping} DKK</span>
            <p>Total: {purchaseTotal.total} DKK</p>
        </div>
    );
};

export default OrderSummary;