
import './CheckoutPage.css';
import { Routes, Route } from 'react-router-dom';
import BillingForm from './components/BillingForm';
import PaymentForm from './components/PaymentForm';
import Confirmation from './components/Confirmation';
import OrderSummary from './components/OrderSummary';


const CheckoutPage = () => {
    return (
        <div className="checkout-page">
            <div className="checkout-header">
            </div>
            <div className='checkout-container'>
                <div className="checkout-forms-container">
                    <Routes>
                        <Route path="/" element={<BillingForm />} />
                        <Route path="payment" element={<PaymentForm />} />
                        <Route path="confirmation" element={<Confirmation />} />
                    </Routes>
                </div>
                <div className="checkout-summary">
                    <OrderSummary />
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;