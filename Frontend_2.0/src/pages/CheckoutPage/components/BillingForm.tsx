import React, { ChangeEvent } from "react";
import { useNavigate } from 'react-router-dom';
import { useCheckout } from "../../../hooks/useCheckout";

const BillingForm: React.FC = () => {
    const { billingInfo, setBillingInfo } = useCheckout();
    const navigate = useNavigate();

    const handleContinue = () => {
        navigate('/checkout/payment');
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBillingInfo({ ...billingInfo, [name]: value });
    };

    return (
        <form>
            <div>
                <label>First Name</label>
                <input
                    type="text"
                    name="firstName"
                    value={billingInfo.firstName}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    value={billingInfo.lastName}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={billingInfo.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Address</label>
                <input
                    type="text"
                    name="address"
                    value={billingInfo.address1}
                    onChange={handleChange}
                />
            </div>
            <button onClick={handleContinue}>Continue to Payment</button>
        </form>
    );
};

export default BillingForm;