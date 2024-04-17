import React from "react";
import Basket from "./components/Basket";
import { useNavigate } from "react-router-dom";
import { useBasket } from '../../hooks/useBasket';
import PurchaseTotal from "../TotalPurchase/PurchaseTotal";
import Alert from "@mui/material/Alert";
import Carousel from './components/Carousel';

const BasketPage: React.FC = () => {
  //const { basket, isEmpty } = useCheckout();
  const { basket } = useBasket();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="basketPageContainer">
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
