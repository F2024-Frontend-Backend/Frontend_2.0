import React, { useState } from "react";
import Basket from "./components/Basket";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../hooks/useCheckout";
import PurchaseTotal from "../TotalPurchase/PurchaseTotal";
import Alert from "@mui/material/Alert";
import "./BasketPage.css";
import { SpinningCircles } from "react-loading-icons";

const BasketPage: React.FC = () => {
  const { basket, isEmpty } = useCheckout();
  const navigate = useNavigate();
  const [isLoading, setloading] = useState(false);

  {
    /**
 const handleCheckout = () => {
    setloading(true);
    navigate("/checkout");
  }; */
  }

  const handleCheckout = () => {
    console.log("Checkout started, setting loading true");
    setloading(true);
    setTimeout(() => {
      navigate("/checkout");
      console.log("Navigating to checkout, should see loader now");
      // setLoading(false); Keep it true to see if the loader appears
    }, 1000);
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
      {isEmpty ? (
        <Alert severity="info">Your basket is empty.</Alert>
      ) : (
        <Basket items={basket} />
      )}
      <PurchaseTotal />
      <button onClick={handleCheckout}>Go to Checkout</button>
    </div>
  );
};

export default BasketPage;
