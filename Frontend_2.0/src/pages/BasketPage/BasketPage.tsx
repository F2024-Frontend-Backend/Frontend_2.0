import React from 'react';
import Basket from './components/Basket';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../../hooks/useCheckout';

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
            <button onClick={handleCheckout}>Go to Checkout</button>
        </div>
    );
};

export default BasketPage;