import React,  { useState } from 'react';
import Basket from './components/Basket';
import { useNavigate } from 'react-router-dom';
import { useBasket } from '../../hooks/useBasket';
import PurchaseTotal from '../TotalPurchase/PurchaseTotal';
import Alert from "@mui/material/Alert";
import Carousel from './components/Carousel';
import "./BasketPage.css";
import { SpinningCircles } from "react-loading-icons";

const BasketPage: React.FC = () => {
  const { basket } = useBasket();
  const navigate = useNavigate();
  const [isLoading, setloading] = useState(false);

  const isEmpty = basket.length === 0;

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
      {isEmpty ? (
        <Alert severity="info">Your basket is empty.</Alert>
      ) : (
        <Basket items={basket} />
      )}
      <PurchaseTotal />
      <button onClick={handleCheckout}>Go to Checkout</button>
      <Carousel />
    </div>
  );
};

export default BasketPage;
