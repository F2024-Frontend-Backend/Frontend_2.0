import React from "react";

import { BasketItem as BasketItemType } from "../../../types/types";
import { useCheckout } from "../../../hooks/useCheckout";

interface BasketItemProps {
    item: BasketItemType;
}

const BasketItem: React.FC<BasketItemProps> = ({ item }) => {
    const { updateBasket, removeItemFromBasket } = useCheckout();

    const handleIncreaseQuantity = () => {
        const updatedItem = {
            ...item,
            quantity: item.quantity + 1,
            subtotal: (item.quantity + 1) * item.product.price
        };
        updateBasket(updatedItem);
    };

    const handleDecreaseQuantity = () => {
        if (item.quantity > 1) {
            const updatedItem = {
                ...item,
                quantity: item.quantity - 1,
                subtotal: (item.quantity - 1) * item.product.price
            };
            updateBasket(updatedItem);
        }
    };

    const handleRemoveItem = () => {
        removeItemFromBasket(item);
    };

    return (
        <div className="basket-item">
            <img src={item.product.imageUrl || '/placeholder.png'} alt={item.product.name} />
            <div className="product-details">
                <h3>{item.product.name}</h3>
                <p>${item.product.price}</p>
                <div>
                    <button onClick={handleDecreaseQuantity}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={handleIncreaseQuantity}>+</button>
                </div>
                <button onClick={handleRemoveItem}>Remove</button>
            </div>
            <div className="subtotal">
                <p>Subtotal: ${item.subtotal.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default BasketItem;