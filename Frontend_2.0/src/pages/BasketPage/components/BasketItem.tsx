import React from "react";
import { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import "./Basketitem.css";
import { BasketItem as BasketItemType } from "../../../types/types";
import { useBasket } from "../../../hooks/useBasket";
import { updateBasketItemQuantity } from "../../../api/axios";
import defaultImage from '../../../resources/defaultProductImage.png';

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
      const response = await updateBasketItemQuantity(
        item.product.string_id,
        newQuantity
      );
      console.log("Response data on update:", response);
      updateItemInBasket({
        ...item,
        quantity: newQuantity,
        rebate: parseFloat(
          response.basket_items.find(
            (i: BasketItemType) =>
              i.product.string_id === item.product.string_id
          ).rebate
        ),
        sub_total: parseFloat(
          response.basket_items.find(
            (i: BasketItemType) =>
              i.product.string_id === item.product.string_id
          ).sub_total
        ),
      });
    } catch (error) {
      console.error("Error updating item quantity:", error);
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
      <div className="basket-item-container">
        <img
          className="product-image-item"
          src={item.product.image}
          alt={item.product.name}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = defaultImage;
        }}
        />
        <div className="basket-item">
          <h3>{item.product.name}</h3>
          <p>
            {item.product.price} {item.product.currency}
          </p>
        </div>
        <div className="controls-container">
          <div className="quantity-controls">
            <button onClick={handleDecreaseQuantity}>-</button>
            <span className="item-quantity">{item.quantity}</span>
            <button onClick={handleIncreaseQuantity}>+</button>
          </div>
          <button className="remove-button" onClick={handleRemoveItem}>
            Remove
          </button>
        </div>
        <div className="subtotal">
          <p>
            Subtotal: {item.sub_total.toFixed(2)} {item.product.currency}
          </p>
        </div>
      </div>

      <div>
        {" "}
        {showAlert && (
          <Alert
            severity="info"
            className="custum-alert"
            onClose={() => setShowAlert(false)}
          >
            Buy 1 more and save {item.product.rebatePercent}%
          </Alert>
        )}
      </div>
    </>
  );
};

export default BasketItem;
