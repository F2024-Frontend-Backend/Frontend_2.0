import React, { useState } from "react";
import Basket from "./components/Basket";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../hooks/useCheckout";
import PurchaseTotal from "../TotalPurchase/PurchaseTotal";
import "./BasketPage.css";
import { SpinningCircles } from "react-loading-icons";

const BasketPage: React.FC = () => {
  const { basket } = useCheckout();
  const navigate = useNavigate();
  const [isLoading, setloading] = useState(false);

  const handleCheckout = () => {
    setloading(true);
    setTimeout(() => {
      navigate("/checkout");
      console.log("Navigating to checkout, should see loader now");
    }, 1000); // Time to show the loader
  };

  return (
    <div className="basketPageContainer">
      {isLoading && (
        <div className="loading spinner">
          <strong>
            Loading...
            <SpinningCircles />
          </strong>
        </div>
      )}
      <h1>Your Shopping Basket</h1>
      <Basket items={basket} />
      <PurchaseTotal />
      <button onClick={handleCheckout}>Go to Checkout</button>
    </div>
  );
};

export default BasketPage;
