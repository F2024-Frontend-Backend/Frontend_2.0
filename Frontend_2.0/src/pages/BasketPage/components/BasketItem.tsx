import React from "react";
import { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import "./Basketitem.css";
import { BasketItem as BasketItemType } from "../../../types/types";
import { useBasket } from "../../../hooks/useBasket";
import { updateBasketItemQuantity } from "../../../api/axios";
import Rebate from "./utils/Rebate";
import { CounterButton } from "./utils/CounterButton";

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
  const { updateItemInBasket, removeItemFromBasket } = useBasket();

  const handleRemoveItem = () => {
    removeItemFromBasket(item);
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
  const updateItemQuantity = async (newQuantity: number) => {
    try {
      const response = await updateBasketItemQuantity(item.product.string_id, newQuantity);
      console.log("Response data on update:", response);
      updateItemInBasket({
        ...item,
        quantity: newQuantity,
        rebate: parseFloat(response.basket_items.find((i: BasketItemType) => i.product.string_id === item.product.string_id).rebate),
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
      <div className="basket-item-container">
        <div className="image-container">
          <img
            className="basket-item-image"
            src={item.product.image}
            alt={item.product.name}
          />
        </div>
        <div className="item-details">
          <div className="top-section">
            <span className="item-name">{item.product.name}</span>
            <span className="item-price">{item.product.price} {item.product.currency}</span>
          </div>
          <div className="bottom-section">
            <div className="left-container">
              <Rebate rebatePercent={item.product.rebatePercent} rebateQuantity={item.product.rebateQuantity} count={item.quantity} />
            </div>
            <div className="right-container">
              <span className="counter-button">
                <CounterButton
                min={1}
                max={99}
                onCountChange={updateItemQuantity}/>
              </span>
              <span className="item-total-price">
                {item.sub_total.toFixed(2)} {item.product.currency}
              </span>
            </div>

          </div>
        </div>
        <button className="remove-button" onClick={handleRemoveItem}>x</button>
      </div>
    </>
  );
}





  /*
  return (
    <>
      <div className="basket-item-container">
        <img
          className="product-image-item"
          src={item.product.image}
          alt={item.product.name}
        />
        <div className="product-details">
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
*/

export default BasketItem;
