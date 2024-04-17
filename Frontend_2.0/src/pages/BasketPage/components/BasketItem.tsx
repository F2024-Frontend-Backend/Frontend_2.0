import React from "react";

import { BasketItem as BasketItemType } from "../../../types/types";
import { useBasket } from "../../../hooks/useBasket";
import { updateBasketItemQuantity } from "../../../api/axios";

interface BasketItemProps {
    item: BasketItemType;
}

const BasketItem: React.FC<BasketItemProps> = ({ item }) => {
    const { updateItemInBasket, removeItemFromBasket } = useBasket();

    const handleIncreaseQuantity = () => {
        updateItemQuantity(item.quantity + 1);
    };

    const handleDecreaseQuantity = () => {
        if (item.quantity > 1) {
            updateItemQuantity(item.quantity - 1);
        }
    };

    const handleRemoveItem = () => {
        removeItemFromBasket(item);
    };

    const updateItemQuantity = async (newQuantity: number) => {
        try {
            const response = await updateBasketItemQuantity(item.product.string_id, newQuantity);
            console.log("Response data on update:", response);
        updateItemInBasket({ 
            ...item, 
            quantity: newQuantity, 
            sub_total: parseFloat(response.order_items.find((i: BasketItemType) => i.product.string_id === item.product.string_id).sub_total)
        });
        } catch (error) {
            console.error('Error updating item quantity:', error);
        }
    };


    return (
        <div className="basket-item">
            <img src={item.product.image || '/placeholder.png'} alt={item.product.name} />
            <div className="product-details">
                <h3>{item.product.name}</h3>
                <p>{item.product.price} {item.product.currency}</p>
                <div>
                    <button onClick={handleDecreaseQuantity}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={handleIncreaseQuantity}>+</button>
                </div>
                <button onClick={handleRemoveItem}>Remove</button>
            </div>
            <div className="subtotal">
                <p>Subtotal: {item.sub_total} {item.product.currency}</p>
            </div>
        </div>
    );
};

export default BasketItem;