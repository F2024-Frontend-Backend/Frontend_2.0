
import './CheckoutPage.css';
import { Routes, Route } from 'react-router-dom';
import BillingForm from './components/BillingForm';
import PaymentForm from './components/PaymentForm';
import Confirmation from './components/Confirmation';
import OrderSummary from './components/OrderSummary';
import { OrderResponseProvider } from '../../context/OrderResponseProvider';

const CheckoutPage = () => {
    return (
        <div className="checkout-container">
            <div className="checkout-forms">
                <Routes>
                    <Route path="/" element={<BillingForm />} />
                    <Route path="payment" element={<PaymentForm />} />
                    <OrderResponseProvider>
                        <Route path="confirmation" element={<Confirmation />} />
                    </OrderResponseProvider>
                </Routes>
            </div>
            <div className="checkout-summary">
                <OrderSummary />
            </div>
        </div>
    );
};

export default CheckoutPage;