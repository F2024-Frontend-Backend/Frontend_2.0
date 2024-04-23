import React from "react";
import { useCheckout } from "../../../hooks/useCheckout";
import { useBasket } from "../../../hooks/useBasket";

const OrderSummary: React.FC = () => {
    const { basket } = useBasket();
    const { purchaseTotal } = useCheckout();

    return (
        <div>
            <h1>Order Summary</h1>
            <ul style={{ listStyleType: "none" }}>
                {basket.map((item) => (
                    <li key={item.product.string_id}>
                        <img src={item.product.image} alt={item.product.name} width="50" height="50" />
                        <span>{item.product.name}</span>{" "}
                        <span>{item.product.price}</span>
                    </li>
                ))}
            </ul>
            <p>Total: {purchaseTotal.total} DKK</p>
        </div>
    );
};

export default OrderSummary;