import React from "react";
import { useCheckout } from "../../../hooks/useCheckout";

const OrderSummary: React.FC = () => {
    const { basket, purchaseTotal } = useCheckout();

    return (
        <div>
            <h1>Order Summary</h1>
            <ul>
                {basket.map((item) => (
                    <li key={item.product.id}>
                        <span>{item.product.name}</span>
                        <span>{item.product.price}</span>
                    </li>
                ))}
            </ul>
            <p>Total: {purchaseTotal.total} DKK</p>
        </div>
    );
};

export default OrderSummary;