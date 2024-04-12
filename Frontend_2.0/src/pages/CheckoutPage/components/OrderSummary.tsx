import React from "react";
import { useCheckout } from "../../../hooks/useCheckout";

const OrderSummary: React.FC = () => {
    const { basket } = useCheckout();

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
            <p>Total: THE TOTALT WITH REBATE AND ALL THAT JAZZ</p>
        </div>
    );
};

export default OrderSummary;