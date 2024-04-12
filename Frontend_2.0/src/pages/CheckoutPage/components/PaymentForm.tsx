import React, { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../../hooks/useCheckout";

const PaymentForm: React.FC = () => {
    const { paymentInfo, handleSetPaymentInfo } = useCheckout();
    const navigate = useNavigate();

    const handleContinue = () => {
        navigate("/checkout/confirmation");
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        handleSetPaymentInfo({ ...paymentInfo, [name]: value });
    };

    return (
        <form>
            <div>
                <label>Payment Method</label>
                <select
                    name="paymentMethod"
                    value={paymentInfo.paymentMethod}
                    onChange={(event: ChangeEvent<HTMLSelectElement>) => handleChange(event)}
                >
                    <option value="credit-card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                </select>
            </div>
            <button onClick={handleContinue}>Continue</button>
        </form>
    );
};

export default PaymentForm;