import React from "react";
import { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";

import './Basketitem.css'

import { BasketItem as BasketItemType } from "../../../types/types";
import { useBasket } from "../../../hooks/useBasket";
import { updateBasketItemQuantity } from "../../../api/axios";
import defaultProductImage from "../../../resources/defaultProductImage.png";

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
            rebate: response.basket_items.find((i: BasketItemType) => i.product.string_id === item.product.string_id).rebate,
            sub_total: parseFloat(response.basket_items.find((i: BasketItemType) => i.product.string_id === item.product.string_id).sub_total)
        });
        } catch (error) {
            console.error('Error updating item quantity:', error);
        }
    };


  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    if (item.quantity === item.product.rebateQuantity - 1) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [item.quantity]);
  return (
    <>
      <div className="basket-item">
        <img
          src={item.product.image}
          alt={item.product.name}
        />
        <div className="product-details">
          <h3>{item.product.name}</h3>
          <p>
            {item.product.price} {item.product.currency}
          </p>
          <div>
            <button onClick={handleDecreaseQuantity}>-</button>
            <span>{item.quantity}</span>
            <button onClick={handleIncreaseQuantity}>+</button>
          </div>
          <button onClick={handleRemoveItem}>Remove</button>
        </div>
        <div>
          {" "}
          {showAlert && (
            <Alert severity="info" onClose={() => setShowAlert(false)}>
              Buy 1 more and save {item.product.rebatePercent}%
            </Alert>
          )}
        </div>
        <div className="subtotal">
          <p>
            Subtotal: {item.sub_total.toFixed(2)} {item.product.currency}
          </p>
        </div>
      </div>
    </>
  );
};

export default BasketItem;
