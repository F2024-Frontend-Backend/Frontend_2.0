
import './CheckoutPage.css';
import { Routes, Route } from 'react-router-dom';
import BillingForm from './BillingForm';
import PaymentForm from './PaymentForm';
import Confirmation from './ConfirmationPage';
import OrderSummary from './OrderSummary';


const CheckoutPage = () => {
    return (
        <div className="checkout-container">
            <div className="checkout-summary">
                <OrderSummary />
            </div>
            <div className="checkout-wrapper">
                <div className="checkout-forms">
                    <Routes>
                        <Route path="/" element={<BillingForm />} />
                        <Route path="payment" element={<PaymentForm />} />
                        <Route path="confirmation" element={<Confirmation />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;