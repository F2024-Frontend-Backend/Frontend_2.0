import React, { ChangeEvent,useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../../hooks/useCheckout";

const PaymentForm: React.FC = () => {
    const { paymentInfo, handleSetPaymentInfo } = useCheckout(); 
    const navigate = useNavigate();
    
    const [mobilePayPhoneNumber, setMobilePayPhoneNumber] = useState(""); // State for MobilePay phone number
    const [phoneNumberValid, setPhoneNumberValid] = useState(true); // State to track phone number validity
    const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState(""); // State f-or error message


 




    const handleContinue = () => {
        if (!phoneNumberValid) {
            setPhoneNumberErrorMessage("Please enter a valid phone number for MobilePay.");
            return;
        }

        navigate("/checkout/confirmation");
        
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        handleSetPaymentInfo({ ...paymentInfo, [name]: value });
    };

    const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        const phoneNumber = event.target.value;
        setMobilePayPhoneNumber(phoneNumber);

        // Validate phone number (you can adjust the validation logic as needed)
        const isValid = /^\d{8}$/.test(phoneNumber); // Simple validation for 8-digit phone number
        setPhoneNumberValid(isValid);
        setPhoneNumberErrorMessage(isValid ? "" : "Please enter a valid 8-digit phone number.");
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
                    <option value="mobilepay">MobilePay</option>
                </select>
            </div>
            {/* Render MobilePay phone number input only if MobilePay is selected */}
            {paymentInfo.paymentMethod === "mobilepay" && (
                <div>
                    <label>MobilePay Phone Number</label>
                    <input
                        type="text"
                        name="mobilePayPhoneNumber"
                        value={mobilePayPhoneNumber}
                        onChange={handlePhoneNumberChange}
                    />
                    {!phoneNumberValid && <div style={{ color: "red" }}>{phoneNumberErrorMessage}</div>}
                </div>
            )}

            <button onClick={handleContinue}>Continue</button>
        </form>

        
        


    );
};

export default PaymentForm;