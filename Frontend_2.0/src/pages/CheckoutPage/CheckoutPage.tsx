
import './CheckoutPage.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import BillingForm from './CheckoutSubPages/BillingForm';
import PaymentForm from './CheckoutSubPages/PaymentForm';
import Confirmation from './CheckoutSubPages/ConfirmationPage';
import OrderSummary from './CheckoutSubPages/OrderSummary';

const CheckoutPage = () => {
    const location = useLocation();
    let heading;
    switch (location.pathname) {
        case '/checkout':
            heading = 'Billing Information';
            break;
        case '/checkout/payment':
            heading = 'Payment Information';
            break;
        case '/checkout/confirmation':
            heading = 'Confirmation';
            break;
        default:
            heading = '';
    }
    return (
        <div className="checkout-page">
            <div className="checkout-header">
                    <h1>{heading}</h1>
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