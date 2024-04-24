import React, { useState } from 'react';
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
    <div className="basket-page">
      <div className='basket-header-container'>
        <h1>Your Shopping Basket</h1>
      </div>
      <div className='basket-page-container'>
        <div className='outer-container'>
          <div className='basket-container'>
            {isEmpty ? (
              <Alert severity="info">Your basket is empty.</Alert>
            ) : (
              <Basket items={basket} />
            )}
          </div>
          <div className='inner-container'>
            <div className='total-purchase-container'>
              <PurchaseTotal />
            </div>
            <div className='checkout-button-container'>
              <button className='checkout-button' onClick={handleCheckout}>Go to Checkout</button>
            </div>
          </div>
        </div>
        <div className='carousel-container'>
          <Carousel />
        </div>
      </div>

      {isLoading && (
        <div className="loading spinner">
          <strong>
            Loading...
            <SpinningCircles />
          </strong>
        </div>
      )}
    </div>
  );
};

export default BasketPage;
