
import './CheckoutPage.css';
import { Routes, Route } from 'react-router-dom';
import BillingForm from './CheckoutSubPages/BillingForm';
import PaymentForm from './CheckoutSubPages/PaymentForm';
import Confirmation from './CheckoutSubPages/ConfirmationPage';
import OrderSummary from './CheckoutSubPages/OrderSummary';
import Receipt from '../ReceiptPage/Receipt';

const CheckoutPage = () => {
    return (
        <div className="checkout-container">
            <div className="checkout-forms">
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
    );
};

export default CheckoutPage;