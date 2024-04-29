
import './CheckoutPage.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import BillingForm from './components/BillingForm';
import PaymentForm from './components/PaymentForm';
import Confirmation from './components/Confirmation';
import OrderSummary from './components/OrderSummary';
import Receipt from './components/Receipt';

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
<<<<<<< HEAD
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
=======
        <div className="checkout-container">
            <div className="checkout-forms">
                <Routes>
                    <Route path="/" element={<BillingForm />} />
                    <Route path="payment" element={<PaymentForm />} />
                    <Route path="confirmation" element={<Confirmation />} />
                    <Route path='receipt' element={<Receipt />}/>
                </Routes>
            </div>
            <div className="checkout-summary">
                <OrderSummary />
>>>>>>> receive_data
            </div>
        </div>
    );
};

export default CheckoutPage;