import React from "react";
import BasketItem from "./BasketItem";
import { BasketItem as BasketItemType } from "../../../types/types";
import "./Basket.css";

interface BasketProps {
  items: BasketItemType[];
}

const Basket: React.FC<BasketProps> = ({ items }) => {
  return (
    <div className="basket">
      {items.map((item) => {
        return (
          <BasketItem
            key={item.product && item.product.string_id}
            item={item}
          />
        );
      })}
    </div>
  );
};

export default Basket;
