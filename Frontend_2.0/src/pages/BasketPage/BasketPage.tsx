import React from 'react';
import Basket from './components/Basket';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../../hooks/useCheckout';
import PurchaseTotal from '../TotalPurchase/PurchaseTotal';
import Carousel from './components/Carousel';

const BasketPage: React.FC = () => {
    const { basket } = useCheckout();
    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/checkout');
    }

    return (
        <div className='basketPageContainer'>
            <h1>Your Shopping Basket</h1>
            <Basket items={basket} />
            <PurchaseTotal />
            <button onClick={handleCheckout}>Go to Checkout</button>
            <Carousel />
        </div>
    );
};

export default BasketPage;