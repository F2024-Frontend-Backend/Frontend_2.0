import React from "react";
import { useNavigate } from 'react-router-dom';
import { useCheckout } from "../../../hooks/useCheckout";

const Confirmation: React.FC = () => {
    const { billingInfo, paymentInfo } = useCheckout();
    const navigate = useNavigate();

    const handleConfirmOrder = () => {
        // This is where we send the order to the server
        navigate('/receipt');
    }

    return (
        <div>
            <h1>Order Confirmation</h1>
            <div>
                <h2>Billing Information</h2>
                <p>
                    {billingInfo.firstName} {billingInfo.lastName}
                </p>
                <p>{billingInfo.email}</p>
                <p>{billingInfo.address1}</p>
            </div>
            <div>
                <h2>Payment Information</h2>
                <p>Payment Method: {paymentInfo.paymentMethod}</p>
            </div>
            <button onClick={handleConfirmOrder}>Confirm Order</button>
        </div>
    );
}

export default Confirmation;