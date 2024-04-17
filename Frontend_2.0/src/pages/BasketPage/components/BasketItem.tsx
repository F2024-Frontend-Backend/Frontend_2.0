import React from "react";

import './Basketitem.css'

import { BasketItem as BasketItemType } from "../../../types/types";
import { useCheckout } from "../../../hooks/useCheckout";

interface BasketItemProps {
    item: BasketItemType;
}

const BasketItem: React.FC<BasketItemProps> = ({ item }) => {
    const { updateBasket, removeItemFromBasket } = useCheckout();

    const calculatePricing = (quantity: number) => {
        let discountPerItem = 0;
        if (item.product.rebateQuantity && quantity >= item.product.rebateQuantity) {
            discountPerItem = item.product.price * (item.product.rebatePercent / 100);
        }
        const subtotal = quantity * (item.product.price - discountPerItem); 
        const rebate = discountPerItem * quantity; 
        return { rebate, subtotal };
    };

    const handleIncreaseQuantity = () => {
        const newQuantity = item.quantity + 1;
        const { rebate, subtotal } = calculatePricing(newQuantity);
        const updatedItem = {
            ...item,
            quantity: newQuantity,
            subtotal: subtotal,
            rebate: rebate
        };
        updateBasket(updatedItem);
    };

    const handleDecreaseQuantity = () => {
        const newQuantity = item.quantity - 1;
        const { rebate, subtotal } = calculatePricing(newQuantity);
        if (item.quantity > 1) {
            const updatedItem = {
                ...item,
                quantity: newQuantity,
                subtotal: subtotal,
                rebate: rebate
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
                <p>{item.product.price} {item.product.currency}</p>
                <div>
                    <button onClick={handleDecreaseQuantity}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={handleIncreaseQuantity}>+</button>
                </div>
                <button onClick={handleRemoveItem}>Remove</button>
            </div>
            <div className="subtotal">
                <p>Subtotal: {item.subtotal.toFixed(2)} {item.product.currency}</p>
            </div>
        </div>
    );
};

export default BasketItem;